const express = require('express');
const projectController = require('../controllers/project.controller');
const authMiddleware = require('../middlewares/auth');
const upload = require('../middlewares/upload');
const { validate, validateObjectId } = require('../middlewares/validate');
const { projectSchema } = require('../utils/schemas');

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
  .post(authMiddleware.protect, upload.array('images', 10), validate(projectSchema), projectController.createProject);

router
  .route('/:id')
  .get(validateObjectId, projectController.getProject)
  .put(authMiddleware.protect, validateObjectId, upload.array('images', 10), validate(projectSchema), projectController.updateProject)
  .delete(authMiddleware.protect, validateObjectId, projectController.deleteProject);

module.exports = router;
