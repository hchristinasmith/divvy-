import { Transaction } from 'models/transactions'
import connection from './connection'

export async function getTxns(db = connection): Promise<Transaction[]> {
  return db('transactions').select().orderBy('created_at')
}

export async function searchTxns(
  description?: string,
  db = connection,
): Promise<Transaction[]> {
  let query = db('transactions')

  if (description) {
    query = query.where('description', 'like', `%${description}%`)
  }

  return query.select()
}
