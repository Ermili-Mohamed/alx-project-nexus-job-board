const mongoose = require('mongoose');

const companySchema = new mongoose.Schema({
 name: {
  type: String,
  required: [true, 'Company name is required'],
  trim: true,
  unique: true,
  maxlength: [100, 'Company name cannot exceed 100 characters']
 },
 email: {
  type: String,
  required: [true, 'Company email is required'],
  unique: true,
  lowercase: true,
  match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
 },
 password: {
  type: String,
  required: [true, 'Password is required'],
  minlength: [6, 'Password must be at least 6 characters']
 },
 logo: {
  type: String,
  default: '/placeholder-logo.png'
 },
 description: {
  type: String,
  trim: true,
  maxlength: [1000, 'Description cannot exceed 1000 characters']
 },
 website: {
  type: String,
  trim: true
 },
 location: {
  type: String,
  required: [true, 'Company location is required'],
  trim: true
 },
 size: {
  type: String,
  enum: ['startup', 'small', 'medium', 'large'],
  default: 'startup'
 },
 industry: {
  type: String,
  trim: true
 },
 isVerified: {
  type: Boolean,
  default: false
 },
 lastLogin: {
  type: Date
 }
}, {
 timestamps: true
});

// Hash password before saving
companySchema.pre('save', async function (next) {
 if (!this.isModified('password')) return next();

 const bcrypt = require('bcryptjs');
 this.password = await bcrypt.hash(this.password, 12);
 next();
});

// Compare password method
companySchema.methods.comparePassword = async function (candidatePassword) {
 const bcrypt = require('bcryptjs');
 return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('Company', companySchema);

