const periods = [
  { label: '1W', value: 7 },
  { label: '2W', value: 14 },
  { label: '1M', value: 30 },
  { label: '3M', value: 90 },
  { label: '6M', value: 180 },
  { label: '1Y', value: 365 },
  { label: '5Y', value: 1825 },
]

interface TimeFilterProps {
  selectedDays: number
  onSelect: (days: number) => void
}

export default function TimeFilter({
  selectedDays,
  onSelect,
}: TimeFilterProps) {
  return (
    <nav className="flex items-center space-x-2 text-sm font-medium text-gray-700">
      {periods.map(({ label, value }, index) => (
        <span key={value} className="flex items-center">
          <button
            onClick={(e) => {
              e.preventDefault()
              onSelect(value)
            }}
            className={`cursor-pointer ${
              selectedDays === value
                ? 'text-gray-900 font-bold'
                : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            {label}
          </button>
          {/* Add separator except after last item */}
          {index < periods.length - 1 && (
            <span className="mx-2 text-gray-400 select-none">|</span>
          )}
        </span>
      ))}
    </nav>
  )
}
