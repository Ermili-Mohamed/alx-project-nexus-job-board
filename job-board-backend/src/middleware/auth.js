const jwt = require('jsonwebtoken');
const Candidate = require('../models/Candidate');
const Company = require('../models/Company');

// Generate JWT token
const generateToken = (id) => {
 return jwt.sign({ id }, process.env.JWT_SECRET, {
  expiresIn: process.env.JWT_EXPIRE,
 });
};

// Protect routes - require authentication
const protect = async (req, res, next) => {
 let token;

 if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
  try {
   // Get token from header
   token = req.headers.authorization.split(' ')[1];

   // Verify token
   const decoded = jwt.verify(token, process.env.JWT_SECRET);

   // Get user from token
   req.user = await Candidate.findById(decoded.id).select('-password');

   if (!req.user) {
    return res.status(401).json({
     success: false,
     message: 'Not authorized, user not found'
    });
   }

   next();
  } catch (error) {
   console.error('Token verification error:', error);
   return res.status(401).json({
    success: false,
    message: 'Not authorized, token failed'
   });
  }
 }

 if (!token) {
  return res.status(401).json({
   success: false,
   message: 'Not authorized, no token'
  });
 }
};

// Protect routes for companies
const protectCompany = async (req, res, next) => {
 let token;

 if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
  try {
   // Get token from header
   token = req.headers.authorization.split(' ')[1];

   // Verify token
   const decoded = jwt.verify(token, process.env.JWT_SECRET);

   // Get company from token
   req.company = await Company.findById(decoded.id).select('-password');

   if (!req.company) {
    return res.status(401).json({
     success: false,
     message: 'Not authorized, company not found'
    });
   }

   next();
  } catch (error) {
   console.error('Token verification error:', error);
   return res.status(401).json({
    success: false,
    message: 'Not authorized, token failed'
   });
  }
 }

 if (!token) {
  return res.status(401).json({
   success: false,
   message: 'Not authorized, no token'
  });
 }
};

// Optional authentication - doesn't fail if no token
const optionalAuth = async (req, res, next) => {
 let token;

 if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
  try {
   token = req.headers.authorization.split(' ')[1];
   const decoded = jwt.verify(token, process.env.JWT_SECRET);
   req.user = await Candidate.findById(decoded.id).select('-password');
  } catch (error) {
   // Continue without authentication
   req.user = null;
  }
 }

 next();
};

module.exports = {
 generateToken,
 protect,
 protectCompany,
 optionalAuth
};

