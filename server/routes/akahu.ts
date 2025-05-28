import express from 'express'
import request from 'superagent'
const router = express.Router()

// GET 'https://api.akahu.io/v1'

router.get('/', async (req, res) => {
  try {
    const response = await request
      .get('https://api.akahu.io/v1/accounts')
      .set('Authorization', `Bearer ${process.env.AKAHU_USER_TOKEN}`)
      .set('X-Akahu-Id', process.env.AKAHU_APP_ID)

    res.json(response.body)
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).send((err as Error).message)
    } else {
      res.status(500).send('Something went wrong')
    }
  }
})

router.get('/:accountId/transactions', async (req, res) => {
  const { accountId } = req.params

  try {
    const response = await request
      .get(`https://api.akahu.io/v1/accounts/${accountId}/transactions`)
      .set('Authorization', `Bearer ${process.env.AKAHU_USER_TOKEN}`)
      .set('X-Akahu-Id', process.env.AKAHU_APP_ID)

    res.json(response.body)
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).send((err as Error).message)
    } else {
      res.status(500).send('Something went wrong')
    }
  }
})

export default router
