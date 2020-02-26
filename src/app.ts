import express from 'express'
import cors from 'cors'
import * as bodyParser from 'body-parser'
import { appRouter } from './routes'
import { Services } from './services'
import { Config } from './config'
import Knex from 'knex'
import errorHandler from './utils/errorHandler'
import { notFound } from './routes/notFound'

export const createApp = (services: Services, config: Config, db: Knex) => {
  const app = express()

  app.use(cors())
  app.use(bodyParser.json())

  app.use('/api', appRouter(services))
  app.use('/api', notFound)

  app.use(errorHandler)

  return app
}
