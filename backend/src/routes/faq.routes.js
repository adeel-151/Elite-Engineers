const express = require('express');
const faqController = require('../controllers/faq.controller');
const authMiddleware = require('../middlewares/auth');
const { cacheMiddleware } = require('../middlewares/cache');

const router = express.Router();

router.route('/')
  .get(cacheMiddleware, faqController.getAllFaqs)
  .post(authMiddleware.protect, faqController.createFaq);

router.route('/:id')
  .put(authMiddleware.protect, faqController.updateFaq)
  .delete(authMiddleware.protect, faqController.deleteFaq);

module.exports = router;
