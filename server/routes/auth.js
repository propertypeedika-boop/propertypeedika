const express = require('express');
const router = express.Router();
const { login, register } = require('../controllers/authController');
const auth = require('../middleware/auth');
const User = require('../models/User');

// Register (Public - use once to create admin)
router.post('/register', register);

// Login
router.post('/login', login);

// Verify token
router.get('/verify', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json({ valid: true, user });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
