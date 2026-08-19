const { z } = require('zod');
const mongoose = require('mongoose');
const AppError = require('../utils/AppError');

const validate = (schema) => (req, res, next) => {
  try {
    const validatedData = schema.parse(req.body);
    req.body = validatedData; // Replace body with strictly validated and stripped data
    next();
  } catch (err) {
    if (err instanceof z.ZodError) {
      const messages = err.errors.map((e) => `${e.path.join('.')}: ${e.message}`).join(', ');
      return next(new AppError(`Validation Error: ${messages}`, 400));
    }
    next(err);
  }
};

const validateObjectId = (req, res, next) => {
  if (req.params.id && !mongoose.Types.ObjectId.isValid(req.params.id)) {
    return next(new AppError('Invalid ID format', 400));
  }
  next();
};

module.exports = {
  validate,
  validateObjectId
};
