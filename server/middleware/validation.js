const { body, param, query, validationResult } = require('express-validator');
const mongoose = require('mongoose');

/**
 * Middleware to check validation results
 */
const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            message: 'Validation failed',
            errors: errors.array()
        });
    }
    next();
};

/**
 * Validate MongoDB ObjectId
 */
const validateObjectId = (paramName = 'id') => {
    return param(paramName)
        .custom((value) => {
            if (!mongoose.Types.ObjectId.isValid(value)) {
                throw new Error('Invalid ID format');
            }
            return true;
        });
};

/**
 * Property validation rules
 */
const propertyValidation = {
    create: [
        body('title')
            .trim()
            .notEmpty().withMessage('Title is required')
            .isLength({ min: 3, max: 200 }).withMessage('Title must be between 3 and 200 characters'),

        body('description')
            .trim()
            .notEmpty().withMessage('Description is required')
            .isLength({ min: 10, max: 5000 }).withMessage('Description must be between 10 and 5000 characters'),

        body('price')
            .isNumeric().withMessage('Price must be a number')
            .isFloat({ min: 0 }).withMessage('Price must be positive'),

        body('location')
            .trim()
            .notEmpty().withMessage('Location is required')
            .isLength({ max: 200 }).withMessage('Location must be less than 200 characters'),

        body('type')
            .isIn(['sale', 'rent']).withMessage('Type must be either "sale" or "rent"'),

        body('category')
            .isIn(['apartment', 'villa', 'house', 'plot', 'commercial'])
            .withMessage('Invalid category'),

        body('specs.area')
            .trim()
            .notEmpty().withMessage('Area is required'),

        body('specs.beds')
            .optional()
            .isInt({ min: 0, max: 50 }).withMessage('Beds must be between 0 and 50'),

        body('specs.baths')
            .optional()
            .isInt({ min: 0, max: 50 }).withMessage('Baths must be between 0 and 50'),

        body('amenities')
            .optional()
            .isArray().withMessage('Amenities must be an array'),

        body('externalLink')
            .optional()
            .isURL().withMessage('External link must be a valid URL'),

        body('featured')
            .optional()
            .isBoolean().withMessage('Featured must be a boolean'),

        body('coordinates.lat')
            .optional()
            .isFloat({ min: -90, max: 90 }).withMessage('Latitude must be between -90 and 90'),

        body('coordinates.lng')
            .optional()
            .isFloat({ min: -180, max: 180 }).withMessage('Longitude must be between -180 and 180'),

        validate
    ],

    update: [
        validateObjectId('id'),
        // Same as create but all fields optional
        body('title')
            .optional()
            .trim()
            .isLength({ min: 3, max: 200 }).withMessage('Title must be between 3 and 200 characters'),

        body('description')
            .optional()
            .trim()
            .isLength({ min: 10, max: 5000 }).withMessage('Description must be between 10 and 5000 characters'),

        body('price')
            .optional()
            .isNumeric().withMessage('Price must be a number')
            .isFloat({ min: 0 }).withMessage('Price must be positive'),

        body('type')
            .optional()
            .isIn(['sale', 'rent']).withMessage('Type must be either "sale" or "rent"'),

        body('category')
            .optional()
            .isIn(['apartment', 'villa', 'house', 'plot', 'commercial'])
            .withMessage('Invalid category'),

        validate
    ],

    query: [
        query('type')
            .optional()
            .isIn(['sale', 'rent', 'all', 'any']).withMessage('Invalid type'),

        query('category')
            .optional()
            .isIn(['apartment', 'villa', 'house', 'plot', 'commercial', 'all', 'any'])
            .withMessage('Invalid category'),

        query('featured')
            .optional()
            .isBoolean().withMessage('Featured must be boolean'),

        query('minBudget')
            .optional()
            .isNumeric().withMessage('Min budget must be a number'),

        query('maxBudget')
            .optional()
            .isNumeric().withMessage('Max budget must be a number'),

        validate
    ]
};

/**
 * Auth validation rules
 */
const authValidation = {
    login: [
        body('username')
            .trim()
            .notEmpty().withMessage('Username is required')
            .isLength({ min: 3, max: 50 }).withMessage('Username must be between 3 and 50 characters'),

        body('password')
            .notEmpty().withMessage('Password is required')
            .isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),

        validate
    ],

    register: [
        body('username')
            .trim()
            .notEmpty().withMessage('Username is required')
            .isLength({ min: 3, max: 50 }).withMessage('Username must be between 3 and 50 characters')
            .matches(/^[a-zA-Z0-9_]+$/).withMessage('Username can only contain letters, numbers, and underscores'),

        body('password')
            .notEmpty().withMessage('Password is required')
            .isLength({ min: 8 }).withMessage('Password must be at least 8 characters')
            .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/).withMessage('Password must contain at least one uppercase letter, one lowercase letter, and one number'),

        validate
    ]
};

/**
 * Enquiry validation rules
 */
const enquiryValidation = {
    create: [
        body('name')
            .trim()
            .notEmpty().withMessage('Name is required')
            .isLength({ min: 2, max: 100 }).withMessage('Name must be between 2 and 100 characters'),

        body('email')
            .trim()
            .notEmpty().withMessage('Email is required')
            .isEmail().withMessage('Must be a valid email address')
            .normalizeEmail(),

        body('phone')
            .trim()
            .notEmpty().withMessage('Phone is required')
            .matches(/^[0-9+\-\s()]+$/).withMessage('Invalid phone number format'),

        body('message')
            .trim()
            .notEmpty().withMessage('Message is required')
            .isLength({ min: 10, max: 1000 }).withMessage('Message must be between 10 and 1000 characters'),

        body('propertyId')
            .optional()
            .custom((value) => {
                if (value && !mongoose.Types.ObjectId.isValid(value)) {
                    throw new Error('Invalid property ID');
                }
                return true;
            }),

        validate
    ]
};

/**
 * Settings validation rules
 */
const settingsValidation = {
    update: [
        body('whatsappNumber')
            .optional()
            .trim()
            .matches(/^[0-9]{10,15}$/).withMessage('WhatsApp number must be 10-15 digits'),

        validate
    ]
};

module.exports = {
    validate,
    validateObjectId,
    propertyValidation,
    authValidation,
    enquiryValidation,
    settingsValidation
};
