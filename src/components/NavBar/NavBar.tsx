import { useScrollDirection } from '../../hooks/use-scroll-direction.hook'
import Icon from '../Icon'
import c from 'clsx'
import { useEffect, useReducer, useState } from 'react'
import NavLink from './NavLink'

function NavBar ({}) {
  const scrollDirection = useScrollDirection()
  const [headerHidden, sethHeaderHidden] = useState(true) // For mobile header only

  useEffect(() => {
    if (scrollDirection === 'up') sethHeaderHidden(true)
  }, [scrollDirection])

  const shadowStyle = '' // 'shadow-sm shadow-cornflower-400/20'

  return (
    <header
      className={c(
        'fixed top-2 h-12 w-full flex flex-row-reverse items-center p-3 gap-3 z-10 transition duration-100',
        scrollDirection === 'down' && '-translate-y-14'
      )}
    >
      <button
        aria-label="Expand menu"
        className={c(
          'flex sm:hidden h-12 w-12 bg-black bg-opacity-80 backdrop-blur',
          'items-center justify-center',
          shadowStyle
        )}
        onClick={() => sethHeaderHidden((prev) => !prev)}
      >
        <Icon type="menu" />
      </button>
      <div
        className={c(
          headerHidden ? '-translate-y-14' : 'translate-y-0',
          'flex transition duration-100 sm:translate-y-0 xs:gap-2 sm:gap-6 items-center h-12 px-2',
          'bg-black bg-opacity-80 backdrop-blur',
          shadowStyle
        )}
      >
        <NavLink href="#about">About</NavLink>
        <NavLink href="#projects">Projects</NavLink>
        <NavLink href="#contact_me" primary>
          Contact me
        </NavLink>
      </div>
    </header>
  )
}

export default NavBar
