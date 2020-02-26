import { expect } from 'chai'
import Knex from 'knex'
import { config } from '../../src/config'
import { MovieService } from '../../src/services/MovieSerivce'
import sinon from 'sinon'
import { MovieNotFound } from '../../src/errors'

describe('MovieService', () => {
  let db: Knex
  let movieService: MovieService
  let externalAPI

  describe('addMovieToDataBase', () => {

    beforeEach(() => {
      db = Knex(config.database)
    })

    it('should add item to database', async () => {
      externalAPI = {
        getData: sinon.stub().resolves({ title: 'terminator' })
      }
      movieService = new MovieService(externalAPI as any, db)
      const res = await movieService.addMovieToDataBase({ title: 'terminator' } as any)
      expect(res).to.deep.eq({ id: 1, movie: { title: 'terminator' } })
    })

    it('should throw error if there is no movie from api provider', async () => {
      externalAPI = {
        getData: sinon.stub().rejects(new MovieNotFound())
      }
      movieService = new MovieService(externalAPI as any, db)
      await expect(movieService.addMovieToDataBase({ title: 'terminator' } as any)).to.rejectedWith((new MovieNotFound()).message)
    })

    afterEach(async () => {
      await db('movies').truncate()
    })
  })

  describe('getSavedMovies', () => {
    it('returns array of movies', async () => {
      movieService = new MovieService({} as any, db)
      await db('movies').insert({ movie: { movie: 'foo' } })
      await db('movies').insert({ movie: { movie: 'foo2' } })
      expect(await movieService.getSavedMovies()).to.deep.eq([{ id: 1, movie: { movie: 'foo' } }, { id: 2, movie: { movie: 'foo2' } }])
    })

    it('returns empty array if database is empty', async () => {
      movieService = new MovieService({} as any, db)
      expect(await movieService.getSavedMovies()).to.deep.eq([])
    })

    afterEach(async () => {
      await db('movies').truncate()
    })
  })

  after(async () => {
    await db.destroy()
  })
})
