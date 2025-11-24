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

        console.log("Mongo Query:", query);

        // Price range filtering
        if (budget && budget !== 'any') {
            // Helper to parse price string "1,25,00,000" to number 12500000
            // Note: This assumes prices are stored as strings in the DB. 
            // Ideally, they should be numbers. If they are strings, we can't easily do range queries 
            // without aggregation or converting them.
            // However, looking at the model, price IS a string. This is a design flaw for range queries.
            // For now, we will try to filter in memory or use regex if possible, but range is hard on strings.
            // A better approach is to store price as Number.

            // Since we can't easily change the DB schema and migrate data right now without risk,
            // let's try to fetch all and filter in JS (not efficient but works for small datasets).
            // OR we can try to rely on the user inputting consistent formats.

            // Let's do in-memory filtering for now as the dataset is likely small.
        }

        let properties = await Property.find(query).sort({ createdAt: -1 });

        // In-memory filtering for price if budget is set
        if (budget && budget !== 'any') {
            console.log("Filtering by budget:", budget);
            properties = properties.filter(p => {
                // Remove commas and convert to number
                // Handle various formats: "1,25,00,000", "1.5 Cr", "50 Lakhs", "₹ 1,25,00,000"
                let priceStr = p.price.toString().toLowerCase().replace(/,/g, '').replace(/₹/g, '').trim();
                let priceVal = 0;

                if (priceStr.includes('cr')) {
                    priceVal = parseFloat(priceStr.replace('cr', '').trim()) * 10000000;
                } else if (priceStr.includes('lakh')) {
                    priceVal = parseFloat(priceStr.replace('lakhs', '').replace('lakh', '').trim()) * 100000;
                } else {
                    priceVal = parseInt(priceStr.replace(/[^0-9.]/g, '')) || 0;
                }

                console.log(`Property: ${p.title}, Price: ${p.price}, Parsed: ${priceVal}`);

                switch (budget) {
                    case 'low': return priceVal < 5000000; // Under 50L
                    case 'medium': return priceVal >= 5000000 && priceVal <= 10000000; // 50L - 1 Cr
                    case 'high': return priceVal > 10000000 && priceVal <= 20000000; // 1 Cr - 2 Cr
                    case 'luxury': return priceVal > 20000000; // Above 2 Cr
                    default: return true;
                }
            });
            console.log("Properties after budget filter:", properties.length);
        }

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
