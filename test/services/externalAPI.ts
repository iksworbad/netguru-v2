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
      // @ts-ignore
      it(`returns URL to fetch data with ${Object.keys(data).filter(x => data[x])}`, () => {
        const url = externalAPI.prepareURL(data.title, data.type, data.plot, data.year)
        expect(url).to.eq(result)
      })
    })

  })
})
