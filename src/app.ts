import express from 'express'
import cors from 'cors'
import * as bodyParser from 'body-parser'
import { appRouter } from './routes'
import { Services } from './services'
import errorHandler from './utils/errorHandler'
import { notFound } from './routes/notFound'

export const createApp = (services: Services) => {
  const app = express()

  app.use(cors())
  app.use(bodyParser.json())

  app.use('/api', appRouter(services))
  app.use('/api', notFound)
  app.use('/', notFound)

  app.use(errorHandler)

  return app
}
