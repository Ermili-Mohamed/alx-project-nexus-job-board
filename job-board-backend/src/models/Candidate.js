const mongoose = require('mongoose');

const candidateSchema = new mongoose.Schema({
 email: {
  type: String,
  required: [true, 'Email is required'],
  unique: true,
  lowercase: true,
  match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
 },
 password: {
  type: String,
  required: [true, 'Password is required'],
  minlength: [6, 'Password must be at least 6 characters']
 },
 profile: {
  firstName: {
   type: String,
   required: [true, 'First name is required'],
   trim: true,
   maxlength: [50, 'First name cannot exceed 50 characters']
  },
  lastName: {
   type: String,
   required: [true, 'Last name is required'],
   trim: true,
   maxlength: [50, 'Last name cannot exceed 50 characters']
  },
  phone: {
   type: String,
   trim: true
  },
  location: {
   type: String,
   trim: true
  },
  linkedinUrl: {
   type: String,
   trim: true
  },
  portfolioUrl: {
   type: String,
   trim: true
  },
  resumePath: {
   type: String
  }
 },
 preferences: {
  jobTypes: [{
   type: String,
   enum: ['Full-time', 'Part-time', 'Contract', 'Remote']
  }],
  locations: [{
   type: String,
   trim: true
  }],
  salaryRange: {
   min: {
    type: Number,
    default: 40000
   },
   max: {
    type: Number,
    default: 200000
   }
  },
  remoteWork: {
   type: String,
   enum: ['remote', 'hybrid', 'onsite', 'flexible'],
   default: 'flexible'
  }
 },
 lastLogin: {
  type: Date
 }
}, {
 timestamps: true
});

// Hash password before saving
candidateSchema.pre('save', async function (next) {
 if (!this.isModified('password')) return next();

 const bcrypt = require('bcryptjs');
 this.password = await bcrypt.hash(this.password, 12);
 next();
});

// Compare password method
candidateSchema.methods.comparePassword = async function (candidatePassword) {
 const bcrypt = require('bcryptjs');
 return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('Candidate', candidateSchema);

