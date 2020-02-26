import { Router } from 'express'
import { asyncHandler, responseOf, sanitize } from '@restless/restless'
import { asNumber, asObject, asString } from '@restless/sanitizers'
import {CommentsService} from '../services/CommentsService';

export const commentsRoute = (commentsService: CommentsService) => {
  const router = Router()

  router.post('/comment', asyncHandler(
    sanitize({
      body: asObject({
        id_video: asNumber,
        comment: asString,
      }),
    }),
    async ({ body }) => responseOf(await commentsService.addComment(body.id_video, body.comment), 201)
  ))

  router.get('/movie', asyncHandler(
    async () => responseOf(await commentsService.getAllComments(), 200),
  ))

  return router
}
