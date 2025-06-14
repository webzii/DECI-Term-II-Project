// starter/server.ts
import express, { Request, Response, NextFunction } from 'express'
import path from 'path'
import imageRoutes from './routes/imageRoutes'

const app = express()
const PORT = 3000

app.use(express.static(path.join(__dirname, 'public')))
app.use(`/uploads`, express.static(path.join(__dirname, `..`, `uploads`)))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api', imageRoutes)

app.get('/', (_req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'))
})

app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
    console.error('[SERVER ERROR]', err.message)
    res.status(500).json({ error: err.message })
})

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`)
})

export default app