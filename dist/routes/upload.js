import express from 'express';
import multer from 'multer';
import uploadMulterInstance from '../middleware/upload.js';
const router = express.Router();
// Handler function for uploading image
const uploadHandler = async (req, res, next) => {
    try {
        await new Promise((resolve, reject) => {
            uploadMulterInstance.single('image')(req, res, (err) => {
                if (err) {
                    return reject(err);
                }
                resolve();
            });
        });
        if (!req.file) {
            res.status(400).json({ message: 'No file uploaded or invalid file type' });
            return;
        }
        // Check mimetype (only JPG allowed)
        if (req.file.mimetype !== 'image/jpeg') {
            res.status(400).json({ message: 'Only JPG files are supported' });
            return;
        }
        const filename = req.file.filename;
        res.status(200).json({
            message: 'File uploaded successfully',
            filename,
            path: `/images/uploads/${filename}`,
        });
    }
    catch (err) {
        if (err instanceof multer.MulterError) {
            if (err.code === 'LIMIT_FILE_SIZE') {
                res.status(400).json({ message: 'File too large' });
                return;
            }
            res.status(400).json({ message: err.message });
            return;
        }
        next(err); // Pass to global error handler
    }
};
// Use the handler in the route
router.post('/', uploadHandler);
export default router;
