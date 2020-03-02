import Knex from 'knex'
import { config } from './config'

(async () => {
  const knex = Knex(config.database)
  try {
    await knex.migrate.latest()
  } catch (e) {
    console.error(e)
    await knex.destroy()
    process.exit(1)
  }
  process.exit(0)
})()
