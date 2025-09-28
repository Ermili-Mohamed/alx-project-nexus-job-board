const Candidate = require('../models/Candidate');
const Company = require('../models/Company');
const { generateToken } = require('../middleware/auth');

// @desc    Register candidate
// @route   POST /api/auth/register
// @access  Public
const registerCandidate = async (req, res) => {
 try {
  const { email, password, profile } = req.body;

  // Check if candidate already exists
  const existingCandidate = await Candidate.findOne({ email });
  if (existingCandidate) {
   return res.status(400).json({
    success: false,
    message: 'Candidate already exists with this email'
   });
  }

  // Create candidate
  const candidate = await Candidate.create({
   email,
   password,
   profile
  });

  // Generate token
  const token = generateToken(candidate._id);

  res.status(201).json({
   success: true,
   message: 'Candidate registered successfully',
   token,
   data: {
    id: candidate._id,
    email: candidate.email,
    profile: candidate.profile
   }
  });
 } catch (error) {
  console.error('Register candidate error:', error);
  res.status(500).json({
   success: false,
   message: 'Server error while registering candidate'
  });
 }
};

// @desc    Login candidate
// @route   POST /api/auth/login
// @access  Public
const loginCandidate = async (req, res) => {
 try {
  const { email, password } = req.body;

  // Check if candidate exists
  const candidate = await Candidate.findOne({ email }).select('+password');
  if (!candidate) {
   return res.status(401).json({
    success: false,
    message: 'Invalid credentials'
   });
  }

  // Check password
  const isPasswordValid = await candidate.comparePassword(password);
  if (!isPasswordValid) {
   return res.status(401).json({
    success: false,
    message: 'Invalid credentials'
   });
  }

  // Update last login
  candidate.lastLogin = new Date();
  await candidate.save();

  // Generate token
  const token = generateToken(candidate._id);

  res.json({
   success: true,
   message: 'Login successful',
   token,
   data: {
    id: candidate._id,
    email: candidate.email,
    profile: candidate.profile
   }
  });
 } catch (error) {
  console.error('Login candidate error:', error);
  res.status(500).json({
   success: false,
   message: 'Server error while logging in'
  });
 }
};

// @desc    Register company
// @route   POST /api/auth/company/register
// @access  Public
const registerCompany = async (req, res) => {
 try {
  const { email, password, name, location, description, website, industry, size } = req.body;

  // Check if company already exists
  const existingCompany = await Company.findOne({ email });
  if (existingCompany) {
   return res.status(400).json({
    success: false,
    message: 'Company already exists with this email'
   });
  }

  // Create company
  const company = await Company.create({
   email,
   password,
   name,
   location,
   description,
   website,
   industry,
   size
  });

  // Generate token
  const token = generateToken(company._id);

  res.status(201).json({
   success: true,
   message: 'Company registered successfully',
   token,
   data: {
    id: company._id,
    email: company.email,
    name: company.name,
    location: company.location,
    isVerified: company.isVerified
   }
  });
 } catch (error) {
  console.error('Register company error:', error);
  res.status(500).json({
   success: false,
   message: 'Server error while registering company'
  });
 }
};

// @desc    Login company
// @route   POST /api/auth/company/login
// @access  Public
const loginCompany = async (req, res) => {
 try {
  const { email, password } = req.body;

  // Check if company exists
  const company = await Company.findOne({ email }).select('+password');
  if (!company) {
   return res.status(401).json({
    success: false,
    message: 'Invalid credentials'
   });
  }

  // Check password
  const isPasswordValid = await company.comparePassword(password);
  if (!isPasswordValid) {
   return res.status(401).json({
    success: false,
    message: 'Invalid credentials'
   });
  }

  // Update last login
  company.lastLogin = new Date();
  await company.save();

  // Generate token
  const token = generateToken(company._id);

  res.json({
   success: true,
   message: 'Login successful',
   token,
   data: {
    id: company._id,
    email: company.email,
    name: company.name,
    location: company.location,
    isVerified: company.isVerified
   }
  });
 } catch (error) {
  console.error('Login company error:', error);
  res.status(500).json({
   success: false,
   message: 'Server error while logging in'
  });
 }
};

// @desc    Get current user
// @route   GET /api/auth/me
// @access  Private
const getMe = async (req, res) => {
 try {
  if (req.user) {
   // Candidate
   res.json({
    success: true,
    data: {
     id: req.user._id,
     email: req.user.email,
     profile: req.user.profile,
     type: 'candidate'
    }
   });
  } else if (req.company) {
   // Company
   res.json({
    success: true,
    data: {
     id: req.company._id,
     email: req.company.email,
     name: req.company.name,
     location: req.company.location,
     isVerified: req.company.isVerified,
     type: 'company'
    }
   });
  } else {
   res.status(401).json({
    success: false,
    message: 'Not authenticated'
   });
  }
 } catch (error) {
  console.error('Get me error:', error);
  res.status(500).json({
   success: false,
   message: 'Server error while fetching user data'
  });
 }
};

module.exports = {
 registerCandidate,
 loginCandidate,
 registerCompany,
 loginCompany,
 getMe
};

