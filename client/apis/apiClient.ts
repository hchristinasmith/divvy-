import request from 'superagent'
import { Accounts } from '../../models/akahu'

const rootURL = new URL(`/api/v1`, document.baseURI)

export async function grabAccounts(): Promise<Accounts> {
  const response = await request.get(`${rootURL}/accounts`)
  return response.body as Accounts
}

export async function grabTransactions(accountId: string) {
  const response = await request.get(
    `${rootURL}/accounts/${accountId}/transactions`,
  )
  return response.body
}
