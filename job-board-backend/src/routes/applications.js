const express = require('express');
const router = express.Router();
const {
 submitApplication,
 getMyApplications,
 getApplication,
 updateApplicationStatus,
 getJobApplications
} = require('../controllers/applicationController');
const { protect, protectCompany } = require('../middleware/auth');
const { validateApplication } = require('../middleware/validation');
const { uploadApplicationFiles, handleUploadError } = require('../middleware/upload');

// Candidate routes
router.post('/', protect, uploadApplicationFiles, handleUploadError, validateApplication, submitApplication);
router.get('/my-applications', protect, getMyApplications);
router.get('/:id', protect, getApplication);

// Company routes
router.put('/:id/status', protectCompany, updateApplicationStatus);
router.get('/job/:id', protectCompany, getJobApplications);

module.exports = router;

