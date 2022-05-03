import { useEffect, useState } from 'react'

interface WindowSizeInfo {
  innerWidth: number | null
  innerHeight: number | null
  screenLeft: number | null
  screenTop: number | null
}

const initialState = {
  innerWidth: null,
  innerHeight: null,
  screenLeft: null,
  screenTop: null,
}

export function useWindowResize () {
  const [windowSize, setWindowSize] = useState<WindowSizeInfo>(initialState)

  useEffect(() => {
    function handleResize () {
      const { innerWidth, innerHeight, screenLeft, screenTop } = window
      setWindowSize({ innerWidth, innerHeight, screenLeft, screenTop })
      console.log('useWindowResize, windowsize', { innerWidth })
    }
    handleResize()

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return windowSize
}
