import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { getAllTransactions } from '../apis/apiClient'
import { updateTransactionCategory } from '../apis/apiClient'

export function useAllTransactions() {
  return useQuery({
    queryKey: ['transactions'],
    queryFn: getAllTransactions,
  })
}

export function useUpdateTransactionCategory() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({
      transactionId,
      categoryId,
    }: {
      transactionId: number | string
      categoryId: string
    }) => updateTransactionCategory(transactionId, categoryId),

    onSuccess: () => {
      // Invalidate or refetch transactions to reflect changes
      queryClient.invalidateQueries({ queryKey: ['transactions'] })
    },
  })
}
