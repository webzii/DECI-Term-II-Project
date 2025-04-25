import express from 'express'
import imageRoutes from './routes/imageRoutes'
import path from 'path'

const app = express()
const PORT = 3000

app.use(`/api`, imageRoutes)

// Static Files Access
app.use(`/images`, express.static(path.join(__dirname, `./images`)))

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`)
})
