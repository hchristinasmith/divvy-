import 'dotenv/config'
import { fetchAkahuTransactions } from '../akahuService.js'

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

export async function seed(knex) {
  // Fetch data fresh
  const data = await fetchAkahuTransactions()

  // Helper function to detect if a transaction might be a subscription based on description
  const detectSubscription = (description) => {
    const subscriptionKeywords = [
      'netflix', 'spotify', 'disney+', 'disney plus', 'amazon prime', 'hulu', 
      'membership', 'subscription', 'monthly', 'recurring', 'apple music',
      'youtube premium', 'gym', 'fitness', 'audible', 'adobe', 'microsoft', 
      'icloud', 'google one', 'dropbox', 'insurance', 'phone bill', 'internet',
      'power', 'electricity', 'water', 'gas', 'rent', 'mortgage'
    ]
    
    const lowerDesc = description.toLowerCase()
    return subscriptionKeywords.some(keyword => lowerDesc.includes(keyword))
  }
  
  // Helper function to determine subscription cycle based on description or amount
  const determineSubscriptionCycle = (description, amount) => {
    const lowerDesc = description.toLowerCase()
    
    // Check for specific keywords in description
    if (lowerDesc.includes('annual') || lowerDesc.includes('yearly')) {
      return 'yearly'
    } else if (lowerDesc.includes('quarterly') || lowerDesc.includes('3 month')) {
      return 'quarterly'
    } else if (lowerDesc.includes('weekly') || lowerDesc.includes('7 day')) {
      return 'weekly'
    } else {
      // Default to monthly for most subscriptions
      return 'monthly'
    }
  }

  const transactionsSeeds = data.items.map((txn) => ({
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
    merchant_id: txn.merchant?._id || null,
    merchant_name: txn.merchant?.name || null,
    merchant_website: txn.merchant?.website || null,
    merchant_logo: txn.merchant?.logo || null,
    
    // Determine if transaction is a subscription and its cycle
    is_subscription: detectSubscription(txn.description),
    cycle: detectSubscription(txn.description) ? determineSubscriptionCycle(txn.description, txn.amount) : null
  }))

  // Delete all existing records
  await knex('transactions').del()
  // Insert new data
  await knex('transactions').insert(transactionsSeeds)
}
