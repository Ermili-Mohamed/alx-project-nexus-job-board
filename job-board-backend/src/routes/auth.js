const express = require('express');
const router = express.Router();
const {
 registerCandidate,
 loginCandidate,
 registerCompany,
 loginCompany,
 getMe
} = require('../controllers/authController');
const { protect, protectCompany, optionalAuth } = require('../middleware/auth');
const {
 validateCandidateRegistration,
 validateCompanyRegistration
} = require('../middleware/validation');

// Public routes
router.post('/register', validateCandidateRegistration, registerCandidate);
router.post('/login', loginCandidate);
router.post('/company/register', validateCompanyRegistration, registerCompany);
router.post('/company/login', loginCompany);

// Protected routes
router.get('/me', optionalAuth, getMe);

module.exports = router;

