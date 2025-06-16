import sharp from 'sharp';
import path from 'path';
import fs from 'fs/promises';
export async function resizeImage(filename, width, height) {
    const baseFilename = filename.endsWith('.jpg') ? filename : `${filename}.jpg`;
    const inputPath = path.resolve('images/full', baseFilename);
    const outputDir = path.resolve('images/thumb');
    const outputPath = path.join(outputDir, `${filename}-${width}x${height}.jpg`);
    try {
        await fs.access(inputPath, fs.constants.F_OK);
    }
    catch (error) {
        throw new Error(`Input file missing: ${inputPath}`);
    }
    try {
        await fs.access(outputDir);
    }
    catch (error) {
        if (error.code === 'ENOENT') {
            await fs.mkdir(outputDir, { recursive: true });
        }
        else {
            throw error;
        }
    }
    try {
        await fs.access(outputPath, fs.constants.F_OK);
        return outputPath;
    }
    catch (error) {
        if (error.code !== 'ENOENT') {
            throw error;
        }
    }
    try {
        await sharp(inputPath).resize(width, height).jpeg().toFile(outputPath);
        return outputPath;
    }
    catch (err) {
        console.error('Sharp error:', err);
        throw new Error('Image processing failed');
    }
}
