import React, { useState, useMemo, useEffect } from 'react'
import { Plus, Bell, Trash2, Edit, Search, Calendar, CreditCard, RefreshCw, ExternalLink, PencilIcon, CheckIcon } from 'lucide-react'
import { formatDistanceToNowStrict, isBefore, addDays, format } from 'date-fns'
import { mockTransactions } from '../Transactions/mockTransactions'
import LayoutWrapper from '../LayoutWrapper'
import { Button } from '@/components/ui/button'
import { categoryColors } from '../../../data/cats.js'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'

interface Subscription {
  id: string;
  name: string;
  status: 'active' | 'cancelled';
  category: string;
  cost: number;
  cycle: 'monthly' | 'yearly';
  nextBillingDate: string;
  merchant_logo?: string;
  merchant_website?: string;
  date?: string;
}

const Subscriptions: React.FC = () => {
  const [search, setSearch] = useState('')
  const [editMode, setEditMode] = useState(false)
  
  // Convert transactions to subscription format
  const subscriptions = useMemo(() => {
    return mockTransactions
      .filter(txn => txn.is_subscription)
      .map(txn => ({
        id: txn.id,
        name: txn.merchant_name || txn.description.split(' ')[0],
        status: 'active' as const,
        category: txn.category_group_name,
        cost: Math.abs(txn.amount),
        cycle: (txn as any).cycle || 'monthly',
        nextBillingDate: new Date(new Date(txn.date).setMonth(new Date(txn.date).getMonth() + 1)).toISOString(),
        merchant_logo: txn.merchant_logo,
        merchant_website: txn.merchant_website,
        date: txn.date
      }))
  }, [])

  const filteredSubscriptions = useMemo(() => {
    return subscriptions.filter(
      (sub) =>
        sub.name.toLowerCase().includes(search.toLowerCase()) ||
        sub.category.toLowerCase().includes(search.toLowerCase()),
    )
  }, [subscriptions, search])

  const overview = useMemo(() => {
    const activeSubs = subscriptions.filter(
      (sub) => sub.status === 'active',
    )
    const monthly = activeSubs.reduce(
      (acc, sub) => acc + (sub.cycle === 'monthly' ? sub.cost : sub.cost / 12),
      0,
    )
    const yearly = activeSubs.reduce(
      (acc, sub) => acc + (sub.cycle === 'yearly' ? sub.cost : sub.cost * 12),
      0,
    )
    return {
      active: activeSubs.length,
      monthly: monthly.toFixed(2),
      yearly: yearly.toFixed(2),
    }
  }, [subscriptions])

  const handleEditSubscription = (sub: any) => {
    alert(`Edit subscription: ${sub.name}`);
    // In a real app, this would open a modal or navigate to an edit page
  };

  return (
    <LayoutWrapper>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Manage Subscriptions</h1>
        <div className="flex gap-2">
          <Button>
            <Plus className="mr-2 h-4 w-4" /> Add Subscription
          </Button>
          <Button 
            variant={editMode ? "secondary" : "outline"}
            size="sm"
            onClick={() => setEditMode(!editMode)}
            className="flex items-center gap-1"
          >
            {editMode ? (
              <>
                <CheckIcon size={16} />
                Done
              </>
            ) : (
              <>
                <PencilIcon size={16} />
                Edit
              </>
            )}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-10 mb-8">
        <Card className="shadow-sm">
        <CardContent className="pt-3 text-center">
        <span className="block text-2xl font-semibold">{overview.active}</span>
          <span className="text-lg font-semibold">Active</span>
          </CardContent>
        </Card>
        
        <Card className="shadow-sm">
          <CardContent className="pt-3 text-center">
            <span className="block text-2xl font-semibold">${overview.monthly}</span>
            <span className="text-lg font-semibold">Monthly Cost</span>
          </CardContent>
        </Card>
        
        <Card className="shadow-sm">
        <CardContent className="pt-3 text-center">
        <span className="block text-2xl font-semibold">${overview.yearly}</span>
            <span className="text-lg font-semibold">Yearly Cost</span>
          </CardContent>
        </Card>
      </div>

      <div className="relative mb-6">
        <Search className="absolute top-3.5 left-3 text-slate-400" />
        <input
          type="text"
          placeholder="Search by name or category..."
          value={search}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-pink-400"
        />
      </div>

      {filteredSubscriptions.length === 0 ? (
        <div className="text-center text-slate-500 p-8 bg-white rounded-lg border border-slate-200">
          No subscriptions match your search.
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-4">
          {filteredSubscriptions.map((sub) => {
            const dueSoon =
              sub.status === 'active' &&
              isBefore(new Date(sub.nextBillingDate), addDays(new Date(), 3))
            
            // Get category color
            const categoryKey = sub.category as keyof typeof categoryColors;
            const categoryColor = categoryColors[categoryKey] || '#6b7280';
            
            return (
              <Card key={sub.id} className="shadow-sm overflow-hidden relative">
                {/* Category badge at top right */}
                <span 
                  className="absolute top-2 right-2 text-xs px-1.5 py-0.5 rounded-full text-white" 
                  style={{ backgroundColor: categoryColor + 'dd' }}
                >
                  {sub.category}
                </span>
                
                <div className="p-3">
                  <div className="flex items-center gap-3">
                    {sub.merchant_logo ? (
                      <img 
                        src={sub.merchant_logo} 
                        alt={sub.name} 
                        className="w-10 h-10 rounded-lg object-cover"
                      />
                    ) : (
                      <div 
                        className="w-10 h-10 rounded-lg text-white flex items-center justify-center text-lg font-bold"
                        style={{ backgroundColor: categoryColor }}
                      >
                        {sub.name[0]}
                      </div>
                    )}
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="text-base font-semibold">{sub.name}</h3>
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <span
                          className={`text-xs px-1.5 py-0.5 rounded-full ${sub.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}
                        >
                          {sub.status}
                        </span>
                        <span className="text-slate-500 text-xs font-medium">
                          ${sub.cost.toFixed(2)}/{sub.cycle === 'monthly' ? 'mo' : 'yr'}
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-1">
                      {editMode && (
                        <>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-7 w-7 text-slate-500 hover:text-pink-600 hover:bg-pink-50"
                            onClick={() => handleEditSubscription(sub)}
                          >
                            <Edit size={14} />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-7 w-7 text-slate-500 hover:text-red-600 hover:bg-red-50">
                            <Trash2 size={14} />
                          </Button>
                        </>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center mt-2 pt-2 border-t border-slate-100 text-xs">
                    <div className="flex gap-4">
                      {sub.status === 'active' && (
                        <div className="flex items-center">
                          <Calendar className="h-3.5 w-3.5 text-slate-400 mr-1.5" />
                          <span className="text-slate-600">
                            Next: <span className="font-medium">{format(new Date(sub.nextBillingDate), 'MMM d')}</span>
                            {dueSoon && (
                              <span className="ml-1 text-xs bg-amber-100 text-amber-700 px-1.5 py-0.5 rounded-full">
                                Due soon
                              </span>
                            )}
                          </span>
                        </div>
                      )}
                      
                      {sub.date && (
                        <div className="flex items-center">
                          <CreditCard className="h-3.5 w-3.5 text-slate-400 mr-1.5" />
                          <span className="text-slate-600 truncate">
                            Last: <span className="font-medium">{format(new Date(sub.date), 'MMM d')}</span>
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {/* Website link at bottom right */}
                  {sub.merchant_website && (
                    <div className="absolute bottom-2 right-2">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="text-xs text-slate-500 hover:text-pink-600 p-0 h-auto"
                        onClick={() => window.open(sub.merchant_website, '_blank')}
                      >
                        <ExternalLink size={12} className="mr-1" /> Website
                      </Button>
                    </div>
                  )}
                </div>
              </Card>
            )
          })}
        </div>
      )}
    </LayoutWrapper>
  )
}

export default Subscriptions
