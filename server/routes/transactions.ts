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

// update category, description transaction with .put
//needs editing

router.put('/:id', async (req, res) => {
  const id = req.params.id
  const { category_group_name } = req.body
  if (!category_group_name) {
    return res.status(400).json({ error: 'category_group_name is required' })
  }
  try {
    const updatedCount = await db.updateTxnCat(id, category_group_name)

    if (updatedCount === 0) {
      return res.status(404).json({ error: 'Transaction not found' })
    }

    res.json({ message: 'Transaction updated', updatedCount })
  } catch (error) {
    console.error('Error updating transaction category group name:', error)
    return res.status(500).json({ error: 'Internal server error' })
  }
})

export default router
