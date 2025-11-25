const mongoose = require('mongoose');

module.exports = async (req, res) => {
    try {
        if (mongoose.connection.readyState !== 1) {
            await mongoose.connect(process.env.MONGODB_URI);
        }

        const db = mongoose.connection.db;
        const collections = await db.listCollections().toArray();
        const collectionNames = collections.map(c => c.name);

        res.status(200).json({
            status: "Connected directly from api/index.js",
            db_name: db.databaseName,
            collections: collectionNames
        });
    } catch (error) {
        res.status(500).json({
            error: "DB Connection Failed",
            message: error.message,
            stack: error.stack
        });
    }
};
