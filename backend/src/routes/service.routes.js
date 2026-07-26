const express = require('express');
const serviceController = require('../controllers/service.controller');
const authMiddleware = require('../middlewares/auth');
const { cacheMiddleware } = require('../middlewares/cache');

const router = express.Router();
const upload = require('../middlewares/upload');

router.route('/')
  .get(cacheMiddleware, serviceController.getAllServices)
  .post(authMiddleware.protect, upload.single('image'), serviceController.createService);

router.route('/:id')
  .put(authMiddleware.protect, upload.single('image'), serviceController.updateService)
  .delete(authMiddleware.protect, serviceController.deleteService);

module.exports = router;
