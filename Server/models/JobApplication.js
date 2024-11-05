// models/JobApplication.js

const mongoose = require('mongoose');

const JobApplicationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  phone: {
    type: String,
    required: true,
  },
  resume: {
    type: String, // Store file path or URL after uploading
    required: true,
  },
  coverLetter: {
    type: String,
    required: true,
  },
  experience: {
    type: String,
    required: true,
  },
  languages: {
    type: String,
    required: true,
  },
}, { timestamps: true });

const JobApplication = mongoose.model('JobApplication', JobApplicationSchema);

module.exports = JobApplication;
