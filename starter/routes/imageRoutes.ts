import express, { Request, Response, Router } from 'express'
import multer from 'multer'
import path from 'path'
import fs from 'fs'
import { resizeImage } from '../services/imageService'

const router: Router = express.Router()

// === Multer Configuration ===
const storage = multer.diskStorage({
    destination: path.join(__dirname, '..', '..', 'uploads'),
    filename: (_req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`)
    }
})

const upload = multer({
    storage,
    limits: { fileSize: 15 * 1024 * 1024 }, // 15MB
    fileFilter: (_req, file, cb) => {
        const ext = path.extname(file.originalname).toLowerCase()
        if (ext === '.jpg' || ext === '.jpeg' || ext === '.png') {
            cb(null, true)
        } else {
            const error = new Error('Only .jpg, .jpeg, and .png files are allowed.')
            console.error('Multer fileFilter error:', error.message)
            cb(error)
        }
    }
})

// === Upload Handler ===
router.post('/upload', upload.single('image'), (req: Request, res: Response): void => {
    if (!req.file) {
        res.status(400).json({ error: 'No file uploaded or invalid file type.' })
        return
    }

    res.status(200).json({
        message: 'Image uploaded successfully',
        filename: req.file.filename
    })
})

// === Resize Handler ===
router.get('/resize', async (req: Request, res: Response): Promise<void> => {
    const { filename, width, height } = req.query

    if (
        !filename ||
        !width ||
        !height ||
        isNaN(Number(width)) ||
        isNaN(Number(height))
    ) {
        res.status(400).json({ error: 'Invalid query parameters.' })
        return
    }

    try {
        const resizedImagePath = await resizeImage(
            filename as string,
            Number(width),
            Number(height)
        )
        res.sendFile(resizedImagePath)
    } catch (err: any) {
        res.status(500).json({ error: `Failed to resize image: ${err.message}` })
    }
})

// === Image Listing Handler ===
router.get('/images', (req: Request, res: Response): void => {
    const uploadsDir = path.join(__dirname, '..', '..', 'uploads')

    fs.readdir(uploadsDir, (err, files) => {
        if (err) {
            console.error('Failed to read uploads directory:', err)
            res.status(500).json({ error: 'Could not read uploads folder' })
            return
        }

        const images = files.filter(file => /\.(jpg|jpeg|png)$/i.test(file))
        res.status(200).json(images)
    })
})

export default router