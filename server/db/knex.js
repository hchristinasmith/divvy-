import Knex from 'knex'
import config from '../db/knexfile'

const environment = process.env.NODE_ENV || 'development'
const knexConfig = config[environment]

const knex = Knex(knexConfig)

export default knex
