// eslint-env jasmine

import request from 'supertest'
import app from '../../starter/server'

describe('GET /api/images/resize', () => {
    it('should return 200 and a JPEG image when valid params are provided', async () => {
        const res = await request(app).get(
            '/api/images/resize?filename=fjord.jpg&width=300&height=300'
        )
        expect(res.status).toBe(200)
        expect(res.headers['content-type']).toContain('image/jpeg')
    })

    it('should return 400 if missing params', async () => {
        const res = await request(app).get('/api/images/resize?filename=fjord.jpg')
        expect(res.status).toBe(400)
    })

    it('should return 500 for non-existent image', async () => {
        const res = await request(app).get(
            '/api/images/resize?filename=nonexistent.jpg&width=200&height=200'
        )
        expect(res.status).toBe(500)
    })
})