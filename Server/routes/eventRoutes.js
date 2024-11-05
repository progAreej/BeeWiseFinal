const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController'); // Import the event controller

// Route to create a new event
router.post('/events', eventController.createEvent);

router.post('/events/:eventId/toggle-attendee', eventController.toggleInterest); // Corrected here
// Route to get all events
router.get('/events', eventController.getAllEvents);
router.get('/eventsAdmin', eventController.getAllEventsAdmin);

// Route to get an event by ID
router.get('/events/:id', eventController.getEventById);

// Route to update an event by ID
router.put('/events/:id', eventController.updateEvent);

// Route to delete an event by ID
router.delete('/events/:id', eventController.deleteEvent);

// Route to toggle an attendee for an event (mark as interested)

router.delete('/:id/attendees', eventController.removeAttendee);
// Route to get all attendees for an event
router.get('/events/:id/attendees', eventController.getAttendees);

router.get('/users/:userId/interested-events', eventController.getInterestedEventsByUserId);

router.post('/:id/attendees', eventController.addAttendee);



// Update event approval (for admin)
router.put('/events/:eventId/approval', eventController.updateEventApprovalAdmin);


module.exports = router; // Ensure this line is present

