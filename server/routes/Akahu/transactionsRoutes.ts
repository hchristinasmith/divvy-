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
        'transactions.merchant_name',
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
  const { category_name, category_id, category_group_id, category_group_name } =
    req.body
  if (isNaN(id)) {
    return res.status(400).json({ error: 'Invalid transaction id' })
  }
  try {
    const updated = await knex('transactions').where({ id }).update({
      category_name,
      category_id,
      category_group_id,
      category_group_name,
      updated_at: knex.fn.now(),
    })
    console.log('PATCH /transactions/:id', { id, reqBody: req.body })

    if (updated === 0) {
      return res.status(404).json({ error: 'Transaction not found' })
    }

    res.status(200).json({ message: 'Category updated successfully' })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Failed to update transaction category' })
  }
})

//POST /api/v1/transactions/sync
router.post('/sync', async (req, res) => {
  try {
    const data = await fetchAkahuTransactions()

    const transactions = data.items.map((txn) => ({
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
      // Don't overwrite these in merge
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
      merchant_id: txn.merchant?._id || null,
      merchant_name: txn.merchant?.name || null,
      merchant_website: txn.merchant?.website || null,
      merchant_logo: txn.merchant?.logo || null,
    }))

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
