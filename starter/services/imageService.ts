import sharp from 'sharp'
import path from 'path'
import fs from 'fs'

const outputDir = path.join(__dirname, `../uploads`)

// Ensuring that the output directory exists
if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, {recursive: true})
}

export async function resizeImage(
    filename: string,
    width: number,
    height: number
): Promise<string> {
    const inputPath = path.join(__dirname, `../images/`, filename)
    const outputPath = path.join(
        outputDir,
        `${path.parse(filename).name}-${width}x${height}.jpg`
    )

    // If the image is already cached, return its path
    if (fs.existsSync(outputPath)) {
        return outputPath
    }

    await sharp(inputPath)
    .resize(width, height)
    .jpeg()
    .toFile(outputPath)

    return outputPath
}