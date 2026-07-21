const express = require('express');
const inquiryController = require('../controllers/inquiry.controller');
const authMiddleware = require('../middlewares/auth');

const router = express.Router();

// Public route to submit an inquiry (contact or quotation)
router.post('/', inquiryController.createInquiry);

// Admin routes
router.use(authMiddleware.protect);
router.get('/', inquiryController.getAllInquiries);
router.patch('/:id/status', inquiryController.updateInquiryStatus);

module.exports = router;
