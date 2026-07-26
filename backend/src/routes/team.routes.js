const express = require('express');
const teamController = require('../controllers/team.controller');
const authMiddleware = require('../middlewares/auth');
const { cacheMiddleware } = require('../middlewares/cache');

const router = express.Router();

router.route('/')
  .get(cacheMiddleware, teamController.getAllTeamMembers)
  .post(authMiddleware.protect, teamController.createTeamMember);

router.route('/:id')
  .patch(authMiddleware.protect, teamController.updateTeamMember)
  .delete(authMiddleware.protect, teamController.deleteTeamMember);

module.exports = router;
