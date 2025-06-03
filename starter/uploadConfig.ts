import path from 'path'
import multer, {FileFilterCallback} from 'multer'
import { Request } from 'express'

const storage = multer.diskStorage({
    destination: 'uploads/',
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`)
    },
})

function fileFilter(req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) {
    const ext = path.extname(file.originalname).toLowerCase()
    if (ext !== '.jpg' && ext !== '.jpeg') {
        return cb(new Error('Only .jpg images are allowed.'))
    }
    cb(null, true)
}

export const upload = multer({
    storage,
    limits: {
        fileSize: 15 * 1024 * 1024
    }, 
    fileFilter
})

export default upload