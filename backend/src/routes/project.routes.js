const express = require('express');
const projectController = require('../controllers/project.controller');
const authMiddleware = require('../middlewares/auth');

const upload = require('../middlewares/upload');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Projects
 *   description: Project management APIs
 */

/**
 * @swagger
 * /api/projects:
 *   get:
 *     summary: Returns the list of all the projects
 *     tags: [Projects]
 *     responses:
 *       200:
 *         description: The list of the projects
 */
router
  .route('/')
  .get(projectController.getAllProjects)
  .post(authMiddleware.protect, upload.array('images', 5), projectController.createProject);

router
  .route('/:id')
  .get(projectController.getProject)
  .put(authMiddleware.protect, upload.array('images', 5), projectController.updateProject)
  .delete(authMiddleware.protect, projectController.deleteProject);

module.exports = router;
