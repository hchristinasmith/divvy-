import 'dotenv/config'
import knex from 'knex'
import knexConfig from './knexfile.js'

const db = knex(knexConfig.development)

async function runSeeds() {
  try {
    await db.seed.run({
      directory: './server/db/seeds',
    })
    console.log('Seeds ran successfully')
  } catch (err) {
    console.error('Error running seeds:', err)
  } finally {
    await db.destroy()
  }
}

runSeeds()
