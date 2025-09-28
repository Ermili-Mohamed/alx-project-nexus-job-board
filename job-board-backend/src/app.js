const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const path = require('path');
require('dotenv').config({ path: './config.env' });

// Import routes
const authRoutes = require('./routes/auth');
const jobRoutes = require('./routes/jobs');
const applicationRoutes = require('./routes/applications');
const uploadRoutes = require('./routes/upload');

// Import middleware
const { handleUploadError } = require('./middleware/upload');

const app = express();

// Security middleware
app.use(helmet());

// Rate limiting
const limiter = rateLimit({
 windowMs: 15 * 60 * 1000, // 15 minutes
 max: 100, // limit each IP to 100 requests per windowMs
 message: {
  success: false,
  message: 'Too many requests from this IP, please try again later.'
 }
});
app.use(limiter);

// CORS configuration
const allowedOrigins = [
 'http://localhost:5173',
 'http://localhost:3000',
 'https://your-frontend-app.onrender.com', // Render frontend URL
 'https://your-frontend-app.vercel.app', // Vercel frontend URL
 process.env.CORS_ORIGIN
].filter(Boolean);

app.use(cors({
 origin: function (origin, callback) {
  // Allow requests with no origin (mobile apps, curl, etc.)
  if (!origin) return callback(null, true);

  if (allowedOrigins.includes(origin)) {
   return callback(null, true);
  }

  // For development, allow localhost
  if (process.env.NODE_ENV === 'development') {
   return callback(null, true);
  }

  callback(new Error('Not allowed by CORS'));
 },
 credentials: true,
 methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
 allowedHeaders: ['Content-Type', 'Authorization']
}));

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Logging middleware
if (process.env.NODE_ENV === 'development') {
 app.use(morgan('dev'));
}

// Static files
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/applications', applicationRoutes);
app.use('/api/upload', uploadRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
 res.json({
  success: true,
  message: 'Job Board API is running',
  timestamp: new Date().toISOString()
 });
});

// 404 handler
app.use((req, res) => {
 res.status(404).json({
  success: false,
  message: 'Route not found'
 });
});

// Global error handler
app.use((err, req, res, next) => {
 console.error('Global error handler:', err);

 // Handle upload errors
 if (err.code === 'LIMIT_FILE_SIZE') {
  return res.status(400).json({
   success: false,
   message: 'File too large. Maximum size is 5MB.'
  });
 }

 if (err.code === 'LIMIT_FILE_COUNT') {
  return res.status(400).json({
   success: false,
   message: 'Too many files uploaded.'
  });
 }

 if (err.message.includes('Invalid file type')) {
  return res.status(400).json({
   success: false,
   message: err.message
  });
 }

 // Handle validation errors
 if (err.name === 'ValidationError') {
  const errors = Object.values(err.errors).map(e => e.message);
  return res.status(400).json({
   success: false,
   message: 'Validation failed',
   errors
  });
 }

 // Handle duplicate key errors
 if (err.code === 11000) {
  const field = Object.keys(err.keyValue)[0];
  return res.status(400).json({
   success: false,
   message: `${field} already exists`
  });
 }

 // Handle JWT errors
 if (err.name === 'JsonWebTokenError') {
  return res.status(401).json({
   success: false,
   message: 'Invalid token'
  });
 }

 if (err.name === 'TokenExpiredError') {
  return res.status(401).json({
   success: false,
   message: 'Token expired'
  });
 }

 // Default error
 res.status(err.statusCode || 500).json({
  success: false,
  message: err.message || 'Internal server error'
 });
});

module.exports = app;

