import multer, { FileFilterCallback } from 'multer'
import path from 'path'
import { Request } from 'express'

const storage = multer.diskStorage({
    destination: (_req, _file, cb) => {
        cb(null, path.join(__dirname, '..', 'uploads')) // Make sure this folder exists!
    },
    filename: (_req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`)
    }
})

const fileFilter = (
    _req: Request,
    file: Express.Multer.File,
    cb: FileFilterCallback
) => {
    const ext = path.extname(file.originalname).toLowerCase()
    if (ext === '.jpg' || ext === '.jpeg' || ext === '.png') {
        cb(null, true)
    } else {
        cb(new Error('Only .jpg, .jpeg, and .png files are allowed.'))
    }
}

const upload = multer({
    storage,
    limits: { fileSize: 15 * 1024 * 1024 }, // 15 MB
    fileFilter
})

export default upload