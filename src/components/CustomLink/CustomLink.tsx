import Link from 'next/link'
import c from 'clsx'

interface Props {
  href: string
  primary?: boolean
  children: string
  newTab?: boolean
}

function CustomLink ({ href, primary, children, newTab }: Props) {
  const attributes: { target: string; rel?: string } = {
    target: newTab ? '_blank' : '_self',
  }
  if (newTab) attributes.rel = 'noreferrer'

  return (
    <Link href={href}>
      <a
        {...attributes}
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
