try {
    const app = require('../server/server');
    module.exports = app;
} catch (error) {
    console.error("Server Initialization Error:", error);
    module.exports = (req, res) => {
        res.status(500).json({
            error: "Server Initialization Failed",
            message: error.message,
            stack: error.stack
        });
    };
}
