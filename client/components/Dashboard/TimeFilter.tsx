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
    <div className="backdrop-blur-sm rounded-full px-4 py-2 shadow inline-flex">
      <nav className="flex items-center space-x-2 text-sm font-medium">
        {periods.map(({ label, value }, index) => (
          <span key={value} className="flex items-center">
            <button
              onClick={(e) => {
                e.preventDefault()
                onSelect(value)
              }}
              className={`px-2 py-1 rounded-full transition-all duration-300 ${
                selectedDays === value
                  ? 'bg-primary text-white font-bold shadow-sm'
                  : 'text-white/70 hover:text-white hover:bg-white/10'
              }`}
            >
              {label}
            </button>
            {/* Add separator except after last item */}
            {index < periods.length - 1 && (
              <span className="mx-1 text-white/30 select-none">•</span>
            )}
          </span>
        ))}
      </nav>
    </div>
  )
}
