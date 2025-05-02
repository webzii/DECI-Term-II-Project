import path from 'path'
import fs from 'fs'
import sharp from 'sharp'

const cacheDir = path.join(__dirname, '../cache')

export const resizeImage = async (
    filename: string,
    width: number,
    height: number)
    : Promise<string> => {
    const cachePath = path.join(cacheDir, `${width}x${height}-${filename}`)
    // Check if resized image exists in the cache
    if (fs.existsSync(cachePath)) {
        return cachePath // Return cached image path if it exists
    }

    const inputImagePath = path.join(__dirname, '../../uploads', filename)
    const outputImagePath = cachePath

    // Resize image using Sharp and save to cache
    await sharp(inputImagePath)
    .resize(width, height)
    .toFile(outputImagePath)

    return outputImagePath // Return the path of the newly resized image
}
