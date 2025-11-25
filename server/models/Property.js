const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    coordinates: {
        lat: {
            type: Number,
            default: null
        },
        lng: {
            type: Number,
            default: null
        }
    },
    type: {
        type: String,
        enum: ['sale', 'rent'],
        required: true
    },
    category: {
        type: String,
        enum: ['apartment', 'villa', 'house', 'plot', 'commercial'],
        required: true
    },
    specs: {
        beds: {
            type: Number,
            default: 0
        },
        baths: {
            type: Number,
            default: 0
        },
        area: {
            type: String,
            required: true
        }
    },
    amenities: [{
        type: String
    }],
    images: [{
        type: String
    }],
    externalLink: {
        type: String,
        trim: true,
        default: null
    },
    featured: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Property', propertySchema);
