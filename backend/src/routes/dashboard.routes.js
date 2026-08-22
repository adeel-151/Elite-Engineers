const express = require('express');
const dashboardController = require('../controllers/dashboard.controller');
const authMiddleware = require('../middlewares/auth');

const router = express.Router();

router.use(authMiddleware.protect);
router.get('/', dashboardController.getDashboardStats);

module.exports = router;
