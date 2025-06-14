// starter/server.ts
import express, { Request, Response, NextFunction } from 'express'
import path from 'path'
import imageRoutes from './routes/imageRoutes.js'
import { fileURLToPath } from 'url'
import { dirname } from 'path'

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

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

app.use((err: Error, req: Request, res: Response) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`)
})

export default app