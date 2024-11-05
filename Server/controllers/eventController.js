const mongoose = require('mongoose');

const Event = require('../models/Event'); 
const Attendance = require('../models/Attendance');

// Create a new event
exports.createEvent = async (req, res) => {
  try {
    const event = new Event(req.body); 
    const savedEvent = await event.save();
    res.status(201).json(savedEvent); 
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};


exports.getAllEvents = async (req, res) => {
  try {
      const events = await Event.find({ isApproved: true })
          .populate('organizer', 'username')
          .populate('attendees', 'username');

      // Map through events to get count of attendees
      const eventsWithCount = events.map(event => ({
          ...event.toObject(), // Convert mongoose document to plain object
          attendeesCount: event.attendees.length // Add the count of attendees
      }));

      // Send only one object with all necessary data
      res.status(200).json(eventsWithCount);
  } catch (err) {
      console.error('Error fetching events:', err); // More clarity on errors
      res.status(500).json({ message: err.message });
  }
};


exports.getAllEventsAdmin = async (req, res) => {
  try {
    const events = await Event.find()
    .populate('organizer', 'username')
    .populate('attendees', 'username');
 // Fetch all events from the database
    res.status(200).json(events); // Return the events in the response
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch events', details: error.message });
  }
};


exports.getEventById = async (req, res) => {
  try {
    const eventId = req.params.id;

    // Fetch the event by ID
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    // Count the number of attendees for this event
    const attendeesCount = await Attendance.countDocuments({ event: eventId });

    // Prepare the response with the event details and attendees count
    const eventResponse = {
      ...event.toObject(),
      attendeesCount, // Add the attendees count to the response
    };

    res.status(200).json(eventResponse);
  } catch (error) {
    console.error('Error fetching event:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Update an event by ID
exports.updateEvent = async (req, res) => {
  try {
    const updatedEvent = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedEvent) return res.status(404).json({ message: 'Event not found' });
    res.status(200).json(updatedEvent);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete an event by ID
exports.deleteEvent = async (req, res) => {
  try {
    const deletedEvent = await Event.findByIdAndDelete(req.params.id);
    if (!deletedEvent) return res.status(404).json({ message: 'Event not found' });
    res.status(200).json({ message: 'Event deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// Add an attendee to an event
exports.addAttendee = async (req, res) => {
  const { userId } = req.body;
  console.log(userId)

  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: 'Event not found' });

    // Check if the user is already an attendee
    if (event.attendees.includes(userId)) {
      return res.status(400).json({ message: 'User is already an attendee' });
    }

    // Push userId to attendees
    event.attendees.push(userId); 
    // Increment the attendeeCount by 1
    event.attendeesCount += 1; // Assuming you have an attendeesCount field in your Event model
    await event.save();

    // Create Attendance record
    const attendance = new Attendance({
      event: event._id,
      user: userId,
      isInterested: true,
    });
    await attendance.save();

    res.status(200).json({ message: 'Attendee added', event });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// Remove an attendee from an event
exports.removeAttendee = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: 'Event not found' });

    // Check if the user is an attendee
    if (!event.attendees.includes(req.body.userId)) {
      return res.status(400).json({ message: 'User is not an attendee' });
    }

    // Remove the user from attendees
    event.attendees = event.attendees.filter(attendee => attendee.toString() !== req.body.userId);
    await event.save();
    res.status(200).json({ message: 'Attendee removed', event });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.toggleInterest = async (req, res) => {
  const { eventId } = req.params;
  const { userId } = req.body;

  try {
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    let attendance = await Attendance.findOne({ event: eventId, user: userId });

    if (!attendance) {
      attendance = new Attendance({
        event: eventId,
        user: userId,
        isInterested: true,
      });
      await attendance.save();

      event.attendeeCount += 1;
      await event.save();
      return res.status(201).json({ message: 'Marked as interested', attendance, isInterested: true });
    }

    // Toggle attendance state
    attendance.isInterested = !attendance.isInterested;
    await attendance.save();

    if (attendance.isInterested) {
      event.attendeeCount += 1;
    } else {
      event.attendeeCount -= 1;
    }
    await event.save();

    res.status(200).json({ message: 'Interest toggled', attendance, isInterested: attendance.isInterested });
  } catch (error) {
    console.error('Error toggling interest:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


// Get attendees for an event
exports.getAttendees = async (req, res) => {
  const { eventId } = req.params;

  try {
    // Find all attendance records where isInterested is true and event matches eventId
    const attendees = await Attendance.find({ event: eventId, isInterested: true }).populate('user', 'name email');

    // Even if there are no attendees, send an empty array instead of 404
    res.status(200).json({ attendees: attendees.map(att => att.user) });
  } catch (error) {
    console.error('Error fetching attendees:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


exports.getInterestedEventsByUserId = async (req, res) => {
  const { userId } = req.params;

  try {
    const attendances = await Attendance.find({ user: userId, isInterested: true })
      .populate('event');

    const interestedEvents = attendances.map(att => att.event);
    
    res.status(200).json(interestedEvents);
  } catch (error) {
    console.error('Error fetching interested events:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};



// ----------------------------admin

exports.updateEventApprovalAdmin = async (req, res) => {
  const eventId = req.params.eventId; // Get eventId from URL parameters
  const { isApproved } = req.body; // Get isApproved from request body
  console.log(eventId);

  try {
    // Validate if eventId is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(eventId)) {
      return res.status(400).json({ error: 'Invalid Event ID' });
    }

    const event = await Event.findByIdAndUpdate(
      eventId, 
      { isApproved }, // Update isApproved status
      { new: true } // Return the updated event
    );

    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }

    res.status(200).json({ message: 'Event approval status updated', event });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update event status', details: error.message });
  }
};