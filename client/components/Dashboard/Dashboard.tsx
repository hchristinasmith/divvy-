import { useAllTransactions } from '../../hooks/useTransactions.tsx'
import { useAllAccounts } from '../../hooks/useAccount.tsx'
import { useState } from 'react'
import ActualVTarget from './ActualVTarget.tsx'
import TimeFilter from './TimeFilter.tsx'
import SpendingBreakdown from './SpendingBreakdown.tsx'
import LayoutWrapper from '../Layout/LayoutWrapper.tsx'
import { CalendarHeart } from 'lucide-react'
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
      {/* Loading and Error States */}
      {isLoadingTransactions && (
        <div className="space-y-4">
          <Skeleton className="h-10 w-64 rounded-full" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Skeleton className="h-[400px] w-full rounded-xl" />
            <Skeleton className="h-[400px] w-full rounded-xl" />
          </div>
        </div>
      )}
      {isErrorTransactions && (
        <Alert variant="destructive" className="rounded-xl border-none shadow-white">
          <AlertTitle>{(errorTransactions as Error).message}</AlertTitle>
        </Alert>
      )}

      {transactionsData && (
        <div className="space-y-8">
          {/* Dashboard Header */}
          <div className="flex items-center justify-center">
          
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
                {/* Main Content Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Left Column */}
                  <div className="space-y-8">
                    <SpendingBreakdown transactions={filteredTransactions} />
                  </div>
                  
                  {/* Right Column */}
                  <div className="space-y-8">
                    <Card className="shadow-white bg-[var(--card)] rounded-xl overflow-hidden border-none">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-xl flex items-center bg-[var(--primary)] font-semibold rounded-full shadow-sm px-3 py-2 gap-2 text-white">
                          <CalendarHeart className="inline-block" size={18} />
                          <span>Monthly Overview</span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="pt-6">
                        <ActualVTarget
                          transactions={filteredTransactions}
                          targets={targets}
                        />
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </>
            );
          })()}
        </div>
      )}
    </LayoutWrapper>
  );
}

export default Dashboard;
