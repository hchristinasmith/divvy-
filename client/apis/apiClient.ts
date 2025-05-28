import request from 'superagent'
import { Accounts } from '../../models/akahu'

const rootURL = new URL(`/api/v1`, document.baseURI)

export async function grabAccounts(): Promise<Accounts> {
  const response = await request.get(`${rootURL}/accounts`)
  return response.body as Accounts
}

export async function grabTransactions(accountId?: string | null) {
  if (accountId) {
    // For specific account transactions
    const response = await request.get(`${rootURL}/accounts/${accountId}/transactions`)
    return response.body
  } else {
    // For 'view all transactions' mode
    // The server route is set up as /api/v1/accounts/transactions
    const response = await request.get(`${rootURL}/accounts/transactions`)
    return response.body
  }
}
