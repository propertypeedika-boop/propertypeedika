/**
 * Environment Variable Validation
 * Ensures all required environment variables are present at startup
 */

const requiredEnvVars = [
    'MONGODB_URI',
    'JWT_SECRET',
    'CLOUDINARY_CLOUD_NAME',
    'CLOUDINARY_API_KEY',
    'CLOUDINARY_API_SECRET'
];

const optionalEnvVars = [
    'PORT',
    'NODE_ENV',
    'ALLOWED_ORIGINS'
];

function validateEnv() {
    const missing = [];
    const warnings = [];

    // Check required variables
    requiredEnvVars.forEach(varName => {
        if (!process.env[varName]) {
            missing.push(varName);
        }
    });

    // Check JWT_SECRET strength
    if (process.env.JWT_SECRET && process.env.JWT_SECRET.length < 32) {
        warnings.push('JWT_SECRET should be at least 32 characters long for security');
    }

    // Report missing required variables
    if (missing.length > 0) {
        console.error('❌ FATAL: Missing required environment variables:');
        missing.forEach(varName => {
            console.error(`   - ${varName}`);
        });
        console.error('\nPlease create a .env file with all required variables.');
        console.error('See .env.example for reference.\n');
        process.exit(1);
    }

    // Report warnings
    if (warnings.length > 0) {
        console.warn('⚠️  Environment warnings:');
        warnings.forEach(warning => {
            console.warn(`   - ${warning}`);
        });
        console.warn('');
    }

    // Report optional variables
    const missingOptional = optionalEnvVars.filter(varName => !process.env[varName]);
    if (missingOptional.length > 0) {
        console.info('ℹ️  Optional environment variables not set:');
        missingOptional.forEach(varName => {
            console.info(`   - ${varName} (using default)`);
        });
        console.info('');
    }

    console.log('✅ Environment validation passed\n');
}

module.exports = validateEnv;
