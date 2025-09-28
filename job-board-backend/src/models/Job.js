const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
 title: {
  type: String,
  required: [true, 'Job title is required'],
  trim: true,
  maxlength: [100, 'Job title cannot exceed 100 characters']
 },
 company: {
  type: String,
  required: [true, 'Company name is required'],
  trim: true,
  maxlength: [100, 'Company name cannot exceed 100 characters']
 },
 companyLogo: {
  type: String,
  default: '/placeholder-logo.png'
 },
 category: {
  type: String,
  required: [true, 'Job category is required'],
  enum: ['Engineering', 'Product', 'Design', 'Marketing', 'Data', 'Sales', 'Operations']
 },
 location: {
  type: String,
  required: [true, 'Job location is required'],
  trim: true
 },
 employmentType: {
  type: String,
  required: [true, 'Employment type is required'],
  enum: ['Full-time', 'Part-time', 'Contract', 'Remote']
 },
 experienceLevel: {
  type: String,
  required: [true, 'Experience level is required'],
  enum: ['Entry', 'Mid-Level', 'Senior', 'Lead']
 },
 salaryRange: {
  type: String,
  required: [true, 'Salary range is required'],
  trim: true
 },
 description: {
  type: String,
  required: [true, 'Job description is required'],
  trim: true,
  maxlength: [2000, 'Description cannot exceed 2000 characters']
 },
 skills: [{
  type: String,
  trim: true
 }],
 isActive: {
  type: Boolean,
  default: true
 },
 applicationsCount: {
  type: Number,
  default: 0
 },
 companyId: {
  type: mongoose.Schema.Types.ObjectId,
  ref: 'Company'
 },
 postedDate: {
  type: Date,
  default: Date.now
 }
}, {
 timestamps: true
});

// Index for search functionality
jobSchema.index({ title: 'text', description: 'text', company: 'text' });
jobSchema.index({ category: 1, location: 1, employmentType: 1, experienceLevel: 1 });

module.exports = mongoose.model('Job', jobSchema);

