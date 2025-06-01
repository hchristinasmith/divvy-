import request from 'superagent'
import { Accounts } from '../../models/akahu'
import type { Category } from '../../models/transactions'

const rootURL = new URL(`/api/v1`, document.baseURI)

export async function grabAccounts(): Promise<Accounts> {
  const response = await request.get(`${rootURL}/accounts`)
  return response.body as Accounts
}

export async function grabTransactions(
  accountIds?: string[] | null | undefined,
) {
  if (accountIds && accountIds.length > 0) {
    // For specific account transactions
    const queryString = accountIds.join(',')
    const response = await request.get(
      `${rootURL}/accounts/transactions?accountIds=${queryString}`,
    )

    return response.body
  } else {
    // For 'view all transactions' mode
    const response = await request.get(`${rootURL}/accounts/transactions`)
    return response.body
  }
}

export async function grabCategories() {
  const response = await request.get(`${rootURL}/categories`)
  return response.body
}

export async function updateTransactionCategory(
  transactionId: string,
  categoryId: string,
) {
  const response = await request
    .patch(`${rootURL}/transactions/${transactionId}`)
    .send({ categoryId })
  return response.body
}
