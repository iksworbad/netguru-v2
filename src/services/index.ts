import { Config } from '../config'
import Knex from 'knex'
import { ExternalApi } from './ExternalAPI'
import { MovieService } from './MovieSerivce'

export type Services = ReturnType<typeof createServices>

export function createServices(config: Config) {
  const knex = Knex(config.database)
  const externalApi = new ExternalApi(config)
  const movieService = new MovieService(externalApi, knex)

  return {
    knex,
    externalApi,
    movieService
  }
}
