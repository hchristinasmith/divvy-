import { Target } from '../../../models/targets'
import { PencilIcon, TrashIcon } from 'lucide-react'

interface TargetCardProps {
  target: Target & {
    spent: number
    status: 'Over Target' | 'Watch' | 'Close' | 'On Track'
  }
  formatCurrency: (amount: number) => string
  onEdit?: (target: Target & { spent: number; status: string }) => void
  showEditIcon?: boolean
  onDelete?: () => void
}

export function TargetsCard({ target, formatCurrency, onEdit, showEditIcon = false, onDelete }: TargetCardProps) {
  const usagePct = Math.min((target.spent / target.target_amount) * 100, 150)
  const isOver = target.spent > target.target_amount
  const leftOrOverAmount = Math.abs(target.target_amount - target.spent)

  // Status colors based on status text
  const statusColors = {
    'Over Target': 'bg-red-500/20 text-red-500',
    'Watch': 'bg-yellow-500/20 text-yellow-500',
    'Close': 'bg-blue-500/20 text-blue-500',
    'On Track': 'bg-green-500/20 text-green-500',
  }
  
  const statusClass = statusColors[target.status] ?? 'bg-gray-100 text-gray-700'

  return (
    <div className="rounded-xl border border-[color:var(--border)] bg-[var(--card)] p-4 shadow-white hover:shadow-lg transition-all duration-200">
      <div className="mb-2">
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-semibold">
            {target.category}
          </h3>
          <div className="flex items-center gap-2">
            <span
              className={`inline-block px-3 py-1 rounded-full text-sm font-semibold uppercase tracking-wide ${statusClass} shadow-white`}
            >
              {target.status}
            </span>
            {showEditIcon && (
              <div className="flex items-center gap-1">
                <button 
                  onClick={() => onEdit && onEdit(target)}
                  className="p-1 rounded-full hover:bg-muted transition-colors"
                  aria-label="Edit target"
                >
                  <PencilIcon size={16} className="text-muted-foreground hover:text-foreground" />
                </button>
                {onDelete && (
                  <button 
                    onClick={onDelete}
                    className="p-1 rounded-full hover:bg-red-100 transition-colors"
                    aria-label="Delete target"
                  >
                    <TrashIcon size={16} className="text-muted-foreground hover:text-red-600" />
                  </button>
                )}
              </div>
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

      <div className="relative h-6 bg-white/10 rounded-lg overflow-hidden mb-2 shadow-inner">
        <div
          className={`absolute top-0 left-0 h-6 rounded-lg bg-[color:var(--primary)] transition-all duration-500 ease-in-out shadow-white`}
          style={{ width: `${usagePct}%` }}
        />
        <span className="absolute right-2 top-1 text-white font-semibold text-sm select-none drop-shadow-md">
          {usagePct.toFixed(0)}% Used
        </span>
      </div>

      <div
        className={`font-semibold ${isOver ? 'text-red-500' : 'text-green-500'} px-3 py-1 rounded-lg bg-white/5 inline-block shadow-white`}
      >
        {isOver
          ? `${formatCurrency(leftOrOverAmount)} over`
          : `${formatCurrency(leftOrOverAmount)} left`}
      </div>
    </div>
  )
}
