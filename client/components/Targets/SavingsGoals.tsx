import { SavingsGoal } from './mockSavingsGoals'
import { PencilIcon } from 'lucide-react'

interface SavingsGoalCardProps {
  goal: SavingsGoal
  formatCurrency: (amount: number) => string
  onEdit?: (goal: SavingsGoal) => void
  showEditIcon?: boolean
}

export function SavingsGoalCard({ goal, formatCurrency, onEdit, showEditIcon = false }: SavingsGoalCardProps) {
  // Calculate completion percentage
  const completionPct = Math.round((goal.current_amount / goal.target_amount) * 100)
  
  return (
    <div className="rounded-lg border border-[color:var(--border)] bg-card p-4 shadow-sm hover:shadow-md transition">
      <div className="mb-2">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-xl font-semibold">{goal.name}</h3>
            <p className="text-muted-foreground">{goal.category}</p>
          </div>
          {showEditIcon && (
            <button 
              onClick={() => onEdit && onEdit(goal)}
              className="p-1 rounded-full hover:bg-muted transition-colors"
              aria-label="Edit savings goal"
            >
              <PencilIcon size={16} className="text-muted-foreground hover:text-foreground" />
            </button>
          )}
        </div>
      </div>

      <div className="mb-3">
        <span className="text-lg">
          {formatCurrency(goal.current_amount)} of {formatCurrency(goal.target_amount)}
        </span>
        <div className="text-muted-foreground">{goal.target_date}</div>
      </div>

      <div className="relative h-2 bg-muted rounded-full overflow-hidden mb-2">
        <div
          className="absolute top-0 left-0 h-2 rounded-full bg-[color:var(--primary)]" 
          style={{ width: `${completionPct}%` }}
        />
      </div>

      <div className="flex justify-between items-center">
        <span className="text-xl font-semibold">{completionPct}%</span>
        <span className="text-muted-foreground">Complete</span>
      </div>
    </div>
  )
}

interface SavingsGoalsProps {
  goals: SavingsGoal[]
  formatCurrency: (amount: number) => string
  onEdit?: (goal: SavingsGoal) => void
  showEditIcon?: boolean
}

export function SavingsGoals({ goals, formatCurrency, onEdit, showEditIcon = false }: SavingsGoalsProps) {
  return (
    <div className="space-y-4">
      {goals.map((goal) => (
        <SavingsGoalCard 
          key={goal.id} 
          goal={goal} 
          formatCurrency={formatCurrency}
          onEdit={onEdit}
          showEditIcon={showEditIcon}
        />
      ))}
    </div>
  )
}
