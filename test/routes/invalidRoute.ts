import chai, { expect } from 'chai'

import { createApp } from '../../src/app'
import { config } from '../../src/config'
import Knex from 'knex'
import { Services } from '../../src/services'


describe('invalid route', () => {
  it('return error for not existing endpoint', async () => {
    const db = Knex(config.database)
    const app = createApp({} as Services, config, db)
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    const res = await chai.request(app)
      .get('/api/INVALID').send()
    expect(res).to.have.status(404)
    expect(res.body.message).to.eq('Cannot GET /INVALID')
  })
})
