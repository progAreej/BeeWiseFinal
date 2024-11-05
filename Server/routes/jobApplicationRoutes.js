// routes/jobApplicationRoutes.js

const express = require('express');
const router = express.Router();
const jobApplicationController = require('../controllers/jobApplicationController');

// Create a new job application
router.post('/', jobApplicationController.createApplication);

// Get all job applications
router.get('/', jobApplicationController.getAllApplications);

// Get a specific job application by ID
router.get('/:id', jobApplicationController.getApplicationById);

// Delete a job application by ID
router.delete('/:id', jobApplicationController.deleteApplication);

module.exports = router;
