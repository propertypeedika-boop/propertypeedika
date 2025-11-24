const express = require('express');
const router = express.Router();
const { createEnquiry, getEnquiries, deleteEnquiry } = require('../controllers/enquiryController');
const auth = require('../middleware/auth');

// Public route to submit enquiry
router.post('/', createEnquiry);

// Protected admin routes
router.get('/', auth, getEnquiries);
router.delete('/:id', auth, deleteEnquiry);

module.exports = router;
