const Settings = require('../models/Settings');

// Get settings (create if not exists)
exports.getSettings = async (req, res) => {
    try {
        let settings = await Settings.findOne();
        if (!settings) {
            settings = new Settings();
            await settings.save();
        }
        res.json(settings);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// Update settings
exports.updateSettings = async (req, res) => {
    const { whatsappNumber } = req.body;

    try {
        let settings = await Settings.findOne();
        if (!settings) {
            settings = new Settings({ whatsappNumber });
        } else {
            settings.whatsappNumber = whatsappNumber;
        }

        await settings.save();
        res.json(settings);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};
