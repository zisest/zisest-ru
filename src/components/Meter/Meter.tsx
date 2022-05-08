import c from 'clsx'

interface Props {
  value: number
  label: string
  minValue?: number
  maxValue?: number
  colorScheme: 'brown-green' | 'yellow-blue'
}

function Meter ({ value, label, minValue, maxValue, colorScheme }: Props) {
  minValue ??= 0
  maxValue ??= 1

  const colorValue = value < 0.2 ? 0 : value < 0.5 ? 1 : value < 0.8 ? 2 : 3

  const colorClass = {
    'brown-green': ['bg-orange-900', 'bg-orange-800', 'bg-lime-800', 'bg-emerald-600'],
    'yellow-blue': ['bg-yellow-900', 'bg-yellow-800', 'bg-green-800', 'bg-cornflower-600'],
  }[colorScheme][colorValue]

  return (
    <div className="capitalize font-mono flex gap-2 items-center justify-between">
      {label}:
      <div
        role="meter"
        aria-valuemax={maxValue}
        aria-valuemin={minValue}
        aria-valuenow={value}
        aria-label={label}
        className="w-24 h-2.5 bg-zinc-800 rounded-xl overflow-hidden"
      >
        <div style={{ width: value * 100 + '%' }} className={c('h-full', colorClass)}></div>
      </div>
    </div>
  )
}

export default Meter
