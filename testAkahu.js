// testAkahu.js
import { fetchAkahuAccounts } from './server/db/akahuService.js'

fetchAkahuAccounts()
  .then((data) => {
    console.log('✅ Akahu Accounts:', JSON.stringify(data, null, 2))
  })
  .catch((err) => {
    console.error('❌ Error fetching Akahu accounts:', err.message)
  })
