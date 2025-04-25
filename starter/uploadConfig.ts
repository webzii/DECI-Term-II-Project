import multer from 'multer'
import path from 'path'

const storage = multer.diskStorage({
    destination: path.join(__dirname, '../uploads'),
    filename: (req, file, cb) => {
        const uniqueName = `img${Date.now()}${path.extname(file.originalname)}`
        cb(null, uniqueName)
    },
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
