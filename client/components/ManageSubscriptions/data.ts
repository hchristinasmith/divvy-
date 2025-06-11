import { Subscription } from './types'

export const mockSubscriptions: Subscription[] = [
  {
    id: 1,
    name: 'Netflix',
    category: 'Entertainment',
    cost: 15.99,
    cycle: 'monthly',
    status: 'active',
    nextBillingDate: '2025-06-05',
  },
  {
    id: 2,
    name: 'Spotify',
    category: 'Entertainment',
    cost: 9.99,
    cycle: 'monthly',
    status: 'active',
    nextBillingDate: '2025-06-02',
  },
  {
    id: 3,
    name: 'Adobe Creative Suite',
    category: 'Software',
    cost: 52.99,
    cycle: 'monthly',
    status: 'active',
    nextBillingDate: '2025-06-15',
  },
  {
    id: 4,
    name: 'Microsoft 365',
    category: 'Software',
    cost: 99.99,
    cycle: 'yearly',
    status: 'active',
    nextBillingDate: '2026-05-30',
  },
  {
    id: 5,
    name: 'Gym Membership',
    category: 'Health',
    cost: 40,
    cycle: 'monthly',
    status: 'cancelled',
    nextBillingDate: '2025-04-15',
  },
]
