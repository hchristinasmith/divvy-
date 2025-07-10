import { useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { ChartPie, X, ArrowLeft } from 'lucide-react'
import type { Transaction } from 'models/transactions.ts'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Button } from '@/components/ui/button'
import { format } from 'date-fns'
import { CalendarHeart } from 'lucide-react'
interface SpendingBreakdownProps {
  transactions: Transaction[]
}

type CategorySummary = {
  name: string
  amount: number
  color: string
  percentage: number
  transactions: Transaction[]
}

function generateColor(index: number) {
  const colors = [
    '#C7D2FE', // Indigo-200 (softer version of #6366F1)
    '#A7F3D0', // Emerald-200
    '#FDE68A', // Amber-200
    '#FCA5A5', // Red-200
    '#BFDBFE', // Blue-200
    '#DDD6FE', // Violet-200
    '#A5F3FC', // Cyan-200
    '#FDBA74', // Orange-200
  ];
  return colors[index % colors.length]
}

function SpendingBreakdown({ transactions = [] }: SpendingBreakdownProps) {
  const expenseTransactions = transactions.filter((tx) => tx.amount < 0)
  const [selectedCategory, setSelectedCategory] = useState<CategorySummary | null>(null)

  // Group transactions by category
  const categoryTransactionsMap: Record<string, Transaction[]> = {}
  expenseTransactions.forEach((tx) => {
    const name =
      tx.category_name ||
      tx.category_group_name ||
      tx.category_group_id ||
      tx.category_id ||
      'Uncategorized'

    if (!categoryTransactionsMap[name]) {
      categoryTransactionsMap[name] = []
    }
    categoryTransactionsMap[name].push(tx)
  })

  // Calculate totals for each category
  const categoryTotalsMap: Record<string, number> = {}
  Object.entries(categoryTransactionsMap).forEach(([name, txs]) => {
    categoryTotalsMap[name] = txs.reduce((sum, tx) => sum + Math.abs(tx.amount), 0)
  })

  const totalExpenses = Object.values(categoryTotalsMap).reduce(
    (a, b) => a + b,
    0,
  )

  const categories: CategorySummary[] = Object.entries(categoryTransactionsMap).map(
    ([name, categoryTransactions], i) => ({
      name,
      amount: categoryTotalsMap[name],
      percentage: totalExpenses ? (categoryTotalsMap[name] / totalExpenses) * 100 : 0,
      color: generateColor(i),
      transactions: categoryTransactions,
    }),
  ).sort((a, b) => b.amount - a.amount) // Sort by amount descending

  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [showTooltip, setShowTooltip] = useState(false)
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 })
  const [tooltipContent, setTooltipContent] = useState<CategorySummary | null>(null)

  return (
    <Card className="shadow-white">
      <CardHeader>
        <CardTitle className="text-xl font-semibold flex items-center gap-2">
          {selectedCategory ? (
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center gap-2">
                <div 
                  className="w-4 h-4 rounded-full" 
                  style={{ backgroundColor: selectedCategory.color }}
                ></div>
                <span>{selectedCategory.name}</span>
                <span className="text-sm font-normal ml-2">
                  ${selectedCategory.amount.toFixed(2)} ({selectedCategory.percentage.toFixed(1)}%)
                </span>
              </div>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setSelectedCategory(null)}
                className="ml-auto"
              >
                <ArrowLeft size={16} className="mr-1" />
                Back
              </Button>
            </div>
          ) : (
            <>
              <ChartPie size={20} />
              Spending Breakdown
            </>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        {!selectedCategory ? (
          <div className="summary-container max-w-4xl mx-auto">
            {/* Spending Breakdown */}
            <div className="breakdown-card shadow-white">
              <div className="relative h-16 flex rounded-lg overflow-hidden cursor-pointer select-none">
                {categories.map((cat, i) => (
                  <div
                    key={cat.name}
                    style={{
                      width: `${cat.percentage}%`,
                      backgroundColor: cat.color,
                    }}
                    className="transition-all duration-300 hover:opacity-80 relative group"
                    onClick={() => setSelectedCategory(cat)}
                    onMouseEnter={(e) => {
                      setHoveredIndex(i)
                      setTooltipContent(cat)
                      setShowTooltip(true)
                      
                      // Calculate position based on mouse position
                      setTooltipPosition({
                        x: e.clientX,
                        y: e.clientY
                      })
                    }}
                    onMouseMove={(e) => {
                      // Update position on mouse move for better UX
                      setTooltipPosition({
                        x: e.clientX,
                        y: e.clientY
                      })
                    }}
                    onMouseLeave={() => {
                      setHoveredIndex(null)
                      setShowTooltip(false)
                      setTooltipContent(null)
                    }}
                    aria-label={`${cat.name}: ${cat.percentage.toFixed(1)}% ($${cat.amount.toFixed(2)})`}
                  />
                ))}
                {categories.length === 0 && (
                  <div className="text-center w-full text-white/70 flex items-center justify-center italic">
                    No expense data to display.
                  </div>
                )}
              </div>

              {/* Tooltip */}
              {showTooltip && tooltipContent && (
                <div 
                  className="fixed z-50 bg-white/80 backdrop-blur-md text-black rounded-lg py-2 px-3 shadow-xl border border-white/10 transition-all duration-150 pointer-events-none"
                  style={{
                    left: `${tooltipPosition.x - 315}px`,
                    top: `${tooltipPosition.y - 310}px`,
                    transform: 'translateX(-50%)',
                  }}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: tooltipContent.color }}
                    ></div>
                    <span className="font-semibold">{tooltipContent.name}</span>
                  </div>
                  <div className="flex justify-between gap-4 text-sm">
                    <span>${tooltipContent.amount.toFixed(2)}</span>
                    <span>{tooltipContent.percentage.toFixed(1)}%</span>
                  </div>
                  <div className="absolute bottom-[-6px] left-1/2 transform -translate-x-1/2 w-3 h-3 rotate-45 bg-white/80"></div>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="transactions-list">
            <ScrollArea className="h-[400px] rounded-md">
              {selectedCategory.transactions.length > 0 ? (
                <div className="space-y-2">
                  {selectedCategory.transactions.map((transaction) => (
                    <div 
                      key={transaction.id} 
                      className="p-3 rounded-lg bg-white/10 backdrop-blur-sm flex items-center justify-between"
                    >
                      <div className="flex-1">
                        <div className="font-medium">{transaction.description}</div>
                        <div className="text-sm opacity-70">
                          {transaction.date ? format(new Date(transaction.date), 'MMM d, yyyy') : ''}
                          {transaction.account_name && ` • ${transaction.account_name}`}
                        </div>
                      </div>
                      <div className="text-right font-semibold">
                        ${Math.abs(transaction.amount).toFixed(2)}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-white/70">
                  No transactions found for this category.
                </div>
              )}
            </ScrollArea>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export default SpendingBreakdown
