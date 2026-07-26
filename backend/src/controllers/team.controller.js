const TeamMember = require('../models/TeamMember');
const AppError = require('../utils/AppError');
const catchAsync = require('../utils/catchAsync');

exports.getAllTeamMembers = catchAsync(async (req, res, next) => {
  const teamMembers = await TeamMember.find();

  res.status(200).json({
    status: 'success',
    results: teamMembers.length,
    data: { teamMembers }
  });
});

exports.createTeamMember = catchAsync(async (req, res, next) => {
  const newTeamMember = await TeamMember.create(req.body);

  res.status(201).json({
    status: 'success',
    data: { teamMember: newTeamMember }
  });
});

exports.updateTeamMember = catchAsync(async (req, res, next) => {
  const teamMember = await TeamMember.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  if (!teamMember) {
    return next(new AppError('No team member found with that ID', 404));
  }

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

  res.status(204).json({
    status: 'success',
    data: null
  });
});
