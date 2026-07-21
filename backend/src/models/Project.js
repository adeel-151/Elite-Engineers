const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'A project must have a title'],
    trim: true,
  },
  category: {
    type: String,
    required: [true, 'A project must have a category'],
    enum: [
      'Architectural & Structural Design',
      'Construction',
      'Project Management & Supervision',
      'Renovation & Interior Fit-Out',
      'Quantity Surveying/Estimation/BOQs',
      'Engineering Consultancy'
    ],
  },
  description: {
    type: String,
    required: [true, 'A project must have a description'],
  },
  location: {
    type: String,
    required: [true, 'A project must have a location'],
  },
  client: {
    type: mongoose.Schema.ObjectId,
    ref: 'Client',
  },
  images: [String], // Array of Cloudinary URLs
  completedDate: {
    type: Date,
  },
  featured: {
    type: Boolean,
    default: false,
  },
}, {
  timestamps: true,
});

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;
