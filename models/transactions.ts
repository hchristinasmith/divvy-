export interface Transaction {
  id: string
  account_id: string
  user_id: string
  connection_id: string
  created_at: string // or Date
  updated_at: string
  date: string

  description: string
  amount: number
  balance: number
  type: string
  hash: string

  // Embedded category
  category_id: string
  category_name: string
  category_group_id: string
  category_group_name: string

  // Embedded meta
  particulars: string
  code: string
  reference: string
  other_account: string
  logo: string
  conversion_amount: number
  conversion_currency: number
  conversion_rate: number
  card_suffix: string

  // Embedded merchant
  merchant_id: string
  merchant_name: string
  merchant_website: string
  merchant_logo: string
  
  // Subscription tracking
  is_subscription: boolean
  cycle?: string // monthly, weekly, yearly, etc.
  
  // Joined fields from accounts table
  account_name?: string
  institution_name?: string
}
