// controllers/propertyController.js
const Property = require('../models/Property');
const cloudinary = require('../config/cloudinary');
const mongoose = require('mongoose');

// @desc   Create a new property
// @route  POST /api/properties
// @access Private (admin)
// @desc   Create a new property
// @route  POST /api/properties
// @access Private (admin)
exports.createProperty = async (req, res) => {
    try {
        console.log("createProperty called");
        console.log("req.body:", req.body);
        console.log("req.files:", req.files);

        // If data is sent as a JSON string in a 'data' field (common with some setups), parse it.
        // Otherwise, use req.body directly.
        let propertyData = req.body;
        if (req.body.data) {
            try {
                propertyData = JSON.parse(req.body.data);
            } catch (e) {
                console.error("Error parsing data field:", e);
                // Fallback to using body as is
            }
        }

        const { title, description, price, location, type, category, specs, amenities, featured } = propertyData;

        let imageUrls = [];
        if (req.files && req.files.length > 0) {
            imageUrls = req.files.map(file => {
                if (file.path.startsWith('http')) return file.path;
                // Construct full URL for local files
                return `${req.protocol}://${req.get('host')}/${file.path.replace(/\\/g, '/')}`;
            });
        }

        const property = await Property.create({
            title,
            description,
            price,
            location,
            type,
            category,
            specs,
            amenities,
            featured,
            images: imageUrls,
        });

        res.status(201).json(property);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

// @desc   Get all properties
// @route  GET /api/properties
// @access Public
// @desc   Get all properties
// @route  GET /api/properties
// @access Public
exports.getProperties = async (req, res) => {
    try {
        console.log("getProperties req.query:", req.query);
        const { type, category, featured, location, budget } = req.query;
        let query = {};

        if (type && type !== 'any' && type !== 'all') query.type = type;
        if (category && category !== 'any' && category !== 'all') query.category = category;
        if (featured) query.featured = featured === 'true';

        // Location search (case-insensitive regex)
        if (location) {
            query.location = { $regex: location, $options: 'i' };
        }

        // Price range filtering using MongoDB queries
        if (budget && budget !== 'any') {
            const budgetRanges = {
                'low': { min: 0, max: 5000000 },           // Up to 50 Lakhs
                'medium': { min: 5000000, max: 10000000 }, // 50L - 1 Cr
                'high': { min: 10000000, max: 50000000 },  // 1 Cr - 5 Cr
                'luxury': { min: 50000000, max: Infinity } // Above 5 Cr
            };

            const range = budgetRanges[budget];
            if (range) {
                query.price = { $gte: range.min };
                if (range.max !== Infinity) {
                    query.price.$lte = range.max;
                }
            }
        }

        console.log("Final Mongo Query:", query);

        const properties = await Property.find(query).sort({ createdAt: -1 });

        res.json(properties);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

// @desc   Get single property by ID
// @route  GET /api/properties/:id
// @access Public
exports.getProperty = async (req, res) => {
    try {
        const property = await Property.findById(req.params.id);
        if (!property) return res.status(404).json({ message: 'Property not found' });
        res.json(property);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

// @desc   Update property
// @route  PUT /api/properties/:id
// @access Private (admin)
// @desc   Update property
// @route  PUT /api/properties/:id
// @access Private (admin)
exports.updateProperty = async (req, res) => {
    try {
        let updates = req.body;
        if (req.body.data) {
            try {
                updates = JSON.parse(req.body.data);
            } catch (e) {
                console.error("Error parsing data field:", e);
            }
        }

        // Handle new images
        if (req.files && req.files.length > 0) {
            const newImageUrls = req.files.map(file => {
                if (file.path.startsWith('http')) return file.path;
                return `${req.protocol}://${req.get('host')}/${file.path.replace(/\\/g, '/')}`;
            });
            // If we want to append images:
            // updates.images = [...(updates.images || []), ...newImageUrls];
            // If we want to replace or handle specifically, the frontend should send the current images list.
            // For now, let's assume we append if images are provided, or the frontend handles the 'images' field in updates to keep existing ones.
            // A safer bet for a simple update is:
            // If the frontend sends 'existingImages' (array of urls) and we have new files.

            // Let's assume 'updates.images' contains the list of images we want to KEEP.
            // And we add the new ones to it.
            const existingImages = updates.images || [];
            updates.images = [...(Array.isArray(existingImages) ? existingImages : [existingImages]), ...newImageUrls];
        }

        const property = await Property.findByIdAndUpdate(req.params.id, updates, { new: true });
        if (!property) return res.status(404).json({ message: 'Property not found' });
        res.json(property);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

// @desc   Delete property
// @route  DELETE /api/properties/:id
// @access Private (admin)
exports.deleteProperty = async (req, res) => {
    try {
        const property = await Property.findByIdAndDelete(req.params.id);
        if (!property) return res.status(404).json({ message: 'Property not found' });
        res.json({ message: 'Property deleted' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};
