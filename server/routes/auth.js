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

// TEMPORARY: Reset Admin Password
const bcrypt = require('bcryptjs');
router.get('/reset-admin-force', async (req, res) => {
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash('admin123', salt);

        let user = await User.findOne({ username: 'admin' });
        if (user) {
            user.password = hashedPassword;
            await user.save();
            res.send('Admin password reset to: admin123');
        } else {
            await User.create({
                username: 'admin',
                password: hashedPassword,
                role: 'admin'
            });
            res.send('Admin user created with password: admin123');
        }
    } catch (err) {
        console.error(err);
        res.status(500).send(err.message);
    }
});

module.exports = router;
