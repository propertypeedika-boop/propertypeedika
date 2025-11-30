require('dotenv').config();
const validateEnv = require('./config/validateEnv');

// Validate environment variables before starting
validateEnv();

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const connectDB = require('./config/db');

const app = express();

// Connect to MongoDB
connectDB().catch(err => console.error("MongoDB Connection Error:", err));

// Security Middleware
app.use(helmet({
    contentSecurityPolicy: false, // Disable for now, configure properly later
    crossOriginEmbedderPolicy: false
}));

// CORS Configuration
const allowedOrigins = process.env.ALLOWED_ORIGINS
    ? process.env.ALLOWED_ORIGINS.split(',')
    : ['http://localhost:5173', 'http://localhost:3000'];

app.use(cors({
    origin: function (origin, callback) {
        // Allow requests with no origin (mobile apps, Postman, etc.)
        if (!origin) return callback(null, true);

        if (allowedOrigins.indexOf(origin) !== -1 || process.env.NODE_ENV === 'development') {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true
}));

// Rate Limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per windowMs
    message: 'Too many requests from this IP, please try again later.',
    standardHeaders: true,
    legacyHeaders: false,
});

// Apply rate limiting to all API routes
app.use('/api/', limiter);

// Stricter rate limiting for auth routes
const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 5, // 5 attempts per 15 minutes
    message: 'Too many login attempts, please try again later.',
});

app.use('/api/auth/login', authLimiter);

// Body parsing middleware with size limits
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use('/uploads', express.static('uploads'));

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/properties', require('./routes/properties'));
app.use('/api/enquiries', require('./routes/enquiries'));
app.use('/api/settings', require('./routes/settings'));

// Health check endpoint
app.get('/api/health', async (req, res) => {
    const mongoose = require('mongoose');
    const dbStatus = mongoose.connection.readyState === 1 ? 'connected' : 'disconnected';

    res.json({
        status: 'OK',
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV || 'development',
        database: dbStatus,
        uptime: process.uptime()
    });
});

// Debug routes - only in development
if (process.env.NODE_ENV === 'development') {
    const mongoose = require('mongoose');
    app.get('/api/debug/db', async (req, res) => {
        try {
            await connectDB();
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
            res.status(500).json({ error: error.message });
        }
    });
}

// 404 handler
app.use((req, res) => {
    res.status(404).json({ message: 'Route not found' });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Error:', err.message);

    // Don't expose stack traces in production
    const errorResponse = {
        message: err.message || 'Something went wrong!',
        ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
    };

    res.status(err.status || 500).json(errorResponse);
});

const PORT = process.env.PORT || 5001;

// Only start server if run directly (not imported)
if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`🚀 Server running on port ${PORT}`);
        console.log(`📡 API: http://localhost:${PORT}/api`);
        console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
    });
}

module.exports = app;
