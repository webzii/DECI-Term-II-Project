import request from 'supertest'
import app from '../starter/server'
import path from 'path'

describe('POST /api/upload', () => {
  it('should upload an image successfully', async () => {
    const res = await request(app)
      .post('/api/upload')
      .attach('image', path.join(__dirname, '../images/sample.jpg'))

    expect(res.statusCode).toBe(200)
    expect(res.body.message).toContain('uploaded successfully')
  })
})
