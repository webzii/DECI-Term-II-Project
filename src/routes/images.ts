import express, { Request, Response } from 'express'
import path from 'path'
import fs from 'fs'
import { fileURLToPath } from 'url'
import { resizeImage } from '../utils/imageProcessor.js'
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const router = express.Router()

router.get('/gallery', (_req: Request, res: Response): void => {
  const fullDir = path.join(__dirname, '../../images/full')

  fs.readdir(fullDir, (err, files) => {
    if (err) {
      res.status(500).send('Failed to read image folder')
      return
    }

    const jpgFiles = files.filter((file) =>
      file.toLowerCase().endsWith('.jpg'),
    )
    res.json(jpgFiles)
  })
})

router.get('/', async (req: Request, res: Response): Promise<void> => {
  const { filename, width, height } = req.query

  if (!filename || !width || !height) {
    res.status(400).send('Missing required parameters')
    return
  }

  try {
    const resizedImagePath = await resizeImage(
      filename as string,
      parseInt(width as string),
      parseInt(height as string),
    )
    res.sendFile(resizedImagePath)
  } catch (err) {
    console.error('Image processing failed:', err)
    res.status(500).send('Image processing failed')
  }
})

export default router
