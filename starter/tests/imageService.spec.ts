import {resizeImage} from '../services/imageService'
import path from 'path'
import fs from 'fs'

describe(`Image Service`, () => {
    it(`should resize an image successfully`, async () => {
        const resizedImagePath = await resizeImage(
            path.join(__dirname, `../images/fjord.jpg`),
            300,
            300
        )

        expect(fs.existsSync(resizedImagePath)).toBe(true)
    })

    it(`should throw an error if the image does not exist`, async () => {
        try {
            await resizeImage(`nonexistent.jpg`, 300, 300)
        } catch (err: any) {
            expect(err).toBeInstanceOf(Error)
            expect(err.message).toContain(`Failed to process image`)
        }
    })
})