import { expect } from 'chai'
import Knex from 'knex'
import { config } from '../../src/config'
import {MovieNotExistInDatabase} from '../../src/errors'
import {CommentsService} from '../../src/services/CommentsService';
import sinon from 'sinon';
import {MovieService} from '../../src/services/MovieSerivce';

describe('CommentsService', () => {
  let db: Knex
  let commentsService: CommentsService
  const externalAPI = {
    getData: sinon.stub().resolves({ title: 'terminator' })
  }
  let movieService: MovieService

  beforeEach(() => {
    db = Knex(config.database)
    commentsService = new CommentsService(db)
    movieService = new MovieService(externalAPI as any, db)
  })

  it('returns just added object to database', async () => {
    await movieService.addMovieToDataBase({ title: 'terminator' } as any)
    expect(await commentsService.addComment(1, 'foo')).to.deep.eq({ id: 1, 'id_video': 1, comment: 'foo' })
  })

  it('throws error for not exist movie in database', async () => {
    await expect(commentsService.addComment(1, 'foo' )).to.rejectedWith((new MovieNotExistInDatabase()).message)
  })

  it('returns array of comments', async () => {
    await movieService.addMovieToDataBase({ title: 'terminator' } as any)
    await commentsService.addComment(1, 'foo')
    const res = await commentsService.getAllComments()
    expect(res).to.deep.eq([{ id: 1, 'id_video': 1, comment: 'foo' }])
  })

  afterEach(async () => {
    await db('movies').truncate()
    await db('comments').truncate()
  })

  after(async () => {
    await db.destroy()
  })
})
