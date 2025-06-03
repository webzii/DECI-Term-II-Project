import path from 'path'
import multer, {FileFilterCallback} from 'multer'
import { Request } from 'express'

const storage = multer.diskStorage({
    destination: './uploads',
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname)
        const filename = `${Date.now()}_${Math.round(Math.random() * 1e9)}${ext}`
        cb(null, filename)
    },
})

function fileFilter(
    req: Request,
    file: Express.Multer.File,
    cb: FileFilterCallback
) {
    const allowedTypes = /jpeg|jpg|png/
    const ext = path.extname(file.originalname).toLowerCase()
    const isValid = allowedTypes.test(ext)

    if (isValid) {
        cb(null, true)
    } else {
        cb(new Error('Invalid file type. Only .jpg, .jpeg, and .png are allowed.'))
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