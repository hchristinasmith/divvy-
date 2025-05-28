import { grabTransactions } from '../../apis/apiClient'
import { useQuery } from '@tanstack/react-query'

interface TransactionsProps {
  accountId: string
}

export default function Transactions({ accountId }: TransactionsProps) {
  const {
    data: transactionsData,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['transactions', accountId],
    queryFn: () => grabTransactions(accountId),
    enabled: !!accountId,
  })

  if (isLoading) return <p>Loading Transactions...</p>
  if (isError) return <p>Error: {(error as Error).message}</p>
  if (!transactionsData?.items?.length) return <p>No transactions found</p>

  return (
    <div>
      <h2>Transactions for Account {accountId}</h2>
      <ul>
        {transactionsData.items.map((tx: any) => (
          <li key={tx._id}>
            <div>
              {tx.description} | Amount: {tx.amount} | Category:{' '}
              {tx.category?.name || 'Unknown'}
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
