const asyncHandler = require('express-async-handler');
const SecurityLog = require('../models/SecurityLog');

// @desc    Get all security logs
// @route   GET /api/security
// @access  Private
const getSecurityLogs = asyncHandler(async (req, res) => {
  const logs = await SecurityLog.find({});
  res.json(logs);
});

// @desc    Get security log by ID
// @route   GET /api/security/:id
// @access  Private
const getSecurityLogById = asyncHandler(async (req, res) => {
  const log = await SecurityLog.findById(req.params.id);

  if (log) {
    res.json(log);
  } else {
    res.status(404);
    throw new Error('Security log not found');
  }
});

// @desc    Create new security log
// @route   POST /api/security
// @access  Private
const createSecurityLog = asyncHandler(async (req, res) => {
  const { description, date } = req.body;

  const log = new SecurityLog({
    description,
    date,
  });

  const createdLog = await log.save();
  res.status(201).json(createdLog);
});

// @desc    Update security log
// @route   PUT /api/security/:id
// @access  Private
const updateSecurityLog = asyncHandler(async (req, res) => {
  const log = await SecurityLog.findById(req.params.id);

  if (log) {
    log.description = req.body.description || log.description;
    log.date = req.body.date || log.date;
    log.resolved = req.body.resolved || log.resolved;

    const updatedLog = await log.save();
    res.json(updatedLog);
  } else {
    res.status(404);
    throw new Error('Security log not found');
  }
});

// @desc    Delete security log
// @route   DELETE /api/security/:id
// @access  Private
const deleteSecurityLog = asyncHandler(async (req, res) => {
  const log = await SecurityLog.findById(req.params.id);

  if (log) {
    await log.remove();
    res.json({ message: 'Security log removed' });
  } else {
    res.status(404);
    throw new Error('Security log not found');
  }
});

module.exports = {
  getSecurityLogs,
  getSecurityLogById,
  create
}