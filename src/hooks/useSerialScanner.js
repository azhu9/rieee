import { useState, useCallback, useRef, useEffect } from 'react'

export function useSerialScanner(onScan) {
  const [connected, setConnected] = useState(false)
  const [error, setError] = useState(null)
  const supported = 'serial' in navigator
  const readerRef = useRef(null)
  const portRef = useRef(null)
  const onScanRef = useRef(onScan)

  useEffect(() => { onScanRef.current = onScan }, [onScan])

  const connect = useCallback(async () => {
    if (!supported) return
    try {
      const port = await navigator.serial.requestPort()
      await port.open({ baudRate: 9600 })
      portRef.current = port
      setConnected(true)
      setError(null)

      // Fire-and-forget read loop so connect() resolves immediately after port opens
      ;(async () => {
        const reader = port.readable.getReader()
        readerRef.current = reader
        const decoder = new TextDecoder()
        let buffer = ''
        try {
          while (true) {
            const { value, done } = await reader.read()
            if (done) break
            buffer += decoder.decode(value, { stream: true })
            const lines = buffer.split('\n')
            buffer = lines.pop() ?? ''
            for (const line of lines) {
              const uid = line.trim().replace(/\r/g, '')
              if (uid) onScanRef.current(uid.toUpperCase())
            }
          }
        } finally {
          reader.releaseLock()
          setConnected(false)
        }
      })()
    } catch (err) {
      if (err.name !== 'AbortError') setError(err.message)
      setConnected(false)
    }
  }, [supported])

  const disconnect = useCallback(async () => {
    try {
      if (readerRef.current) {
        await readerRef.current.cancel()
        readerRef.current = null
      }
      if (portRef.current) {
        await portRef.current.close()
        portRef.current = null
      }
    } catch (_) {}
    setConnected(false)
  }, [])

  return { connected, error, supported, connect, disconnect }
}
