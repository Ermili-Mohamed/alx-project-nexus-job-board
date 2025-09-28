const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Ensure upload directories exist
const ensureUploadDirs = () => {
 const dirs = ['./uploads', './uploads/resumes', './uploads/portfolios', './uploads/company-logos'];
 dirs.forEach(dir => {
  if (!fs.existsSync(dir)) {
   fs.mkdirSync(dir, { recursive: true });
  }
 });
};

ensureUploadDirs();

// File filter function
const fileFilter = (req, file, cb) => {
 const allowedTypes = {
  'application/pdf': '.pdf',
  'application/msword': '.doc',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': '.docx',
  'application/zip': '.zip',
  'image/jpeg': '.jpg',
  'image/jpg': '.jpg',
  'image/png': '.png'
 };

 if (allowedTypes[file.mimetype]) {
  cb(null, true);
 } else {
  cb(new Error('Invalid file type. Only PDF, DOC, DOCX, ZIP, JPG, and PNG files are allowed.'), false);
 }
};

// Storage configuration
const storage = multer.diskStorage({
 destination: (req, file, cb) => {
  let uploadPath = './uploads';

  if (file.fieldname === 'resume') {
   uploadPath = './uploads/resumes';
  } else if (file.fieldname === 'portfolio') {
   uploadPath = './uploads/portfolios';
  } else if (file.fieldname === 'companyLogo') {
   uploadPath = './uploads/company-logos';
  }

  cb(null, uploadPath);
 },
 filename: (req, file, cb) => {
  // Generate unique filename
  const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
  const ext = path.extname(file.originalname);
  cb(null, file.fieldname + '-' + uniqueSuffix + ext);
 }
});

// Multer configuration
const upload = multer({
 storage: storage,
 fileFilter: fileFilter,
 limits: {
  fileSize: parseInt(process.env.MAX_FILE_SIZE) || 5 * 1024 * 1024, // 5MB default
 }
});

// Upload middleware for resumes
const uploadResume = upload.single('resume');

// Upload middleware for portfolios
const uploadPortfolio = upload.single('portfolio');

// Upload middleware for company logos
const uploadCompanyLogo = upload.single('companyLogo');

// Multiple file upload for applications
const uploadApplicationFiles = upload.fields([
 { name: 'resume', maxCount: 1 },
 { name: 'portfolio', maxCount: 1 }
]);

// Error handling middleware
const handleUploadError = (error, req, res, next) => {
 if (error instanceof multer.MulterError) {
  if (error.code === 'LIMIT_FILE_SIZE') {
   return res.status(400).json({
    success: false,
    message: 'File too large. Maximum size is 5MB.'
   });
  }
  if (error.code === 'LIMIT_FILE_COUNT') {
   return res.status(400).json({
    success: false,
    message: 'Too many files uploaded.'
   });
  }
 }

 if (error.message.includes('Invalid file type')) {
  return res.status(400).json({
   success: false,
   message: error.message
  });
 }

 next(error);
};

module.exports = {
 uploadResume,
 uploadPortfolio,
 uploadCompanyLogo,
 uploadApplicationFiles,
 handleUploadError
};

