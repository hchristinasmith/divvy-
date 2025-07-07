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
}

export default interface AkahuTransaction {
  _id: string
  _account: string
  _user: string
  _connection: string
  created_at: string
  updated_at: string
  date: string
  description: string
  amount: number
  balance: number
  type: string
  hash: string
  category?: {
    _id: string
    name: string
    groups?: {
      personal_finance?: {
        _id: string
        name: string
      }
    }
  }
  meta?: {
    particulars?: string
    code?: string
    reference?: string
    other_account?: string
    logo?: string
    conversion_amount?: number
    conversion_currency?: string
    conversion_rate?: number
    card_suffix?: string
  }
  merchant?: {
    _id: string
    name: string
    website?: string
    logo?: string
  }
}
