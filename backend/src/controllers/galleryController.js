const Gallery = require('../models/Gallery');
const AppError = require('../utils/AppError');
const { cloudinary } = require('../config/cloudinary');

exports.getAllImages = async (req, res, next) => {
  try {
    const images = await Gallery.find().sort('-createdAt');
    res.status(200).json({
      status: 'success',
      results: images.length,
      data: { images }
    });
  } catch (err) {
    next(err);
  }
};

exports.uploadImage = async (req, res, next) => {
  try {
    if (!req.file) {
      return next(new AppError('Please upload an image', 400));
    }

    const newImage = await Gallery.create({
      title: req.body.title || 'Gallery Image',
      imageUrl: req.file.path,
      publicId: req.file.filename
    });

    res.status(201).json({
      status: 'success',
      data: { image: newImage }
    });
  } catch (err) {
    next(err);
  }
};

exports.deleteImage = async (req, res, next) => {
  try {
    const image = await Gallery.findById(req.params.id);
    if (!image) {
      return next(new AppError('No image found with that ID', 404));
    }

    // Delete from cloudinary
    if (image.publicId) {
      await cloudinary.uploader.destroy(image.publicId);
    }

    await Gallery.findByIdAndDelete(req.params.id);

    res.status(204).json({
      status: 'success',
      data: null
    });
  } catch (err) {
    next(err);
  }
};
