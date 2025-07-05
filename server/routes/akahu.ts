const router = express.Router()
import type { AccountItem } from '../db/types/akahu'
// GET 'https://api.akahu.io/v1'

import express from 'express'
import request from 'superagent'

// Get accounts
router.get('/', async (req, res) => {
  try {
    const token = process.env.AKAHU_USER_TOKEN
    const appId = process.env.AKAHU_APP_ID

    if (!token || !appId) throw new Error('Missing Akahu credentials')

    const response = await request
      .get('https://api.akahu.io/v1/accounts')
      .set('Authorization', `Bearer ${token}`)
      .set('X-Akahu-Id', appId)

    const accounts = (response.body.items as AccountItem[]).map((acc) => ({
      id: acc._id,
      name: acc.name,
      type: acc.type,
      balance: acc.balance.current,
      overdrawn: acc.balance.overdrawn,
      currency: acc.balance.currency,
      institution: acc.connection.name,
      logo: acc.connection.logo,
      holder: acc.meta.holder,
      status: acc.status,
    }))

    res.json(accounts)
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Something went wrong'
    res.status(500).send(message)
  }
})

// router.get('/:accountId/transactions', async (req, res) => {
//   const { accountId } = req.params

//   try {
//     // Make sure environment variables exist
//     const token = process.env.AKAHU_USER_TOKEN
//     const appId = process.env.AKAHU_APP_ID

//     if (!token || !appId) {
//       throw new Error('Missing Akahu credentials')
//     }

//     const response = await request
//       .get(`https://api.akahu.io/v1/accounts/${accountId}/transactions`)
//       .set('Authorization', `Bearer ${token}`)
//       .set('X-Akahu-Id', appId)

//     res.json(response.body)
//   } catch (err) {
//     if (err instanceof Error) {
//       res.status(500).send((err as Error).message)
//     } else {
//       res.status(500).send('Something went wrong')
//     }
//   }
// })

export default router
