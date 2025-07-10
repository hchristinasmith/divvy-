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
    <div className="bg-[var(--card)] rounded-full px-4 py-2 shadow-white inline-flex">
      <nav className="flex items-center space-x-2 text-sm font-medium">
        {periods.map(({ label, value }, index) => (
          <span key={value} className="flex items-center">
            <button
              onClick={(e) => {
                e.preventDefault()
                onSelect(value)
              }}
              className={`px-3 py-1 rounded-full transition-colors duration-200 ${
                selectedDays === value
                  ? 'bg-[var(--primary)] text-white font-semibold shadow-white'
                  : 'text-primary opacity-70 hover:opacity-100 hover:bg-white/10'
              }`}
            >
              {label}
            </button>
            {/* Add separator except after last item */}
            {index < periods.length - 1 && (
              <span className="mx-1 text-primary opacity-30 select-none">•</span>
            )}
          </span>
        ))}
      </nav>
    </div>
  )
}
