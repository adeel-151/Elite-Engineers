const mongoose = require('mongoose');
const validator = require('validator');

const inquirySchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
    enum: ['contact', 'quotation'],
  },
  name: {
    type: String,
    required: [true, 'Name is required'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    validate: [validator.isEmail, 'Please provide a valid email'],
  },
  phone: {
    type: String,
  },
  // Specific to Quotation type
  serviceNeeded: {
    type: String,
  },
  budgetRange: {
    type: String,
  },
  timeline: {
    type: String,
  },
  message: {
    type: String,
    required: [true, 'Message is required'],
  },
  status: {
    type: String,
    enum: ['new', 'in-progress', 'closed'],
    default: 'new',
  },
}, {
  timestamps: true,
});

const Inquiry = mongoose.model('Inquiry', inquirySchema);

module.exports = Inquiry;
