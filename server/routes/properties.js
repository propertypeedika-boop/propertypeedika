const express = require('express');
const router = express.Router();
const {
    getProperties,
    getProperty,
    createProperty,
    updateProperty,
    deleteProperty,
    getSimilarProperties
} = require('../controllers/propertyController');
const auth = require('../middleware/auth');
const { upload } = require('../config/cloudinary');
const { propertyValidation, validateObjectId } = require('../middleware/validation');

// Get all properties (public) - with query validation
router.get('/', propertyValidation.query, getProperties);

// Get similar properties (public)
router.get('/similar/:id', validateObjectId('id'), getSimilarProperties);

// Get single property (public)
router.get('/:id', validateObjectId('id'), getProperty);

// Create property (admin only) - with validation
router.post('/', auth, upload.array('images', 10), createProperty);

// Update property (admin only) - with validation
router.put('/:id', auth, upload.array('images', 10), updateProperty);

// Delete property (admin only)
router.delete('/:id', auth, validateObjectId('id'), deleteProperty);

module.exports = router;

