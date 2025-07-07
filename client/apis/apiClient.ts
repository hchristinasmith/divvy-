import request from 'superagent'
import { Item } from '../../models/akahu'

const rootURL = new URL(`/api/v1`, document.baseURI)

export async function getAllAccounts(): Promise<Item[]> {
  const response = await request.get(`${rootURL}/accounts`)
  return response.body
}

// Get all transactions
export async function getAllTransactions() {
  const response = await request.get(`${rootURL}/transactions`)
  console.log('API response (transactions):', response.body)
  return response.body
}

export async function updateTransactionCategory(
  transactionId: number,
  {
    category_name,
    category_id,
    category_group_id,
    category_group_name,
  }: {
    category_name: string
    category_id?: string
    category_group_id?: string
    category_group_name?: string
  },
) {
  const response = await request
    .patch(`${rootURL}/transactions/${transactionId}`)
    .send({
      category_name,
      category_id,
      category_group_id,
      category_group_name,
    })

  return response.body
}
