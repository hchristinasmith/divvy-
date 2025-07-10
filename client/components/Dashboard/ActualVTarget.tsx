import { TrendingUp, TrendingDown } from 'lucide-react'

interface Transaction {
  category: string
  amount: number
}

interface ActualVTargetProps {
  transactions: Transaction[]
  targets: Record<string, number>
}

function ActualVTarget({ transactions = [], targets }: ActualVTargetProps) {
  // Calculate actual spending per category
  const actuals = transactions.reduce<Record<string, number>>((acc, t) => {
    acc[t.category] = (acc[t.category] || 0) + t.amount
    return acc
  }, {})

  return (
    <div className="p-4 bg-stone-50 rounded-lg shadow-white max-w-3xl mx-auto">
      <h2 className="text-2xl font-semibold mb-6 text-stone-800">
        Target vs Actual Spending
      </h2>
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

          return (
            <div
              key={category}
              className="group p-3 rounded-md bg-stone-100 hover:bg-stone-200 transition-colors"
            >
              <div className="flex justify-between items-center mb-1">
                <span className="font-medium text-stone-900">{category}</span>
                <div className="flex items-center space-x-4">
                  <span className="text-stone-700">
                    ${actual.toFixed(2)} ({actualPct.toFixed(0)}%)
                  </span>
                  <span className="text-stone-500">Target: {targetPct}%</span>
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
          )
        })}
      </div>
    </div>
  )
}

export default ActualVTarget
