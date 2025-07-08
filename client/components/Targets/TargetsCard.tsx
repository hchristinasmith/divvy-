import { Target } from '../../../models/targets'
import { PencilIcon } from 'lucide-react'

interface TargetCardProps {
  target: Target & {
    spent: number
    status: 'Over Target' | 'Watch' | 'Close' | 'On Track'
  }
  formatCurrency: (amount: number) => string
  onEdit?: (target: Target & { spent: number; status: string }) => void
  showEditIcon?: boolean
}

export function TargetsCard({ target, formatCurrency, onEdit, showEditIcon = false }: TargetCardProps) {
  const usagePct = Math.min((target.spent / target.target_amount) * 100, 150)
  const isOver = target.spent > target.target_amount
  const leftOrOverAmount = Math.abs(target.target_amount - target.spent)

  // Status colors based on status text
  const statusColors = {
    'Over Target': 'bg-red-100 text-red-700',
    'Watch': 'bg-yellow-100 text-yellow-700',
    'Close': 'bg-blue-100 text-blue-700',
    'On Track': 'bg-green-100 text-green-700',
  }
  
  const statusClass = statusColors[target.status] ?? 'bg-gray-100 text-gray-700'

  return (
    <div className="rounded-lg border border-[color:var(--border)] bg-card p-4 shadow-sm hover:shadow-md transition">
      <div className="mb-2">
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-semibold">
            {target.category}
          </h3>
          <div className="flex items-center gap-2">
            <span
              className={`inline-block px-3 py-1 rounded-full text-sm font-semibold uppercase tracking-wide ${statusClass}`}
            >
              {target.status}
            </span>
            {showEditIcon && (
              <button 
                onClick={() => onEdit && onEdit(target)}
                className="p-1 rounded-full hover:bg-muted transition-colors"
                aria-label="Edit target"
              >
                <PencilIcon size={16} className="text-muted-foreground hover:text-foreground" />
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="flex justify-between text-muted-foreground font-medium mb-2">
        <span>
          {formatCurrency(target.spent)} of{' '}
          {formatCurrency(target.target_amount)}
        </span>
        <span className="italic">{target.period}</span>
      </div>

      <div className="relative h-6 bg-muted rounded overflow-hidden mb-2">
        <div
          className={`absolute top-0 left-0 h-6 rounded bg-[color:var(--primary)] transition-all duration-500 ease-in-out`}
          style={{ width: `${usagePct}%` }}
        />
        <span className="absolute right-2 top-1 text-[color:var(--primary-foreground)] font-semibold text-sm select-none">
          {usagePct.toFixed(0)}% Used
        </span>
      </div>

      <div
        className={`font-semibold ${isOver ? 'text-red-600' : 'text-green-600'}`}
      >
        {isOver
          ? `${formatCurrency(leftOrOverAmount)} over`
          : `${formatCurrency(leftOrOverAmount)} left`}
      </div>
    </div>
  )
}
