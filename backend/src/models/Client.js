const mongoose = require('mongoose');

const clientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A client must have a name'],
    trim: true,
  },
  company: {
    type: String,
    trim: true,
  },
  logo: {
    type: String, // Cloudinary URL
  },
  quote: {
    type: String,
  },
  projectRef: {
    type: mongoose.Schema.ObjectId,
    ref: 'Project',
  },
}, {
  timestamps: true,
});

const Client = mongoose.model('Client', clientSchema);

module.exports = Client;
