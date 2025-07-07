const router = express.Router()
import type { AccountItem } from '../../db/types/akahu'
// GET 'https://api.akahu.io/v1'

import express from 'express'
import { fetchAkahuAccounts } from 'server/db/akahuService'
import knex from 'server/db/knex'
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

router.post('/sync', async (req, res) => {
  try {
    const data = await fetchAkahuAccounts()

    const accounts = data.items.map((acc) => ({
      akahu_id: acc._id,
      _authorisation: acc._authorisation || null,
      _credentials: acc._credentials || null,
      connection_id: acc._connection,
      connection_name: acc.connection_name || null,
      connection_logo: acc.connection_logo || null,
      name: acc.name,
      formatted_account: acc.formatted_account || null,
      status: acc.status,
      type: acc.type,
      attributes: JSON.stringify(acc.attributes || []),
      currency: acc.currency,
      current_balance: acc.current_balance,
      overdrawn: acc.overdrawn,
      holder: acc.holder || null,
      fees: acc.fees || 0,
      employer_contributions: acc.employer_contributions || 0,
      member_tax_credit: acc.member_tax_credit || 0,
      personal_contributions: acc.personal_contributions || 0,
      previous_balance: acc.previous_balance || 0,
      returns: acc.returns || 0,
      tax: acc.tax || 0,
      withdrawals: acc.withdrawals || 0,
      refreshed_balance: acc.refreshed_balance
        ? new Date(acc.refreshed_balance)
        : null,
      refreshed_meta: acc.refreshed_meta ? new Date(acc.refreshed_meta) : null,
      created_at: new Date(),
      updated_at: new Date(),
    }))

    await knex('accounts')
      .insert(accounts)
      .onConflict('akahu_id')
      .merge({
        _authorisation: knex.raw('excluded._authorisation'),
        _credentials: knex.raw('excluded._credentials'),
        connection_id: knex.raw('excluded.connection_id'),
        connection_name: knex.raw('excluded.connection_name'),
        connection_logo: knex.raw('excluded.connection_logo'),
        name: knex.raw('excluded.name'),
        formatted_account: knex.raw('excluded.formatted_account'),
        status: knex.raw('excluded.status'),
        type: knex.raw('excluded.type'),
        attributes: knex.raw('excluded.attributes'),
        currency: knex.raw('excluded.currency'),
        current_balance: knex.raw('excluded.current_balance'),
        overdrawn: knex.raw('excluded.overdrawn'),
        holder: knex.raw('excluded.holder'),
        fees: knex.raw('excluded.fees'),
        employer_contributions: knex.raw('excluded.employer_contributions'),
        member_tax_credit: knex.raw('excluded.member_tax_credit'),
        personal_contributions: knex.raw('excluded.personal_contributions'),
        previous_balance: knex.raw('excluded.previous_balance'),
        returns: knex.raw('excluded.returns'),
        tax: knex.raw('excluded.tax'),
        withdrawals: knex.raw('excluded.withdrawals'),
        refreshed_balance: knex.raw('excluded.refreshed_balance'),
        refreshed_meta: knex.raw('excluded.refreshed_meta'),
        updated_at: knex.fn.now(),
      })

    res.status(200).json({ message: 'Accounts synced successfully' })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Failed to sync accounts' })
  }
})
export default router
