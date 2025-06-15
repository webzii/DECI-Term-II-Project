// tests/imageService.spec.ts
import { resizeImage } from '../services/imageService'
import fs from 'fs'

describe('Image Processing Service', () => {
    it('should resize an image and return the path', async () => {
        const filename = 'test.jpg'
        const width = 100
        const height = 100

        const outputPath = await resizeImage(filename, width, height)

        expect(fs.existsSync(outputPath)).toBeTrue()
    })
})