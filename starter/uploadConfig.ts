import multer from 'multer'
import path from 'path'

// Set up storage config for multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // Define the uplaods folder path
        cb(null, path.join(__dirname, '../uploads')) // Set the destination directory for uploaded files
    },
    filename: (req, file, cb) => {
        // Use original filename
        cb(null, file.originalname) // Retain the original name of the file when saving
    }
})

// File type filter for uploading
const fileFilter = (req: any, file: any, cb: any) => {
    const filetypes = /jpeg|jpg|png|gif/ // Define the allowed image types (JPEG, JPG, PNG, GIF)
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase()) // Check file extension
    const mimetype = filetypes.test(file.mimetype) // Check MIME type

    if (extname && mimetype) {
        return cb(null, true) // Accept file if it matches the allowed types
    } else {
        cb(new Error('Only image files are allowed!'), false) // Reject file if it doesn't match allowed types
    }
}

// Multer upload configuration
const upload = multer({
    storage, // Use the storage config defined above
    fileFilter, // Use the file filter defined above
    limits: {fileSize: 15 * 1024 * 1024} // Set the file size limit to 15MB
})

export default upload // Export the multer instance for use in other parts of the app