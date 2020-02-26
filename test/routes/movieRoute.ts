import chai, { expect } from 'chai'
import { config } from '../../src/config'
import { createApp } from '../../src/app'
import { Express } from 'express'
import Knex from 'knex'

import sinon from 'sinon'
import { MovieService } from '../../src/services/MovieSerivce'
import { Services } from '../../src/services'

describe('movieRoutes', () => {
  let app: Express
  let db: Knex
  let mockServices: Services
  let request: ChaiHttp.Agent
  const externalAPI = {
    getData: sinon.stub().resolves({ title: 'terminator' })
  } as any


  before(async () => {
    db = Knex(config.database)
    mockServices = {
      movieService: new MovieService(externalAPI, db)
    } as Services
  })

  beforeEach(() => {
    app = createApp(mockServices, config, db)
    request = chai.request(app)
  })

  it('POST /movies upload data to database by title and type', async () => {
    app = createApp(mockServices, config, db)
    const result = await request
      .post('/api/movies')
      .send({
        title: 'Terminator',
        type: 'movie'
      })
    expect(result).to.have.status(201)
    expect(result.body).to.deep.eq({ id: 1, movie: { title: 'terminator' } })
  })

  it('POST /movies rejected by invalid data', async () => {
    app = createApp(mockServices, config, db)
    const res = await request
      .post('/api/movies')
      .send({
        title: 1,
      })
    expect(res).to.have.status(400)
    expect(res.body.errors).to.deep.eq([{ expected: 'string', path: 'body.title' }])
  })

  it(' GET /movies returns empty array if db is empty', async () => {
    const res = await request
      .get('/api/movies')
      .send()
    expect(res).to.have.status(200)
    expect(res.body).to.deep.eq([])
  })

  it(' GET /movies returns all date from db', async () => {
    await db('movies').insert({ movie: JSON.stringify({ foo: 'bar' }) })
    const res = await request
      .get('/api/movies')
      .send()
    expect(res).to.have.status(200)
    expect(res.body).to.deep.eq([{ id: 1, movie: { foo: 'bar' } }])
  })

  afterEach(async () => {
    await db('movies').truncate()
  })

  after(async () => {
    await db.destroy()
  })
})
