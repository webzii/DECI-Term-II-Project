import express from 'express'
import imageRoutes from './routes/imageRoutes'
import path from 'path'

const app = express()
const PORT = 3000

// Serve Frontend Static Files from the 'public' folder
app.use(express.static(path.join(__dirname, `..`, `starter`, `public`)))

// Serve Uploaded Images
app.use(`/uploads`, express.static(path.join(__dirname, `..`, `uploads`)))

// API Routes
app.use(`/api`, imageRoutes)

// Fallback to index.html for root access
app.get(`/`, (_req, res) => {
    res.sendFile(path.join(__dirname, `..`, `starter`, `public`, `index.html`))
})

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`)
})

export default app