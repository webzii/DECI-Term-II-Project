import express, {Request, Response, NextFunction} from 'express'
import imageRoutes from './routes/imageRoutes'
import path from 'path'

const app = express() // Create an instance of the express app
const PORT = 3000 // Define the port where the server will run

// Serve Frontend Static Files from the 'public' folder
app.use(express.static(path.join(__dirname, `..`, `starter`, `public`))) // Serve static assets like HTML, CSS, and JS files

// Serve Uploaded Images
app.use(`/uploads`, express.static(path.join(__dirname, `..`, `uploads`))) // Serve uploaded images from the 'uploads' directory

// API Routes
app.use(`/api`, imageRoutes) // Register image-related API routes under the '/api' path

// Fallback to index.html for root access
app.get(`/`, (_req, res) => { // Serve the main HTML page when visiting the root URL
    res.sendFile(path.join(__dirname, `..`, `starter`, `public`, `index.html`)) // Send the 'index.html' file as a response
})

app.listen(PORT, () => { // Start the server and listen on the specified port
    console.log(`Server is running at http://localhost:${PORT}`) // Log the server URL to the console
})

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error('[SERVER ERROR]', err.message);
    res.status(500).json({ error: err.message });
});

export default app // Export the app instance for use in other files (e.g., testing, server setup)