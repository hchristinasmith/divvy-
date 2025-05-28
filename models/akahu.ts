export interface Accounts {
    success: boolean
    items: Item[]
  }
  
  export interface Item {
    _id: string
    _authorisation: string
    _credentials: string
    connection: Connection
    name: string
    formatted_account?: string
    status: string
    type: string
    attributes: string[]
    balance: Balance
    meta: Meta
    refreshed: Refreshed
  }
  
  export interface Balance {
    currency: string
    current: number
    overdrawn: boolean
  }
  
  export interface Connection {
    name: string
    logo: string
    _id: string
  }
  
  export interface Meta {
    holder: string
    breakdown?: Breakdown
  }
  
  export interface Breakdown {
    fees: number
    employer_contributions: number
    member_tax_credit: number
    personal_contributions: number
    previous_balance: number
    returns: number
    tax: number
    withdrawals: number
  }
  
  export interface Refreshed {
    balance: Date
    meta: Date
  }
  
  