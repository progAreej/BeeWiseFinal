

const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  isInterested: { type: Boolean, default: false }, // Tracks if the user is interested or attending
  createdAt: { type: Date, default: Date.now },
});

// Define the main event schema
const eventSchema = new mongoose.Schema({
  title: {
    en: { type: String, required: true },
    ar: { type: String, required: true },
  },
  description: {
    en: { type: String, required: true },
    ar: { type: String, required: true },
  },
  location: { type: String, required: true },
  date: { type: Date, required: true },
  organizer: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  createdAt: { type: Date, default: Date.now },
  imageUrl: { type: String },
  category: { type: String },
  isApproved: { type: Boolean, default: false },
  attendees: [attendanceSchema], // Embed attendance records directly in the event schema
});

// Create the Event model
const Event = mongoose.model('Event', eventSchema);
module.exports = Event;
