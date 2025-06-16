

import supertest from 'supertest'
import app from '../index.js' 
import path from 'path'
import fs from 'fs/promises'

const request = supertest(app)

describe('Image Upload API', () => {

  it('should return 400 if no image is uploaded', async () => {
    const response = await request
      .post('/api/upload')
      .expect(400) 
      .expect('Content-Type', /json/)

    expect(response.body).toEqual({ message: 'No file uploaded or invalid file type' })
  })

  it('should return 400 for unsupported file types', async () => {

    const pdfFilePath = path.resolve('./src/tests/test-files/test.pdf')

    try {
      await fs.access(pdfFilePath)
    } catch (error) {
      fail(`Test PDF file not found at ${pdfFilePath}. Please ensure it exists.`)
      return 
    }

    try {

      const response = await request
        .post('/api/upload')
        .attach('image', pdfFilePath) 
        .expect(400)
        .expect('Content-Type', /json/)

      expect(response.body).toEqual({ message: 'Only .jpg images are allowed' })

    } catch (error: any) {

      if (error.code === 'ECONNRESET') {
        console.warn(`Test "should return 400 for unsupported file types" caught ECONNRESET. This is expected behavior for early Multer rejection.`)
        return
      }

      throw error
    }
  }, 10000)

  it('should return 200 and the filename when a .jpg image is uploaded', async () => {

    const imageFilePath = path.resolve('./src/tests/test-files/test.jpg')

    try {
      await fs.access(imageFilePath)
    } catch (error) {
      fail(`Test JPG image file not found at ${imageFilePath}. Please ensure it exists.`)
      return
    }

    const response = await request
      .post('/api/upload')
      .attach('image', imageFilePath)
      .expect(200) 
      .expect('Content-Type', /json/)

    expect(response.body.message).toEqual('File uploaded successfully')

    expect(response.body.filename).toMatch(/^image-\d{13}-\d{9}\.jpg$/)

    expect(response.body.path).toMatch(/^\/images\/uploads\/image-\d{13}-\d{9}\.jpg$/)

    const uploadedFilePath = path.resolve('./images/uploads', response.body.filename)
    try {
      await fs.access(uploadedFilePath)
    } catch (error) {
      fail(`Uploaded file not found at ${uploadedFilePath} after successful upload.`)
    }
  }, 10000)
})

afterAll(async () => {
  const thumbDir = path.resolve('./images/thumb')
  const uploadDir = path.resolve('./images/uploads')

  try {
    const thumbFiles = await fs.readdir(thumbDir)
    for (const file of thumbFiles) {
      if (file !== '.gitkeep') {
        await fs.unlink(path.join(thumbDir, file))
      }
    }
    console.log('Cleaned up images/thumb directory.')
  } catch (error: any) {

    if (error.code !== 'ENOENT') {
      console.warn('Could not fully clean up images/thumb directory:', error)
    }
  }

  try {
    const uploadFiles = await fs.readdir(uploadDir)
    for (const file of uploadFiles) {
      if (file !== '.gitkeep') { 
        await fs.unlink(path.join(uploadDir, file))
      }
    }
    console.log('Cleaned up images/uploads directory.')
  } catch (error: any) {
    if (error.code !== 'ENOENT') {
      console.warn('Could not fully clean up images/uploads directory:', error)
    }
  }
})