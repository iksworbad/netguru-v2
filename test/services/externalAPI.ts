import { expect } from 'chai'

import { ExternalApi } from '../../src/services/ExternalAPI'
import { Config } from '../../src/config'

describe('externalAPI', () => {

  const externalAPI = new ExternalApi({ apiKey: 'key' } as Config)

  describe('prepareURL', () => {

    it('returns URL to fetch data without year', () => {
      const url = externalAPI.prepareURL('title', 'type', 'plot', undefined)
      expect(url).to.eq('http://www.omdbapi.com/?apikey=key&t=title&type=type&plot=plot')
    })

    it('returns URL to fetch data with all inputs', () => {
      const url = externalAPI.prepareURL('title', 'type', 'plot', 2020)
      expect(url).to.eq('http://www.omdbapi.com/?apikey=key&t=title&type=type&plot=plot&y=2020')
    })

    it('returns URL to fetch data with only title', () => {
      const url = externalAPI.prepareURL('title', undefined, undefined, undefined)
      expect(url).to.eq('http://www.omdbapi.com/?apikey=key&t=title')
    })
  })
})
