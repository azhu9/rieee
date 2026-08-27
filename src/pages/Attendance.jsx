import { useState, useCallback, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { fadeIn } from '../utils/motion'
import { supabase } from '../utils/supabase'
import { useSerialScanner } from '../hooks/useSerialScanner'
import { useNfcScanner } from '../hooks/useNfcScanner'
import {
  FiMonitor, FiWifi, FiUsers, FiArrowLeft, FiLogOut,
  FiShield, FiCheck, FiAlertCircle, FiUser, FiClock, FiInfo,
  FiBarChart2, FiCalendar, FiTrendingUp, FiAward
} from 'react-icons/fi'
import logo from '../assets/sm-rutgersieee.png'

// ─── Constants ────────────────────────────────────────────────────────────────

const EVENT_TYPES = [
  'IEEE General Meeting',
  'VEX U Meeting',
  'IGVC Meeting',
  'Micromouse Meeting',
  'MLAI Meeting',
  'Electronics Meeting',
  'ESS Meeting',
  'Hackathon',
  'Workshop',
]

const M = {
  CONNECT:             'connect',
  VERIFYING:           'verifying',
  ENROLLING_SELF:      'enrolling-self',
  SELECT_EVENT:        'select-event',
  SCANNING:            'scanning',
  ENROLLING_ATTENDEE:  'enrolling-attendee',
  LEADS_ENROLLMENT:    'leads-enrollment',
  ENROLLING_LEAD:      'enrolling-lead',
  DASHBOARD:           'dashboard',
}

const SCAN_ACTIVE = new Set([M.VERIFYING, M.SCANNING, M.LEADS_ENROLLMENT])

// ─── Supabase helpers ────────────────────────────────────────────────────────

async function lookupMember(uid) {
  const { data, error } = await supabase
    .from('members').select('*').eq('nfc_uid', uid).maybeSingle()
  if (error) throw error
  return data
}

async function enrollMember(uid, name, netId, role = 'member') {
  const { data, error } = await supabase
    .from('members').insert({ nfc_uid: uid, name, net_id: netId, role }).select().single()
  if (error) throw error
  return data
}

async function promoteMember(id) {
  const { error } = await supabase
    .from('members').update({ role: 'lead' }).eq('id', id)
  if (error) throw error
}

async function createSession(eventType, leadId) {
  const { data, error } = await supabase
    .from('attendance_sessions').insert({ event_type: eventType, opened_by: leadId }).select().single()
  if (error) throw error
  return data
}

async function getActiveSession() {
  const { data, error } = await supabase
    .from('attendance_sessions')
    .select('*')
    .is('closed_at', null)
    .order('created_at', { ascending: false })
    .limit(1)
    .maybeSingle()
  if (error) throw error
  return data
}

async function closeSession(id) {
  const { error } = await supabase
    .from('attendance_sessions')
    .update({ closed_at: new Date().toISOString() })
    .eq('id', id)
  if (error) throw error
}

async function fetchAttendeesForSession(sessionId) {
  const { data: records, error } = await supabase
    .from('attendance_records')
    .select('id, created_at, nfc_uid, member_id')
    .eq('session_id', sessionId)
    .order('created_at', { ascending: false })
  if (error) throw error
  const memberIds = [...new Set((records ?? []).map(r => r.member_id).filter(Boolean))]
  if (memberIds.length === 0) return []
  const { data: members, error: mErr } = await supabase.from('members').select('*').in('id', memberIds)
  if (mErr) throw mErr
  const memberMap = Object.fromEntries(members.map(m => [m.id, m]))
  return records
    .map(r => ({ ...memberMap[r.member_id], scanned_at: r.created_at, nfc_uid: r.nfc_uid }))
    .filter(a => a.id)
}

async function logAttendance(sessionId, memberId, uid) {
  const { error } = await supabase
    .from('attendance_records').insert({ session_id: sessionId, member_id: memberId, nfc_uid: uid })
  if (error) {
    if (error.code === '23505') {
      const dup = new Error('Already checked in')
      dup.duplicate = true
      throw dup
    }
    throw error
  }
}

async function fetchDashboardData() {
  const [sessionsRes, recordsRes, membersRes] = await Promise.all([
    supabase.from('attendance_sessions').select('id, event_type, created_at, opened_by').order('created_at', { ascending: false }),
    supabase.from('attendance_records').select('id, session_id, member_id'),
    supabase.from('members').select('id, name, net_id')
  ])
  if (sessionsRes.error) throw sessionsRes.error
  if (recordsRes.error) throw recordsRes.error
  if (membersRes.error) throw membersRes.error

  const sessions = sessionsRes.data ?? []
  const records  = recordsRes.data ?? []
  const members  = membersRes.data ?? []

  const memberMap     = Object.fromEntries(members.map(m => [m.id, m]))
  const recordsBySession = {}
  for (const r of records) {
    recordsBySession[r.session_id] = (recordsBySession[r.session_id] ?? 0) + 1
  }

  // Unique attendees
  const uniqueMemberIds = new Set(records.filter(r => r.member_id).map(r => r.member_id))

  // Event type stats: { type -> { checkIns, sessions } }
  const eventTypeStats = {}
  for (const s of sessions) {
    const count = recordsBySession[s.id] ?? 0
    if (!eventTypeStats[s.event_type])
      eventTypeStats[s.event_type] = { checkIns: 0, sessions: 0 }
    eventTypeStats[s.event_type].checkIns  += count
    eventTypeStats[s.event_type].sessions  += 1
  }
  const sortedEventTypes = Object.entries(eventTypeStats).sort((a, b) => b[1].checkIns - a[1].checkIns)

  // Top attendees
  const attendanceCounts = {}
  for (const r of records) {
    if (!r.member_id) continue
    attendanceCounts[r.member_id] = (attendanceCounts[r.member_id] ?? 0) + 1
  }
  const topAttendees = Object.entries(attendanceCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 8)
    .map(([id, count]) => ({ member: memberMap[id], count }))
    .filter(a => a.member)

  // Recent sessions with lead name and count
  const recentSessions = sessions.slice(0, 8).map(s => ({
    ...s,
    count:    recordsBySession[s.id] ?? 0,
    leadName: memberMap[s.opened_by]?.name ?? 'Unknown'
  }))

  const totalCheckIns = records.length
  const totalSessions = sessions.length
  const avgAttendance = totalSessions > 0 ? (totalCheckIns / totalSessions).toFixed(1) : '—'

  return { uniqueAttendeeCount: uniqueMemberIds.size, totalSessions, totalCheckIns, avgAttendance, sortedEventTypes, recentSessions, topAttendees }
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function Attendance() {
  const [mode, setMode]                   = useState(M.CONNECT)
  const [currentLead, setCurrentLead]     = useState(null)
  const [currentSession, setCurrentSession] = useState(null)
  const [liveSession, setLiveSession]     = useState(null)
  const [attendees, setAttendees]         = useState([])
  const [pendingUid, setPendingUid]       = useState(null)
  const [pendingMember, setPendingMember] = useState(null)
  const [enrollForm, setEnrollForm]       = useState({ name: '', netId: '' })
  const [toast, setToast]                 = useState(null)
  const [actionLoading, setActionLoading] = useState(false)

  // Refs so handleScan (stable) always reads current state
  const modeRef         = useRef(mode)
  const currentLeadRef  = useRef(currentLead)
  const sessionRef      = useRef(currentSession)
  const attendeesRef    = useRef(attendees)
  const processingRef   = useRef(false)

  useEffect(() => { modeRef.current = mode },               [mode])
  useEffect(() => { currentLeadRef.current = currentLead }, [currentLead])
  useEffect(() => { sessionRef.current = currentSession },  [currentSession])
  useEffect(() => { attendeesRef.current = attendees },     [attendees])

  const showToast = useCallback((message, type = 'info') => {
    setToast({ message, type })
    setTimeout(() => setToast(null), 3500)
  }, [])

  // ── Core scan handler (stable reference via refs) ──────────────────────────
  const handleScan = useCallback(async (uid) => {
    if (!SCAN_ACTIVE.has(modeRef.current)) return
    if (processingRef.current) return
    processingRef.current = true

    try {
      const mode    = modeRef.current
      const session = sessionRef.current

      if (mode === M.VERIFYING) {
        const member = await lookupMember(uid)
        if (!member) {
          setPendingUid(uid)
          setEnrollForm({ name: '', netId: '' })
          setMode(M.ENROLLING_SELF)
        } else if (member.role === 'admin' || member.role === 'lead') {
          setCurrentLead(member)
          setMode(M.SELECT_EVENT)
          showToast(`Welcome, ${member.name}!`, 'success')
        } else {
          showToast('You need lead permissions to use this scanner.', 'error')
        }

      } else if (mode === M.SCANNING) {
        if (attendeesRef.current.some(a => a.nfc_uid === uid)) {
          const existing = attendeesRef.current.find(a => a.nfc_uid === uid)
          showToast(`${existing?.name ?? 'This person'} is already checked in.`, 'info')
          return
        }
        const member = await lookupMember(uid)
        if (!member) {
          setPendingUid(uid)
          setEnrollForm({ name: '', netId: '' })
          setMode(M.ENROLLING_ATTENDEE)
        } else {
          try {
            await logAttendance(session.id, member.id, uid)
            showToast(`✓ ${member.name} checked in`, 'success')
          } catch (err) {
            if (err.duplicate) {
              showToast(`${member.name} is already checked in.`, 'info')
            } else {
              throw err
            }
          }
        }

      } else if (mode === M.LEADS_ENROLLMENT) {
        const member = await lookupMember(uid)
        if (!member) {
          setPendingUid(uid)
          setPendingMember(null)
          setEnrollForm({ name: '', netId: '' })
          setMode(M.ENROLLING_LEAD)
        } else if (member.role === 'lead' || member.role === 'admin') {
          showToast(`${member.name} is already a ${member.role}.`, 'info')
        } else {
          setPendingUid(uid)
          setPendingMember(member)
          setMode(M.ENROLLING_LEAD)
        }
      }
    } catch (err) {
      showToast(`Error: ${err.message}`, 'error')
    } finally {
      processingRef.current = false
    }
  }, [showToast])

  const {
    connected: serialConnected, error: serialError, supported: serialSupported,
    connect: connectSerial, disconnect: disconnectSerial
  } = useSerialScanner(handleScan)

  const {
    active: nfcActive, error: nfcError, supported: nfcSupported,
    start: startNfc
  } = useNfcScanner(handleScan)

  useEffect(() => () => { disconnectSerial() }, [disconnectSerial])

  // ── Handlers ───────────────────────────────────────────────────────────────

  async function handleConnectSerial() {
    await connectSerial()
    setMode(M.VERIFYING)
  }

  async function handleConnectNfc() {
    await startNfc()
    setMode(M.VERIFYING)
  }

  async function handleEnrollSelf(e) {
    e.preventDefault()
    setActionLoading(true)
    try {
      await enrollMember(pendingUid, enrollForm.name.trim(), enrollForm.netId.trim(), 'member')
      showToast('Registered! Contact a lead to get scanner access.', 'info')
      setPendingUid(null)
      setMode(M.VERIFYING)
    } catch (err) {
      showToast(`Error: ${err.message}`, 'error')
    } finally {
      setActionLoading(false)
    }
  }

  async function handleSelectEvent(eventType) {
    setActionLoading(true)
    try {
      const session = await createSession(eventType, currentLead.id)
      setCurrentSession(session)
      setAttendees([])
      setMode(M.SCANNING)
    } catch (err) {
      showToast(`Error: ${err.message}`, 'error')
    } finally {
      setActionLoading(false)
    }
  }

  async function handleJoinSession() {
    if (!liveSession) return
    setActionLoading(true)
    try {
      const atts = await fetchAttendeesForSession(liveSession.id)
      setCurrentSession(liveSession)
      setAttendees(atts)
      setMode(M.SCANNING)
    } catch (err) {
      showToast(`Error: ${err.message}`, 'error')
    } finally {
      setActionLoading(false)
    }
  }

  async function handleEnrollAttendee(e) {
    e.preventDefault()
    setActionLoading(true)
    try {
      const member = await enrollMember(pendingUid, enrollForm.name.trim(), enrollForm.netId.trim(), 'member')
      await logAttendance(currentSession.id, member.id, pendingUid)
      showToast(`${member.name} enrolled and checked in!`, 'success')
      setPendingUid(null)
      setMode(M.SCANNING)
    } catch (err) {
      showToast(`Error: ${err.message}`, 'error')
    } finally {
      setActionLoading(false)
    }
  }

  async function handleEnrollLead(e) {
    e.preventDefault()
    setActionLoading(true)
    try {
      if (pendingMember) {
        await promoteMember(pendingMember.id)
        showToast(`${pendingMember.name} promoted to lead!`, 'success')
      } else {
        await enrollMember(pendingUid, enrollForm.name.trim(), enrollForm.netId.trim(), 'lead')
        showToast(`${enrollForm.name.trim()} enrolled as lead!`, 'success')
      }
      setPendingUid(null)
      setPendingMember(null)
      setMode(M.LEADS_ENROLLMENT)
    } catch (err) {
      showToast(`Error: ${err.message}`, 'error')
    } finally {
      setActionLoading(false)
    }
  }

  async function handleEndSession() {
    setActionLoading(true)
    try {
      await closeSession(currentSession.id)
    } catch (err) {
      showToast(`Error ending session: ${err.message}`, 'error')
    } finally {
      setActionLoading(false)
    }
    setCurrentSession(null)
    setAttendees([])
    setLiveSession(null)
    setMode(M.SELECT_EVENT)
  }

  // ── Live session discovery: whenever a lead lands on the event picker, ─────
  // check whether another scanner already has a session open so they can join
  // it instead of starting a duplicate one.
  useEffect(() => {
    if (mode !== M.SELECT_EVENT) return
    let cancelled = false
    getActiveSession()
      .then(session => { if (!cancelled) setLiveSession(session) })
      .catch(() => {})
    return () => { cancelled = true }
  }, [mode])

  // ── Realtime sync while scanning: every connected scanner shares the same ──
  // attendee list, and the session closing on one device closes it everywhere.
  useEffect(() => {
    if (!currentSession) return

    const channel = supabase
      .channel(`attendance-session-${currentSession.id}`)
      .on('postgres_changes', {
        event: 'INSERT', schema: 'public', table: 'attendance_records',
        filter: `session_id=eq.${currentSession.id}`,
      }, async (payload) => {
        const uid = payload.new.nfc_uid
        if (attendeesRef.current.some(a => a.nfc_uid === uid)) return
        try {
          const member = await lookupMember(uid)
          if (!member) return
          setAttendees(prev => prev.some(a => a.nfc_uid === uid)
            ? prev
            : [{ ...member, scanned_at: payload.new.created_at }, ...prev])
        } catch { /* ignore — next scan or manual refresh will reconcile */ }
      })
      .on('postgres_changes', {
        event: 'UPDATE', schema: 'public', table: 'attendance_sessions',
        filter: `id=eq.${currentSession.id}`,
      }, (payload) => {
        if (payload.new.closed_at) {
          showToast('This session was ended by another lead.', 'info')
          setCurrentSession(null)
          setAttendees([])
          setLiveSession(null)
          setMode(M.SELECT_EVENT)
        }
      })
      .subscribe()

    return () => { supabase.removeChannel(channel) }
  }, [currentSession?.id, showToast])

  const scannerActive = serialConnected || nfcActive

  // ── Render ─────────────────────────────────────────────────────────────────

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-white">
      <div className="absolute -top-28 -left-28 w-[550px] h-[700px] bg-gradient-to-tr from-indigo-500/20 to-pink-500/20 rounded-full blur-[80px] -z-10 pointer-events-none" />

      {/* Top bar */}
      <div className="border-b border-gray-100 shadow-sm px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img src={logo} className="w-24" alt="Rutgers IEEE" />
          <span className="text-gray-300 select-none">|</span>
          <span className="font-semibold text-gray-700 text-sm">Attendance</span>
        </div>
        {scannerActive && (
          <div className="flex items-center gap-2 text-xs font-medium text-green-600 bg-green-50 px-3 py-1.5 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
            {serialConnected ? 'USB Scanner Connected' : 'NFC Active'}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col items-center min-h-[calc(100vh-73px)]">
        <AnimatePresence mode="wait">

          {mode === M.CONNECT && (
            <ConnectView
              key="connect"
              serialSupported={serialSupported}
              nfcSupported={nfcSupported}
              serialError={serialError}
              nfcError={nfcError}
              onConnectSerial={handleConnectSerial}
              onConnectNfc={handleConnectNfc}
            />
          )}

          {mode === M.VERIFYING && (
            <VerifyingView
              key="verifying"
              serialConnected={serialConnected}
              nfcActive={nfcActive}
              onBack={() => setMode(M.CONNECT)}
            />
          )}

          {mode === M.ENROLLING_SELF && (
            <EnrollView
              key="enroll-self"
              title="Your ID Isn't Registered"
              subtitle="Enter your info to register. Contact a lead to get scanner access."
              uid={pendingUid}
              form={enrollForm}
              onChange={setEnrollForm}
              onSubmit={handleEnrollSelf}
              onCancel={() => { setPendingUid(null); setMode(M.VERIFYING) }}
              loading={actionLoading}
              submitLabel="Register"
              accentColor="blue"
            />
          )}

          {mode === M.SELECT_EVENT && (
            <SelectEventView
              key="select-event"
              lead={currentLead}
              liveSession={liveSession}
              onJoinSession={handleJoinSession}
              onSelect={handleSelectEvent}
              onLeadsEnrollment={() => setMode(M.LEADS_ENROLLMENT)}
              onDashboard={() => setMode(M.DASHBOARD)}
              loading={actionLoading}
            />
          )}

          {mode === M.DASHBOARD && (
            <DashboardView
              key="dashboard"
              onBack={() => setMode(M.SELECT_EVENT)}
            />
          )}

          {mode === M.SCANNING && (
            <ScanningView
              key="scanning"
              session={currentSession}
              lead={currentLead}
              attendees={attendees}
              onEndSession={handleEndSession}
              endLoading={actionLoading}
            />
          )}

          {mode === M.ENROLLING_ATTENDEE && (
            <EnrollView
              key="enroll-attendee"
              title="New Member Detected"
              subtitle="This ID isn't in the system. Enroll them to check them in."
              uid={pendingUid}
              form={enrollForm}
              onChange={setEnrollForm}
              onSubmit={handleEnrollAttendee}
              onCancel={() => { setPendingUid(null); setMode(M.SCANNING) }}
              loading={actionLoading}
              submitLabel="Enroll & Check In"
              accentColor="blue"
            />
          )}

          {mode === M.LEADS_ENROLLMENT && (
            <LeadsEnrollmentView
              key="leads-enrollment"
              onBack={() => setMode(M.SELECT_EVENT)}
            />
          )}

          {mode === M.ENROLLING_LEAD && (
            <EnrollLeadView
              key="enroll-lead"
              uid={pendingUid}
              existingMember={pendingMember}
              form={enrollForm}
              onChange={setEnrollForm}
              onSubmit={handleEnrollLead}
              onCancel={() => { setPendingUid(null); setPendingMember(null); setMode(M.LEADS_ENROLLMENT) }}
              loading={actionLoading}
            />
          )}

        </AnimatePresence>
      </div>

      {/* Toast */}
      <AnimatePresence>
        {toast && (
          <motion.div
            key="toast"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            className={`fixed bottom-6 left-1/2 -translate-x-1/2 px-5 py-3 rounded-xl shadow-lg text-white text-sm font-medium flex items-center gap-2 z-50 whitespace-nowrap ${
              toast.type === 'success' ? 'bg-green-600' :
              toast.type === 'error'   ? 'bg-red-600'   : 'bg-blue-600'
            }`}
          >
            {toast.type === 'success' && <FiCheck className="shrink-0" />}
            {toast.type === 'error'   && <FiAlertCircle className="shrink-0" />}
            {toast.type === 'info'    && <FiInfo className="shrink-0" />}
            {toast.message}
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  )
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function ConnectView({ serialSupported, nfcSupported, serialError, nfcError, onConnectSerial, onConnectNfc }) {
  const neitherSupported = !serialSupported && !nfcSupported

  return (
    <motion.div
      variants={fadeIn('up', 0.1)}
      initial="hidden"
      animate="show"
      exit={{ opacity: 0, y: -20 }}
      className="w-full max-w-2xl flex flex-col items-center gap-10"
    >
      <div className="text-center space-y-3">
        <div className="flex items-center gap-2 bg-gray-50 w-fit mx-auto px-4 py-2 rounded-full">
          <span className="text-red-600">★</span>
          <span className="text-sm font-medium text-gray-600">Rutgers IEEE</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
          Attendance <span className="text-red-600 relative inline-block">
            Scanner
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-red-200/60" />
          </span>
        </h1>
        <p className="text-gray-500 text-sm">Connect your scanner to begin recording attendance.</p>
      </div>

      {neitherSupported && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-sm text-red-700 flex items-start gap-2 w-full">
          <FiAlertCircle className="shrink-0 mt-0.5" />
          <span>
            This browser doesn't support Web Serial or Web NFC.
            Use Chrome/Edge on desktop (USB scanner) or Chrome on Android (NFC).
          </span>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full">
        {serialSupported && (
          <motion.div
            variants={fadeIn('up', 0.2)}
            initial="hidden"
            animate="show"
            className="bg-white rounded-2xl border border-gray-100 shadow-sm p-7 flex flex-col items-center gap-5 hover:shadow-xl transition-shadow duration-300"
          >
            <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center">
              <FiMonitor className="text-blue-600 text-2xl" />
            </div>
            <div className="text-center">
              <h2 className="font-semibold text-gray-800 text-lg">USB Serial Scanner</h2>
              <p className="text-xs text-gray-500 mt-1">Connect your custom NFC reader via USB serial at 9600 baud</p>
            </div>
            {serialError && (
              <p className="text-xs text-red-500 text-center">{serialError}</p>
            )}
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={onConnectSerial}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-lg text-sm font-medium transition-colors hover:shadow-lg hover:shadow-blue-100"
            >
              Connect Scanner
            </motion.button>
          </motion.div>
        )}

        {nfcSupported && (
          <motion.div
            variants={fadeIn('up', 0.3)}
            initial="hidden"
            animate="show"
            className="bg-white rounded-2xl border border-gray-100 shadow-sm p-7 flex flex-col items-center gap-5 hover:shadow-xl transition-shadow duration-300"
          >
            <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center">
              <FiWifi className="text-red-600 text-2xl" />
            </div>
            <div className="text-center">
              <h2 className="font-semibold text-gray-800 text-lg">Mobile NFC</h2>
              <p className="text-xs text-gray-500 mt-1">Tap Rutgers ID cards directly with your Android phone</p>
            </div>
            {nfcError && (
              <p className="text-xs text-red-500 text-center">{nfcError}</p>
            )}
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={onConnectNfc}
              className="w-full bg-red-600 hover:bg-red-700 text-white py-2.5 rounded-lg text-sm font-medium transition-colors hover:shadow-lg hover:shadow-red-100"
            >
              Start NFC
            </motion.button>
          </motion.div>
        )}
      </div>
    </motion.div>
  )
}

function VerifyingView({ serialConnected, nfcActive, onBack }) {
  return (
    <motion.div
      variants={fadeIn('up', 0.1)}
      initial="hidden"
      animate="show"
      exit={{ opacity: 0, y: -20 }}
      className="flex flex-col items-center gap-10 text-center"
    >
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-gray-900">Scan Your ID</h1>
        <p className="text-gray-500 text-sm">Tap or scan your Rutgers IEEE ID to verify your identity as a lead</p>
      </div>

      <div className="relative flex items-center justify-center my-4">
        <motion.div
          animate={{ scale: [1, 1.5, 1], opacity: [0.2, 0, 0.2] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute w-40 h-40 rounded-full bg-red-100"
        />
        <motion.div
          animate={{ scale: [1, 1.25, 1], opacity: [0.35, 0.1, 0.35] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut', delay: 0.15 }}
          className="absolute w-28 h-28 rounded-full bg-red-200"
        />
        <div className="relative w-20 h-20 rounded-full bg-red-600 flex items-center justify-center shadow-xl shadow-red-200">
          {nfcActive
            ? <FiWifi className="text-white text-2xl" />
            : <FiMonitor className="text-white text-2xl" />
          }
        </div>
      </div>

      <div className="flex items-center gap-2 text-sm text-gray-500">
        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
        {serialConnected
          ? 'USB scanner connected — waiting for card scan'
          : 'NFC active — tap your ID card to the back of the phone'
        }
      </div>

      <button
        onClick={onBack}
        className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-gray-700 transition-colors"
      >
        <FiArrowLeft /> Back to connection
      </button>
    </motion.div>
  )
}

function EnrollView({ title, subtitle, uid, form, onChange, onSubmit, onCancel, loading, submitLabel, accentColor }) {
  const ring = accentColor === 'blue'
    ? 'focus:border-blue-500 focus:ring-blue-100'
    : 'focus:border-red-400 focus:ring-red-100'
  const btn = accentColor === 'blue'
    ? 'bg-blue-600 hover:bg-blue-700 hover:shadow-blue-100'
    : 'bg-red-600 hover:bg-red-700 hover:shadow-red-100'

  return (
    <motion.div
      variants={fadeIn('up', 0.1)}
      initial="hidden"
      animate="show"
      exit={{ opacity: 0, y: -20 }}
      className="w-full max-w-md"
    >
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 flex flex-col gap-6">
        <div className="text-center space-y-1">
          <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center mx-auto mb-3">
            <FiUser className="text-blue-600 text-xl" />
          </div>
          <h2 className="text-xl font-bold text-gray-900">{title}</h2>
          <p className="text-sm text-gray-500">{subtitle}</p>
          {uid && <p className="text-xs font-mono text-gray-300 pt-1">{uid}</p>}
        </div>

        <form onSubmit={onSubmit} className="flex flex-col gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
            <input
              type="text"
              required
              value={form.name}
              onChange={e => onChange(f => ({ ...f, name: e.target.value }))}
              placeholder="Jane Smith"
              className={`w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 transition-all ${ring}`}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Net ID</label>
            <input
              type="text"
              required
              value={form.netId}
              onChange={e => onChange(f => ({ ...f, netId: e.target.value }))}
              placeholder="abc123"
              className={`w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 transition-all ${ring}`}
            />
          </div>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={loading || !form.name.trim() || !form.netId.trim()}
            className={`w-full text-white py-2.5 rounded-lg text-sm font-medium transition-all hover:shadow-lg active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed ${btn}`}
          >
            {loading ? 'Saving...' : submitLabel}
          </motion.button>
          <button
            type="button"
            onClick={onCancel}
            className="w-full text-sm text-gray-400 hover:text-gray-600 transition-colors"
          >
            Cancel
          </button>
        </form>
      </div>
    </motion.div>
  )
}

function SelectEventView({ lead, liveSession, onJoinSession, onSelect, onLeadsEnrollment, onDashboard, loading }) {
  return (
    <motion.div
      variants={fadeIn('up', 0.1)}
      initial="hidden"
      animate="show"
      exit={{ opacity: 0, y: -20 }}
      className="w-full max-w-2xl flex flex-col gap-8"
    >
      <div className="text-center space-y-1">
        <h1 className="text-3xl font-bold text-gray-900">
          Welcome back, <span className="text-red-600">{lead?.name}</span>
        </h1>
        <p className="text-gray-500 text-sm">Select the event type to open an attendance session</p>
      </div>

      {liveSession && (
        <motion.div
          variants={fadeIn('up', 0.05)}
          initial="hidden"
          animate="show"
          className="bg-green-50 border border-green-200 rounded-xl p-4 flex items-center justify-between gap-3"
        >
          <div>
            <p className="text-sm font-semibold text-green-800 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              Live session in progress
            </p>
            <p className="text-xs text-green-700 mt-0.5">{liveSession.event_type} — join to see attendees and scan alongside others</p>
          </div>
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={onJoinSession}
            disabled={loading}
            className="shrink-0 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg text-sm font-medium transition-colors disabled:opacity-50"
          >
            Join Session
          </motion.button>
        </motion.div>
      )}

      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {EVENT_TYPES.map((type, i) => (
          <motion.button
            key={type}
            variants={fadeIn('up', 0.05 * (i + 1))}
            initial="hidden"
            animate="show"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => onSelect(type)}
            disabled={loading}
            className="bg-white border border-gray-100 shadow-sm rounded-xl p-4 text-sm font-medium text-gray-700 hover:border-blue-300 hover:text-blue-600 hover:shadow-md transition-all text-left disabled:opacity-50"
          >
            {type}
          </motion.button>
        ))}
      </div>

      <div className="flex flex-col gap-3">
        <motion.button
          variants={fadeIn('up', 0.55)}
          initial="hidden"
          animate="show"
          whileHover={{ scale: 1.01 }}
          onClick={onDashboard}
          className="flex items-center justify-center gap-2 w-full border border-gray-200 rounded-xl py-3.5 text-sm text-gray-500 hover:border-blue-400 hover:text-blue-600 transition-all"
        >
          <FiBarChart2 />
          View Attendance Dashboard
        </motion.button>

        {lead?.role === 'admin' && (
          <motion.button
            variants={fadeIn('up', 0.6)}
            initial="hidden"
            animate="show"
            whileHover={{ scale: 1.01 }}
            onClick={onLeadsEnrollment}
            className="flex items-center justify-center gap-2 w-full border border-dashed border-gray-200 rounded-xl py-3.5 text-sm text-gray-400 hover:border-red-400 hover:text-red-600 transition-all"
          >
            <FiShield />
            Leads Enrollment Mode
          </motion.button>
        )}
      </div>
    </motion.div>
  )
}

function ScanningView({ session, lead, attendees, onEndSession, endLoading }) {
  return (
    <motion.div
      variants={fadeIn('up', 0.1)}
      initial="hidden"
      animate="show"
      exit={{ opacity: 0, y: -20 }}
      className="w-full max-w-xl flex flex-col gap-5"
    >
      {/* Session header card */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex items-center justify-between">
        <div>
          <p className="text-xs text-gray-400 uppercase tracking-widest font-medium mb-0.5">Active Session</p>
          <h2 className="text-lg font-bold text-gray-900">{session?.event_type}</h2>
          <p className="text-xs text-gray-400 mt-0.5">Opened by {lead?.name}</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={onEndSession}
          disabled={endLoading}
          className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-red-600 border border-gray-200 hover:border-red-300 rounded-lg px-3 py-2 transition-all disabled:opacity-50"
        >
          <FiLogOut className="text-sm" /> End
        </motion.button>
      </div>

      {/* Scan indicator */}
      <div className="flex flex-col items-center gap-3 py-4">
        <div className="relative flex items-center justify-center">
          <motion.div
            animate={{ scale: [1, 1.5, 1], opacity: [0.2, 0, 0.2] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute w-24 h-24 rounded-full bg-green-100"
          />
          <motion.div
            animate={{ scale: [1, 1.25, 1], opacity: [0.35, 0.1, 0.35] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut', delay: 0.15 }}
            className="absolute w-16 h-16 rounded-full bg-green-200"
          />
          <div className="relative w-12 h-12 rounded-full bg-green-600 flex items-center justify-center shadow-lg shadow-green-100">
            <FiUsers className="text-white text-lg" />
          </div>
        </div>
        <p className="text-sm text-gray-400">Ready to scan — tap or present an ID</p>
      </div>

      {/* Attendee list */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="px-5 py-3 border-b border-gray-50 flex items-center justify-between">
          <span className="text-sm font-semibold text-gray-700 flex items-center gap-2">
            <FiUsers className="text-gray-400" /> Attendees
          </span>
          <span className="bg-blue-100 text-blue-700 text-xs font-semibold px-2.5 py-0.5 rounded-full">
            {attendees.length}
          </span>
        </div>

        {attendees.length === 0 ? (
          <p className="text-center text-sm text-gray-400 py-10">No attendees scanned yet</p>
        ) : (
          <ul className="divide-y divide-gray-50 max-h-72 overflow-y-auto">
            <AnimatePresence>
              {attendees.map(a => (
                <motion.li
                  key={a.nfc_uid}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="px-5 py-3 flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-xs font-semibold text-gray-500 shrink-0">
                      {a.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-800">{a.name}</p>
                      <p className="text-xs text-gray-400">{a.net_id}</p>
                    </div>
                  </div>
                  <span className="text-xs text-gray-400 flex items-center gap-1 shrink-0">
                    <FiClock className="text-xs" />
                    {new Date(a.scanned_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </motion.li>
              ))}
            </AnimatePresence>
          </ul>
        )}
      </div>
    </motion.div>
  )
}

function LeadsEnrollmentView({ onBack }) {
  const [leads, setLeads]     = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase.from('members').select('*').in('role', ['lead', 'admin']).order('name')
      .then(({ data }) => { setLeads(data ?? []); setLoading(false) })
  }, [])

  return (
    <motion.div
      variants={fadeIn('up', 0.1)}
      initial="hidden"
      animate="show"
      exit={{ opacity: 0, y: -20 }}
      className="w-full max-w-xl flex flex-col gap-6"
    >
      <div className="flex items-center gap-3">
        <button onClick={onBack} className="text-gray-400 hover:text-gray-700 transition-colors p-1">
          <FiArrowLeft />
        </button>
        <div>
          <h1 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <FiShield className="text-red-600" /> Leads Enrollment
          </h1>
          <p className="text-sm text-gray-500">Scan an ID to enroll or promote someone to lead</p>
        </div>
      </div>

      <div className="flex flex-col items-center gap-3 py-3">
        <div className="relative flex items-center justify-center">
          <motion.div
            animate={{ scale: [1, 1.5, 1], opacity: [0.2, 0, 0.2] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute w-24 h-24 rounded-full bg-red-100"
          />
          <motion.div
            animate={{ scale: [1, 1.25, 1], opacity: [0.35, 0.1, 0.35] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', delay: 0.15 }}
            className="absolute w-16 h-16 rounded-full bg-red-200"
          />
          <div className="relative w-12 h-12 rounded-full bg-red-600 flex items-center justify-center shadow-lg shadow-red-100">
            <FiShield className="text-white text-lg" />
          </div>
        </div>
        <p className="text-sm text-gray-400">Waiting for scan...</p>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="px-5 py-3 border-b border-gray-50">
          <span className="text-sm font-semibold text-gray-700">Current Leads</span>
        </div>
        {loading ? (
          <p className="text-center text-sm text-gray-400 py-8">Loading...</p>
        ) : leads.length === 0 ? (
          <p className="text-center text-sm text-gray-400 py-8">No leads enrolled yet</p>
        ) : (
          <ul className="divide-y divide-gray-50 max-h-64 overflow-y-auto">
            {leads.map(lead => (
              <li key={lead.id} className="px-5 py-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-red-50 flex items-center justify-center text-xs font-semibold text-red-600 shrink-0">
                    {lead.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-800">{lead.name}</p>
                    <p className="text-xs text-gray-400">{lead.net_id}</p>
                  </div>
                </div>
                <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${
                  lead.role === 'admin'
                    ? 'bg-red-100 text-red-600'
                    : 'bg-blue-100 text-blue-600'
                }`}>
                  {lead.role}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </motion.div>
  )
}

function EnrollLeadView({ uid, existingMember, form, onChange, onSubmit, onCancel, loading }) {
  return (
    <motion.div
      variants={fadeIn('up', 0.1)}
      initial="hidden"
      animate="show"
      exit={{ opacity: 0, y: -20 }}
      className="w-full max-w-md"
    >
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 flex flex-col gap-6">
        <div className="text-center space-y-1">
          <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center mx-auto mb-3">
            <FiShield className="text-red-600 text-xl" />
          </div>
          <h2 className="text-xl font-bold text-gray-900">
            {existingMember ? 'Promote to Lead' : 'Enroll New Lead'}
          </h2>
          {existingMember ? (
            <p className="text-sm text-gray-500">
              Promote <span className="font-semibold text-gray-700">{existingMember.name}</span>{' '}
              ({existingMember.net_id}) to lead?
            </p>
          ) : (
            <p className="text-sm text-gray-500">Enter their details to enroll as a lead.</p>
          )}
          {uid && <p className="text-xs font-mono text-gray-300 pt-1">{uid}</p>}
        </div>

        <form onSubmit={onSubmit} className="flex flex-col gap-4">
          {!existingMember && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={e => onChange(f => ({ ...f, name: e.target.value }))}
                  placeholder="Jane Smith"
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-red-400 focus:ring-2 focus:ring-red-100 transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Net ID</label>
                <input
                  type="text"
                  required
                  value={form.netId}
                  onChange={e => onChange(f => ({ ...f, netId: e.target.value }))}
                  placeholder="abc123"
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-red-400 focus:ring-2 focus:ring-red-100 transition-all"
                />
              </div>
            </>
          )}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={loading || (!existingMember && (!form.name.trim() || !form.netId.trim()))}
            className="w-full bg-red-600 hover:bg-red-700 text-white py-2.5 rounded-lg text-sm font-medium transition-all hover:shadow-lg hover:shadow-red-100 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Saving...' : existingMember ? 'Confirm Promotion' : 'Enroll as Lead'}
          </motion.button>
          <button
            type="button"
            onClick={onCancel}
            className="w-full text-sm text-gray-400 hover:text-gray-600 transition-colors"
          >
            Cancel
          </button>
        </form>
      </div>
    </motion.div>
  )
}

function DashboardView({ onBack }) {
  const [stats, setStats]     = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError]     = useState(null)

  useEffect(() => {
    fetchDashboardData()
      .then(setStats)
      .catch(err => setError(err.message))
      .finally(() => setLoading(false))
  }, [])

  const maxCheckIns = stats?.sortedEventTypes[0]?.[1]?.checkIns ?? 1

  const statCards = stats ? [
    { label: 'Unique Members',  value: stats.uniqueAttendeeCount, icon: <FiUser />,       bg: 'bg-blue-50',   text: 'text-blue-600' },
    { label: 'Sessions Held',   value: stats.totalSessions,       icon: <FiCalendar />,   bg: 'bg-indigo-50', text: 'text-indigo-600' },
    { label: 'Total Check-ins', value: stats.totalCheckIns,       icon: <FiTrendingUp />, bg: 'bg-green-50',  text: 'text-green-600' },
    { label: 'Avg. per Session',value: stats.avgAttendance,       icon: <FiAward />,      bg: 'bg-orange-50', text: 'text-orange-500' },
  ] : []

  return (
    <motion.div
      variants={fadeIn('up', 0.1)}
      initial="hidden"
      animate="show"
      exit={{ opacity: 0, y: -20 }}
      className="w-full max-w-3xl flex flex-col gap-6 pb-12"
    >
      <div className="flex items-center gap-3">
        <button onClick={onBack} className="text-gray-400 hover:text-gray-700 transition-colors p-1">
          <FiArrowLeft />
        </button>
        <div>
          <h1 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <FiBarChart2 className="text-blue-600" /> Attendance Dashboard
          </h1>
          <p className="text-sm text-gray-500">Aggregate stats across all recorded sessions</p>
        </div>
      </div>

      {loading && (
        <div className="flex justify-center py-16">
          <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
        </div>
      )}

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-sm text-red-700 flex items-center gap-2">
          <FiAlertCircle className="shrink-0" /> {error}
        </div>
      )}

      {stats && (
        <>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {statCards.map(({ label, value, icon, bg, text }, i) => (
              <motion.div
                key={label}
                variants={fadeIn('up', 0.08 * (i + 1))}
                initial="hidden"
                animate="show"
                className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 hover:shadow-md transition-shadow"
              >
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center mb-3 text-sm ${bg} ${text}`}>
                  {icon}
                </div>
                <p className="text-3xl font-bold text-gray-900">{value}</p>
                <p className="text-xs text-gray-400 mt-1">{label}</p>
              </motion.div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex flex-col gap-4">
              <h2 className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                <FiTrendingUp className="text-blue-500" /> Attendance by Event Type
              </h2>
              {stats.sortedEventTypes.length === 0 ? (
                <p className="text-sm text-gray-400">No data yet</p>
              ) : (
                <div className="flex flex-col gap-4">
                  {stats.sortedEventTypes.map(([type, { checkIns, sessions }]) => (
                    <div key={type}>
                      <div className="flex justify-between items-baseline mb-1.5">
                        <span className="text-xs font-medium text-gray-700">{type}</span>
                        <span className="text-xs text-gray-400">{checkIns} check-in{checkIns !== 1 ? 's' : ''} · {sessions} session{sessions !== 1 ? 's' : ''}</span>
                      </div>
                      <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${(checkIns / maxCheckIns) * 100}%` }}
                          transition={{ duration: 0.9, ease: 'easeOut', delay: 0.2 }}
                          className="h-full bg-blue-600 rounded-full"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="px-5 py-4 border-b border-gray-50 flex items-center gap-2">
                <FiAward className="text-orange-400 text-sm" />
                <h2 className="text-sm font-semibold text-gray-700">Top Attendees</h2>
              </div>
              {stats.topAttendees.length === 0 ? (
                <p className="text-sm text-gray-400 py-8 text-center">No data yet</p>
              ) : (
                <ul className="divide-y divide-gray-50">
                  {stats.topAttendees.map(({ member, count }, i) => (
                    <li key={member.id} className="px-5 py-3 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="text-xs text-gray-300 w-4 shrink-0">{i + 1}</span>
                        <div className="w-7 h-7 rounded-full bg-blue-50 flex items-center justify-center text-xs font-semibold text-blue-600 shrink-0">
                          {member.name.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-800">{member.name}</p>
                          <p className="text-xs text-gray-400">{member.net_id}</p>
                        </div>
                      </div>
                      <span className="text-xs font-semibold text-gray-500 bg-gray-100 px-2.5 py-0.5 rounded-full shrink-0">
                        {count} {count === 1 ? 'session' : 'sessions'}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="px-5 py-4 border-b border-gray-50 flex items-center gap-2">
              <FiCalendar className="text-indigo-400 text-sm" />
              <h2 className="text-sm font-semibold text-gray-700">Recent Sessions</h2>
            </div>
            {stats.recentSessions.length === 0 ? (
              <p className="text-sm text-gray-400 py-8 text-center">No sessions recorded yet</p>
            ) : (
              <ul className="divide-y divide-gray-50">
                {stats.recentSessions.map(s => (
                  <li key={s.id} className="px-5 py-3.5 flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-800">{s.event_type}</p>
                      <p className="text-xs text-gray-400 mt-0.5">
                        by {s.leadName} · {new Date(s.created_at).toLocaleDateString([], { month: 'short', day: 'numeric', year: 'numeric' })}
                      </p>
                    </div>
                    <span className="text-xs font-semibold text-gray-500 bg-gray-100 px-2.5 py-0.5 rounded-full shrink-0">
                      {s.count} {s.count === 1 ? 'person' : 'people'}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </>
      )}
    </motion.div>
  )
}
