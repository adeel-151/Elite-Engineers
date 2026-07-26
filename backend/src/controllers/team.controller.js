const TeamMember = require('../models/TeamMember');
const AppError = require('../utils/AppError');
const catchAsync = require('../utils/catchAsync');
const { clearCache } = require('../middlewares/cache');

exports.getAllTeamMembers = catchAsync(async (req, res, next) => {
  const teamMembers = await TeamMember.find().sort('-createdAt');

  res.status(200).json({
    status: 'success',
    results: teamMembers.length,
    data: { teamMembers }
  });
});

exports.createTeamMember = catchAsync(async (req, res, next) => {
  if (req.file) {
    req.body.img = req.file.path;
  }
  const newTeamMember = await TeamMember.create(req.body);
  clearCache();

  res.status(201).json({
    status: 'success',
    data: { teamMember: newTeamMember }
  });
});

exports.updateTeamMember = catchAsync(async (req, res, next) => {
  if (req.file) {
    req.body.img = req.file.path;
  }
  const teamMember = await TeamMember.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  if (!teamMember) {
    return next(new AppError('No team member found with that ID', 404));
  }

  clearCache();

  res.status(200).json({
    status: 'success',
    data: { teamMember }
  });
});

exports.deleteTeamMember = catchAsync(async (req, res, next) => {
  const teamMember = await TeamMember.findByIdAndDelete(req.params.id);

  if (!teamMember) {
    return next(new AppError('No team member found with that ID', 404));
  }

  clearCache();

  res.status(204).json({
    status: 'success',
    data: null
  });
});
