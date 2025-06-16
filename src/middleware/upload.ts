import multer from 'multer';
import path from 'path';
import { Request } from 'express'; 

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'images/uploads');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  },
});

const fileFilter = (
  _req: Request, 
  file: Express.Multer.File, 
  cb: multer.FileFilterCallback 
) => {
  const ext = path.extname(file.originalname).toLowerCase();
  if (ext !== '.jpg') {

    return cb(new Error('Only .jpg images are allowed'));
  }

  cb(null, true);
};
const configuredMulterInstance = multer({
  storage: storage,
  fileFilter: fileFilter,

});

export default configuredMulterInstance;