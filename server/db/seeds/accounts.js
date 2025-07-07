import 'dotenv/config'
import { fetchAkahuAccounts } from '../akahuService.js'

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  // Fetch fresh accounts data
  const data = await fetchAkahuAccounts()

  // Map the API data to match your 'accounts' table columns
  const accountsSeeds = data.items.map((acc) => ({
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

  // Clear existing accounts records
  await knex('accounts').del()

  // Insert new accounts data
  await knex('accounts').insert(accountsSeeds)
}
