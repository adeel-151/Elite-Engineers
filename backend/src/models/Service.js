const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'A service must have a title'],
    trim: true,
  },
  desc: {
    type: String,
    required: [true, 'A service must have a description'],
  },
  img: {
    type: String, // Cloudinary URL or local path
    required: [true, 'A service must have an image']
  },
  icon: {
    type: String,
    default: '⬡'
  }
}, {
  timestamps: true,
});

const Service = mongoose.model('Service', serviceSchema);

module.exports = Service;
