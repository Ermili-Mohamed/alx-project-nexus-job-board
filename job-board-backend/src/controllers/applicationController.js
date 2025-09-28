const Application = require('../models/Application');
const Job = require('../models/Job');

// @desc    Submit job application
// @route   POST /api/applications
// @access  Private (Candidate)
const submitApplication = async (req, res) => {
 try {
  const { jobId, personalInfo, professionalInfo, applicationDetails } = req.body;

  // Check if job exists
  const job = await Job.findById(jobId);
  if (!job) {
   return res.status(404).json({
    success: false,
    message: 'Job not found'
   });
  }

  // Check if user already applied
  const existingApplication = await Application.findOne({
   jobId: jobId,
   candidateId: req.user._id
  });

  if (existingApplication) {
   return res.status(400).json({
    success: false,
    message: 'You have already applied for this job'
   });
  }

  // Create application
  const applicationData = {
   jobId,
   candidateId: req.user._id,
   personalInfo,
   professionalInfo,
   applicationDetails
  };

  // Add file paths if uploaded
  if (req.files) {
   if (req.files.resume) {
    applicationData.applicationDetails.resumePath = req.files.resume[0].path;
   }
   if (req.files.portfolio) {
    applicationData.applicationDetails.portfolioPath = req.files.portfolio[0].path;
   }
  }

  const application = await Application.create(applicationData);

  // Update job applications count
  await Job.findByIdAndUpdate(jobId, {
   $inc: { applicationsCount: 1 }
  });

  res.status(201).json({
   success: true,
   message: 'Application submitted successfully',
   data: application
  });
 }
 catch (error) {
  console.error('Submit application error:', error);
  res.status(500).json({
   success: false,
   message: 'Server error while submitting application'
  });
 }
};

// @desc    Get user's applications
// @route   GET /api/applications
// @access  Private (Candidate)
const getMyApplications = async (req, res) => {
 try {
  const { page = 1, limit = 10, status } = req.query;

  const filters = { candidateId: req.user._id };
  if (status && status !== 'all') {
   filters.status = status;
  }

  const applications = await Application.find(filters)
   .populate('jobId', 'title company location employmentType postedDate')
   .sort({ appliedDate: -1 })
   .limit(limit * 1)
   .skip((page - 1) * limit);

  const total = await Application.countDocuments(filters);
  console.log("data analythec wit problem solving with the applications", applications)

  res.json({
   success: true,
   count: applications.length,
   total,
   page: parseInt(page),
   pages: Math.ceil(total / limit),
   data: applications
  });
 } catch (error) {
  console.error('Get applications error:', error);
  res.status(500).json({
   success: false,
   message: 'Server error while fetching applications'
  });
 }
};

// @desc    Get single application
// @route   GET /api/applications/:id
// @access  Private (Candidate or Company)
const getApplication = async (req, res) => {
 try {
  const application = await Application.findById(req.params.id)
   .populate('jobId', 'title company location employmentType')
   .populate('candidateId', 'profile.email');

  if (!application) {
   return res.status(404).json({
    success: false,
    message: 'Application not found'
   });
  }

  // Check if user has access to this application
  const isCandidate = req.user && application.candidateId._id.toString() === req.user._id.toString();
  const isCompany = req.company && application.jobId.companyId.toString() === req.company._id.toString();

  if (!isCandidate && !isCompany) {
   return res.status(403).json({
    success: false,
    message: 'Not authorized to view this application'
   });
  }

  res.json({
   success: true,
   data: application
  });
 } catch (error) {
  console.error('Get application error:', error);
  res.status(500).json({
   success: false,
   message: 'Server error while fetching application'
  });
 }
};

// @desc    Update application status
// @route   PUT /api/applications/:id/status
// @access  Private (Company)
const updateApplicationStatus = async (req, res) => {
 try {
  const { status } = req.body;

  const application = await Application.findById(req.params.id)
   .populate('jobId');

  if (!application) {
   return res.status(404).json({
    success: false,
    message: 'Application not found'
   });
  }

  // Check if company owns the job
  if (application.jobId.companyId.toString() !== req.company._id.toString()) {
   return res.status(403).json({
    success: false,
    message: 'Not authorized to update this application'
   });
  }

  application.status = status;
  await application.save();

  res.json({
   success: true,
   message: 'Application status updated successfully',
   data: application
  });
 } catch (error) {
  console.error('Update application status error:', error);
  res.status(500).json({
   success: false,
   message: 'Server error while updating application status'
  });
 }
};

// @desc    Get applications for a job
// @route   GET /api/jobs/:id/applications
// @access  Private (Company)
const getJobApplications = async (req, res) => {
 try {
  const { page = 1, limit = 10, status } = req.query;

  // Check if job exists and company owns it
  const job = await Job.findById(req.params.id);
  if (!job) {
   return res.status(404).json({
    success: false,
    message: 'Job not found'
   });
  }

  if (job.companyId.toString() !== req.company._id.toString()) {
   return res.status(403).json({
    success: false,
    message: 'Not authorized to view applications for this job'
   });
  }

  const filters = { jobId: req.params.id };
  if (status && status !== 'all') {
   filters.status = status;
  }

  const applications = await Application.find(filters)
   .populate('candidateId', 'profile.firstName profile.lastName profile.email')
   .sort({ appliedDate: -1 })
   .limit(limit * 1)
   .skip((page - 1) * limit);

  const total = await Application.countDocuments(filters);

  res.json({
   success: true,
   count: applications.length,
   total,
   page: parseInt(page),
   pages: Math.ceil(total / limit),
   data: applications
  });
 } catch (error) {
  console.error('Get job applications error:', error);
  res.status(500).json({
   success: false,
   message: 'Server error while fetching job applications'
  });
 }
};

module.exports = {
 submitApplication,
 getMyApplications,
 getApplication,
 updateApplicationStatus,
 getJobApplications
};

