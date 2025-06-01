import {
  grabAccounts,
  grabTransactions,
  grabCategories,
  updateTransactionCategory,
} from '../../apis/apiClient.ts'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import Transactions from './Txs.tsx'
import TransactionSummary from './TsxSummary.tsx'
import TransactionsByCategory from './TsxsByCategory.tsx'
import MonthlyOverview from './MonthlyOverview.tsx'

import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { Alert, AlertTitle } from '@/components/ui/alert'

function Dashboard() {
  const queryClient = useQueryClient()
  const [selectedAccountIds, setSelectedAccountIds] = useState<string[]>([])
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
    queryKey: ['transactions', viewAll ? 'all' : selectedAccountIds],
    queryFn: () => grabTransactions(viewAll ? null : selectedAccountIds),
    enabled: viewAll || selectedAccountIds.length > 0,
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

  const updateCategoryMutation = useMutation({
    mutationFn: ({
      transactionId,
      categoryId,
    }: {
      transactionId: string
      categoryId: string
    }) => updateTransactionCategory(transactionId, categoryId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['transactions'] })
    },
  })

  if (isLoadingAccounts) return <Skeleton className="h-10 w-full rounded-xl" />
  if (isErrorAccounts)
    return (
      <Alert variant="destructive">
        <AlertTitle>{(errorAccounts as Error).message}</AlertTitle>
      </Alert>
    )
  if (!accountsData?.items?.length)
    return (
      <Card>
        <CardHeader>
          <CardTitle>No accounts found</CardTitle>
        </CardHeader>
      </Card>
    )

  if (isLoadingCategories)
    return <Skeleton className="h-10 w-full rounded-xl" />
  if (isErrorCategories)
    return (
      <Alert variant="destructive">
        <AlertTitle>{(errorCategories as Error).message}</AlertTitle>
      </Alert>
    )

  const handleAssignCategory = (transactionId: string, categoryId: string) => {
    updateCategoryMutation.mutate({ transactionId, categoryId })
  }

  return (
    <div className="px-4 py-8 max-w-5xl mx-auto space-y-6">
      <Card className="shadow-md border border-muted">
        <CardHeader>
          <CardTitle className="text-3xl font-bold">Dashboard</CardTitle>
        </CardHeader>
        <CardContent>
          <h3 className="text-lg font-semibold mb-3">Select Account:</h3>
          <div className="flex flex-wrap gap-3">
            {accountsData.items.map((account) => {
              const isSelected = selectedAccountIds.includes(account._id)
              return (
                <Button
                  key={account._id}
                  variant={isSelected ? 'default' : 'outline'}
                  onClick={() => {
                    setViewAll(false)
                    setSelectedAccountIds((prev) =>
                      isSelected
                        ? prev.filter((id) => id !== account._id)
                        : [...prev, account._id],
                    )
                  }}
                >
                  {account.name}
                </Button>
              )
            })}
            <Button
              variant="ghost"
              onClick={() => {
                setViewAll(true)
                setSelectedAccountIds([])
              }}
            >
              View All Transactions
            </Button>
          </div>
        </CardContent>
      </Card>

      {isLoadingTransactions && <Skeleton className="h-24 w-full rounded-xl" />}
      {isErrorTransactions && (
        <Alert variant="destructive">
          <AlertTitle>{(errorTransactions as Error).message}</AlertTitle>
        </Alert>
      )}

      {transactionsData && (
        <div className="space-y-6">
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle className="text-xl font-semibold">Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <TransactionSummary transactions={transactionsData.items} />
            </CardContent>
          </Card>

          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle className="text-xl font-semibold">
                Monthly Overview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <MonthlyOverview transactions={transactionsData.items} />
            </CardContent>
          </Card>

          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle className="text-xl font-semibold">
                Transactions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Transactions transactions={transactionsData.items} />
            </CardContent>
          </Card>

          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle className="text-xl font-semibold">
                Transactions by Category
              </CardTitle>
            </CardHeader>
            <CardContent>
              <TransactionsByCategory
                transactions={transactionsData.items}
                categories={categoriesData?.items || []}
                onAssignCategory={handleAssignCategory}
              />
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}

export default Dashboard
