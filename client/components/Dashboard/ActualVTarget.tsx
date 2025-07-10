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
    <div className="p-4 rounded-xl  bg-[var(--primary)] font-semibold rounded rounded-full shadow-sm px-5 py-5 shadow-white max-w-3xl mx-auto">
    <div className='flex items-center gap-2 bg-[var(--card)] font-semibold rounded rounded-full shadow-sm px-3 py-2 text-primary mb-4'>
      <Target size={25} className="inline-block" />
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
          const statusTextColor = isOver ? 'text-red-700' : 'text-green-700'

          const isSelected = selectedCategory === category;

          return (
            <div key={category}>
              <div
                onClick={() => setSelectedCategory(isSelected ? null : category)}
                className={`group p-3 rounded-md ${isSelected ? 'bg-[var(--foreground)] text-white' : 'bg-[var(--card)]'} hover:bg-[var(--foreground)] hover:text-white transition-colors cursor-pointer`}
              >
                <div className="flex justify-between items-center mb-1">
                  <span className={`font-medium ${isSelected ? 'text-white' : 'text-primary'}`}>{category}</span>
                  <div className="flex items-center space-x-4">
                    <span className={isSelected ? 'text-white' : 'text-primary'}>
                      ${actual.toFixed(2)} ({actualPct.toFixed(0)}%)
                    </span>
                    <span className={isSelected ? 'text-white' : 'text-primary'}>Target: {targetPct}%</span>
                    <TrendIcon className={`w-5 h-5 ${trendColor}`} />
                    <span
                      className={`px-2 py-0.5 rounded text-sm font-semibold ${statusBg} ${statusTextColor}`}
                    ></span>
                  </div>
                </div>

                {/* Progress bar container */}
                <div className="relative h-6 bg-stone-300 rounded overflow-hidden">
                  {/* Actual spending bar */}
                  <div
                    className={`absolute top-0 left-0 h-6 bg-stone-700 transition-all duration-500 ease-in-out`}
                    style={{ width: `${actualPct}%` }}
                  ></div>

                  {/* Target marker line */}
                  <div
                    className="absolute top-0 bottom-0 border-l-2 border-stone-400"
                    style={{ left: `${targetPct}%` }}
                  ></div>
                </div>
              </div>
              
              {/* Transactions list for selected category */}
              {isSelected && categoryTransactions.length > 0 && (
                <div className="mt-2 mb-4 ml-4 p-3 bg-[var(--card)] rounded-md max-h-60 overflow-y-auto">
                  <h4 className="font-medium mb-2 text-primary">Recent Transactions</h4>
                  <div className="space-y-2">
                    {categoryTransactions.map((tx, i) => (
                      <div key={i} className="flex justify-between items-center p-2 hover:bg-white/10 rounded">
                        <div>
                          <div className="font-medium">{tx.description}</div>
                          <div className="text-xs opacity-70">
                            {new Date(tx.date).toLocaleDateString()} • {tx.account_name || 'Unknown Account'}
                          </div>
                        </div>
                        <div className="font-semibold">${tx.amount.toFixed(2)}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {isSelected && categoryTransactions.length === 0 && (
                <div className="mt-2 mb-4 p-3 bg-[var(--card)] rounded-md">
                  <p className="text-center text-primary opacity-70">No transactions found for this category</p>
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
