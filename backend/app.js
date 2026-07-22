const express = require('express');
const cors = require('cors');
const AppError = require('./src/utils/AppError');
const globalErrorHandler = require('./src/middlewares/errorHandler');

const projectRoutes = require('./src/routes/project.routes');
const clientRoutes = require('./src/routes/client.routes');
const inquiryRoutes = require('./src/routes/inquiry.routes');
const authRoutes = require('./src/routes/auth.routes');

const app = express();

const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./src/config/swagger');

// 1. Set security HTTP headers
app.use(helmet());

// 2. Limit requests from same API
const limiter = rateLimit({
  max: 100, // Limit each IP to 100 requests per `window` (here, per hour)
  windowMs: 60 * 60 * 1000, // 1 hour
  message: 'Too many requests from this IP, please try again in an hour!'
});
app.use('/api', limiter);

// Middlewares
app.use(cors());
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

// 3. Data sanitization against NoSQL query injection
// Note: express-mongo-sanitize has a known issue with Express 5 where req.query is read-only
// app.use(mongoSanitize());

// 4. Data sanitization against XSS
// Note: xss-clean is deprecated and crashes Express 5
// app.use(xss());

// 5. Prevent parameter pollution
app.use(hpp());

// Swagger API Documentation Route
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Routes
app.use('/api/projects', projectRoutes);
app.use('/api/clients', clientRoutes);
app.use('/api/inquiries', inquiryRoutes);
app.use('/api/auth', authRoutes);

app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'success', message: 'API is running' });
});

// Handle undefined routes
app.use((req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

// Global Error Handling Middleware
app.use(globalErrorHandler);

module.exports = app;
