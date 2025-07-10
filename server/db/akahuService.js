import axios from 'axios'
import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'

// Get the directory path
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const rootPath = path.resolve(__dirname, '../../')

// Load variables from .env with explicit path
dotenv.config({ path: path.resolve(rootPath, '.env') })

const token = process.env.AKAHU_USER_TOKEN
const appId = process.env.AKAHU_APP_ID

export async function fetchAkahuTransactions() {
  if (!token) {
    throw new Error('Missing AKAHU_USER_TOKEN in environment variables.')
  }

  const response = await axios.get('https://api.akahu.io/v1/transactions', {
    headers: {
      Authorization: `Bearer ${token}`,
      'X-Akahu-Id': appId,
      'Content-Type': 'application/json',
    },
  })

  return response.data
}

export async function fetchAkahuAccounts() {
  if (!token || !appId) {
    throw new Error(
      'Missing AKAHU_USER_TOKEN or AKAHU_APP_ID in environment variables.',
    )
  }

  const response = await axios.get('https://api.akahu.io/v1/accounts', {
    headers: {
      Authorization: `Bearer ${token}`,
      'X-Akahu-Id': appId,
      'Content-Type': 'application/json',
    },
  })

  return response.data
}
