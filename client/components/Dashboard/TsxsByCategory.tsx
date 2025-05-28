import type { Transaction } from '../../../models/transactions'
import { transactionsByCategory } from './TxAnalysis'
import Select, { SingleValue } from 'react-select'

type CategoryOption = { value: string; label: string }

type Props = {
  transactions: Transaction[]
  categories: { id: string; label: string }[]
  onAssignCategory: (transactionId: string, categoryId: string) => void
}
//convert categories to react-select format

export default function TransactionsByCategory({
  transactions,
  categories,
  onAssignCategory,
}: Props) {
  const grouped = transactionsByCategory(transactions)
  const selectOptions: CategoryOption[] = (categories ?? []).map(
    ({ id, label }) => ({
      value: id,
      label,
    }),
  )

  // Calculate total amount for each category
  const categoryTotals = Object.entries(grouped)
    .map(([category, txs]) => {
      const total = txs.reduce((sum, tx) => sum + tx.amount, 0)
      return { category, total, count: txs.length }
    })
    .sort((a, b) => Math.abs(b.total) - Math.abs(a.total)) // Sort by absolute amount

  return (
    <div className="categories-container">
      <h3>Spending by Category</h3>

      <div className="category-list">
        {categoryTotals.map(({ category, total, count }) => {
          const isExpense = total < 0
          return (
            <div key={category} className="category-card">
              <div className="category-header">
                <div className="category-name">{category}</div>
                <div
                  className={`category-amount ${isExpense ? 'expense' : 'income'}`}
                >
                  {isExpense ? '-' : '+'} ${Math.abs(total).toFixed(2)}
                </div>
              </div>
              <div className="category-details">
                <span className="transaction-count">
                  {count} transaction{count !== 1 ? 's' : ''}
                </span>
                <div className="category-bar-container">
                  <div
                    className={`category-bar ${isExpense ? 'expense' : 'income'}`}
                    style={{
                      width: `${Math.min(Math.abs(total) / 100, 100)}%`,
                    }}
                  />
                </div>
              </div>

              {category === 'Uncategorized' && (
                <div className="uncategorized-tagger">
                  {transactions.map((tx) => (
                    <div key={tx._id} className="uncategorized-item">
                      <span>{tx.description}</span>
                      <Select
                        options={selectOptions}
                        placeholder="Assign Category"
                        onChange={(selected: SingleValue<CategoryOption>) => {
                          if (selected) {
                            onAssignCategory(tx._id, selected.value)
                          }
                        }}
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
