const Property = require('../models/Property');
const cloudinary = require('../config/cloudinary');
const mongoose = require('mongoose');

/**
 * @desc   Create a new property
 * @route  POST /api/properties
 * @access Private (admin)
 */
exports.createProperty = async (req, res) => {
    try {

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

/**
 * @desc   Get all properties with filtering and pagination
 * @route  GET /api/properties
 * @access Public
 */
exports.getProperties = async (req, res) => {
    try {
        const {
            type,
            category,
            featured,
            location,
            minBudget,
            maxBudget,
            page = 1,
            limit = 12,
            sort = '-createdAt'
        } = req.query;

        let query = {};

        if (type && type !== 'any' && type !== 'all') query.type = type;
        if (category && category !== 'any' && category !== 'all') query.category = category;
        if (featured) query.featured = featured === 'true';

        // Location search (case-insensitive regex)
        if (location) {
            query.location = { $regex: location, $options: 'i' };
        }

        // Custom price range filtering
        if (minBudget || maxBudget) {
            query.price = {};

            if (minBudget) {
                const min = parseFloat(minBudget);
                if (!isNaN(min)) {
                    query.price.$gte = min;
                }
            }

            if (maxBudget) {
                const max = parseFloat(maxBudget);
                if (!isNaN(max)) {
                    query.price.$lte = max;
                }
            }
        }

        // Pagination
        const pageNum = parseInt(page, 10);
        const limitNum = parseInt(limit, 10);
        const skip = (pageNum - 1) * limitNum;

        // Execute query with pagination
        const [properties, total] = await Promise.all([
            Property.find(query)
                .sort(sort)
                .limit(limitNum)
                .skip(skip)
                .lean(), // Use lean() for better performance
            Property.countDocuments(query)
        ]);

        res.json({
            properties,
            pagination: {
                total,
                page: pageNum,
                limit: limitNum,
                pages: Math.ceil(total / limitNum),
                hasMore: skip + properties.length < total
            }
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

/**
 * @desc   Get single property by ID
 * @route  GET /api/properties/:id
 * @access Public
 */
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

/**
 * @desc   Update property
 * @route  PUT /api/properties/:id
 * @access Private (admin)
 */
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

/**
 * @desc   Delete property
 * @route  DELETE /api/properties/:id
 * @access Private (admin)
 */
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

/**
 * @desc   Get similar properties based on category and type
 * @route  GET /api/properties/similar/:id
 * @access Public
 */
exports.getSimilarProperties = async (req, res) => {
    try {
        const property = await Property.findById(req.params.id);
        if (!property) return res.status(404).json({ message: 'Property not found' });

        const similar = await Property.find({
            _id: { $ne: property._id },
            category: property.category,
            type: property.type
        }).limit(3);

        res.json(similar);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};
