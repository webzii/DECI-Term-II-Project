import request from 'request'
import app from '../server'

describe(`GET /api/resize`, () => {
    it(`should return a resized image with the correct content type`, (done) => {
        const url = `http://localhost:3000/api/resize?filename=fjord.jpg&width=300&height=300`

        request.get(url, (error, response, body) => {
            expect(response.statusCode).toBe(200)
            expect(response.headers[`content-type`]).toContain(`image/jpeg`)
            done()
        })
    })

    it(`should return 400 if the required parameters are missing`, (done) => {
        const url = `http://localhost:3000/api/resize?filename=fjord.jpg`

        request.get(url, (error, response, body) => {
            expect(response.statusCode).toBe(400)
            done()
        })
    })

    it(`should return 500 if the image processing fails`, (done) => {
        const url = `http://localhost:3000/api/resize?filename=nonexistent.jpg&width=300&height=300`

        request.get(url, (error, response, body) => {
            expect(response.statusCode).toBe(500)
            done()
        })
    })
})