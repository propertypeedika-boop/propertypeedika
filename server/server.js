require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

const app = express();

// Connect to MongoDB
connectDB().catch(err => console.error("MongoDB Connection Error:", err));

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static('uploads'));

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/properties', require('./routes/properties'));
app.use('/api/enquiries', require('./routes/enquiries'));
app.use('/api/settings', require('./routes/settings'));

// Health check
app.get('/api/health', (req, res) => {
    res.json({
        status: 'OK',
        message: 'Server is running',
        env_check: {
            mongo_uri_exists: !!process.env.MONGODB_URI,
            node_env: process.env.NODE_ENV
        }
    });
});

// Debug DB Route
const mongoose = require('mongoose');
app.get('/api/debug/db', async (req, res) => {
    try {
        await connectDB(); // Lazy connect here
        const db = mongoose.connection.db;
        const collections = await db.listCollections().toArray();
        const collectionNames = collections.map(c => c.name);

        const counts = {};
        for (const name of collectionNames) {
            counts[name] = await db.collection(name).countDocuments();
        }

        res.json({
            connected_db_name: db.databaseName,
            collections: collectionNames,
            counts: counts
        });
    } catch (error) {
        res.status(500).json({ error: error.message, stack: error.stack });
    }
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong!', error: err.message });
});

const PORT = process.env.PORT || 5001;

// Only start server if run directly (not imported)
if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
        console.log(`API: http://localhost:${PORT}/api`);
    });
}

module.exports = app;
