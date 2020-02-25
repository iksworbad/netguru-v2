import { app } from './app'
import { createServer } from 'http'

const PORT = 8080

const server = createServer(app)
server.listen(PORT)
server.on('listening', () => {
  console.log(`Listening on port: ${PORT}`)
})
