export interface Subscription {
  id: number
  name: string
  category: string
  cost: number
  cycle: 'monthly' | 'yearly'
  status: 'active' | 'cancelled'
  nextBillingDate: string
}
