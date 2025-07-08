import { Transaction } from '../../../models/transactions'

// Create a partial type for our mock data that makes some fields optional
type PartialTransaction = Partial<Transaction> & {
  id: string;
  date: string;
  description: string;
  amount: number;
  category_group_name: string;
}

export const mockTransactions: PartialTransaction[] = [
  {
    id: 'trans_1',
    date: '2025-06-05',
    description: 'PT140728 PILATES WIT 7416 QUEENSTOWN 448131051256',
    amount: -70,
    category_group_name: 'Health & Fitness',
    user_id: "1",
    created_at: '2025-06-05T10:30:00Z',
    updated_at: '2025-06-05T10:30:00Z'
  },
  {
    id: 'trans_2',
    date: '2025-06-04',
    description: 'COFFEE CULTURE QUEENS QUEENSTOWN NZL',
    amount: -5.50,
    category_group_name: 'Food & Drink',
    user_id: "1",
    created_at: '2025-06-04T08:15:00Z',
    updated_at: '2025-06-04T08:15:00Z'
  },
  {
    id: 'trans_3',
    date: '2025-06-03',
    description: 'Salary Payment - ABC Company Ltd',
    amount: 3000,
    category_group_name: 'Income',
    user_id: "1",
    created_at: '2025-06-03T00:01:00Z',
    updated_at: '2025-06-03T00:01:00Z'
  },
  {
    id: 'trans_4',
    date: '2025-06-02',
    description: 'COUNTDOWN QUEENSTOWN QUEENSTOWN NZ',
    amount: -87.65,
    category_group_name: 'Groceries',
    user_id: "1",
    created_at: '2025-06-02T16:45:00Z',
    updated_at: '2025-06-02T16:45:00Z'
  },
  {
    id: 'trans_5',
    date: '2025-06-02',
    description: 'NETFLIX.COM NETFLIX.COM NZL',
    amount: -18.99,
    category_group_name: 'Entertainment',
    user_id: "1",
    created_at: '2025-06-02T03:30:00Z',
    updated_at: '2025-06-02T03:30:00Z'
  },
  {
    id: 'trans_6',
    date: '2025-06-01',
    description: 'SPOTIFY PREMIUM SPOTIFY.COM NZL',
    amount: -14.99,
    category_group_name: 'Entertainment',
    user_id: "1",
    created_at: '2025-06-01T04:20:00Z',
    updated_at: '2025-06-01T04:20:00Z'
  },
  {
    id: 'trans_7',
    date: '2025-05-31',
    description: 'VODAFONE NZ LTD AUCKLAND NZL',
    amount: -79.99,
    category_group_name: 'Bills & Utilities',
    user_id: "1",
    created_at: '2025-05-31T00:01:00Z',
    updated_at: '2025-05-31T00:01:00Z'
  },
  {
    id: 'trans_8',
    date: '2025-05-30',
    description: 'TRANSFER TO SAVINGS',
    amount: -500,
    category_group_name: 'Transfer',
    user_id: "1",
    created_at: '2025-05-30T14:30:00Z',
    updated_at: '2025-05-30T14:30:00Z'
  },
  {
    id: 'trans_9',
    date: '2025-05-29',
    description: 'KMART QUEENSTOWN REMARKABLES PARK NZL',
    amount: -45.20,
    category_group_name: 'Shopping',
    user_id: "1",
    created_at: '2025-05-29T13:15:00Z',
    updated_at: '2025-05-29T13:15:00Z'
  },
  {
    id: 'trans_10',
    date: '2025-05-28',
    description: 'UBER TRIP HELP.UBER.COM NZL',
    amount: -24.50,
    category_group_name: 'Transport',
    user_id: "1",
    created_at: '2025-05-28T22:45:00Z',
    updated_at: '2025-05-28T22:45:00Z'
  }
]
