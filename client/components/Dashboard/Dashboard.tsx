import { grabAccounts, grabTransactions, grabCategories, updateTransactionCategory } from '../../apis/apiClient.ts'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import Transactions from './Txs.tsx'
import TransactionSummary from './TsxSummary.tsx'
import TransactionsByCategory from './TsxsByCategory.tsx'
import MonthlyOverview from './MonthlyOverview.tsx'

function Dashboard() {
  const queryClient = useQueryClient()
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
  
  const {
    data: categoriesData,
    isLoading: isLoadingCategories,
    isError: isErrorCategories,
    error: errorCategories,
  } = useQuery({
    queryKey: ['categories'],
    queryFn: () => grabCategories(),
  })
  
  // Mutation for updating transaction category
  const updateCategoryMutation = useMutation({
    mutationFn: ({ transactionId, categoryId }: { transactionId: string; categoryId: string }) => 
      updateTransactionCategory(transactionId, categoryId),
    onSuccess: () => {
      // Invalidate and refetch transactions after a successful update
      queryClient.invalidateQueries({ queryKey: ['transactions'] })
    },
  })

  if (isLoadingAccounts) return <p>Loading accounts...</p>
  if (isErrorAccounts) return <p>Error: {(errorAccounts as Error).message}</p>
  if (!accountsData?.items?.length) return <h1>No accounts found</h1>
  
  if (isLoadingCategories) return <p>Loading categories...</p>
  if (isErrorCategories) return <p>Error: {(errorCategories as Error).message}</p>

  const handleViewAllClick = () => {
    setViewAll(true)
    setSelectedAccountId(null)
  }
  
  const handleAssignCategory = (transactionId: string, categoryId: string) => {
    updateCategoryMutation.mutate({ transactionId, categoryId })
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
          
          <div className="dashboard-monthly-overview">
            <MonthlyOverview transactions={transactionsData.items} />
          </div>
          
          <div className="dashboard-transactions">
            <Transactions transactions={transactionsData.items} />
          </div>
          
          <div className="dashboard-categories">
            <TransactionsByCategory 
              transactions={transactionsData.items} 
              categories={categoriesData?.items || []} 
              onAssignCategory={handleAssignCategory} 
            />
          </div>
        
        </div>
      )}
    </div>
  )
}

export default Dashboard
