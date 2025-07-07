import { fetchAkahuAccounts } from './akahuService.js'

async function main() {
  try {
    const accounts = await fetchAkahuAccounts()
    console.log(accounts)
  } catch (error) {
    console.error('Error fetching Akahu transactions:', error)
  }
}

main()
