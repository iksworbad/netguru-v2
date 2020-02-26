import { MovieService } from '../services/MovieSerivce'
import { Router } from 'express'
import { asyncHandler, responseOf, sanitize } from '@restless/restless'
import { asAnyOf, asNumber, asObject, asOptional, asString, asExactly } from '@restless/sanitizers'

export const moviesRoute = (movieService: MovieService) => {
  const router = Router()

  router.post('/movies', asyncHandler(
    sanitize({
      body: asObject({
        title: asString,
        type: asOptional(asAnyOf([asExactly('movie'), asExactly('series'), asExactly('episode')], 'Require type movie | series | episode')),
        plot: asOptional(asAnyOf([asExactly('short'), asExactly('long')], 'Require short | long plot')),
        year: asOptional(asNumber)
      }),
    }),
    async ({ body }) => responseOf(await movieService.addMovieToDataBase(body), 201)
  ))

  router.get('/movies', asyncHandler(
    async () => responseOf(await movieService.getSavedMovies(), 200),
  ))

  return router
}
