const express = require('express');
const router = express.Router();
const {
 getJobs,
 getJob,
 createJob,
 updateJob,
 deleteJob,
 getCategories,
 getLocations
} = require('../controllers/jobController');
const { protect, protectCompany } = require('../middleware/auth');
const { validateJob } = require('../middleware/validation');

// Public routes
router.get('/', getJobs);
router.get('/categories', getCategories);
router.get('/locations', getLocations);
router.get('/:id', getJob);

// Protected routes (Company only)
router.post('/', protectCompany, validateJob, createJob);
router.put('/:id', protectCompany, validateJob, updateJob);
router.delete('/:id', protectCompany, deleteJob);

module.exports = router;

