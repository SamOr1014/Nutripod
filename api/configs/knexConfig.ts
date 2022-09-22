import Knex from 'knex'
import dotenv from 'dotenv'

dotenv.config()

const knexConfigs = require('../knexfile')
const Mode = process.env.NODE_ENV || 'development'
const knexConfig = knexConfigs[Mode]
export const knex = Knex(knexConfig)
