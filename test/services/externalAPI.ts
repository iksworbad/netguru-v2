import { expect } from 'chai'

import { ExternalApi } from '../../src/services/ExternalAPI'
import { Config } from '../../src/config'

describe('externalAPI', () => {

  const externalAPI = new ExternalApi({ apiKey: 'key' } as Config)

  describe('prepareURL', () => {

    const exampleData = [
      { data: { title: 'title', type: undefined, plot: undefined, year: undefined }, result: 'http://www.omdbapi.com/?apikey=key&t=title' },
      { data: { title: 'title', type: 'type', plot: undefined, year: undefined }, result: 'http://www.omdbapi.com/?apikey=key&t=title&type=type' },
      { data: { title: 'title', type: 'type', plot: 'plot', year: undefined }, result: 'http://www.omdbapi.com/?apikey=key&t=title&type=type&plot=plot' },
      { data: { title: 'title', type: undefined, plot: 'plot', year: undefined }, result: 'http://www.omdbapi.com/?apikey=key&t=title&plot=plot' },
      { data: { title: 'title', type: undefined, plot: undefined, year: 2020 }, result: 'http://www.omdbapi.com/?apikey=key&t=title&y=2020' },
      { data: { title: 'title', type: 'type', plot: 'plot', year: 2020 }, result: 'http://www.omdbapi.com/?apikey=key&t=title&type=type&plot=plot&y=2020' },
    ]
    exampleData.forEach(({ data, result }) => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      const keys = Object.keys(data).filter(x => data[x])
      it(`returns URL to fetch data with ${keys}`, () => {
        const url = externalAPI.prepareURL(data.title, data.type, data.plot, data.year)
        expect(url).to.eq(result)
      })
    })

  })
})
