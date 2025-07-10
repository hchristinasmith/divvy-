import { useState, useEffect, useCallback } from 'react'
import { Target } from '../../models/targets'
import { getTargets, addTarget, updateTarget, deleteTarget } from '../api/targets'
import { TargetWithCalculations } from '../components/Targets/mockTargets'
import { Transaction } from '../../models/transactions'

interface UseTargetsProps {
  transactions?: Transaction[]
}

interface UseTargetsReturn {
  targets: TargetWithCalculations[]
  isLoading: boolean
  error: string | null
  addNewTarget: (target: Omit<Target, 'user_id' | 'created_at' | 'updated_at'>) => Promise<void>
  updateTargetAmount: (category: string, period: string, amount: number) => Promise<void>
  removeTarget: (category: string, period: string) => Promise<void>
}

export function useTargets({ transactions = [] }: UseTargetsProps = {}): UseTargetsReturn {
  const [targets, setTargets] = useState<TargetWithCalculations[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  // Calculate spending for each category based on transactions
  const calculateSpendingByCategory = useCallback((targetsList: Target[]): TargetWithCalculations[] => {
    return targetsList.map(target => {
      // Filter transactions by category
      const categoryTransactions = transactions.filter(
        transaction => transaction.category_name === target.category
      )
      
      // Calculate total spent for this category
      const spent = categoryTransactions.reduce(
        (total, transaction) => total + Math.abs(transaction.amount),
        0
      )
      
      // Determine status based on percentage of target spent
      const percentSpent = (spent / target.target_amount) * 100
      let status: 'On Track' | 'Close' | 'Watch' | 'Over Target'
      
      if (percentSpent <= 75) {
        status = 'On Track'
      } else if (percentSpent <= 90) {
        status = 'Close'
      } else if (percentSpent <= 100) {
        status = 'Watch'
      } else {
        status = 'Over Target'
      }
      
      return {
        ...target,
        spent,
        status
      }
    })
  }, [transactions])

  // Fetch targets from the API
  const fetchTargets = useCallback(async () => {
    try {
      setIsLoading(true)
      const data = await getTargets()
      const targetsWithCalculations = calculateSpendingByCategory(data)
      setTargets(targetsWithCalculations)
      setError(null)
    } catch (err) {
      console.error('Error fetching targets:', err)
      setError('Failed to load targets')
    } finally {
      setIsLoading(false)
    }
  }, [calculateSpendingByCategory])

  // Add a new target
  const addNewTarget = async (target: Omit<Target, 'user_id' | 'created_at' | 'updated_at'>) => {
    try {
      await addTarget(target)
      fetchTargets() // Refresh targets list
    } catch (err) {
      console.error('Error adding target:', err)
      setError('Failed to add target')
      throw err
    }
  }

  // Update a target's amount
  const updateTargetAmount = async (category: string, period: string, amount: number) => {
    try {
      await updateTarget(category, period, amount)
      fetchTargets() // Refresh targets list
    } catch (err) {
      console.error('Error updating target:', err)
      setError('Failed to update target')
      throw err
    }
  }

  // Delete a target
  const removeTarget = async (category: string, period: string) => {
    try {
      await deleteTarget(category, period)
      fetchTargets() // Refresh targets list
    } catch (err) {
      console.error('Error deleting target:', err)
      setError('Failed to delete target')
      throw err
    }
  }

  // Fetch targets on component mount
  useEffect(() => {
    fetchTargets()
  }, [fetchTargets])

  return {
    targets,
    isLoading,
    error,
    addNewTarget,
    updateTargetAmount,
    removeTarget
  }
}
