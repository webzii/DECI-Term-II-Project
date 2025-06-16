
import sharp from 'sharp'
import path from 'path'
import fs from 'fs/promises'; 

export async function resizeImage(
  filename: string,
  width: number,
  height: number,
): Promise<string> {
  const baseFilename = filename.endsWith('.jpg') ? filename : `${filename}.jpg`;
  const inputPath = path.resolve('images/full', baseFilename);
  const outputDir = path.resolve('images/thumb');
  const outputPath = path.join(outputDir, `${filename}-${width}x${height}.jpg`)

  try {
    await fs.access(inputPath, fs.constants.F_OK)
  } catch (error) {
    throw new Error(`Input file missing: ${inputPath}`)
  }

  try {
    await fs.access(outputDir)
  } catch (error: any) { 
    if (error.code === 'ENOENT') {
      await fs.mkdir(outputDir, { recursive: true }) 
    } else {
      throw  
    }
  }

  try {
    await fs.access(outputPath, fs.constants.F_OK) 
    return 
  } catch (error: any) {
 
    if (error.code !== 'ENOENT') {
      throw  
    }
  }


  try {
    await sharp(inputPath).resize(width, height).jpeg().toFile(outputPath)
    return 
  } catch (err) {
    console.error('Sharp error:', err)
    throw new Error('Image processing failed')
  }
}