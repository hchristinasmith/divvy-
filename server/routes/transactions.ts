import express from 'express'
import { Transaction } from 'models/transactions'
import request from 'superagent'
const router = express.Router()
// import * as db from '../db/transactions.ts'
//connect this to database

// GET /api/v1/transactions
router.get('/', async (req, res) => {
  try {
    const token = process.env.AKAHU_USER_TOKEN
    const appId = process.env.AKAHU_APP_ID

    if (!token || !appId) throw new Error('Missing Akahu credentials')

    const response = await request
      .get('https://api.akahu.io/v1/transactions')
      .set('Authorization', `Bearer ${token}`)
      .set('X-Akahu-Id', appId)

    const transactions = (response.body.items as Transaction[]).map((tx) => ({
      id: tx.id,
      date: tx.date,
      amount: tx.amount,
      description: tx.description,
      type: tx.type,
      account_id: tx.account_id,
      category_name: tx.category_name,
      merchant_name: tx.merchant_name,
    }))

    res.json(transactions)
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Something went wrong'
    res.status(500).send({ error: message })
  }
})

export default router
