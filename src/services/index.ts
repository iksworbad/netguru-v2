import { Config } from '../config'
import Knex from 'knex'
import { ExternalApi } from './ExternalAPI'
import { MovieService } from './MovieSerivce'
import { CommentsService } from './CommentsService'

export type Services = ReturnType<typeof createServices>

export function createServices(config: Config, knex: Knex) {
  const externalApi = new ExternalApi(config)
  const movieService = new MovieService(externalApi, knex)
  const commentsService = new CommentsService(knex)

  return {
    knex,
    externalApi,
    movieService,
    commentsService
  }
}
