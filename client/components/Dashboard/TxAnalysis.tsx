import type { Transaction } from '../../../models/transactions'

export function transactionsByCategory(transactions: Transaction[]) {
  return transactions.reduce<Record<string, Transaction[]>>((groups, tx) => {
    const category = tx.category_group_name || 'Unknown'
    if (!groups[category]) {
      groups[category] = []
    }
    groups[category].push(tx)
    return groups
  }, {})
}

export function transactionAnalysis(transactions: Transaction[]) {
  const totalAmount = transactions.reduce((sum, tx) => sum + tx.amount, 0)
  const avgAmount = transactions.length ? totalAmount / transactions.length : 0
  return {
    totalAmount,
    avgAmount,
    count: transactions.length,
  }
}
