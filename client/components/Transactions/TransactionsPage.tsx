import { useState, useEffect } from 'react'
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table.tsx'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import LayoutWrapper from '../LayoutWrapper'
import SearchTxns from './SearchTxns.tsx'
import TxnItem from './TxnItem.tsx'
import CategoryDropdown from './CategoryDropDown.tsx'
import { mockTransactions } from './mockTransactions'
import { Filter, AlertCircle } from 'lucide-react'

export default function Transactions() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [filteredTransactions, setFilteredTransactions] = useState(mockTransactions)

  // Filter transactions based on search term and category separately
  useEffect(() => {
    const filteredTransactions = mockTransactions.filter((txn) => {
      // Only search in the description, not in category
      const matchesSearch = searchTerm === '' || txn.description
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
        
      // Category filtering is handled separately
      const matchesCategory =
        selectedCategory === '' || 
        selectedCategory === 'all' || 
        txn.category_group_name === selectedCategory
        
      return matchesSearch && matchesCategory
    })
    setFilteredTransactions(filteredTransactions)
  }, [searchTerm, selectedCategory])

  // Handle search input change
  const handleSearch = (term: string) => {
    setSearchTerm(term)
  }
  
  // Handle category selection
  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category)
  }

  return (
    <LayoutWrapper>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Transactions</h1>
        <div className="text-sm text-muted-foreground bg-[var(--muted)] px-3 py-1.5 rounded-full">
          {filteredTransactions.length} transactions found
        </div>
      </div>
      
      <Card className="shadow-sm mb-4">
        <CardContent className="p-4">
          <div className="flex flex-col gap-4 w-full">
            <div className="w-full">
              <SearchTxns onSearch={handleSearch} />
            </div>
  
          </div>
        </CardContent>
      </Card>
      
      {filteredTransactions.length === 0 ? (
          <Card className="shadow-sm">
            <CardContent className="flex flex-col items-center justify-center py-12 px-4 text-center">
              <div className="p-3 rounded-full bg-[var(--muted)] mb-3">
                <AlertCircle className="h-6 w-6 text-[var(--muted-foreground)]" />
              </div>
              <h3 className="text-lg font-medium text-[var(--foreground)]">No transactions found</h3>
              <p className="text-[var(--muted-foreground)] max-w-sm">No transactions match your current search criteria. Try adjusting your filters or search term.</p>
            </CardContent>
          </Card>
        ) : (
          <Card className="shadow-sm overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-[var(--muted)] border-b border-[var(--border)]">
                  <TableHead className="w-[120px] font-semibold text-[var(--foreground)] py-4">Date</TableHead>
                  <TableHead className="font-semibold text-[var(--foreground)]">Description</TableHead>
                  <TableHead className="text-right w-[120px] font-semibold text-[var(--foreground)]">Amount</TableHead>
                  <TableHead className="w-[150px] font-semibold text-[var(--foreground)]">Category</TableHead>
                  <TableHead className="w-[100px] font-semibold text-[var(--foreground)]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTransactions.map((txn) => (
                  <TxnItem key={txn.id} transaction={txn} />
                ))}
              </TableBody>
            </Table>
          </Card>
        )}
    </LayoutWrapper>
  )
}
