import { Target } from '../../../models/targets'

// Extended Target type with UI-specific fields
export interface TargetWithCalculations extends Target {
  spent: number
  status: 'Over Target' | 'Watch' | 'Close' | 'On Track'
}

// Mock data for targets
export const mockTargets: TargetWithCalculations[] = [
  {
    user_id: 1,
    category: 'Housing',
    target_amount: 1500,
    period: 'monthly',
    created_at: '2025-06-01',
    updated_at: '2025-06-01',
    spent: 1750,
    status: 'Over Target'
  },
  {
    user_id: 1,
    category: 'Groceries',
    target_amount: 600,
    period: 'monthly',
    created_at: '2025-06-01',
    updated_at: '2025-06-01',
    spent: 450,
    status: 'On Track'
  },
  {
    user_id: 1,
    category: 'Entertainment',
    target_amount: 200,
    period: 'monthly',
    created_at: '2025-06-01',
    updated_at: '2025-06-01',
    spent: 180,
    status: 'Close'
  },
  {
    user_id: 1,
    category: 'Dining Out',
    target_amount: 300,
    period: 'monthly',
    created_at: '2025-06-01',
    updated_at: '2025-06-01',
    spent: 350,
    status: 'Watch'
  },
  {
    user_id: 1,
    category: 'Transportation',
    target_amount: 250,
    period: 'monthly',
    created_at: '2025-06-01',
    updated_at: '2025-06-01',
    spent: 200,
    status: 'On Track'
  }
]
