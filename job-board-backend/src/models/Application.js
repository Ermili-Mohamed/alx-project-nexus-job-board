const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
 jobId: {
  type: mongoose.Schema.Types.ObjectId,
  ref: 'Job',
  required: [true, 'Job ID is required']
 },
 candidateId: {
  type: mongoose.Schema.Types.ObjectId,
  ref: 'Candidate',
  required: [true, 'Candidate ID is required']
 },
 status: {
  type: String,
  enum: ['pending', 'reviewed', 'shortlisted', 'rejected', 'hired'],
  default: 'pending'
 },
 appliedDate: {
  type: Date,
  default: Date.now
 },
 personalInfo: {
  firstName: {
   type: String,
   required: [true, 'First name is required'],
   trim: true
  },
  lastName: {
   type: String,
   required: [true, 'Last name is required'],
   trim: true
  },
  email: {
   type: String,
   required: [true, 'Email is required'],
   lowercase: true
  },
  phone: {
   type: String,
   required: [true, 'Phone number is required'],
   trim: true
  },
  location: {
   type: String,
   required: [true, 'Location is required'],
   trim: true
  },
  linkedinUrl: {
   type: String,
   trim: true
  },
  portfolioUrl: {
   type: String,
   trim: true
  }
 },
 professionalInfo: {
  experience: {
   type: String,
   required: [true, 'Experience level is required']
  },
  currentRole: {
   type: String,
   required: [true, 'Current role is required'],
   trim: true
  },
  currentCompany: {
   type: String,
   trim: true
  },
  salaryExpectation: {
   type: String,
   required: [true, 'Salary expectation is required'],
   trim: true
  },
  availabilityDate: {
   type: Date,
   required: [true, 'Availability date is required']
  },
  skills: [{
   type: String,
   trim: true
  }]
 },
 applicationDetails: {
  coverLetter: {
   type: String,
   required: [true, 'Cover letter is required'],
   trim: true,
   maxlength: [2000, 'Cover letter cannot exceed 2000 characters']
  },
  whyInterested: {
   type: String,
   required: [true, 'Interest explanation is required'],
   trim: true,
   maxlength: [1000, 'Interest explanation cannot exceed 1000 characters']
  },
  resumePath: {
   type: String,
   required: [true, 'Resume is required']
  },
  portfolioPath: {
   type: String
  },
  references: {
   type: Boolean,
   default: false
  },
  relocate: {
   type: Boolean,
   default: false
  },
  remoteWork: {
   type: String,
   enum: ['remote', 'hybrid', 'onsite', 'flexible']
  }
 }
}, {
 timestamps: true
});

// Index for efficient queries
applicationSchema.index({ jobId: 1, candidateId: 1 });
applicationSchema.index({ candidateId: 1, appliedDate: -1 });
applicationSchema.index({ jobId: 1, status: 1 });

// Prevent duplicate applications
applicationSchema.index({ jobId: 1, candidateId: 1 }, { unique: true });

module.exports = mongoose.model('Application', applicationSchema);

