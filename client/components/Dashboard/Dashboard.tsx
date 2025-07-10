import { useAllTransactions } from '../../hooks/useTransactions.tsx'
import { useAllAccounts } from '../../hooks/useAccount.tsx'
import { useState } from 'react'
import ActualVTarget from './ActualVTarget.tsx'
import TimeFilter from './TimeFilter.tsx'
import SpendingBreakdown from './SpendingBreakdown.tsx'
import LayoutWrapper from '../Layout/LayoutWrapper.tsx'

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

  const {
    data: transactionsData,
    isLoading: isLoadingTransactions,
    isError: isErrorTransactions,
    error: errorTransactions,
  } = useAllTransactions()

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
          </div>
          {(() => {
            // Filter transactions based on selected accounts and time period
            const filteredTransactions = transactionsData.items.filter(
              (transaction) => {
                // If no accounts are selected, show all transactions
                if (selectedAccountIds.length === 0) return true;

                // Otherwise, only show transactions from selected accounts
                return selectedAccountIds.includes(transaction.account_id);
              },
            ).filter((transaction) => {

              // Filter by selected time period
              const txDate = new Date(transaction.date);
              const cutoffDate = new Date();
              cutoffDate.setDate(cutoffDate.getDate() - selectedDays);
              return txDate >= cutoffDate;
            });

            return (
              <>
                <SpendingBreakdown transactions={filteredTransactions} />
                <Card className="shadow-white">
                  <CardHeader>
                    <CardTitle className="text-xl font-semibold">
                      Monthly Overview
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ActualVTarget
                      transactions={filteredTransactions}
                      targets={targets}
                    />
                  </CardContent>
                </Card>
              </>
            );
          })()}
        </div>
      )}
    </LayoutWrapper>
  );
}

export default Dashboard;
