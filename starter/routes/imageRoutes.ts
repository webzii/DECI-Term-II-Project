import express, { RequestHandler } from 'express';
import { resizeImage } from '../services/imageService';

export const resizeHandler: RequestHandler = async (req, res) => {
    const { filename, width, height } = req.query;

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
        const resizedImagePath = await resizeImage(
            filename as string,
            Number(width),
            Number(height)
        );
        res.sendFile(resizedImagePath);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: `Failed to process image` });
    }
};

const router = express.Router();
router.get('/resize', resizeHandler);

export default router;