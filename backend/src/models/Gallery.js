const mongoose = require('mongoose');

const gallerySchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
    default: 'Gallery Image'
  },
  imageUrl: {
    type: String,
    required: [true, 'Image URL is required']
  },
  publicId: {
    type: String,
    required: [true, 'Image public ID is required']
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Gallery', gallerySchema);
