import { useState, useEffect, useMemo } from 'react'
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table.tsx'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import LayoutWrapper from '../Layout/LayoutWrapper.tsx'
import SearchTxns from './SearchTxns.tsx'
import TxnItem from './TxnItem.tsx'
import TransactionFilters from './TransactionFilters.tsx'
import { Filter, AlertCircle, Loader2 } from 'lucide-react'
import { useAllTransactions } from '../../hooks/useTransactions'
import type { Transaction } from '../../../models/transactions'
import { startOfDay, isAfter, isBefore, isEqual } from 'date-fns'

export default function Transactions() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [dateRange, setDateRange] = useState<{ from: Date | undefined; to: Date | undefined }>({ from: undefined, to: undefined })
  const [filteredTransactions, setFilteredTransactions] = useState<Transaction[]>([])
  
  // Fetch transactions from API
  const { data: transactionsData, isLoading, isError } = useAllTransactions()
  
  // Extract unique categories from transactions
  const categories = useMemo(() => {
    if (!transactionsData?.items) return []
    
    const uniqueCategories = new Set<string>()
    transactionsData.items.forEach((txn: Transaction) => {
      if (txn.category_group_name) {
        uniqueCategories.add(txn.category_group_name)
      }
    })
    
    return Array.from(uniqueCategories).sort()
  }, [transactionsData])
  
  // Update filtered transactions when API data changes or filters change
  useEffect(() => {
    if (!transactionsData?.items) return
    
    const filteredTransactions = transactionsData.items.filter((txn: Transaction) => {
      // Search filter - check description
      const matchesSearch = searchTerm === '' || 
        (txn.description && txn.description.toLowerCase().includes(searchTerm.toLowerCase()))
      
      // Category filter
      const matchesCategory =
        selectedCategory === 'all' || 
        txn.category_group_name === selectedCategory
      
      // Date range filter
      let matchesDateRange = true
      if (dateRange.from || dateRange.to) {
        const txnDate = new Date(txn.date)
        
        if (dateRange.from && dateRange.to) {
          // Both start and end dates are set
          matchesDateRange = 
            (isAfter(txnDate, startOfDay(dateRange.from)) || isEqual(txnDate, startOfDay(dateRange.from))) && 
            (isBefore(txnDate, startOfDay(dateRange.to)) || isEqual(txnDate, startOfDay(dateRange.to)))
        } else if (dateRange.from) {
          // Only start date is set
          matchesDateRange = isAfter(txnDate, startOfDay(dateRange.from)) || isEqual(txnDate, startOfDay(dateRange.from))
        } else if (dateRange.to) {
          // Only end date is set
          matchesDateRange = isBefore(txnDate, startOfDay(dateRange.to)) || isEqual(txnDate, startOfDay(dateRange.to))
        }
      }
      
      return matchesSearch && matchesCategory && matchesDateRange
    })
    
    setFilteredTransactions(filteredTransactions)
  }, [transactionsData, searchTerm, selectedCategory, dateRange])

  // Handle search input change
  const handleSearch = (term: string) => {
    setSearchTerm(term)
  }
  
  // Handle category selection
  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category)
  }
  
  // Handle date range change
  const handleDateRangeChange = (range: { from: Date | undefined; to: Date | undefined }) => {
    setDateRange(range)
  }
  
  // Reset all filters
  const handleResetFilters = () => {
    setSearchTerm('')
    setSelectedCategory('all')
    setDateRange({ from: undefined, to: undefined })
  }

  return (
    <LayoutWrapper>
      
      <Card className="shadow-white bg-[var(--primary)] rounded-xl mb-4">
     
        <CardContent className="space-y-4">
          {/* Search Input */}
          <div className="w-full">
            <SearchTxns onSearch={handleSearch} value={searchTerm} />
          </div>

          {/* Filters */}
          {!isLoading && !isError && transactionsData?.items && (
            <TransactionFilters 
              categories={categories}
              selectedCategory={selectedCategory}
              onCategoryChange={handleCategoryChange}
              dateRange={dateRange}
              onDateRangeChange={handleDateRangeChange}
              onResetFilters={handleResetFilters}
            />
          )}

          {/* Transaction Count */}
          <div className="flex justify-between items-center px-1">
            <div className="text-sm text-muted-foreground">
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <Loader2 className="h-3 w-3 animate-spin" />
                  Loading transactions...
                </span>
              ) : (
                `${filteredTransactions.length} transactions found`
              )}
            </div>
          </div>
        </CardContent>

      </Card>
      <div className="bg-[var(--primary)] rounded-xl shadow-white w-full overflow-hidden">
        {isLoading ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12 px-4 text-center">
              <div className="p-3 rounded-full bg-white/10 mb-3 shadow-white">
                <Loader2 className="h-6 w-6 text-white opacity-70 animate-spin" />
              </div>
              <h3 className="text-lg font-medium text-white">Loading transactions...</h3>
              <p className="text-white opacity-50 max-w-sm">Please wait while we fetch your transaction data.</p>
            </CardContent>
          </Card>
        ) : isError ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12 px-4 text-center">
              <div className="p-3 rounded-full bg-white/10 mb-3 shadow-white">
                <AlertCircle className="h-6 w-6 text-white opacity-70" />
              </div>
              <h3 className="text-lg font-medium text-white">Error loading transactions</h3>
              <p className="text-white opacity-50 max-w-sm">There was a problem fetching your transaction data. Please try again later.</p>
              <Button 
                variant="outline" 
                size="sm" 
                className="mt-4 bg-[var(--card)] border-[var(--primary)]/30 text-primary"
                onClick={() => window.location.reload()}
              >
                Try Again
              </Button>
            </CardContent>
          </Card>
        ) : filteredTransactions.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12 px-4 text-center">
              <div className="p-3 rounded-full bg-white/10 mb-3 shadow-white">
                <Filter className="h-6 w-6 text-white opacity-70" />
              </div>
              <h3 className="text-lg font-medium text-white">No transactions found</h3>
              <p className="text-white opacity-50 max-w-sm mb-4">No transactions match your current filter criteria. Try adjusting your filters or search term.</p>
              <Button 
                variant="outline" 
                size="sm" 
                className="bg-[var(--card)] border-[var(--primary)]/30 text-primary"
                onClick={handleResetFilters}
              >
                Reset Filters
              </Button>
            </CardContent>
          </Card>
        ) : (
          <Card className="shadow-white overflow-hidden bg-[var(--primary)] p-5 rounded-xl">
            <div className="rounded-xl overflow-hidden">
              <Table className="overflow-hidden">
              <TableHeader>
                <TableRow className="bg-[var(--card)] border-b border-[var(--primary)]/20 rounded-t-xl">
                  <TableHead className="w-[120px] font-semibold text-primary px-5 first:rounded-tl-xl">Date</TableHead>
                  <TableHead className="font-semibold text-primary">Description</TableHead>
                  <TableHead className="text-right w-[120px] font-semibold text-primary">Amount</TableHead>
                  <TableHead className="w-[150px] font-semibold text-primary">Category</TableHead>
                  <TableHead className="w-[100px] font-semibold text-primary px-6 last:rounded-tr-xl">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className="bg-[var(--card)] text-primary rounded-b-xl">
                {filteredTransactions.map((txn: Transaction) => (
                  <TxnItem key={txn.id} transaction={txn} />
                ))}
              </TableBody>
            </Table>
            </div>
          </Card>
        )}
      </div>
    </LayoutWrapper>
  )
}
