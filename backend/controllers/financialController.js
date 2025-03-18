const asyncHandler = require('express-async-handler');
const FinancialRecord = require('../models/FinancialRecord');

// @desc    Get all financial records
// @route   GET /api/financials
// @access  Private
const getFinancialRecords = asyncHandler(async (req, res) => {
  const records = await FinancialRecord.find({});
  res.json(records);
});

// @desc    Get financial record by ID
// @route   GET /api/financials/:id
// @access  Private
const getFinancialRecordById = asyncHandler(async (req, res) => {
  const record = await FinancialRecord.findById(req.params.id);

  if (record) {
    res.json(record);
  } else {
    res.status(404);
    throw new Error('Financial record not found');
  }
});

// @desc    Create new financial record
// @route   POST /api/financials
// @access  Private
const createFinancialRecord = asyncHandler(async (req, res) => {
  const { description, amount, date, type } = req.body;

  const record = new FinancialRecord({
    description,
    amount,
    date,
    type,
  });

  const createdRecord = await record.save();
  res.status(201).json(createdRecord);
});

// @desc    Update financial record
// @route   PUT /api/financials/:id
// @access  Private
const updateFinancialRecord = asyncHandler(async (req, res) => {
  const record = await FinancialRecord.findById(req.params.id);

  if (record) {
    record.description = req.body.description || record.description;
    record.amount = req.body.amount || record.amount;
    record.date = req.body.date || record.date;
    record.type = req.body.type || record.type;

    const updatedRecord = await record.save();
    res.json(updatedRecord);
  } else {
    res.status(404);
    throw new Error('Financial record not found');
  }
});

// @desc    Delete financial record
// @route   DELETE /api/financials/:id
// @access  Private
const deleteFinancialRecord = asyncHandler(async (req, res) => {
  const record = await FinancialRecord.findById(req.params.id);

  if (record) {
    await record.remove();
    res.json({ message: 'Financial record removed' });
  } else {
    res.status(404);
    throw new Error('Financial record not found');
  }
});

module.exports = {
  getFinancialRecords,
  getFinancialRecordById,
  createFinancialRecord,
  updateFinancialRecord,
  deleteFinancialRecord,
};