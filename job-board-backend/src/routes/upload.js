const express = require('express');
const router = express.Router();
const {
 uploadResume,
 uploadPortfolio,
 uploadCompanyLogo,
 serveFile,
 deleteFile
} = require('../controllers/uploadController');
const { protect, protectCompany } = require('../middleware/auth');
const {
 uploadResume: uploadResumeMiddleware,
 uploadPortfolio: uploadPortfolioMiddleware,
 uploadCompanyLogo: uploadCompanyLogoMiddleware,
 handleUploadError
} = require('../middleware/upload');

// File upload routes
router.post('/resume', protect, uploadResumeMiddleware, handleUploadError, uploadResume);
router.post('/portfolio', protect, uploadPortfolioMiddleware, handleUploadError, uploadPortfolio);
router.post('/company-logo', protectCompany, uploadCompanyLogoMiddleware, handleUploadError, uploadCompanyLogo);

// File serving routes
router.get('/:type/:filename', serveFile);
router.delete('/:type/:filename', protect, deleteFile);

module.exports = router;

