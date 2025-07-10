import { join } from 'node:path'
import express from 'express'
import * as Path from 'node:path'
import * as URL from 'node:url'
import cors from 'cors'
import 'dotenv/config'
import akahu from './routes/Akahu/akahuRoutes.ts'
// import categories from './routes/categories.ts'
import transactions from './routes/Akahu/transactionsRoutes.ts'
import targets from './routes/targets.ts'

const __filename = URL.fileURLToPath(import.meta.url)
const __dirname = Path.dirname(__filename)

const server = express()

server.use(cors())
server.use(express.urlencoded({ extended: true }))
server.use(express.json())
server.use(express.static(join(__dirname, './public')))

server.use('/api/v1/accounts', akahu)
server.use('/api/v1/transactions', transactions)
server.use('/api/v1/targets', targets)

export default server
