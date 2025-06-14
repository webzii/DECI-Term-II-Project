 
import request from 'request'
import app from '../server'

// Test suite for the GET /api/resize endpoint
describe(`GET /api/resize`, () => {

    // Test: Should return a resized image and correct content type
    it(`should return a resized image with the correct content type`, (done) => {
        const url = `http://localhost:3000/api/resize?filename=fjord.jpg&width=300&height=300`

        // Make GET request to resize endpoint 
        request.get(url, (error, response, body) => {
            expect(response.statusCode).toBe(200) // Expect success status code
            expect(response.headers[`content-type`]).toContain(`image/jpeg`) // Expect image MIME type
            done() // Signal test completion
        })
    })

    // Test: Should return 400 Bad Request if required parameters are missing
    it(`should return 400 if the required parameters are missing`, (done) => {
        const url = `http://localhost:3000/api/resize?filename=fjord.jpg`

        // Make GET request with missing width/height
        request.get(url, (error, response, body) => {
            expect(response.statusCode).toBe(400) // Expect bad request status code
            done() // Signal test completion
        })
    })

    // Test: Should return 500 Internal Server Error if image processing fails
    it(`should return 500 if the image processing fails`, (done) => {
        const url = `http://localhost:3000/api/resize?filename=nonexistent.jpg&width=300&height=300`

        // Make GET request with a non-existent image file
        request.get(url, (error, response, body) => {
            expect(response.statusCode).toBe(500) // Expect internal server error status code
            done() // Signal test completion
        })
    })
})