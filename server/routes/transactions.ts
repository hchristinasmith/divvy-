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

export default router
