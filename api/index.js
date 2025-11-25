const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Simple User schema
const UserSchema = new mongoose.Schema({
    username: String,
    password: String,
    role: String
});
const User = mongoose.models.User || mongoose.model('User', UserSchema);

module.exports = async (req, res) => {
    // Handle reset-admin-force route
    if (req.url === '/api/auth/reset-admin-force') {
        try {
            if (mongoose.connection.readyState !== 1) {
                await mongoose.connect(process.env.MONGODB_URI);
            }

            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash('admin123', salt);

            let user = await User.findOne({ username: 'admin' });
            if (user) {
                user.password = hashedPassword;
                await user.save();
                return res.status(200).send('Admin password reset to: admin123');
            } else {
                await User.create({
                    username: 'admin',
                    password: hashedPassword,
                    role: 'admin'
                });
                return res.status(200).send('Admin user created with password: admin123');
            }
        } catch (error) {
            return res.status(500).json({ error: error.message, stack: error.stack });
        }
    }

    // For all other routes, try to load the full server
    try {
        const app = require('../server/server');
        return app(req, res);
    } catch (error) {
        return res.status(500).json({
            error: "Server failed to load",
            message: error.message,
            stack: error.stack
        });
    }
};
