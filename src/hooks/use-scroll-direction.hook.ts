import { useEffect, useRef, useState } from 'react'

export function useScrollDirection () {
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down' | null>(null)

  const prevScrollY = useRef(0)

  useEffect(() => {
    function handleScroll () {
      setScrollDirection(window.scrollY - prevScrollY.current > 0 ? 'down' : 'up')
      prevScrollY.current = window.scrollY
    }

    document.addEventListener('scroll', handleScroll)

    return () => {
      document.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return scrollDirection
}
