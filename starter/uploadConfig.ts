import multer, { FileFilterCallback } from 'multer'
import path from 'path'
import { Request } from 'express'
import { fileURLToPath } from 'url'
import { dirname } from 'path'

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

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
    if (ext === '.jpg') {
        cb(null, true)
    } else {
        cb(new Error('Only .jpg files are allowed.'))
    }
}

const upload = multer({
    storage,
    limits: { fileSize: 15 * 1024 * 1024 }, // 15 MB
    fileFilter
})

export default upload