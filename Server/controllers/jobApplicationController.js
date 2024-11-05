// controllers/jobApplicationController.js

const JobApplication = require('../models/JobApplication');

exports.createApplication = async (req, res) => {
    try {
      const { name, email, phone, resume, coverLetter, experience, languages } = req.body;
  
      // Check if an application with the same email already exists
      const existingApplication = await JobApplication.findOne({ email });
  
      if (existingApplication) {
        return res.status(400).json({ message: 'An application with this email already exists.' });
      }
  
      // Create a new job application
      const newApplication = new JobApplication({
        name,
        email,
        phone,
        resume,
        coverLetter,
        experience,
        languages,
      });
  
      // Save the application to the database
      await newApplication.save();
  
      return res.status(201).json({ message: 'Application submitted successfully', newApplication });
    } catch (error) {
      console.error('Error submitting application:', error);
      return res.status(500).json({ message: 'Error submitting application', error: error.message });
    }
  };
  


exports.getAllApplications = async (req, res) => {
  try {
    const applications = await JobApplication.find();
    return res.status(200).json(applications);
  } catch (error) {
    console.error('Error fetching applications:', error);
    return res.status(500).json({ message: 'Error fetching applications', error: error.message });
  }
};

exports.getApplicationById = async (req, res) => {
  try {
    const application = await JobApplication.findById(req.params.id);
    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }
    return res.status(200).json(application);
  } catch (error) {
    console.error('Error fetching application:', error);
    return res.status(500).json({ message: 'Error fetching application', error: error.message });
  }
};

exports.deleteApplication = async (req, res) => {
  try {
    const application = await JobApplication.findByIdAndDelete(req.params.id);
    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }
    return res.status(200).json({ message: 'Application deleted successfully' });
  } catch (error) {
    console.error('Error deleting application:', error);
    return res.status(500).json({ message: 'Error deleting application', error: error.message });
  }
};
