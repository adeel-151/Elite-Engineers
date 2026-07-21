const express = require('express');
const projectController = require('../controllers/project.controller');
const authMiddleware = require('../middlewares/auth');

const router = express.Router();

router
  .route('/')
  .get(projectController.getAllProjects)
  .post(authMiddleware.protect, projectController.createProject);

router
  .route('/:id')
  .get(projectController.getProject)
  .put(authMiddleware.protect, projectController.updateProject)
  .delete(authMiddleware.protect, projectController.deleteProject);

module.exports = router;
