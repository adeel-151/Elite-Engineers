const Inquiry = require('../models/Inquiry');
const AppError = require('../utils/AppError');
const catchAsync = require('../utils/catchAsync');
const sendEmail = require('../utils/sendEmail');

exports.getAllInquiries = catchAsync(async (req, res, next) => {
  const inquiries = await Inquiry.find().sort('-createdAt');

  res.status(200).json({
    status: 'success',
    results: inquiries.length,
    data: { inquiries }
  });
});

exports.createInquiry = catchAsync(async (req, res, next) => {
  const newInquiry = await Inquiry.create(req.body);

  // Send email to Admin
  try {
    const adminMessage = `New ${newInquiry.type} inquiry received from ${newInquiry.name}.\n\nEmail: ${newInquiry.email}\nPhone: ${newInquiry.phone || 'N/A'}\nMessage: ${newInquiry.message}`;
    await sendEmail({
      email: process.env.EMAIL_USER || 'admin@eliteengineers.com',
      subject: `New Inquiry: ${newInquiry.type.toUpperCase()}`,
      message: adminMessage
    });
    
    // Send auto-reply to User
    const userMessage = `Dear ${newInquiry.name},\n\nThank you for reaching out to Elite Engineers. We have received your ${newInquiry.type} request and our team will get back to you shortly.\n\nBest Regards,\nElite Engineers Team`;
    await sendEmail({
      email: newInquiry.email,
      subject: 'Elite Engineers - We received your request',
      message: userMessage
    });
  } catch (err) {
    console.error('Error sending emails:', err);
    // Note: We don't want to fail the inquiry creation if email fails
  }

  res.status(201).json({
    status: 'success',
    data: { inquiry: newInquiry }
  });
});

exports.updateInquiryStatus = catchAsync(async (req, res, next) => {
  const inquiry = await Inquiry.findByIdAndUpdate(
    req.params.id, 
    { status: req.body.status }, 
    { new: true, runValidators: true }
  );

  if (!inquiry) {
    return next(new AppError('No inquiry found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: { inquiry }
  });
});
