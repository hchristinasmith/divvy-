import { useState, useEffect } from 'react'
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table.tsx'
import LayoutWrapper from '../LayoutWrapper'
import SearchTxns from './SearchTxns.tsx'
import TxnItem from './TxnItem.tsx'
import { mockTransactions } from './mockTransactions'

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
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">Transactions</h2>
          <div className="text-sm text-muted-foreground">
            {filteredTransactions.length} transactions found
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6 bg-slate-50 p-4 rounded-lg border">
          <div className="flex-grow">
            <SearchTxns onSearch={handleSearch} />
          </div>
        </div>
        
        {filteredTransactions.length === 0 ? (
          <div className="text-center py-12 px-4 border rounded-lg bg-slate-50">
            <div className="flex flex-col items-center gap-2">
              <div className="p-3 rounded-full bg-slate-100">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-slate-400">
                  <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
                  <line x1="12" y1="9" x2="12" y2="13"></line>
                  <line x1="12" y1="17" x2="12.01" y2="17"></line>
                </svg>
              </div>
              <h3 className="text-lg font-medium text-slate-700">No transactions found</h3>
              <p className="text-slate-500 max-w-sm">No transactions match your current search criteria. Try adjusting your filters or search term.</p>
            </div>
          </div>
        ) : (
          <div className="border rounded-lg overflow-hidden shadow-sm">
            <Table>
              <TableHeader>
                <TableRow className="bg-slate-50 border-b">
                  <TableHead className="w-[120px] font-semibold text-slate-700 py-4">Date</TableHead>
                  <TableHead className="font-semibold text-slate-700">Description</TableHead>
                  <TableHead className="text-right w-[120px] font-semibold text-slate-700">Amount</TableHead>
                  <TableHead className="w-[150px] font-semibold text-slate-700">Category</TableHead>
                  <TableHead className="w-[100px] font-semibold text-slate-700">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTransactions.map((txn) => (
                  <TxnItem key={txn.id} transaction={txn} />
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </div>
    </LayoutWrapper>
  )
}
