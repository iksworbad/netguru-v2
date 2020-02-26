import { createServer } from 'http'
import { config } from './config'
import { createApp } from './app'
import Knex from 'knex'
import { createServices } from './services'

const setupDatabase = async (db: Knex) => {
  await db.migrate.latest()
}

const PORT = 8080
const db = Knex(config.database)

setupDatabase(db).catch((err) => {
  console.error(err)
  process.exit(1)
}).then(() => db.destroy())

const services = createServices(config)

const server = createServer(createApp(services, config, db))
server.listen(PORT)
server.on('listening', () => {
  console.log(`Listening on port: ${PORT}`)
})
