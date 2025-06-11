import express from 'express'
const router = express.Router()
import * as db from '../db/transactions.ts'
//connect this to database
//get, delete etc
// get and search for transactions

router.get('/', async (req, res) => {
  const { description } = req.query
  try {
    const txns = await db.searchTxns(description as string)
    res.json({ txns })
  } catch (error) {
    console.error(error)
    res.status(500).send("Couldn't search products")
  }
})

// update transaction with .patch

router.patch('/:id', async (req, res) => {
  const id = req.params.id
  const updates = req.body
  try {
    const updated = await db('transactions')
      .where({ id })
      .update(updates)
      .returning('*')
    if (updated.length === 0) {
      return res.status(404).send('Transaction not found')
    }
    res.json({ txn: updated[0] })
  } catch (error) {}
})

export default router
