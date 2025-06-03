import express, { RequestHandler, Request, Response } from 'express'
import { resizeImage } from '../services/imageService'
import upload from '../uploadConfig' // Importing the Multer config
import fs from 'fs'
import path from 'path'
import multer from 'multer'

const router = express.Router() // Create an instance of Express router

// Handler: Resize Image Endpoint
const resizeHandler: RequestHandler = async (req, res) => {
    const {filename, width, height} = req.query // Extract query parameters

    if (
        !filename ||
        !width ||
        !height ||
        isNaN(Number(width)) ||
        isNaN(Number(height))
    ) {
        res.status(400).json({error: 'Invalid query parameters'}) // Validate input
    }

    try {
        // Call resizeImage service function and get path to resized image
        const resizedImagePath = await resizeImage(
            filename as string,
            Number(width),
            Number(height)
        )

        res.sendFile(resizedImagePath) // Send the resized image file in response
    } catch (err: any) {
        // Handle errors during image processing
        res.status(500).json({error: `Failed to process image: ${err.message}`})
    }
}

// Handler: Upload Image Endpoint
const uploadHandler = (req: Request, res: Response): void => {
    if (!req.file) {
        res.status(400).json({ error: 'No file uploaded' })
        return
    }

    res.status(200).json({ message: 'Upload successful', filename: req.file.filename })
}

// Handler: Get List of Uploaded Images Filenames
const listImagesHandler: RequestHandler = (req, res) => {
    const uploadsDir = path.join(__dirname, '..', '..', 'uploads') // Build path to uploads directory
    console.log('Reading from: ', uploadsDir)

    // Read the contents of the uploads directory
    fs.readdir(uploadsDir, (err, files) => {
        if (err) {
            console.error('Failed to read uploads Directory: ', err)
            return res.status(500).json({error: 'Could not read uploads folder'})
        }

        // Filter out only image files based on file extensions
        const images = files.filter(file =>
            /\.(jpg|jpeg|png)$/i.test(file)
        )

        res.status(200).json(images) // Respond with the list of image filenames
    })
}

// Route Mapping
router.get('/resize', resizeHandler)
router.post('/upload', upload.single('image'), uploadHandler)
router.get('/images', listImagesHandler)

export default router // Export the router for use in the main server file