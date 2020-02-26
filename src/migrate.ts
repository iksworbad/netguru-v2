import Knex from 'knex'
import { config } from './config'

(async () => {
  const knex = Knex(config.database)
  try {
    await knex.migrate.latest()
    await knex.destroy()
  } catch (e) {
    console.error(e)
    await knex.destroy()
    process.exit(1)
  }
})()
