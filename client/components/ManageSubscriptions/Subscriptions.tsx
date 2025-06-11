import React, { useState, useMemo } from 'react'
import { Plus, Bell, Trash2, Edit, Search } from 'lucide-react'
import { formatDistanceToNowStrict, isBefore, addDays } from 'date-fns'
import { mockSubscriptions } from './data'
import LayoutWrapper from '../LayoutWrapper'

const Subscriptions: React.FC = () => {
  const [search, setSearch] = useState('')

  const filteredSubscriptions = useMemo(() => {
    return mockSubscriptions.filter(
      (sub) =>
        sub.name.toLowerCase().includes(search.toLowerCase()) ||
        sub.category.toLowerCase().includes(search.toLowerCase()),
    )
  }, [search])

  const overview = useMemo(() => {
    const activeSubs = mockSubscriptions.filter(
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
      count: activeSubs.length,
      monthly: monthly.toFixed(2),
      yearly: yearly.toFixed(2),
    }
  }, [])

  return (
    <LayoutWrapper>
      <div className="p-6 bg-stone-50 min-h-screen text-stone-800">
        <div className="mb-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold mb-1">Manage Subscriptions</h1>
              <p className="text-stone-600">
                Track and manage your subscriptions with ease.
              </p>
            </div>
            <button className="bg-stone-600 text-white px-4 py-2 rounded-xl flex items-center hover:bg-stone-700">
              <Plus className="mr-2" /> Add Subscription
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white p-4 rounded-2xl shadow">
            <h2 className="text-sm text-stone-500 mb-1">
              Active Subscriptions
            </h2>
            <div className="text-3xl font-bold">{overview.count}</div>
          </div>
          <div className="bg-white p-4 rounded-2xl shadow">
            <h2 className="text-sm text-stone-500 mb-1">Monthly Cost</h2>
            <div className="text-3xl font-bold">${overview.monthly}</div>
          </div>
          <div className="bg-white p-4 rounded-2xl shadow">
            <h2 className="text-sm text-stone-500 mb-1">Yearly Cost</h2>
            <div className="text-3xl font-bold">${overview.yearly}</div>
          </div>
        </div>

        <div className="relative mb-6">
          <Search className="absolute top-3.5 left-3 text-stone-400" />
          <input
            type="text"
            placeholder="Search by name or category..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-stone-500"
          />
        </div>

        {filteredSubscriptions.length === 0 ? (
          <div className="text-center text-stone-500">
            No subscriptions match your search.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredSubscriptions.map((sub) => {
              const dueSoon =
                sub.status === 'active' &&
                isBefore(new Date(sub.nextBillingDate), addDays(new Date(), 3))
              return (
                <div
                  key={sub.id}
                  className="bg-white p-4 rounded-2xl shadow hover:shadow-md transition"
                >
                  <div className="flex items-center gap-4 mb-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-stone-500 to-stone-500 text-white flex items-center justify-center text-xl font-bold">
                      {sub.name[0]}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-lg font-semibold">{sub.name}</h3>
                        <span
                          className={`text-xs px-2 py-0.5 rounded-full ${sub.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}
                        >
                          {sub.status}
                        </span>
                        <span className="text-xs bg-stone-100 text-stone-700 px-2 py-0.5 rounded-full">
                          {sub.category}
                        </span>
                      </div>
                      <div className="text-stone-500 text-sm">
                        ${sub.cost}/{sub.cycle === 'monthly' ? 'mo' : 'yr'}
                      </div>
                      {sub.status === 'active' && (
                        <div className="text-xs text-stone-400 mt-1">
                          Next bill in{' '}
                          {formatDistanceToNowStrict(
                            new Date(sub.nextBillingDate),
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex justify-end items-center gap-2">
                    {dueSoon && (
                      <Bell className="text-orange-500">
                        <title>Due Soon</title>
                      </Bell>
                    )}
                    <button className="text-blue-600 hover:text-blue-800">
                      <Edit size={18} />
                    </button>
                    <button className="text-red-600 hover:text-red-800">
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </LayoutWrapper>
  )
}

export default Subscriptions
