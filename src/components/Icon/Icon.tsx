import c from 'clsx'

import LinkedInIcon from '../../assets/icon-linked-in.svg'
import GithubIcon from '../../assets/icon-github.svg'
import TelegramIcon from '../../assets/icon-telegram.svg'
import MenuIcon from '../../assets/icon-menu.svg'
import MailIcon from '../../assets/icon-mail.svg'
import LinkIcon from '../../assets/icon-link.svg'

interface Props {
  type: 'link' | 'github' | 'telegram' | 'linked-in' | 'menu' | 'mail'
  alt?: string
}

function Icon ({ type, alt }: Props) {
  const icon = {
    link: <LinkIcon aria-label={alt || type} />,
    github: <GithubIcon aria-label={alt || type} />,
    telegram: <TelegramIcon aria-label={alt || type} />,
    'linked-in': <LinkedInIcon aria-label={alt || type} />,
    menu: <MenuIcon aria-label={alt || type} />,
    mail: <MailIcon aria-label={alt || type} />,
  }[type]

  return (
    <div
      className={c(
        'w-10 h-10 text-zinc-500 hover:text-cornflower-500 duration-300 transition hover:-translate-y-0.5'
      )}
    >
      {icon}
    </div>
  )
}

export default Icon
