const mongoose = require('mongoose');

const faqSchema = new mongoose.Schema({
  question: {
    type: String,
    required: [true, 'FAQ must have a question'],
    trim: true,
  },
  answer: {
    type: String,
    required: [true, 'FAQ must have an answer'],
  }
}, {
  timestamps: true,
});

const Faq = mongoose.model('Faq', faqSchema);

module.exports = Faq;
