import Link from 'next/link'
import c from 'clsx'

interface Props {
  href: string
  primary?: boolean
  children: string
}

function CustomLink ({ href, primary, children }: Props) {
  return (
    <Link href={href}>
      <a
        className={c(
          'underline-offset-1',
          primary ? 'hover:underline text-cornflower-500' : 'underline hover:text-cornflower-500'
        )}
      >
        {children}
      </a>
    </Link>
  )
}

export default CustomLink
