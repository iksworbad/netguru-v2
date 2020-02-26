import { ExternalApi } from './ExternalAPI'
import Knex from 'knex'
import { MovieProps } from '../models/MovieProps'

export class MovieService {
  constructor(private externalApi: ExternalApi, private knex: Knex) {}

  async addMovieToDataBase(movieProps: MovieProps) {
    const movie = await this.externalApi.getData(movieProps)
    const id = await this.knex('movies')
      .insert({ movie: JSON.stringify(movie) }, 'id')
    return { id: id[0], movie }
  }
}
