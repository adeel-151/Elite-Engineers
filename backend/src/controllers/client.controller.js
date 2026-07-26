const Client = require('../models/Client');
const AppError = require('../utils/AppError');
const catchAsync = require('../utils/catchAsync');
const { clearCache } = require('../middlewares/cache');

exports.getAllClients = catchAsync(async (req, res, next) => {
  const clients = await Client.find().sort('-createdAt');

  res.status(200).json({
    status: 'success',
    results: clients.length,
    data: { clients }
  });
});

exports.createClient = catchAsync(async (req, res, next) => {
  if (req.file) {
    req.body.logo = req.file.path;
  }
  const newClient = await Client.create(req.body);
  clearCache();

  res.status(201).json({
    status: 'success',
    data: { client: newClient }
  });
});

exports.updateClient = catchAsync(async (req, res, next) => {
  if (req.file) {
    req.body.logo = req.file.path;
  }
  const client = await Client.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  if (!client) {
    return next(new AppError('No client found with that ID', 404));
  }

  clearCache();

  res.status(200).json({
    status: 'success',
    data: { client }
  });
});

exports.deleteClient = catchAsync(async (req, res, next) => {
  const client = await Client.findByIdAndDelete(req.params.id);

  if (!client) {
    return next(new AppError('No client found with that ID', 404));
  }

  clearCache();

  res.status(204).json({
    status: 'success',
    data: null
  });
});
