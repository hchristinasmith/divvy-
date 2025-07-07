import { fetchAkahuTransactions } from './akahuService.js'

async function main() {
  try {
    const transactions = await fetchAkahuTransactions()
    console.log(transactions)
  } catch (error) {
    console.error('Error fetching Akahu transactions:', error)
  }
}

main()
