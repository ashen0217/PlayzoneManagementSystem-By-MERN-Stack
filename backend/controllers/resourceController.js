const asyncHandler = require('express-async-handler');
const Resource = require('../models/Resource');

// @desc    Get all resources
// @route   GET /api/resources
// @access  Private
const getResources = asyncHandler(async (req, res) => {
  const resources = await Resource.find({});
  res.json(resources);
});

// @desc    Get resource by ID
// @route   GET /api/resources/:id
// @access  Private
const getResourceById = asyncHandler(async (req, res) => {
  const resource = await Resource.findById(req.params.id);

  if (resource) {
    res.json(resource);
  } else {
    res.status(404);
    throw new Error('Resource not found');
  }
});

// @desc    Create new resource
// @route   POST /api/resources
// @access  Private
const createResource = asyncHandler(async (req, res) => {
  const { name, type } = req.body;

  const resource = new Resource({
    name,
    type,
  });

  const createdResource = await resource.save();
  res.status(201).json(createdResource);
});

// @desc    Update resource
// @route   PUT /api/resources/:id
// @access  Private
const updateResource = asyncHandler(async (req, res) => {
  const resource = await Resource.findById(req.params.id);

  if (resource) {
    resource.name = req.body.name || resource.name;
    resource.type = req.body.type || resource.type;
    resource.availability = req.body.availability || resource.availability;

    const updatedResource = await resource.save();
    res.json(updatedResource);
  } else {
    res.status(404);
    throw new Error('Resource not found');
  }
});

// @desc    Delete resource
// @route   DELETE /api/resources/:id
// @access  Private
const deleteResource = asyncHandler(async (req, res) => {
  const resource = await Resource.findById(req.params.id);

  if (resource) {
    await resource.remove();
    res.json({ message: 'Resource removed' });
  } else {
    res.status(404);
    throw new Error('Resource not found');
  }
});

module.exports = {
  getResources,
  getResourceById,
  createResource,
  updateResource,
  deleteResource,
};