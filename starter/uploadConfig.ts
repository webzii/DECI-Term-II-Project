import multer from 'multer'
import path from 'path'

// Set up storage config for multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // Define the uplaods folder path
        cb(null, path.join(__dirname, '../uploads'))
    },
    filename: (req, file, cb) => {
        // Use original filename
        cb(null, file.originalname)
    }
})

const fileFilter = (req: any, file: any, cb: any) => {
    const filetypes = /jpeg|jpg|png|gif/
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase())
    const mimetype = filetypes.test(file.mimetype)

    if (extname && mimetype) {
        return cb(null, true)
    } else {
        cb(new Error('Only image files are allowed!'), false)
    }
}

const upload = multer({
    storage,
    fileFilter,
    limits: {fileSize: 15 * 1024 * 1024}
})

export default upload
