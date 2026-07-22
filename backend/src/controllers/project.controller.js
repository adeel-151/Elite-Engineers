const Project = require('../models/Project');
const AppError = require('../utils/AppError');
const catchAsync = require('../utils/catchAsync');

exports.getAllProjects = catchAsync(async (req, res, next) => {
  const projects = await Project.find().populate('client', 'name company');

  res.status(200).json({
    status: 'success',
    results: projects.length,
    data: { projects }
  });
});

exports.getProject = catchAsync(async (req, res, next) => {
  const project = await Project.findById(req.params.id).populate('client', 'name company');

  if (!project) {
    return next(new AppError('No project found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: { project }
  });
});

exports.createProject = catchAsync(async (req, res, next) => {
  if (req.files && req.files.length > 0) {
    req.body.images = req.files.map(file => file.path);
  }

  const newProject = await Project.create(req.body);

  res.status(201).json({
    status: 'success',
    data: { project: newProject }
  });
});

exports.updateProject = catchAsync(async (req, res, next) => {
  if (req.files && req.files.length > 0) {
    // We are replacing old images here, but you can append to them if needed
    req.body.images = req.files.map(file => file.path);
  }

  const project = await Project.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  if (!project) {
    return next(new AppError('No project found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: { project }
  });
});

exports.deleteProject = catchAsync(async (req, res, next) => {
  const project = await Project.findByIdAndDelete(req.params.id);

  if (!project) {
    return next(new AppError('No project found with that ID', 404));
  }

  res.status(204).json({
    status: 'success',
    data: null
  });
});
