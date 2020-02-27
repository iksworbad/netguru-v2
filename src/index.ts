import { createServer } from 'http'
import { config } from './config'
import { createApp } from './app'
import Knex from 'knex'
import { createServices } from './services'

const setupDatabase = async (db: Knex) => {
  await db.migrate.latest()
}

export const startServer = async () => {
  const db = Knex(config.database)
  console.log(config.database)

  setupDatabase(db).catch((err) => {
    console.error(err)
    process.exit(1)
  }).then(() => db.destroy())

  const services = createServices(config, db)

  const server = createServer(createApp(services))
  server.listen(config.port)
  server.on('listening', () => {
    console.log(`Listening on port: ${config.port}`)
  })


  return async function stopServer() {
    await db.destroy()
    server.close()
  }
}

startServer().catch(console.error);
