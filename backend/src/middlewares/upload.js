const multer = require('multer');
const { storage } = require('../config/cloudinary');
const AppError = require('../utils/AppError');

const multerFilter = (req, file, cb) => {
  // Check exact mime types
  const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/webp'];
  
  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new AppError('Invalid file type! Please upload only JPEG, PNG, or WEBP images.', 400), false);
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
