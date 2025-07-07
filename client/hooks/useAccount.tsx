import { useQuery } from '@tanstack/react-query'
import { getAllAccounts } from '../apis/apiClient'

export function useAllAccounts() {
  return useQuery({
    queryKey: ['accounts'],
    queryFn: getAllAccounts,
  })
}
