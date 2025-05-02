import express from 'express'
import imageRoutes from './routes/imageRoutes'
import path from 'path'

const app = express() // Create an instance of the express app

// Middleware to parse JSON request bodies
app.use(express.json())

// Middleware to parse URL-encoded data from requests
app.use(express.urlencoded({
    extended: true // Allow extended syntax for handling complex objects
}))

// Set up the imageRoutes for handling all routes starting with /api/images
app.use('/api/images', imageRoutes)

export default app // Export the app instance to be used in other files (e.g., server setup)