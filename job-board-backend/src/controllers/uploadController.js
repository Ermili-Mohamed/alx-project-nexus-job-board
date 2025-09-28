const path = require('path');
const fs = require('fs');

// @desc    Upload resume
// @route   POST /api/upload/resume
// @access  Private (Candidate)
const uploadResume = async (req, res) => {
 try {
  if (!req.file) {
   return res.status(400).json({
    success: false,
    message: 'No file uploaded'
   });
  }

  res.json({
   success: true,
   message: 'Resume uploaded successfully',
   data: {
    filename: req.file.filename,
    path: req.file.path,
    size: req.file.size
   }
  });
 } catch (error) {
  console.error('Upload resume error:', error);
  res.status(500).json({
   success: false,
   message: 'Server error while uploading resume'
  });
 }
};

// @desc    Upload portfolio
// @route   POST /api/upload/portfolio
// @access  Private (Candidate)
const uploadPortfolio = async (req, res) => {
 try {
  if (!req.file) {
   return res.status(400).json({
    success: false,
    message: 'No file uploaded'
   });
  }

  res.json({
   success: true,
   message: 'Portfolio uploaded successfully',
   data: {
    filename: req.file.filename,
    path: req.file.path,
    size: req.file.size
   }
  });
 } catch (error) {
  console.error('Upload portfolio error:', error);
  res.status(500).json({
   success: false,
   message: 'Server error while uploading portfolio'
  });
 }
};

// @desc    Upload company logo
// @route   POST /api/upload/company-logo
// @access  Private (Company)
const uploadCompanyLogo = async (req, res) => {
 try {
  if (!req.file) {
   return res.status(400).json({
    success: false,
    message: 'No file uploaded'
   });
  }

  res.json({
   success: true,
   message: 'Company logo uploaded successfully',
   data: {
    filename: req.file.filename,
    path: req.file.path,
    size: req.file.size
   }
  });
 } catch (error) {
  console.error('Upload company logo error:', error);
  res.status(500).json({
   success: false,
   message: 'Server error while uploading company logo'
  });
 }
};

// @desc    Serve uploaded files
// @route   GET /api/uploads/:type/:filename
// @access  Public
const serveFile = async (req, res) => {
 try {
  const { type, filename } = req.params;

  // Validate file type
  const allowedTypes = ['resumes', 'portfolios', 'company-logos'];
  if (!allowedTypes.includes(type)) {
   return res.status(400).json({
    success: false,
    message: 'Invalid file type'
   });
  }

  const filePath = path.join(__dirname, '../../uploads', type, filename);

  // Check if file exists
  if (!fs.existsSync(filePath)) {
   return res.status(404).json({
    success: false,
    message: 'File not found'
   });
  }

  // Set appropriate headers
  const ext = path.extname(filename).toLowerCase();
  const mimeTypes = {
   '.pdf': 'application/pdf',
   '.doc': 'application/msword',
   '.docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
   '.zip': 'application/zip',
   '.jpg': 'image/jpeg',
   '.jpeg': 'image/jpeg',
   '.png': 'image/png'
  };

  const mimeType = mimeTypes[ext] || 'application/octet-stream';
  res.setHeader('Content-Type', mimeType);
  res.setHeader('Content-Disposition', `inline; filename="${filename}"`);

  // Stream the file
  const fileStream = fs.createReadStream(filePath);
  fileStream.pipe(res);
 } catch (error) {
  console.error('Serve file error:', error);
  res.status(500).json({
   success: false,
   message: 'Server error while serving file'
  });
 }
};

// @desc    Delete uploaded file
// @route   DELETE /api/uploads/:type/:filename
// @access  Private
const deleteFile = async (req, res) => {
 try {
  const { type, filename } = req.params;

  // Validate file type
  const allowedTypes = ['resumes', 'portfolios', 'company-logos'];
  if (!allowedTypes.includes(type)) {
   return res.status(400).json({
    success: false,
    message: 'Invalid file type'
   });
  }

  const filePath = path.join(__dirname, '../../uploads', type, filename);

  // Check if file exists
  if (!fs.existsSync(filePath)) {
   return res.status(404).json({
    success: false,
    message: 'File not found'
   });
  }

  // Delete the file
  fs.unlinkSync(filePath);

  res.json({
   success: true,
   message: 'File deleted successfully'
  });
 } catch (error) {
  console.error('Delete file error:', error);
  res.status(500).json({
   success: false,
   message: 'Server error while deleting file'
  });
 }
};

module.exports = {
 uploadResume,
 uploadPortfolio,
 uploadCompanyLogo,
 serveFile,
 deleteFile
};

