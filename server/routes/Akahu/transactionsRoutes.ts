import express from 'express'
// import { Transaction } from 'models/transactions'
// import request from 'superagent'
const router = express.Router()
import { fetchAkahuTransactions } from 'server/db/akahuService.js'
import knex from 'server/db/knex'

// GET /api/v1/transactions

router.get('/', async (req, res) => {
  try {
    const transactions = await knex('transactions')
      .join('accounts', 'transactions.account_id', 'accounts.akahu_id')
      .select(
        'transactions.id',
        'transactions.date',
        'transactions.amount',
        'transactions.description',
        'transactions.type',
        'transactions.category_name',
        'transactions.category_id',
        'transactions.category_group_id',
        'transactions.category_group_name',
        'transactions.merchant_name',
        'transactions.merchant_website',
        'transactions.merchant_logo',
        'transactions.is_subscription',
        'transactions.cycle',
        'accounts.name as account_name',
        'accounts.connection_name as institution_name',
      )
      .orderBy('transactions.date', 'desc')

    console.log(`GET /transactions: Found ${transactions.length} transactions`)
    
    res.json(transactions)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Failed to get transactions from DB' })
  }
})

// PATCH /api/v1/transactions
router.patch('/:id', async (req, res) => {
  const id = Number(req.params.id)
  const { 
    category_name, 
    category_id, 
    category_group_id, 
    category_group_name,
    is_subscription,
    cycle
  } = req.body
  
  if (isNaN(id)) {
    return res.status(400).json({ error: 'Invalid transaction id' })
  }
  
  try {
    // Build update object with only the fields that are provided
    const updateData: Record<string, any> = {
      updated_at: knex.fn.now()
    }
    
    // Add fields that are provided in the request
    if (category_name !== undefined) updateData.category_name = category_name
    if (category_id !== undefined) updateData.category_id = category_id
    if (category_group_id !== undefined) updateData.category_group_id = category_group_id
    if (category_group_name !== undefined) updateData.category_group_name = category_group_name
    if (is_subscription !== undefined) updateData.is_subscription = is_subscription
    if (cycle !== undefined) updateData.cycle = cycle
    
    const updated = await knex('transactions').where({ id }).update(updateData)
    console.log('PATCH /transactions/:id', { id, reqBody: req.body, updateData })

    if (updated === 0) {
      return res.status(404).json({ error: 'Transaction not found' })
    }

    res.status(200).json({ message: 'Transaction updated successfully' })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Failed to update transaction' })
  }
})

// Define transaction type interface
interface AkahuTransaction {
  _id: string
  _account: string
  _user: string
  _connection: string
  created_at: string
  updated_at: string
  date: string
  description: string
  amount: number
  balance: number
  type: string
  hash: string
  category?: {
    _id?: string
    name?: string
    groups?: {
      personal_finance?: {
        _id?: string
        name?: string
      }
    }
  }
  meta?: {
    particulars?: string
    code?: string
    reference?: string
    other_account?: string
    logo?: string
    conversion_amount?: number
    conversion_currency?: string
    conversion_rate?: number
    card_suffix?: string
  }
  merchant?: {
    _id?: string
    id?: string
    name?: string
    logo?: string
    website?: string
  }
}

//POST /api/v1/transactions/sync
router.post('/sync', async (req, res) => {
  try {
    const data = await fetchAkahuTransactions()

    // Define subscription keywords to detect subscriptions in transaction descriptions
    const subscriptionKeywords = [
      'subscription', 'netflix', 'spotify', 'disney+', 'prime', 'membership',
      'monthly', 'weekly', 'yearly', 'annual', 'recurring', 'apple.com/bill',
      'hulu', 'youtube', 'premium', 'audible', 'patreon', 'twitch', 'onlyfans',
      'crunchyroll', 'direct debit', 'standing order'
    ]
    
    // Define cycle keywords to detect subscription cycles
    const cycleKeywords = {
      weekly: ['weekly', 'week'],
      monthly: ['monthly', 'month', 'netflix', 'spotify', 'disney+', 'hulu'],
      quarterly: ['quarterly', 'quarter', '3-month', '3 month'],
      yearly: ['yearly', 'annual', 'annually', 'year']
    }
    
    // Helper function to detect if a transaction is a subscription
    const detectSubscription = (description: string): boolean => {
      const lowerDesc = description.toLowerCase()
      return subscriptionKeywords.some(keyword => lowerDesc.includes(keyword.toLowerCase()))
    }
    
    // Helper function to determine subscription cycle
    const detectCycle = (description: string): string => {
      const lowerDesc = description.toLowerCase()
      
      for (const [cycle, keywords] of Object.entries(cycleKeywords)) {
        if (keywords.some(keyword => lowerDesc.includes(keyword.toLowerCase()))) {
          return cycle
        }
      }
      
      // Default to monthly if no specific cycle is detected
      return 'monthly'
    }
    
    const transactions = data.items.map((txn: AkahuTransaction) => {
      // Check if transaction is already marked as subscription or detect it from description
      const isDirectCodedSubscription = txn.meta?.code === 'SUBSCRIPTION'
      const description = txn.description || ''
      const isDetectedSubscription = detectSubscription(description)
      const isSubscription = isDirectCodedSubscription || isDetectedSubscription
      
      // Determine cycle - either from metadata or by detection
      let cycle = null
      if (isSubscription) {
        cycle = isDirectCodedSubscription && txn.meta?.reference 
          ? txn.meta.reference 
          : detectCycle(description)
      }
      
      return {
        akahu_id: txn._id,
        account_id: txn._account,
        user_id: txn._user,
        connection_id: txn._connection,
        created_at: txn.created_at,
        updated_at: txn.updated_at,
        date: txn.date,
        description: txn.description,
        amount: txn.amount,
        balance: txn.balance,
        type: txn.type,
        hash: txn.hash,
        category_id: txn.category?._id || null,
        category_name: txn.category?.name || null,
        category_group_id: txn.category?.groups?.personal_finance?._id || null,
        category_group_name: txn.category?.groups?.personal_finance?.name || null,
        particulars: txn.meta?.particulars || null,
        code: txn.meta?.code || null,
        reference: txn.meta?.reference || null,
        other_account: txn.meta?.other_account || null,
        logo: txn.meta?.logo || null,
        conversion_amount: txn.meta?.conversion_amount || null,
        conversion_currency: txn.meta?.conversion_currency || null,
        conversion_rate: txn.meta?.conversion_rate || null,
        card_suffix: txn.meta?.card_suffix || null,
        merchant_id: txn.merchant?._id || txn.merchant?.id || null,
        merchant_name: txn.merchant?.name || null,
        merchant_website: txn.merchant?.website || null,
        merchant_logo: txn.merchant?.logo || null,
        is_subscription: isSubscription,
        cycle: cycle,
      }
    })

    await knex('transactions')
      .insert(transactions)
      .onConflict('akahu_id')
      .merge({
        account_id: knex.raw('excluded.account_id'),
        user_id: knex.raw('excluded.user_id'),
        connection_id: knex.raw('excluded.connection_id'),
        created_at: knex.raw('excluded.created_at'),
        date: knex.raw('excluded.date'),
        description: knex.raw('excluded.description'),
        amount: knex.raw('excluded.amount'),
        balance: knex.raw('excluded.balance'),
        type: knex.raw('excluded.type'),
        hash: knex.raw('excluded.hash'),
        particulars: knex.raw('excluded.particulars'),
        code: knex.raw('excluded.code'),
        reference: knex.raw('excluded.reference'),
        other_account: knex.raw('excluded.other_account'),
        logo: knex.raw('excluded.logo'),
        conversion_amount: knex.raw('excluded.conversion_amount'),
        conversion_currency: knex.raw('excluded.conversion_currency'),
        conversion_rate: knex.raw('excluded.conversion_rate'),
        card_suffix: knex.raw('excluded.card_suffix'),
        merchant_id: knex.raw('excluded.merchant_id'),
        merchant_name: knex.raw('excluded.merchant_name'),
        merchant_website: knex.raw('excluded.merchant_website'),
        merchant_logo: knex.raw('excluded.merchant_logo'),
        // Only update is_subscription if it's null in the database (preserve user edits)
        is_subscription: knex.raw("CASE WHEN transactions.is_subscription IS NULL THEN excluded.is_subscription ELSE transactions.is_subscription END"),
        // Only update cycle if it's null in the database (preserve user edits)
        cycle: knex.raw("CASE WHEN transactions.cycle IS NULL THEN excluded.cycle ELSE transactions.cycle END"),
        updated_at: knex.fn.now(),
        // 👇 category fields intentionally excluded to preserve user changes
      })

    res.status(200).json({ message: 'Transactions synced successfully' })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Failed to sync transactions' })
  }
})

export default router
