const Job = require('../models/Job');
const Application = require('../models/Application');

// @desc    Get all jobs with filters
// @route   GET /api/jobs
// @access  Public
const getJobs = async (req, res) => {
  try {
    const {
      category,
      location,
      experience,
      type,
      salaryMin,
      salaryMax,
      datePosted,
      companySize,
      remote,
      search,
      page = 1,
      limit = 10,
      sort = 'postedDate'
    } = req.query;

    // Build filter object
    const filters = { isActive: true };

    if (category && category !== 'all') {
      filters.category = category;
    }

    if (location && location !== 'all') {
      filters.location = new RegExp(location, 'i');
    }

    if (experience && experience !== 'all') {
      filters.experienceLevel = experience;
    }

    if (type && type !== 'all') {
      filters.employmentType = type;
    }

    if (remote && remote !== 'all') {
      if (remote === 'remote') {
        filters.employmentType = 'Remote';
      } else if (remote === 'hybrid') {
        filters.location = new RegExp('hybrid|remote', 'i');
      } else if (remote === 'onsite') {
        filters.employmentType = { $ne: 'Remote' };
      }
    }

    // Text search
    if (search) {
      filters.$text = { $search: search };
    }

    // Date filter
    if (datePosted && datePosted !== 'any') {
      const now = new Date();
      let dateFilter;

      switch (datePosted) {
        case '24h':
          dateFilter = new Date(now.getTime() - 24 * 60 * 60 * 1000);
          break;
        case '3d':
          dateFilter = new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000);
          break;
        case '1w':
          dateFilter = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
          break;
        case '2w':
          dateFilter = new Date(now.getTime() - 14 * 24 * 60 * 60 * 1000);
          break;
        case '1m':
          dateFilter = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
          break;
        default:
          dateFilter = null;
      }

      if (dateFilter) {
        filters.postedDate = { $gte: dateFilter };
      }
    }

    // Build sort object
    let sortObj = {};
    switch (sort) {
      case 'newest':
        sortObj = { postedDate: -1 };
        break;
      case 'oldest':
        sortObj = { postedDate: 1 };
        break;
      case 'salary-high':
        sortObj = { salaryRange: -1 };
        break;
      case 'salary-low':
        sortObj = { salaryRange: 1 };
        break;
      default:
        sortObj = { postedDate: -1 };
    }

    // Execute query with pagination
    const jobs = await Job.find(filters)
      .sort(sortObj)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .populate('companyId', 'name logo');

    const total = await Job.countDocuments(filters);

    res.json({
      success: true,
      count: jobs.length,
      total,
      page: parseInt(page),
      pages: Math.ceil(total / limit),
      data: jobs
    });
  } catch (error) {
    console.error('Get jobs error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching jobs'
    });
  }
};

// @desc    Get single job
// @route   GET /api/jobs/:id
// @access  Public
const getJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id)
      .populate('companyId', 'name logo description website location size industry');

    if (!job) {
      return res.status(404).json({
        success: false,
        message: 'Job not found'
      });
    }

    res.json({
      success: true,
      data: job
    });
  } catch (error) {
    console.error('Get job error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching job'
    });
  }
};

// @desc    Create new job
// @route   POST /api/jobs
// @access  Private (Company)
const createJob = async (req, res) => {
  try {
    const jobData = {
      ...req.body,
      companyId: req.company._id
    };

    const job = await Job.create(jobData);

    res.status(201).json({
      success: true,
      data: job
    });
  } catch (error) {
    console.error('Create job error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while creating job'
    });
  }
};

// @desc    Update job
// @route   PUT /api/jobs/:id
// @access  Private (Company)
const updateJob = async (req, res) => {
  try {
    let job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({
        success: false,
        message: 'Job not found'
      });
    }

    // Check if company owns this job
    if (job.companyId.toString() !== req.company._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this job'
      });
    }

    job = await Job.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    res.json({
      success: true,
      data: job
    });
  } catch (error) {
    console.error('Update job error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while updating job'
    });
  }
};

// @desc    Delete job
// @route   DELETE /api/jobs/:id
// @access  Private (Company)
const deleteJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({
        success: false,
        message: 'Job not found'
      });
    }

    // Check if company owns this job
    if (job.companyId.toString() !== req.company._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this job'
      });
    }

    await Job.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: 'Job deleted successfully'
    });
  } catch (error) {
    console.error('Delete job error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while deleting job'
    });
  }
};

// @desc    Get job categories
// @route   GET /api/jobs/categories
// @access  Public
const getCategories = async (req, res) => {
  try {
    const categories = await Job.distinct('category');
    res.json({
      success: true,
      data: categories
    });
  } catch (error) {
    console.error('Get categories error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching categories'
    });
  }
};

// @desc    Get job locations
// @route   GET /api/jobs/locations
// @access  Public
const getLocations = async (req, res) => {
  try {
    const locations = await Job.distinct('location');
    res.json({
      success: true,
      data: locations
    });
  } catch (error) {
    console.error('Get locations error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching locations'
    });
  }
};

module.exports = {
  getJobs,
  getJob,
  createJob,
  updateJob,
  deleteJob,
  getCategories,
  getLocations
};

