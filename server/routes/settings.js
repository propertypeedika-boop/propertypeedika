const express = require('express');
const router = express.Router();
const { getSettings, updateSettings } = require('../controllers/settingsController');
const auth = require('../middleware/auth');

// Get settings (public)
router.get('/', getSettings);

// Update settings (admin only)
router.put('/', auth, updateSettings);

module.exports = router;
