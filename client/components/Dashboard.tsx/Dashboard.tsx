import { grabAccounts, grabTransactions } from '../apiClient.ts'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import Transactions from './txs.tsx'
import TransactionSummary from './tsxSummary.tsx'
import TransactionsByCategory from './TsxsByCategory.tsx'

function App() {
  const [selectedAccountId, setSelectedAccountId] = useState<string | null>(
    null,
  )

  const {
    data: accountsData,
    isLoading: isLoadingAccounts,
    isError: isErrorAccounts,
    error: errorAccounts,
  } = useQuery({
    queryKey: ['accounts'],
    queryFn: () => grabAccounts(),
  })

  const {
    data: transactionsData,
    isLoading: isLoadingTransactions,
    isError: isErrorTransactions,
    error: errorTransactions,
  } = useQuery({
    queryKey: ['transactions', selectedAccountId],
    queryFn: () => grabTransactions(selectedAccountId!),
    enabled: !!selectedAccountId,
  })

  if (isLoadingAccounts) return <p>Loading accounts...</p>
  if (isErrorAccounts) return <p>Error: {(errorAccounts as Error).message}</p>
  if (!accountsData?.items?.length) return <h1>No accounts found</h1>

  return (
    <div>
      <h1>Demo AKAHU Accounts</h1>
      <ul>
        {accountsData.items.map((account) => (
          <li key={account._id}>
            <button onClick={() => setSelectedAccountId(account._id)}>
              {account.name} - {account.connection.name}
            </button>
          </li>
        ))}
      </ul>

      {isLoadingTransactions && <p>Loading Transactions...</p>}
      {isErrorTransactions && (
        <p>Error: {(errorTransactions as Error).message}</p>
      )}

      {transactionsData && (
        <>
          <TransactionSummary transactions={transactionsData.items} />
          <TransactionsByCategory transactions={transactionsData.items} />
          <Transactions transactions={transactionsData.items} />
        </>
      )}
    </div>
  )
}

export default App
