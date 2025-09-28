const { body, validationResult } = require('express-validator');

// Handle validation errors
const handleValidationErrors = (req, res, next) => {
 const errors = validationResult(req);
 if (!errors.isEmpty()) {
  return res.status(400).json({
   success: false,
   message: 'Validation failed',
   errors: errors.array()
  });
 }
 next();
};

// Job validation rules
const validateJob = [
 body('title')
  .notEmpty()
  .withMessage('Job title is required')
  .isLength({ max: 100 })
  .withMessage('Job title cannot exceed 100 characters'),

 body('company')
  .notEmpty()
  .withMessage('Company name is required')
  .isLength({ max: 100 })
  .withMessage('Company name cannot exceed 100 characters'),

 body('category')
  .isIn(['Engineering', 'Product', 'Design', 'Marketing', 'Data', 'Sales', 'Operations'])
  .withMessage('Invalid job category'),

 body('location')
  .notEmpty()
  .withMessage('Job location is required'),

 body('employmentType')
  .isIn(['Full-time', 'Part-time', 'Contract', 'Remote'])
  .withMessage('Invalid employment type'),

 body('experienceLevel')
  .isIn(['Entry', 'Mid-Level', 'Senior', 'Lead'])
  .withMessage('Invalid experience level'),

 body('salaryRange')
  .notEmpty()
  .withMessage('Salary range is required'),

 body('description')
  .notEmpty()
  .withMessage('Job description is required')
  .isLength({ max: 2000 })
  .withMessage('Description cannot exceed 2000 characters'),

 body('skills')
  .isArray({ min: 1 })
  .withMessage('At least one skill is required'),

 handleValidationErrors
];

// Application validation rules
const validateApplication = [
 body('personalInfo.firstName')
  .notEmpty()
  .withMessage('First name is required'),

 body('personalInfo.lastName')
  .notEmpty()
  .withMessage('Last name is required'),

 body('personalInfo.email')
  .isEmail()
  .withMessage('Valid email is required'),

 body('personalInfo.phone')
  .notEmpty()
  .withMessage('Phone number is required'),

 body('personalInfo.location')
  .notEmpty()
  .withMessage('Location is required'),

 body('professionalInfo.experience')
  .notEmpty()
  .withMessage('Experience level is required'),

 body('professionalInfo.currentRole')
  .notEmpty()
  .withMessage('Current role is required'),

 body('professionalInfo.salaryExpectation')
  .notEmpty()
  .withMessage('Salary expectation is required'),

 body('professionalInfo.availabilityDate')
  .isISO8601()
  .withMessage('Valid availability date is required'),

 body('professionalInfo.skills')
  .isArray({ min: 1 })
  .withMessage('At least one skill is required'),

 body('applicationDetails.coverLetter')
  .notEmpty()
  .withMessage('Cover letter is required')
  .isLength({ max: 2000 })
  .withMessage('Cover letter cannot exceed 2000 characters'),

 body('applicationDetails.whyInterested')
  .notEmpty()
  .withMessage('Interest explanation is required')
  .isLength({ max: 1000 })
  .withMessage('Interest explanation cannot exceed 1000 characters'),

 handleValidationErrors
];

// Candidate registration validation
const validateCandidateRegistration = [
 body('email')
  .isEmail()
  .withMessage('Valid email is required'),

 body('password')
  .isLength({ min: 6 })
  .withMessage('Password must be at least 6 characters'),

 body('profile.firstName')
  .notEmpty()
  .withMessage('First name is required'),

 body('profile.lastName')
  .notEmpty()
  .withMessage('Last name is required'),

 handleValidationErrors
];

// Company registration validation
const validateCompanyRegistration = [
 body('email')
  .isEmail()
  .withMessage('Valid email is required'),

 body('password')
  .isLength({ min: 6 })
  .withMessage('Password must be at least 6 characters'),

 body('name')
  .notEmpty()
  .withMessage('Company name is required'),

 body('location')
  .notEmpty()
  .withMessage('Company location is required'),

 handleValidationErrors
];

module.exports = {
 validateJob,
 validateApplication,
 validateCandidateRegistration,
 validateCompanyRegistration,
 handleValidationErrors
};

