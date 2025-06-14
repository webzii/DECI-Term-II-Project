import path from 'path'
import fs from 'fs'
import sharp from 'sharp'
import { fileURLToPath } from 'url'
import { dirname } from 'path'

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const cacheDir = path.join(__dirname, '../cache') // Define the directory for cached images

export const resizeImage = async (
    filename: string,
    width: number,
    height: number)
    : Promise<string> => {
    const cachePath = path.join(cacheDir, `${width}x${height}-${filename}`) // Construct path for cached resized image

    // Check if resized image exists in the cache
    if (fs.existsSync(cachePath)) {
        return cachePath // Return cached image path if it exists
    }

    const inputImagePath = path.join(__dirname, '../../uploads', filename) // Construct full path to the original uploaded image
    const outputImagePath = cachePath // Set the output path for the resized image

    // Resize image using Sharp and save to cache
    await sharp(inputImagePath)
    .resize(width, height)
    .toFile(outputImagePath)

    return outputImagePath // Return the path of the newly resized image
}