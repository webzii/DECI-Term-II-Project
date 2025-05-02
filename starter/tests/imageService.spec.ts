import {resizeImage} from '../services/imageService'
import path from 'path'
import fs from 'fs'

// Test suite for the Image Service
describe(`Image Service`, () => {

    // Test: should resize an image and check if the resized file exists
    it(`should resize an image successfully`, async () => {
        const resizedImagePath = await resizeImage(
            path.join(__dirname, `../images/fjord.jpg`), // Path to test image
            300, // Desired width
            300 // Desired height
        )

        expect(fs.existsSync(resizedImagePath)).toBe(true) // Check if resized image file was created
    })

    // Test: should throw an error when trying to resize a non-existent image
    it(`should throw an error if the image does not exist`, async () => {
        try {
            await resizeImage(`nonexistent.jpg`, 300, 300) // Try resizing a file that doesn't exist
        } catch (err: any) {
            expect(err).toBeInstanceOf(Error) // Expect an error to be thrown
            expect(err.message).toContain(`Failed to process image`) // Error message should indicate failure
        }
    })
})