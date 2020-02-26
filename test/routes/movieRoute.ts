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
  const externalAPI = {
    getData: sinon.stub().resolves({ title: 'terminator' })
  } as any


  before(async () => {
    db = Knex(config.database)
    mockServices = {
      movieService: new MovieService(externalAPI, db)
    } as Services
  })
  describe('POST /movie', () => {
    it('upload data to database by title and type', async () => {
      app = createApp(mockServices, config, db)
      const result = await chai.request(app)
        .post('/api/movie')
        .send({
          title: 'Terminator',
          type: 'movie'
        })
      expect(result.status).to.deep.eq(201)
      expect(result.body).to.deep.eq({ id: 1, movie: { title: 'terminator' } })
    })

    it('rejected by invalid data', async () => {
      app = createApp(mockServices, config, db)
      const res = await chai.request(app)
        .post('/api/movie')
        .send({
          title: 1,
        })
      expect(res.status).to.eq(400)
      expect(res.body.errors).to.deep.eq([{ expected: 'string', path: 'body.title' }])
    })

    afterEach(async () => {
      await db('movies').truncate()
    })
  })

  after(async () => {
    await db.destroy()
  })
})
