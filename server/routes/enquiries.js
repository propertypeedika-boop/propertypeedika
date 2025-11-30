const express = require('express');
const router = express.Router();
const { createEnquiry, getEnquiries, deleteEnquiry } = require('../controllers/enquiryController');
const auth = require('../middleware/auth');
const { enquiryValidation, validateObjectId } = require('../middleware/validation');

// Public route to submit enquiry - with validation
router.post('/', enquiryValidation.create, createEnquiry);

// Protected admin routes
router.get('/', auth, getEnquiries);
router.delete('/:id', auth, validateObjectId('id'), deleteEnquiry);

module.exports = router;

