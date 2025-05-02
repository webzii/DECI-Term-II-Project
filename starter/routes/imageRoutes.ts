import express, { RequestHandler, Request, Response } from 'express'
import { resizeImage } from '../services/imageService'
import upload from '../uploadConfig' // Importing the Multer config
import fs from 'fs'
import path from 'path'

const router = express.Router()

// Handler: Resize Image Endpoint
const resizeHandler: RequestHandler = async (req, res) => {
    const {filename, width, height} = req.query

    if (
        !filename ||
        !width ||
        !height ||
        isNaN(Number(width)) ||
        isNaN(Number(height))
    ) {
        res.status(400).json({error: 'Invalid query parameters'})
    }

    try {
        const resizedImagePath = await resizeImage(
            filename as string,
            Number(width),
            Number(height)
        )

        res.sendFile(resizedImagePath)
    } catch (err: any) {
        res.status(500).json({error: `Failed to process image: ${err.message}`})
    }
}

// Handler: Upload Image Endpoint
const uploadHandler: RequestHandler = (req, res) => {
    if (!req.file) {
        res.status(400).json({error: `No file uploaded`})
        return
    }

    console.log('Uploaded File: ', req.file)

    res.status(200).json({
        message: `File Uploaded Successfully`,
        file: req.file.filename,
    })
}

// Handler: Get List of Uploaded Images Filenames
const listImagesHandler: RequestHandler = (req, res) => {
    const uploadsDir = path.join(__dirname, '..', '..', 'uploads')
    console.log('Reading from: ', uploadsDir)

    fs.readdir(uploadsDir, (err, files) => {
        if (err) {
            console.error('Failed to read uploads Directory: ', err)
            return res.status(500).json({error: 'Could not read uploads folder'})
        }

        const images = files.filter(file =>
            /\.(jpg|jpeg|png|gif)$/i.test(file)
        )

        res.status(200).json(images)
    })
}

// Route Mapping
router.get('/resize', resizeHandler)
router.post('/upload', upload.single('image'), uploadHandler)
router.get('/images', listImagesHandler)

export default router