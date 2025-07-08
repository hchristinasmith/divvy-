import { useState, useEffect } from 'react'
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table.tsx'
import LayoutWrapper from '../LayoutWrapper'
import CategoryDropdown from './CategoryDropDown.tsx'
import SearchTxns from './SearchTxns.tsx'
import TxnItem from './TxnItem.tsx'
import { mockTransactions } from './mockTransactions'

export default function Transactions() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [filteredTransactions, setFilteredTransactions] = useState(mockTransactions)

  // Filter transactions based on search term and category
  useEffect(() => {
    let filtered = mockTransactions
    
    if (searchTerm) {
      filtered = filtered.filter(txn => 
        txn.description.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }
    
    if (selectedCategory) {
      filtered = filtered.filter(txn => 
        txn.category_group_name === selectedCategory
      )
    }
    
    setFilteredTransactions(filtered)
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
        
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-grow">
            <SearchTxns onSearch={handleSearch} />
          </div>
          <div>
            <CategoryDropdown onCategoryChange={handleCategoryChange} />
          </div>
        </div>
        
        {filteredTransactions.length === 0 ? (
          <div className="text-center py-10 text-muted-foreground">
            No transactions found matching your criteria.
          </div>
        ) : (
          <div className="border rounded-lg overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="">
                  <TableHead className="w-[120px]">Date</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead className="text-right w-[120px]">Amount</TableHead>
                  <TableHead className="w-[150px]">Category</TableHead>
                  <TableHead className="w-[100px]">Actions</TableHead>
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
