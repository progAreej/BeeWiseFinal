// models/Attendance.js
const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
  event: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  isInterested: { type: Boolean, default: false }, // Tracks if the user is interested or attending
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Attendance', attendanceSchema);
