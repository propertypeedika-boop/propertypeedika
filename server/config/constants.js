/**
 * Application Constants
 * Centralized location for all magic numbers and configuration values
 */

// File Upload Limits
const FILE_SIZE_LIMIT = 5 * 1024 * 1024; // 5MB
const MAX_FILES_PER_UPLOAD = 10;

// Pagination Defaults
const DEFAULT_PAGE = 1;
const DEFAULT_LIMIT = 12;
const MAX_LIMIT = 100;

// Price Formatting
const CRORE = 10000000; // 1 Crore = 10 million
const LAKH = 100000;    // 1 Lakh = 100 thousand

// Rate Limiting
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000; // 15 minutes
const RATE_LIMIT_MAX_REQUESTS = 100;
const AUTH_RATE_LIMIT_MAX_REQUESTS = 5;

// JWT Configuration
const JWT_EXPIRY = '7d';
const MIN_JWT_SECRET_LENGTH = 32;

// Password Requirements
const MIN_PASSWORD_LENGTH = 8;
const MIN_USERNAME_LENGTH = 3;
const MAX_USERNAME_LENGTH = 50;

// Property Validation
const MIN_TITLE_LENGTH = 3;
const MAX_TITLE_LENGTH = 200;
const MIN_DESCRIPTION_LENGTH = 10;
const MAX_DESCRIPTION_LENGTH = 5000;
const MAX_LOCATION_LENGTH = 200;
const MIN_BEDS = 0;
const MAX_BEDS = 50;
const MIN_BATHS = 0;
const MAX_BATHS = 50;

// Enquiry Validation
const MIN_NAME_LENGTH = 2;
const MAX_NAME_LENGTH = 100;
const MIN_MESSAGE_LENGTH = 10;
const MAX_MESSAGE_LENGTH = 1000;

// MongoDB Connection
const MONGODB_RETRY_ATTEMPTS = 5;
const MONGODB_RETRY_DELAY = 1000; // 1 second

// Image Optimization
const MAX_IMAGE_WIDTH = 1920;
const MAX_IMAGE_HEIGHT = 1080;

// Property Types
const PROPERTY_TYPES = ['sale', 'rent'];
const PROPERTY_CATEGORIES = ['apartment', 'villa', 'house', 'plot', 'commercial'];

// Enquiry Status
const ENQUIRY_STATUS = ['new', 'contacted', 'closed'];

module.exports = {
    // File Upload
    FILE_SIZE_LIMIT,
    MAX_FILES_PER_UPLOAD,

    // Pagination
    DEFAULT_PAGE,
    DEFAULT_LIMIT,
    MAX_LIMIT,

    // Price
    CRORE,
    LAKH,

    // Rate Limiting
    RATE_LIMIT_WINDOW_MS,
    RATE_LIMIT_MAX_REQUESTS,
    AUTH_RATE_LIMIT_MAX_REQUESTS,

    // JWT
    JWT_EXPIRY,
    MIN_JWT_SECRET_LENGTH,

    // Password
    MIN_PASSWORD_LENGTH,
    MIN_USERNAME_LENGTH,
    MAX_USERNAME_LENGTH,

    // Property
    MIN_TITLE_LENGTH,
    MAX_TITLE_LENGTH,
    MIN_DESCRIPTION_LENGTH,
    MAX_DESCRIPTION_LENGTH,
    MAX_LOCATION_LENGTH,
    MIN_BEDS,
    MAX_BEDS,
    MIN_BATHS,
    MAX_BATHS,

    // Enquiry
    MIN_NAME_LENGTH,
    MAX_NAME_LENGTH,
    MIN_MESSAGE_LENGTH,
    MAX_MESSAGE_LENGTH,

    // MongoDB
    MONGODB_RETRY_ATTEMPTS,
    MONGODB_RETRY_DELAY,

    // Images
    MAX_IMAGE_WIDTH,
    MAX_IMAGE_HEIGHT,

    // Enums
    PROPERTY_TYPES,
    PROPERTY_CATEGORIES,
    ENQUIRY_STATUS
};
