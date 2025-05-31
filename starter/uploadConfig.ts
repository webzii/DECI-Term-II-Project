import path from 'path'
import multer, {FileFilterCallback} from 'multer'
import { Request } from 'express'

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../uploads'))
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname)
    }
})

const fileFilter = (
    req: Request,
    file: Express.Multer.File,
    cb: FileFilterCallback
    ) => {
        if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg') {
            cb(null, true);
        } else {
            cb(new Error('Only .jpg, .jpeg, and .png formats allowed!'));
        }
    };

export const upload = multer({
    storage,
    limits: {
        fileSize: 15 * 1024 * 1024
    }, 
    fileFilter
})

export default upload