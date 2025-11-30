const mongoose = require('mongoose');

let cached = global.mongoose;

if (!cached) {
    cached = global.mongoose = { conn: null, promise: null };
}

/**
 * Connect to MongoDB with retry logic
 * @param {number} retries - Number of retry attempts
 * @param {number} delay - Initial delay in milliseconds
 */
const connectDB = async (retries = 5, delay = 1000) => {
    if (cached.conn) {
        return cached.conn;
    }

    if (!cached.promise) {
        const opts = {
            bufferCommands: false,
            serverSelectionTimeoutMS: 5000,
            socketTimeoutMS: 45000,
        };

        const attemptConnection = async (attempt = 1) => {
            try {
                console.log(`🔗 Attempting MongoDB connection (attempt ${attempt}/${retries})...`);
                const connection = await mongoose.connect(process.env.MONGODB_URI, opts);
                console.log('✅ MongoDB Connected successfully');
                return connection;
            } catch (error) {
                console.error(`❌ MongoDB connection attempt ${attempt} failed:`, error.message);

                if (attempt >= retries) {
                    console.error('🚫 Max retries reached. Could not connect to MongoDB.');
                    throw error;
                }

                // Exponential backoff
                const waitTime = delay * Math.pow(2, attempt - 1);
                console.log(`⏳ Retrying in ${waitTime}ms...`);

                await new Promise(resolve => setTimeout(resolve, waitTime));
                return attemptConnection(attempt + 1);
            }
        };

        cached.promise = attemptConnection();
    }

    try {
        cached.conn = await cached.promise;
    } catch (e) {
        cached.promise = null;
        throw e;
    }

    return cached.conn;
};

module.exports = connectDB;

