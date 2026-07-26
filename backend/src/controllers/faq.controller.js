const Faq = require('../models/Faq');
const AppError = require('../utils/AppError');
const catchAsync = require('../utils/catchAsync');
const { clearCache } = require('../middlewares/cache');

exports.getAllFaqs = catchAsync(async (req, res, next) => {
  const faqs = await Faq.find().sort('-createdAt');

  res.status(200).json({
    status: 'success',
    results: faqs.length,
    data: { faqs }
  });
});

exports.createFaq = catchAsync(async (req, res, next) => {
  const newFaq = await Faq.create(req.body);
  clearCache();

  res.status(201).json({
    status: 'success',
    data: { faq: newFaq }
  });
});

exports.updateFaq = catchAsync(async (req, res, next) => {
  const faq = await Faq.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  if (!faq) {
    return next(new AppError('No FAQ found with that ID', 404));
  }

  clearCache();

  res.status(200).json({
    status: 'success',
    data: { faq }
  });
});

exports.deleteFaq = catchAsync(async (req, res, next) => {
  const faq = await Faq.findByIdAndDelete(req.params.id);

  if (!faq) {
    return next(new AppError('No FAQ found with that ID', 404));
  }

  clearCache();

  res.status(204).json({
    status: 'success',
    data: null
  });
});
