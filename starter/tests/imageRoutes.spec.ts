import supertest from 'supertest'
import app from '../server'
import request from 'supertest'

describe('Test Api imageProcessing', () => {
  describe('Endpoint : / ', () => {
    it('get / ', async () => {
      let response: supertest.Response = await request(app).get('/')
      expect(response.statusCode).toBe(404)
    })
    it('get /api ', async () => {
      let response: supertest.Response = await request(app).get('/api')
      expect(response.statusCode).toBe(200)
    })
    it('get /api/images', async () => {
      let response: supertest.Response = await request(app).get(
        '/api/images?filename=fjord'
      )
      expect(response.statusCode).toBe(200)
    })
  })
})