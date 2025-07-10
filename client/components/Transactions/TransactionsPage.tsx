import { useState, useEffect } from 'react'
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table.tsx'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import LayoutWrapper from '../Layout/LayoutWrapper.tsx'
import SearchTxns from './SearchTxns.tsx'
import TxnItem from './TxnItem.tsx'
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
      
      <Card className="shadow-white bg-[var(--primary)] rounded-xl mb-4">
       
      <CardContent className="space-y-4">
  {/* Search Input */}
  <div className="w-full">
    <SearchTxns onSearch={handleSearch} />
  </div>

  {/* Transaction Count */}
  <div className="flex justify-between items-center bg px-1">
    <div className="text-sm text-white">
      {filteredTransactions.length} transactions found
    </div>
  </div>
</CardContent>

      </Card>
      <div className="bg-[var(--primary)] rounded-xl shadow-white w-full overflow-hidden">
        {filteredTransactions.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12 px-4 text-center">
              <div className="p-3 rounded-full bg-white/10 mb-3 shadow-white">
                <AlertCircle className="h-6 w-6 text-white opacity-70" />
              </div>
              <h3 className="text-lg font-medium text-white">No transactions found</h3>
              <p className="text-white opacity-50 max-w-sm">No transactions match your current search criteria. Try adjusting your filters or search term.</p>
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
                {filteredTransactions.map((txn) => (
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
