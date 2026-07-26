const express = require('express');
const teamController = require('../controllers/team.controller');
const authMiddleware = require('../middlewares/auth');
const { cacheMiddleware } = require('../middlewares/cache');

const router = express.Router();
const upload = require('../middlewares/upload');

router.route('/')
  .get(cacheMiddleware, teamController.getAllTeamMembers)
  .post(authMiddleware.protect, upload.single('image'), teamController.createTeamMember);

router.route('/:id')
  .put(authMiddleware.protect, upload.single('image'), teamController.updateTeamMember)
  .delete(authMiddleware.protect, teamController.deleteTeamMember);

module.exports = router;
