export interface Transaction {
  _id: string
  _account: string
  _user: string
  _connection: string
  created_at: Date
  updated_at: Date
  date: Date
  description: string
  amount: number
  balance: number
  type: string
  hash: string
  meta: Meta
  merchant: Merchant
  category: Category
}

export interface Category {
  _id: string
  name: string
  groups: Groups
}

export interface Groups {
  personal_finance: PersonalFinance
}

export interface PersonalFinance {
  _id: string
  name: string
}

export interface Merchant {
  _id: string
  name: string
  website: string
}

export interface Meta {
  particulars: string
  code: string
  reference: string
  logo: string
}
