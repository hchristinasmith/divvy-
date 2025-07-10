// testAkahu.js
import { fetchAkahuAccounts, fetchAkahuTransactions } from './server/db/akahuService.js'

// Fetch accounts
fetchAkahuAccounts()
  .then((data) => {
    console.log('✅ Akahu Accounts:', JSON.stringify(data, null, 2))
  })
  .catch((err) => {
    console.error('❌ Error fetching Akahu accounts:', err.message)
  })

// Fetch transactions
fetchAkahuTransactions()
  .then((data) => {
    console.log('✅ Akahu Transactions:', JSON.stringify(data, null, 2))
  })
  .catch((err) => {
    console.error('❌ Error fetching Akahu transactions:', err.message)
  })
