import Knex from 'knex'
import dotenv from 'dotenv'

dotenv.config()

const knexConfigs = require('../knexfile')
const Mode = 'development' || process.env.NODE_ENV
const knexConfig = knexConfigs[Mode]
export const knex = Knex(knexConfig)
