const Admin = require('../models/Admin');
const AppError = require('../utils/AppError');
const catchAsync = require('../utils/catchAsync');
const jwt = require('jsonwebtoken');

const signToken = id => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN
  });
};

const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);
  res.status(statusCode).json({
    status: 'success',
    token,
    data: {
      user: {
        id: user._id,
        email: user.email,
        role: user.role
      }
    }
  });
};

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new AppError('Please provide email and password!', 400));
  }

  const user = await Admin.findOne({ email }).select('+password');

  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError('Incorrect email or password', 401));
  }

  createSendToken(user, 200, res);
});

// Utility to create first admin (can be removed in production after usage)
exports.createInitialAdmin = catchAsync(async (req, res, next) => {
  const adminsCount = await Admin.countDocuments();
  if (adminsCount > 0) {
     return next(new AppError('Admin already exists', 400));
  }
  
  const newAdmin = await Admin.create({
    email: req.body.email,
    password: req.body.password,
  });

  createSendToken(newAdmin, 201, res);
});
