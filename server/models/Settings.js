const mongoose = require('mongoose');

const SettingsSchema = new mongoose.Schema({
    whatsappNumber: {
        type: String,
        default: '919876543210' // Default dummy number
    }
}, { timestamps: true });

module.exports = mongoose.model('Settings', SettingsSchema);
