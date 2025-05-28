import request from 'superagent'
import { Accounts } from '../../models/akahu'
import type { Category } from '../../models/transactions'

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

export async function grabCategories() {
  const response = await request.get(`${rootURL}/categories`)
  return response.body
}

export async function updateTransactionCategory(transactionId: string, categoryId: string) {
  const response = await request.patch(`${rootURL}/transactions/${transactionId}`)
    .send({ categoryId })
  return response.body
}
