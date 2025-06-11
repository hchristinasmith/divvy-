import express from 'express'
const router = express.Router()

//connect this to database
//get, delete etc
// PATCH /api/v1/transactions/:id
router.patch('/:id', (req, res) => {
  const { id } = req.params
  const { categoryId } = req.body

  try {
    // In a real app, you would update the transaction in the database
    // For now, we'll just return a success response
    console.log(`Updated transaction ${id} with category ${categoryId}`)

    res.json({
      success: true,
      message: `Transaction ${id} updated with category ${categoryId}`,
      transaction: {
        id,
        categoryId,
      },
    })
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).send((err as Error).message)
    } else {
      res.status(500).send('Something went wrong')
    }
  }
})

export default router
