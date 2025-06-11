import { spending } from '../../../spending.js'

const transactionsSeeds = spending.items.map((txn) => {
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
    category_group_id: txn.category?.groups.personal_finance._id || null,
    category_group_name: txn.category?.groups.personal_finance.name || null,
    particulars: txn.meta.particulars || null,
    code: txn.meta.code || null,
    reference: txn.meta.reference || null,
    other_account: txn.meta.other_account || null,
    logo: txn.meta.logo || null,
    conversion_amount: txn.meta.conversion_amount || null,
    conversion_currency: txn.meta.conversion_currency || null,
    conversion_rate: txn.meta.conversion_rate || null,
    card_suffix: txn.meta.card_suffix || null,
    merchant_id: txn.merchant?._id || null,
    merchant_name: txn.merchant?.name || null,
    merchant_website: txn.merchant?.website || null,
    merchant_logo: txn.merchant?.logo || null,
  }
})

console.log(transactionsSeeds)

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

export async function seed(knex) {
  // Deletes ALL existing entries
  await knex('transactions').del()
  await knex('transactions').insert(transactionsSeeds)
}
