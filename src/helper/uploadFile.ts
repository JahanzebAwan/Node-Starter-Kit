import path from 'path';
import multer, { type FileFilterCallback } from 'multer';

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'uploads/');
  },
  filename(req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}${path.extname(file.originalname)}`);
  },
});

function checkFileType(file: Express.Multer.File, filetypes: RegExp, cb: FileFilterCallback) {
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb(new Error(`Wrong file type provided, allowed file types: ${filetypes}`));
  }
}

const uploadFile = (args?: { maxSize?: number; filetypes?: RegExp }) => {
  const { maxSize = 1000000, filetypes = /jpg|jpeg|png/ } = args || {};

  return multer({
    storage,
    limits: { fileSize: maxSize },
    fileFilter: (req, file, cb) => checkFileType(file, filetypes, cb),
  });
};

export default uploadFile;
