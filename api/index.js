module.exports = (req, res) => {
    res.status(200).json({
        message: "Vercel function is working!",
        timestamp: new Date().toISOString(),
        env_vars: {
            MONGODB_URI: process.env.MONGODB_URI ? 'EXISTS' : 'MISSING',
            JWT_SECRET: process.env.JWT_SECRET ? 'EXISTS' : 'MISSING',
            NODE_ENV: process.env.NODE_ENV || 'not set'
        }
    });
};
