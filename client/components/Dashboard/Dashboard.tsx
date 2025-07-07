import { useAllTransactions } from '../../hooks/useTransactions.tsx'
import { useAllAccounts } from '../../hooks/useAccount.tsx'
import { useState } from 'react'
import ActualVTarget from './ActualVTarget.tsx'
import TimeFilter from './TimeFilter.tsx'
import SpendingBreakdown from './SpendingBreakdown.tsx'
import LayoutWrapper from '../LayoutWrapper.tsx'

import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { Alert, AlertTitle } from '@/components/ui/alert'

function Dashboard() {
  const [selectedAccountIds, setSelectedAccountIds] = useState<string[]>([])
  const [selectedDays, setSelectedDays] = useState(7)

  const targets = {
    Groceries: 500,
    Entertainment: 200,
    Utilities: 150,
    // Add other categories and their budget targets here
  }

  const {
    data: accountsData,
    isLoading: isLoadingAccounts,
    isError: isErrorAccounts,
    error: errorAccounts,
  } = useAllAccounts()
  console.log('accountsData:', accountsData)

  const {
    data: transactionsData,
    isLoading: isLoadingTransactions,
    isError: isErrorTransactions,
    error: errorTransactions,
  } = useAllTransactions()
  console.log('transactionsData:', transactionsData)

  if (isLoadingAccounts) return <Skeleton className="h-10 w-full rounded-xl" />
  if (isErrorAccounts)
    return (
      <Alert variant="destructive">
        <AlertTitle>{(errorAccounts as Error).message}</AlertTitle>
      </Alert>
    )

  if (!accountsData?.length)
    return (
      <Card>
        <CardHeader>
          <CardTitle>No accounts found</CardTitle>
        </CardHeader>
      </Card>
    )

  return (
    <LayoutWrapper>
      <div className="flex justify-center items-center">
        <h1 className="text-3xl font-bold">Dashboard</h1>
      </div>
      <Card className="border-0 shadow-none bg-transparent">
        <CardContent>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg font-semibold mb-3">Select Account:</h3>
          </div>
          <div className="flex flex-wrap gap-3">
            {accountsData.map((account) => {
              const isSelected = selectedAccountIds.includes(account._id)
              return (
                <Button
                  key={account._id}
                  variant={isSelected ? 'default' : 'outline'}
                  onClick={() => {
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
          <div className="flex justify-center">
            <TimeFilter
              selectedDays={selectedDays}
              onSelect={setSelectedDays}
            />
          </div>{' '}
          <SpendingBreakdown transactions={transactionsData.items} />
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle className="text-xl font-semibold">
                Monthly Overview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ActualVTarget
                transactions={transactionsData.items}
                targets={targets}
              />
            </CardContent>
          </Card>
        </div>
      )}
    </LayoutWrapper>
  )
}

export default Dashboard
