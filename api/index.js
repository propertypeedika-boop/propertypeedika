module.exports = (req, res) => {
    res.status(200).json({
        message: "API is working!",
        env: process.env.NODE_ENV,
        mongo: !!process.env.MONGODB_URI
    });
};
