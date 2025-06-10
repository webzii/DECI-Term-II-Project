import path from 'path'
import multer, {FileFilterCallback} from 'multer'
import { Request } from 'express'

const storage = multer.diskStorage({
    destination: 'uploads/',
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`)
    },
})

const fileFilter = (
    req: Express.Request,
    file: Express.Multer.File,
    cb: multer.FileFilterCallback
) => {
    const allowedExtensions = ['.jpg', '.jpeg', '.png']
    const ext = path.extname(file.originalname).toLowerCase()

    if (allowedExtensions.includes(ext)) {
        cb(null, true)
    } else {
        cb(new Error('Only .jpg, .jpeg, and .png files are allowed.'))
    }
}

export const upload = multer({
    storage,
    limits: {
        fileSize: 15 * 1024 * 1024
    }, 
    fileFilter
})

export default upload