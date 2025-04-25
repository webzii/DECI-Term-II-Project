import express, { RequestHandler, Request, Response } from 'express';
import { resizeImage } from '../services/imageService';
import upload from '../uploadConfig'; // Importing the Multer config

// Handler for image resizing
export const resizeHandler: RequestHandler = async (req, res) => {
    const { filename, width, height } = req.query;

    // Check for missing or invalid query parameters
    if (
        !filename ||
        !width ||
        !height ||
        isNaN(Number(width)) ||
        isNaN(Number(height))
    ) {
        res.status(400).json({ error: `Invalid query parameters` });
        return;
    }

    try {
        // Call resizeImage function which checks for cache and resizes if necessary
        const resizedImagePath = await resizeImage(
            filename as string,
            Number(width),
            Number(height)
        );

        // Send the resized (or cached) image
        res.sendFile(resizedImagePath);
    } catch (err: any) {
        console.error(`Error while processing the image`, err);
        res.status(500).json({ error: `Failed to process image: ${err.message}` });
    }
};

// Handler for image upload
export const uploadHandler: RequestHandler = (req: Request, res: Response): void => {
    // Multer handles the upload and places the file in the specified folder
    if (!req.file) {
        res.status(400).json({ error: 'No file uploaded' });
        return;
    }

    // Send a response with the file path
    res.status(200).json({
        message: 'File uploaded successfully',
        file: req.file
    });
};

// Define the route for resizing images
const router = express.Router();

// Route to resize images
router.get('/resize', resizeHandler);

// Route to upload images
router.post('/upload', upload.single('image'), uploadHandler); // 'image' is the name of the field for the uploaded file

export default router;