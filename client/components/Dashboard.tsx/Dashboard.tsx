import { grabAccounts, grabTransactions } from '../../apis/apiClient.ts'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import Transactions from './Txs.tsx'
import TransactionSummary from './TsxSummary.tsx'
import TransactionsByCategory from './TsxsByCategory.tsx'

function Dashboard() {
  const [selectedAccountId, setSelectedAccountId] = useState<string | null>(
    null,
  )
  const [viewAll, setViewAll] = useState<boolean>(false)

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
    queryFn: () => grabTransactions(viewAll ? null : selectedAccountId!),
    enabled: viewAll || !!selectedAccountId,
  })

  if (isLoadingAccounts) return <p>Loading accounts...</p>
  if (isErrorAccounts) return <p>Error: {(errorAccounts as Error).message}</p>
  if (!accountsData?.items?.length) return <h1>No accounts found</h1>

  const handleViewAllClick = () => {
    setViewAll(true)
    setSelectedAccountId(null)
  } 
  return (
    
    <div className="dashboard-container">
      <h2>Financial Dashboard</h2>
      
      <div className="account-selector">
        <h3>Select Account:</h3>
        
        <div className="account-buttons">
          {accountsData.items.map((account) => (
            <button 
              key={account._id}
              onClick={() => {
                setSelectedAccountId(account._id)
                setViewAll(false)}}
              className={`account-button ${selectedAccountId === account._id ? 'active' : ''}`}
            >
              {account.name}
            </button>
          ))}
          <div >
            <button className='account-button' onClick={handleViewAllClick}>View All Transactions</button>
          </div>
        </div>
      </div>

      {isLoadingTransactions && <div className="loading-indicator">Loading Transactions...</div>}
      {isErrorTransactions && (
        <div className="error-message">Error: {(errorTransactions as Error).message}</div>
      )}

      {transactionsData && (
        <div className="dashboard-content">
          <div className="dashboard-summary">
            <TransactionSummary transactions={transactionsData.items} />
          </div>
          
          <div className="dashboard-transactions">
            <Transactions transactions={transactionsData.items} />
          </div>
          
          <div className="dashboard-categories">
            <TransactionsByCategory transactions={transactionsData.items} />
          </div>
        
        </div>
      )}
    </div>
  )
}

export default Dashboard
