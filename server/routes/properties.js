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

// Get all properties (public)
router.get('/', getProperties);

// Get similar properties (public)
router.get('/similar/:id', getSimilarProperties);

// Get single property (public)
router.get('/:id', getProperty);

// Create property (admin only)
router.post('/', auth, upload.array('images', 10), createProperty);

// Update property (admin only)
router.put('/:id', auth, upload.array('images', 10), updateProperty);

// Delete property (admin only)
router.delete('/:id', auth, deleteProperty);

module.exports = router;
