import chai, { expect } from 'chai'
import { config } from '../../src/config'
import { createApp } from '../../src/app'
import { Express } from 'express'
import Knex from 'knex'

import sinon from 'sinon'
import { MovieService } from '../../src/services/MovieSerivce'
import { Services } from '../../src/services'
import {CommentsService} from '../../src/services/CommentsService';

describe('commentRoutes', () => {
  let app: Express
  let db: Knex
  let mockServices: Services
  const externalAPI = {
    getData: sinon.stub().resolves({ title: 'terminator' })
  } as any


  before(async () => {
    db = Knex(config.database)
    mockServices = {
      movieService: new MovieService(externalAPI, db),
      commentsService: new CommentsService(db)
    } as Services
  })

  describe('POST /comment', () => {
    it('upload comment when movie exists in database', async () => {
      app = createApp(mockServices, config, db)
      await db('movies').insert({movie:{bar: 'foo'}})
      const result = await chai.request(app)
        .post('/api/comment')
        .send({
          id_video: 1,
          comment: 'hello world'
        })

      expect(result.status).to.have.status(201)
      expect(result.body).to.deep.eq({ id: 1, id_video: 1, comment: "hello world"})
    })

    it('rejected by invalid data', async () => {
      app = createApp(mockServices, config, db)
      const res = await chai.request(app)
        .post('/api/comment')
        .send({
          id_video: 'a', // if here will me '1' it will be converted to number
          comment: 'hello'
        })
      expect(res).to.have.status(400)
      expect(res.body.errors).to.deep.eq([{ expected: 'number', path: 'body.id_video' }])
    })

    afterEach(async () => {
      await db('movies').truncate()
      await db('comments').truncate()
    })
  })

  after(async () => {
    await db.destroy()
  })
})
