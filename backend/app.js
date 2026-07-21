const express = require('express');
const cors = require('cors');
const AppError = require('./src/utils/AppError');
const globalErrorHandler = require('./src/middlewares/errorHandler');

const projectRoutes = require('./src/routes/project.routes');
const clientRoutes = require('./src/routes/client.routes');
const inquiryRoutes = require('./src/routes/inquiry.routes');
const authRoutes = require('./src/routes/auth.routes');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

// Routes
app.use('/api/projects', projectRoutes);
app.use('/api/clients', clientRoutes);
app.use('/api/inquiries', inquiryRoutes);
app.use('/api/auth', authRoutes);

app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'success', message: 'API is running' });
});

// Handle undefined routes
app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

// Global Error Handling Middleware
app.use(globalErrorHandler);

module.exports = app;
