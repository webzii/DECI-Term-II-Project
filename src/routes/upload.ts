
import express, { Request, Response, NextFunction } from 'express'
import uploadMulterInstance from '../middleware/upload.js'
import multer from 'multer' 

const router = express.Router()

router.post(
  '/',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await new Promise<void>((resolve, reject) => {

        uploadMulterInstance.single('image')(req, res, (err: any) => {
          if (err) {

            return reject(err)
          }

          resolve()
        })
      })

      if (req.file) {
        const filename = req.file.filename

        res.status(200).json({
          message: 'File uploaded successfully',
          filename: filename,
          path: `/images/uploads/${filename}`,
        })
        return
      } else {
        res.status(400).json({ message: 'No file uploaded or invalid file type' })
        return 
      }
    } catch (err: any) {
      if (err instanceof multer.MulterError) {

        if (err.code === 'LIMIT_FILE_SIZE') {
          res.status(400).json({ message: 'File too large' })
          return 
        }

        res.status(400).json({ message: err.message })
        return 
      }

      next(err)
    }
  }

)

export default router