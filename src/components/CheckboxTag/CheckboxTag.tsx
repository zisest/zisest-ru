import c from 'clsx'
import { PropsWithChildren } from 'react'

interface Props {
  checked: boolean
  onChange: (newValue: boolean) => void
  color: 'brown' | 'yellow' | 'green' | 'blue'
}

function CheckboxTag ({ checked, children, onChange, color }: PropsWithChildren<Props>) {
  const colorClass = {
    brown: 'bg-orange-600',
    yellow: 'bg-yellow-600',
    green: 'bg-emerald-600',
    blue: 'bg-cornflower-600',
  }[color]

  return (
    <label className="flex">
      <input
        type="checkbox"
        className="sr-only peer"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
      />
      <span
        className={c(
          checked ? 'saturate-[.6]' : 'saturate-[.1]',
          !checked && 'brightness-[.4]',
          'font-mono peer-focus-visible:ring-cornflower-200 peer-focus-visible:ring-1 ring-offset-2',
          'rounded',
          'px-2 py-1',
          'text-black',
          colorClass
        )}
      >
        {children}
      </span>
    </label>
  )
}

export default CheckboxTag
