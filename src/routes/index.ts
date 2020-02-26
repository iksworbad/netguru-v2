import { Router } from 'express'
import { moviesRoute } from './moviesRoute'
import { Services } from '../services'
import { commentsRoute } from './commentsRoute'

export function appRouter(services: Services) {
  const router = Router()

  router.use(moviesRoute(services.movieService))
  router.use(commentsRoute(services.commentsService))

  return router
}
