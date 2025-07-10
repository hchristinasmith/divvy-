import { useSubscriptions } from '../../hooks/useSubscriptions'
import LayoutWrapper from '../Layout/LayoutWrapper'
import { Loader2, CalendarClock, ArrowUpDown } from 'lucide-react'
import { useState } from 'react'

// Helper function to format currency
const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-NZ', {
    style: 'currency',
    currency: 'NZD',
  }).format(amount)
}

// Helper function to format date
const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-NZ', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

// Helper function to capitalize first letter
const capitalize = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

export function Subscriptions() {
  const { subscriptions, monthlyCost, annualCost, isLoading, error } = useSubscriptions()
  const [sortBy, setSortBy] = useState<'amount' | 'date' | 'description'>('amount')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc')

  // Handle sorting
  const handleSort = (field: 'amount' | 'date' | 'description') => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
    } else {
      setSortBy(field)
      setSortOrder('desc')
    }
  }

  // Sort subscriptions
  const sortedSubscriptions = [...subscriptions].sort((a, b) => {
    if (sortBy === 'amount') {
      return sortOrder === 'asc' ? a.amount - b.amount : b.amount - a.amount
    } else if (sortBy === 'date') {
      return sortOrder === 'asc' 
        ? new Date(a.date).getTime() - new Date(b.date).getTime() 
        : new Date(b.date).getTime() - new Date(a.date).getTime()
    } else {
      return sortOrder === 'asc'
        ? a.description.localeCompare(b.description)
        : b.description.localeCompare(a.description)
    }
  })

  if (isLoading) {
    return (
      <LayoutWrapper>
        <div className="flex justify-center items-center h-64">
          <Loader2 className="w-8 h-8 animate-spin text-[var(--primary)]" />
        </div>
      </LayoutWrapper>
    )
  }

  if (error) {
    return (
      <LayoutWrapper>
        <div className="bg-red-500/20 text-red-500 p-4 rounded-xl shadow-white">
          <p>Error loading subscriptions data</p>
        </div>
      </LayoutWrapper>
    )
  }

  return (
    <LayoutWrapper>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center gap-2 bg-[var(--primary)] text-white px-3 py-2 rounded rounded-full shadow-white mb-4 w-fit">
          <CalendarClock size={18} />
          <h2 className="text-lg font-semibold">Subscriptions</h2>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-2 gap-6 mb-6">
          <div className="bg-[var(--card)] rounded-xl p-5 shadow-white">
            <h3 className="text-lg font-semibold mb-2">Monthly Cost</h3>
            <p className="text-3xl font-bold text-[var(--primary)]">{formatCurrency(monthlyCost)}</p>
            <p className="text-sm opacity-70 mt-1">Total monthly subscription expenses</p>
          </div>
          <div className="bg-[var(--card)] rounded-xl p-5 shadow-white">
            <h3 className="text-lg font-semibold mb-2">Annual Cost</h3>
            <p className="text-3xl font-bold text-[var(--primary)]">{formatCurrency(annualCost)}</p>
            <p className="text-sm opacity-70 mt-1">Total yearly subscription expenses</p>
          </div>
        </div>

        {/* Subscriptions List */}
        <div className="bg-[var(--card)] rounded-xl p-5 shadow-white">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Active Subscriptions</h3>
            <div className="text-sm opacity-70">{subscriptions.length} subscriptions</div>
          </div>

          {/* Sort Controls */}
          <div className="flex gap-2 mb-4">
            <button 
              onClick={() => handleSort('amount')}
              className={`flex items-center gap-1 px-3 py-1 rounded-full text-sm ${
                sortBy === 'amount' ? 'bg-[var(--primary)] text-white' : 'bg-white/10 hover:bg-white/20'
              } transition-colors duration-200`}
            >
              Amount {sortBy === 'amount' && <ArrowUpDown size={14} />}
            </button>
            <button 
              onClick={() => handleSort('description')}
              className={`flex items-center gap-1 px-3 py-1 rounded-full text-sm ${
                sortBy === 'description' ? 'bg-[var(--primary)] text-white' : 'bg-white/10 hover:bg-white/20'
              } transition-colors duration-200`}
            >
              Name {sortBy === 'description' && <ArrowUpDown size={14} />}
            </button>
            <button 
              onClick={() => handleSort('date')}
              className={`flex items-center gap-1 px-3 py-1 rounded-full text-sm ${
                sortBy === 'date' ? 'bg-[var(--primary)] text-white' : 'bg-white/10 hover:bg-white/20'
              } transition-colors duration-200`}
            >
              Date {sortBy === 'date' && <ArrowUpDown size={14} />}
            </button>
          </div>

          {/* Subscriptions Table */}
          <div className="max-h-96 overflow-y-auto">
            <table className="w-full">
              <thead className="border-b border-white/10">
                <tr>
                  <th className="text-left py-2 px-4">Subscription</th>
                  <th className="text-left py-2 px-4">Cycle</th>
                  <th className="text-left py-2 px-4">Amount</th>
                  <th className="text-left py-2 px-4">Last Charged</th>
                </tr>
              </thead>
              <tbody>
                {sortedSubscriptions.map((sub) => (
                  <tr key={sub.id} className="border-b border-white/5 hover:bg-white/5">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        {sub.merchant_logo && (
                          <img 
                            src={sub.merchant_logo} 
                            alt={sub.merchant_name || sub.description} 
                            className="w-6 h-6 rounded-full"
                          />
                        )}
                        <div>
                          <div className="font-medium">{sub.merchant_name || sub.description}</div>
                          {sub.category_name && (
                            <div className="text-xs opacity-70">{sub.category_name}</div>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span className="bg-white/10 px-2 py-1 rounded-full text-xs">
                        {capitalize(sub.cycle)}
                      </span>
                    </td>
                    <td className="py-3 px-4 font-medium text-[var(--primary)]">
                      {formatCurrency(sub.amount)}
                    </td>
                    <td className="py-3 px-4 text-sm opacity-70">
                      {formatDate(sub.date)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </LayoutWrapper>
  )
}
