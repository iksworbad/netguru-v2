import Knex from 'knex'
import { MovieNotExistInDatabase } from '../errors'

export class CommentsService {
  constructor(private knex: Knex) {}

  async addComment(videoId: number, comment: string) {
    const videoExistsInDB = await this.knex('movies').where({ id: videoId }).select().first()
    if (!videoExistsInDB) { throw new MovieNotExistInDatabase() }
    const id = await this.knex('comments')
      .insert({ id_video: videoId, comment }, 'id')
    return { id: id[0], id_video: videoId, comment }
  }

  async getAllComments() {
    return this.knex('comments').select()
  }
}
