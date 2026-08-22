const Project = require('../models/Project');
const Inquiry = require('../models/Inquiry');
const Client = require('../models/Client');
const Service = require('../models/Service');
const catchAsync = require('../utils/catchAsync');

exports.getDashboardStats = catchAsync(async (req, res, next) => {
  // Get totals
  const totalProjects = await Project.countDocuments();
  const totalInquiries = await Inquiry.countDocuments();
  const totalClients = await Client.countDocuments();
  const totalServices = await Service.countDocuments();

  // Get recent inquiries (last 5)
  const recentInquiries = await Inquiry.find().sort('-createdAt').limit(5);

  // Get inquiries count for the last 6 months for chart
  const sixMonthsAgo = new Date();
  sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

  const inquiriesByMonth = await Inquiry.aggregate([
    {
      $match: {
        createdAt: { $gte: sixMonthsAgo }
      }
    },
    {
      $group: {
        _id: { 
          month: { $month: '$createdAt' },
          year: { $year: '$createdAt' }
        },
        count: { $sum: 1 }
      }
    },
    { $sort: { '_id.year': 1, '_id.month': 1 } }
  ]);

  // Format month data for frontend (e.g. "Jan", "Feb")
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const formattedInquiriesData = inquiriesByMonth.map(item => ({
    name: monthNames[item._id.month - 1],
    total: item.count
  }));

  // Ensure there is data for charts even if empty
  if (formattedInquiriesData.length === 0) {
    const currentMonth = new Date().getMonth();
    formattedInquiriesData.push({
      name: monthNames[currentMonth],
      total: 0
    });
  }

  res.status(200).json({
    status: 'success',
    data: {
      totals: {
        projects: totalProjects,
        inquiries: totalInquiries,
        clients: totalClients,
        services: totalServices
      },
      recentInquiries,
      inquiriesChart: formattedInquiriesData
    }
  });
});
