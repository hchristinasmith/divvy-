interface Target {
  id: number
  category: string
  period: string
  spent: number
  budget: number
  status: 'Over Target' | 'Watch' | 'Close' | 'On Track'
}

interface TargetsOverviewProps {
  targets: Target[]
  onAddNewTarget: () => void
}

export default function TargetsOverview({
  targets,
  onAddNewTarget,
}: TargetsOverviewProps) {
  const activeTargets = targets.length
  const onTrackCount = targets.filter(
    (t) => t.status === 'On Track' || t.status === 'Close',
  ).length
  const overTargetCount = targets.filter(
    (t) => t.status === 'Over Target',
  ).length
  const totalBudget = targets.reduce((acc, t) => acc + t.budget, 0)
  const totalSpent = targets.reduce((acc, t) => acc + t.spent, 0)
  const remaining = totalBudget - totalSpent
  const overallUsage = Math.min((totalSpent / totalBudget) * 100, 150).toFixed(
    0,
  )

  function formatCurrency(amount: number) {
    return `$${amount.toLocaleString()}`
  }

  return (
    <div className="max-w-3xl mx-auto p-6 font-sans text-stone-800">
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Financial Targets</h1>
        <button
          className="px-4 py-2 bg-pink-600 text-white rounded-md shadow hover:bg-pink-700 transition"
          onClick={onAddNewTarget}
        >
          New Target
        </button>
      </header>

      <section className="grid grid-cols-3 gap-6 mb-8 text-center text-lg font-semibold text-stone-900">
        <div>
          <span className="block text-2xl">{activeTargets}</span> Active Targets
        </div>
        <div>
          <span className="block text-2xl">{onTrackCount}</span> On Track
        </div>
        <div>
          <span className="block text-2xl">{overTargetCount}</span> Over Target
        </div>
        <div>
          <span className="block text-2xl col-span-1">{overallUsage}%</span>{' '}
          Overall Usage
        </div>
        <div>Total Budgeted: {formatCurrency(totalBudget)}</div>
        <div>Total Spent: {formatCurrency(totalSpent)}</div>
        <div>Remaining: {formatCurrency(remaining)}</div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4 border-b border-stone-300 pb-2">
          Spending Targets - Monthly
        </h2>

        {targets.map((target) => {
          const usagePct = Math.min((target.spent / target.budget) * 100, 150)
          const isOver = target.spent > target.budget
          const leftOrOverAmount = Math.abs(target.budget - target.spent)

          // Status colors based on status text
          const statusColors = {
            'Over Target': 'bg-red-100 text-red-700',
            Watch: 'bg-yellow-100 text-yellow-700',
            Close: 'bg-blue-100 text-blue-700',
            'On Track': 'bg-green-100 text-green-700',
          }
          const statusClass =
            statusColors[target.status] ?? 'bg-gray-100 text-gray-700'

          return (
            <div
              key={target.id}
              className="mb-6 rounded-lg border border-stone-300 bg-stone-50 p-4 shadow-sm hover:shadow-md transition"
            >
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-xl font-semibold text-stone-900">
                  {target.category}
                </h3>
                <span
                  className={`inline-block px-3 py-1 rounded-full text-sm font-semibold uppercase tracking-wide ${statusClass}`}
                >
                  {target.status}
                </span>
              </div>

              <div className="flex justify-between text-stone-700 font-medium mb-2">
                <span>
                  {formatCurrency(target.spent)} of{' '}
                  {formatCurrency(target.budget)}
                </span>
                <span className="italic">{target.period}</span>
              </div>

              <div className="relative h-6 bg-stone-300 rounded overflow-hidden mb-2">
                <div
                  className={`absolute top-0 left-0 h-6 rounded bg-pink-600 transition-all duration-500 ease-in-out`}
                  style={{ width: `${usagePct}%` }}
                />
                <span className="absolute right-2 top-1 text-white font-semibold text-sm select-none">
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
        })}
      </section>
    </div>
  )
}
