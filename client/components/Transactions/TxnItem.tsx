import { useState } from 'react'
import { Transaction } from '../../../models/transactions'
import { mockTransactions } from './mockTransactions'

// Use the same PartialTransaction type as in mockTransactions
type PartialTransaction = Partial<Transaction> & {
  id: string;
  date: string;
  description: string;
  amount: number;
  category_group_name: string;
}
import { TableCell, TableRow } from '@/components/ui/table'
import { Pencil, Check, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { categories } from '../../../data/cats.js'

interface Props {
  transaction: PartialTransaction
}

export default function TxnItem({ transaction }: Props) {
  const [formData, setFormData] = useState({
    description: transaction.description,
    category: transaction.category_group_name,
  })
  const [editing, setEditing] = useState(false)
  
  // Format date to be more readable
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-NZ', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    })
  }
  
  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-NZ', {
      style: 'currency',
      currency: 'NZD',
      minimumFractionDigits: 2
    }).format(amount)
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { id, value } = e.target
    setFormData({ ...formData, [id]: value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, this would call an API to update the transaction
    console.log('Updating transaction:', { id: transaction.id, ...formData })
    setEditing(false)
  }

  return (
    <TableRow className="hover:bg-muted/50">
      <TableCell>{formatDate(transaction.date)}</TableCell>
      <TableCell className="max-w-[300px]">
        {editing ? (
          <input
            id="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full rounded-md border border-input bg-background px-3 py-1 text-sm"
          />
        ) : (
          <div className="truncate" title={transaction.description}>
            {transaction.description}
          </div>
        )}
      </TableCell>
      <TableCell className={`text-right font-medium ${transaction.amount < 0 ? 'text-red-600' : 'text-green-600'}`}>
        {formatCurrency(transaction.amount)}
      </TableCell>
      <TableCell>
        {editing ? (
          <select
            id="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full rounded-md border border-input bg-background px-3 py-1 text-sm"
          >
            {Object.entries(categories).flatMap(([group, subcategories]) => [
              <option key={group} disabled className="font-semibold">
                {group}
              </option>,
              ...subcategories.map(sub => (
                <option key={sub} value={sub}>
                  {sub}
                </option>
              ))
            ])}
          </select>
        ) : (
          transaction.category_group_name
        )}
      </TableCell>
      <TableCell>
        {editing ? (
          <div className="flex gap-2">
            <Button size="icon" variant="ghost" onClick={handleSubmit} className="h-8 w-8 hover:bg-pink-100">
              <Check className="h-4 w-4 text-pink-700" />
            </Button>
            <Button size="icon" variant="ghost" onClick={() => setEditing(false)} className="h-8 w-8 hover:bg-pink-100">
              <X className="h-4 w-4 text-pink-500" />
            </Button>
          </div>
        ) : (
          <Button size="icon" variant="ghost" onClick={() => setEditing(true)} className="h-8 w-8 hover:bg-pink-100 hover:text-pink-700">
            <Pencil className="h-4 w-4" />
          </Button>
        )}
      </TableCell>
    </TableRow>
  )
}
