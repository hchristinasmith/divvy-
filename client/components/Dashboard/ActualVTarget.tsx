import { TrendingUp, TrendingDown, Target } from 'lucide-react'
import { useState } from 'react'

interface Transaction {
  category: string
  amount: number
  date: string
  description: string
  account_name?: string
  institution_name?: string
}

interface ActualVTargetProps {
  transactions: Transaction[]
  targets: Record<string, number>
}

function ActualVTarget({ transactions = [], targets }: ActualVTargetProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Calculate actual spending per category
  const actuals = transactions.reduce<Record<string, number>>((acc, t) => {
    acc[t.category] = (acc[t.category] || 0) + t.amount
    return acc
  }, {})
  
  // Get transactions for selected category
  const categoryTransactions = selectedCategory 
    ? transactions.filter(t => t.category === selectedCategory)
    : [];

  return (
    <div className="p-4 rounded-xl bg-white/5 font-medium px-5 py-5 shadow-white max-w-3xl mx-auto">
      <div className='flex items-center gap-2 bg-[var(--card)] font-semibold rounded-full shadow-white px-3 py-2 text-primary mb-6'>
        <Target size={18} />
        <span>Target vs Actual Spending</span>
      </div>
      <div className="grid gap-4">
        {Object.entries(targets).map(([category, target]) => {
          const actual = actuals[category] || 0
          const actualPct = Math.min((actual / target) * 100, 150) // allow overflow up to 150%
          const targetPct = 100 // target marker at 100%
          const isOver = actual > target

          // Trend icon
          const TrendIcon = isOver ? TrendingUp : TrendingDown
          const trendColor = isOver ? 'text-red-500' : 'text-green-500'

          // Status badge
          const statusBg = isOver ? 'bg-red-100' : 'bg-green-100'
          const statusText = isOver ? 'text-red-800' : 'text-green-800'

          const isSelected = selectedCategory === category;

          return (
            <div key={category} className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <span className="font-semibold">{category}</span>
                  <span className="text-sm opacity-70">
                    ${actual.toFixed(2)} / ${target.toFixed(2)}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span
                    className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${statusBg} ${statusText} shadow-white`}
                  >
                    <TrendIcon size={12} className="mr-1" />
                    {isOver ? 'Over' : 'Under'} by ${Math.abs(actual - target).toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Progress bar */}
              <div className="relative h-3 bg-white/10 rounded-full overflow-hidden shadow-white">
                {/* Actual bar */}
                <div
                  className={`absolute top-0 left-0 h-full ${isOver ? 'bg-red-500' : 'bg-green-500'} transition-all duration-500`}
                  style={{ width: `${actualPct}%` }}
                ></div>
                {/* Target marker */}
                <div
                  className="absolute top-0 h-full border-l-2 border-white/80"
                  style={{ left: `${targetPct}%` }}
                ></div>
              </div>

              {/* Category transactions if selected */}
              {selectedCategory === category && (
                <div className="mt-4 p-4 bg-white/5 rounded-xl max-h-60 overflow-y-auto shadow-white">
                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-white/70"></div>
                    Recent Transactions
                  </h4>
                  {categoryTransactions.length > 0 ? (
                    <div className="space-y-3">
                      {categoryTransactions.map((tx, i) => (
                        <div key={i} className="flex justify-between items-center p-3 bg-white/10 rounded-lg hover:bg-white/20 transition-colors duration-200 cursor-pointer">
                          <div>
                            <div className="font-medium">{tx.description}</div>
                            <div className="text-xs opacity-70 mt-1">{new Date(tx.date).toLocaleDateString()}</div>
                          </div>
                          <div className="font-semibold">${Math.abs(tx.amount).toFixed(2)}</div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-3 opacity-70">No transactions found</div>
                  )}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default ActualVTarget
