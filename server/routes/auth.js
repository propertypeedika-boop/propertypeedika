const express = require('express');
const router = express.Router();
const { login, register } = require('../controllers/authController');
const auth = require('../middleware/auth');
const User = require('../models/User');
const { authValidation } = require('../middleware/validation');

// Register (Protected - admin only, for creating additional admins)
// For initial admin creation, use the create_admin.js script
router.post('/register', auth, authValidation.register, register);

// Login (Public) - with validation and rate limiting applied in server.js
router.post('/login', authValidation.login, login);

// Verify token (Protected)
router.get('/verify', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json({ valid: true, user });
    } catch (err) {
        console.error('Error verifying user:', err);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;

