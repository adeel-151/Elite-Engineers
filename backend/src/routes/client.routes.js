const express = require('express');
const clientController = require('../controllers/client.controller');
const authMiddleware = require('../middlewares/auth');
const { cacheMiddleware } = require('../middlewares/cache');

const router = express.Router();

router
  .route('/')
  .get(cacheMiddleware, clientController.getAllClients)
  .post(authMiddleware.protect, clientController.createClient);

router
  .route('/:id')
  .put(authMiddleware.protect, clientController.updateClient)
  .delete(authMiddleware.protect, clientController.deleteClient);

module.exports = router;
