import express from 'express'
import cors from 'cors'
import * as bodyParser from 'body-parser'
import {appRouter} from './routes'
import {unknownEndpoint} from './middleware/unknownEndpoint'

const app = express()

app.use(cors())
app.use(bodyParser.json())

app.use('/api', appRouter());
// Throw 404 error for unknown API routes
app.use('/api', unknownEndpoint)

export { app }
