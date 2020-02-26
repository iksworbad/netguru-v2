import { Config } from '../config'
import fetch from 'node-fetch'
import { Response } from 'express'
import { Movie } from '../models/Movie'
import { MovieNotFound } from '../errors'
import { MovieProps } from '../models/MovieProps'

export class ExternalApi {
  constructor(private config: Config) {}

  async getData({ title, type, plot, year }: MovieProps) {
    try {
      return http<Movie>(this.prepareURL(title, type, plot, year))
    } catch (err) {
      console.log(err)
      throw new MovieNotFound()
    }
  }

  prepareURL(title: string, type: string | undefined, plot: string | undefined, year: number | undefined) {
    let url = `http://www.omdbapi.com/?apikey=${this.config.apiKey}`
    url = url.concat(`&t=${title}`)
    if (type) { url = url.concat(`&type=${type}`) }
    if (plot) { url = url.concat(`&plot=${plot}`) }
    if (year) { url = url.concat(`&y=${year}`) }
    return url
  }
}

interface HttpResponse<T> extends Response {
  parsedBody?: T
}

export async function http<T>(
  request: string
): Promise<HttpResponse<T>> {
  const response = await fetch(request)
  return response.json()
}
