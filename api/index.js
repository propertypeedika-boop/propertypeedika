/**
 * Vercel Serverless Function Entry Point
 * Handles all API requests by delegating to the Express server
 */
module.exports = async (req, res) => {
    try {
        const app = require('../server/server');
        return app(req, res);
    } catch (error) {
        console.error('Server failed to load:', error);
        return res.status(500).json({
            error: "Server failed to load",
            message: error.message,
            // Only expose stack trace in development
            ...(process.env.NODE_ENV === 'development' && { stack: error.stack })
        });
    }
};
