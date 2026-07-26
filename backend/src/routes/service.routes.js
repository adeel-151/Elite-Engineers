const express = require('express');
const serviceController = require('../controllers/service.controller');
const authMiddleware = require('../middlewares/auth');
const { cacheMiddleware } = require('../middlewares/cache');

const router = express.Router();

router.route('/')
  .get(cacheMiddleware, serviceController.getAllServices)
  .post(authMiddleware.protect, serviceController.createService);

router.route('/:id')
  .patch(authMiddleware.protect, serviceController.updateService)
  .delete(authMiddleware.protect, serviceController.deleteService);

module.exports = router;
