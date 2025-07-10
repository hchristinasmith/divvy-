import { useQuery } from '@tanstack/react-query'
import { Transaction } from '../../models/transactions'
import { getAllTransactions } from '../apis/apiClient'

export interface Subscription {
  id: string
  description: string
  amount: number
  cycle: string
  date: string
  merchant_name?: string
  merchant_logo?: string
  category_name?: string
}

export function useSubscriptions() {
  const { data: transactionsData, isLoading, error } = useQuery({
    queryKey: ['transactions'],
    queryFn: getAllTransactions,
  })

  // Extract subscriptions from transactions
  const subscriptions: Subscription[] = transactionsData?.items
    ?.filter((transaction: Transaction) => transaction.is_subscription)
    .map((transaction: Transaction) => ({
      id: transaction.id,
      description: transaction.description,
      amount: Math.abs(transaction.amount),
      cycle: transaction.cycle || 'monthly', // Default to monthly if not specified
      date: transaction.date,
      merchant_name: transaction.merchant_name,
      merchant_logo: transaction.merchant_logo,
      category_name: transaction.category_name,
    })) || []

  // Calculate monthly and annual costs
  const monthlyCost = subscriptions.reduce((total, sub) => {
    if (sub.cycle === 'yearly') {
      return total + sub.amount / 12
    } else if (sub.cycle === 'quarterly') {
      return total + sub.amount / 3
    } else if (sub.cycle === 'weekly') {
      return total + sub.amount * 4.33 // Average weeks in a month
    } else {
      return total + sub.amount // Default monthly
    }
  }, 0)

  const annualCost = monthlyCost * 12

  return {
    subscriptions,
    monthlyCost,
    annualCost,
    isLoading,
    error,
  }
}
