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
import { Pencil, Check, X, ChevronDown, ChevronUp, ExternalLink, Globe } from 'lucide-react'
import { Button } from '@/components/ui/button'  
import { categories, categoryColors } from '../../../data/cats.js'

interface Props {
  transaction: PartialTransaction
}

export default function TxnItem({ transaction }: Props) {
  const [formData, setFormData] = useState({
    description: transaction.description,
    category: transaction.category_group_name,
    is_subscription: transaction.is_subscription || false,
    cycle: transaction.cycle || 'monthly'
  })
  const [editing, setEditing] = useState(false)
  const [detailsOpen, setDetailsOpen] = useState(false)
  
  // Check if merchant data is available
  const hasMerchantData = transaction.merchant_name || transaction.merchant_website || transaction.merchant_logo
  
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
    const { id, value, type } = e.target
    const newValue = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    setFormData({ ...formData, [id]: newValue })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Call API to update the transaction
    console.log('Updating transaction:', { id: transaction.id, ...formData })
    
    // In a real app, this would call an API to update the transaction
    fetch(`/api/v1/transactions/${transaction.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        category_name: formData.category,
        is_subscription: formData.is_subscription,
        cycle: formData.is_subscription ? formData.cycle : null
      }),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to update transaction')
        }
        return response.json()
      })
      .then(() => {
        setEditing(false)
        // Force a refresh of the page to show updated data
        window.location.reload()
      })
      .catch(error => {
        console.error('Error updating transaction:', error)
        alert('Failed to update transaction. Please try again.')
      })
  }

  return (
    <>
      <TableRow className="hover:bg-[var(--primary)]/50 border-b border-white/10 transition-colors duration-200 cursor-pointer">
        <TableCell className="py-3 text-primary font-medium">{formatDate(transaction.date)}</TableCell>
        <TableCell className="max-w-[300px] py-3">
          {editing ? (
            <input
              id="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full rounded-xl border border-white/20 bg-white/10 px-3 py-1.5 text-sm text-white focus:border-white/40 focus:ring-1 focus:ring-white/40 focus:outline-none"
              autoFocus
            />
          ) : (
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2">
                <div className="truncate font-medium text-primary" title={transaction.description}>
                  {transaction.description}
                </div>
                {transaction.is_subscription && (
                  <span className="px-1.5 py-0.5 bg-[var(--primary)] text-white text-xs rounded-full font-medium shadow-sm">
                    Subscription
                  </span>
                )}
              </div>
              {hasMerchantData && (
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="h-6 px-2 text-xs text-primary hover:bg-[var(--primary)]/30 hover:text-primary"
                  onClick={() => setDetailsOpen(!detailsOpen)}
                >
                  Details {detailsOpen ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                </Button>
              )}
            </div>
          )}
        </TableCell>
        <TableCell className={`text-right font-medium py-3 ${transaction.amount < 0 ? 'text-red-500' : 'text-green-500'}`}>
          <span className="inline-block">{formatCurrency(transaction.amount)}</span>
        </TableCell>
        <TableCell className="py-3">
          {editing ? (
            <div className="flex flex-col gap-2">
              <select
                id="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full rounded-xl border border-white/20 bg-white/10 px-3 py-1.5 text-sm text-white focus:border-white/40 focus:ring-1 focus:ring-white/40 focus:outline-none"
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
              
              <div className="flex items-center gap-2 mt-1">
                <label className="flex items-center gap-2 text-sm cursor-pointer">
                  <input
                    type="checkbox"
                    id="is_subscription"
                    checked={formData.is_subscription}
                    onChange={handleChange}
                    className="rounded border-white/20 bg-white/10 text-[var(--primary)] focus:ring-[var(--primary)] focus:ring-offset-0"
                  />
                  <span>Subscription</span>
                </label>
              </div>
              
              {formData.is_subscription && (
                <select
                  id="cycle"
                  value={formData.cycle}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-white/20 bg-white/10 px-3 py-1.5 text-sm text-white focus:border-white/40 focus:ring-1 focus:ring-white/40 focus:outline-none mt-1"
                >
                  <option value="weekly">Weekly</option>
                  <option value="monthly">Monthly</option>
                  <option value="quarterly">Quarterly</option>
                  <option value="yearly">Yearly</option>
                </select>
              )}
            </div>
          ) : (
            <span 
              className="px-2 py-1 rounded-xl text-white text-sm inline-block shadow-white"
              style={{
                backgroundColor: categoryColors[transaction.category_group_name as keyof typeof categoryColors] || '#94a3b8',
                opacity: 0.9
              }}
            >
              {transaction.category_group_name}
            </span>
          )}
        </TableCell>
        <TableCell className="py-3">
          {editing ? (
            <div className="flex gap-2 justify-end">
              <Button size="icon" variant="ghost" onClick={handleSubmit} className="h-8 w-8 hover:bg-[var(--primary)]/30 transition-colors duration-200">
                <Check className="h-4 w-4 text-primary" />
              </Button>
              <Button size="icon" variant="ghost" onClick={() => setEditing(false)} className="h-8 w-8 hover:bg-[var(--primary)]/30 transition-colors duration-200">
                <X className="h-4 w-4 text-primary" />
              </Button>
            </div>
          ) : (
            <div className="flex justify-end">
              <Button size="icon" variant="ghost" onClick={() => setEditing(true)} className="h-8 w-8 hover:bg-[var(--primary)]/30 transition-colors duration-200">
                <Pencil className="h-4 w-4 text-primary" />
              </Button>
            </div>
          )}
        </TableCell>
      </TableRow>
      
      {/* Transaction details dropdown */}
      {!editing && detailsOpen && (
        <TableRow className="bg-[var(--card)]">
          <TableCell colSpan={5} className="py-3 px-4">
            <div className="flex flex-col gap-4 p-3 bg-[var(--primary)]/10 rounded-xl border border-[var(--primary)]/10 shadow-white backdrop-blur-sm">
              
              {/* Merchant Information */}
              {hasMerchantData && (
                <div className="flex items-start gap-4">
                  {transaction.merchant_logo && (
                    <div className="flex-shrink-0">
                      <img 
                        src={transaction.merchant_logo} 
                        alt={transaction.merchant_name || 'Merchant logo'} 
                        className="w-12 h-12 rounded-xl object-contain border border-[var(--primary)]/20 bg-white/5 p-1 shadow-white"
                      />
                    </div>
                  )}
                  <div className="flex-grow">
                    {transaction.merchant_name && (
                      <h4 className="font-medium text-primary mb-1">{transaction.merchant_name}</h4>
                    )}
                    {transaction.merchant_website && (
                      <a 
                        href={transaction.merchant_website} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-sm text-primary hover:text-primary/80 transition-colors duration-200"
                      >
                        <Globe size={14} />
                        {transaction.merchant_website.replace(/^https?:\/\//, '')}
                      </a>
                    )}
                  </div>
                </div>
              )}
              
              {/* Account Information */}
              <div className="flex flex-col gap-2 mt-2">
                <h4 className="text-sm font-medium text-primary">Transaction Details</h4>
                <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                  {transaction.account_name && (
                    <>
                      <div className="text-muted-foreground">Account:</div>
                      <div className="text-primary">{transaction.account_name}</div>
                    </>
                  )}
                  {transaction.institution_name && (
                    <>
                      <div className="text-muted-foreground">Institution:</div>
                      <div className="text-primary">{transaction.institution_name}</div>
                    </>
                  )}
                  <div className="text-muted-foreground">Transaction ID:</div>
                  <div className="text-primary text-xs opacity-70">{transaction.id}</div>
                </div>
              </div>
              
            </div>
          </TableCell>
        </TableRow>
      )}
    </>
  )
}
