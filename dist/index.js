import express from 'express';
import { fileURLToPath } from 'url';
import path from 'path';
import multer from 'multer';
import imagesRoutes from './routes/images.js';
import uploadRoutes from './routes/upload.js';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const PORT = 3000;
app.use(express.static(path.join(__dirname, '../public')));
app.use('/images/uploads', express.static(path.join(__dirname, '../images/uploads')));
app.use('/images/full', express.static(path.join(__dirname, '../images/full')));
app.use('/images/thumb', express.static(path.join(__dirname, '../images/thumb')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get('/', (_req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});
app.use('/api/images', imagesRoutes);
app.use('/api/upload', uploadRoutes);
const errorHandler = (err, req, res, next) => {
    console.error('Application Error:', err.stack);
    if (err instanceof multer.MulterError) {
        res.status(400).json({ message: err.message });
        return;
    }
    if (err.message === 'Only .jpg images are allowed' ||
        err.message.startsWith('Input file missing') ||
        err.message === 'Image processing failed') {
        const statusCode = err.message === 'Only .jpg images are allowed' ? 400 : 500;
        res.status(statusCode).json({ message: err.message });
        return;
    }
    res.status(500).json({ message: 'Internal Server Error' });
};
app.use(errorHandler);
app.listen(PORT, () => {
    console.warn(`Server running at: http://localhost:${PORT}`);
});
export default app;
