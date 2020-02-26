import { Router } from 'express'
import { moviesRoute } from './moviesRoute'
import { Services } from '../services'

export function appRouter(services: Services) {
  const router = Router()

  router.use(moviesRoute(services.movieService))

  return router
}
