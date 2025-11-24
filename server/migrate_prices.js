const mongoose = require('mongoose');
const Property = require('./models/Property');
require('dotenv').config();

const migratePrices = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('MongoDB Connected');

        const properties = await Property.find({});
        console.log(`Found ${properties.length} properties to check.`);

        for (const p of properties) {
            // Check if price is already a number (or looks like one but stored as string without non-digits)
            // But since we just changed schema, mongoose might cast it if we save.
            // However, existing docs in Mongo are still strings if we haven't touched them.

            let currentPrice = p.get('price'); // Use get to bypass schema casting if possible, or just inspect

            // If it's already a number, skip
            if (typeof currentPrice === 'number') {
                console.log(`Property "${p.title}" already has numeric price: ${currentPrice}`);
                continue;
            }

            // Parse string price
            let priceStr = currentPrice.toString().toLowerCase().replace(/,/g, '').replace(/₹/g, '').trim();
            let priceVal = 0;

            if (priceStr.includes('cr')) {
                priceVal = parseFloat(priceStr.replace('cr', '').trim()) * 10000000;
            } else if (priceStr.includes('lakh')) {
                priceVal = parseFloat(priceStr.replace('lakhs', '').replace('lakh', '').trim()) * 100000;
            } else {
                priceVal = parseInt(priceStr.replace(/[^0-9.]/g, '')) || 0;
            }

            console.log(`Migrating "${p.title}": "${currentPrice}" -> ${priceVal}`);

            // Update with numeric value
            // We use updateOne to force the update even if schema changed
            await Property.updateOne({ _id: p._id }, { $set: { price: priceVal } });
        }

        console.log('Migration completed successfully.');
        process.exit();
    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
};

migratePrices();
