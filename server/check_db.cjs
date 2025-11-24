const mongoose = require('mongoose');
const Property = require('./models/Property');
require('dotenv').config({ path: './.env' });

const checkData = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/propertypeedika');
        console.log('Connected to MongoDB');

        const properties = await Property.find({});
        console.log(`Found ${properties.length} properties.`);
        properties.forEach(p => {
            console.log(`ID: ${p._id}, Title: ${p.title}, Price: "${p.price}", Location: "${p.location}", Category: "${p.category}"`);
        });

        mongoose.disconnect();
    } catch (error) {
        console.error('Error:', error);
    }
};

checkData();
