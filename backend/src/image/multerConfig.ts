import multer, { FileFilterCallback } from 'multer';
import path from 'path';

const allowedFileTypes = /jpeg|jpg|png|gif/;

const storage = multer.memoryStorage();

const fileFilter = (req: Express.Request, file: Express.Multer.File, cb: FileFilterCallback) => {
  const extname = allowedFileTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedFileTypes.test(file.mimetype);

  if (mimetype && extname) {
    cb(null, true);
  } else {
    cb(new Error('Wrong Format. Only JPG, PNG, und GIF are allowed'));
  }
};

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB file size limit // TODO: only premium?
  fileFilter,
});

export default upload;
