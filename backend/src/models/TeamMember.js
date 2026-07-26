const mongoose = require('mongoose');

const teamMemberSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Team member must have a name'],
    trim: true,
  },
  role: {
    type: String,
    required: [true, 'Team member must have a role'],
    trim: true,
  },
  img: {
    type: String, // Cloudinary URL
    required: [true, 'Team member must have an image']
  }
}, {
  timestamps: true,
});

const TeamMember = mongoose.model('TeamMember', teamMemberSchema);

module.exports = TeamMember;
