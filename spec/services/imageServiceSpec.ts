import {resizeImage} from '../../starter/services/imageService'
import fs from 'fs'

describe('resizeImage', () => {
    it('should resize and return the path of the image', async () => {
        const resultPath = await resizeImage('fjord.jpg', 300, 300)
        expect(fs.existsSync(resultPath)).toBeTrue()
    })

    it('should throw an error for missing image', async () => {
        try {
            await resizeImage('nonexistent.jpg', 300, 300)
        } catch (err) {
            expect(err).toBeInstanceOf(Error)
            expect((err as Error).message).toContain('Failed to process image')
        }
    })
})