import { useState, useCallback, useRef, useEffect } from 'react'

export function useNfcScanner(onScan) {
  const [active, setActive] = useState(false)
  const [error, setError] = useState(null)
  const supported = typeof window !== 'undefined' && 'NDEFReader' in window
  const onScanRef = useRef(onScan)

  useEffect(() => { onScanRef.current = onScan }, [onScan])

  const start = useCallback(async () => {
    if (!supported) return
    try {
      const ndef = new NDEFReader()
      await ndef.scan()
      ndef.addEventListener('reading', ({ serialNumber }) => {
        const uid = serialNumber.toUpperCase().replace(/-/g, ':')
        onScanRef.current(uid)
      })
      ndef.addEventListener('readingerror', () => {
        setError('Failed to read card — try again')
      })
      setActive(true)
      setError(null)
    } catch (err) {
      setError(err.message)
    }
  }, [supported])

  return { active, error, supported, start }
}
