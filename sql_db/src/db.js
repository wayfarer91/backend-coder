import { config } from './configsqlite.js'
import knex from 'knex'

export const db = knex(config)
