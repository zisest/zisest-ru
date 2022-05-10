import Link from 'next/link'
import { PropsWithChildren } from 'react'
import c from 'clsx'

interface Props {
  href: string
  primary?: boolean
}

function NavLink ({ href, children, primary }: PropsWithChildren<Props>) {
  const classNames = c(
    'px-3 py-2 rounded hover:underline whitespace-nowrap underline-offset-1',
    primary ? 'text-cornflower-500' : 'text-cornflower-100'
  )

  return (
    <Link href={href}>
      <a className={classNames}>{children}</a>
    </Link>
  )
}

export default NavLink
