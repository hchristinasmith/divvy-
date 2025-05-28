import { join } from 'node:path'
import express from 'express'
import * as Path from 'node:path'
import * as URL from 'node:url'
import cors from 'cors'
import 'dotenv/config'

import akahu from './routes/akahu.ts'

const __filename = URL.fileURLToPath(import.meta.url)
const __dirname = Path.dirname(__filename)

const server = express()

server.use(cors())
server.use(express.urlencoded({ extended: true }))
server.use(express.json())
server.use(express.static(join(__dirname, './public')))

server.use('/api/v1/accounts', akahu)

export default server
