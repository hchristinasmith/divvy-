// Define the SavingsGoal interface
export interface SavingsGoal {
  id: number
  name: string
  category: string
  current_amount: number
  target_amount: number
  target_date: string
  user_id: number
  created_at: string
  updated_at: string
}

// Mock data for savings goals
export const mockSavingsGoals: SavingsGoal[] = [
  {
    id: 1,
    name: 'Emergency Fund',
    category: 'Security',
    current_amount: 8500,
    target_amount: 15000,
    target_date: 'Dec 2025',
    user_id: 1,
    created_at: '2025-01-15',
    updated_at: '2025-06-30'
  },
  {
    id: 2,
    name: 'Japan Vacation',
    category: 'Travel',
    current_amount: 2800,
    target_amount: 8000,
    target_date: 'Jun 2025',
    user_id: 1,
    created_at: '2025-02-10',
    updated_at: '2025-06-25'
  },
  {
    id: 3,
    name: 'Pay Off Credit Card',
    category: 'Debt',
    current_amount: 1200,
    target_amount: 3500,
    target_date: 'Mar 2025',
    user_id: 1,
    created_at: '2025-01-05',
    updated_at: '2025-06-20'
  }
]
