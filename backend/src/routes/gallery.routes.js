const express = require('express');
const galleryController = require('../controllers/galleryController');
const { protect } = require('../middlewares/auth');
const upload = require('../middlewares/upload');

const router = express.Router();

router
  .route('/')
  .get(galleryController.getAllImages)
  .post(protect, upload.single('image'), galleryController.uploadImage);

router
  .route('/:id')
  .delete(protect, galleryController.deleteImage);

module.exports = router;
