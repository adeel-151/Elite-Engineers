const multer = require('multer');
const { storage } = require('../config/cloudinary');
const AppError = require('../utils/AppError');

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(new AppError('Not an image! Please upload only images.', 400), false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: multerFilter,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5 MB limit
  }
});

module.exports = upload;
