/**
 * Database Indexes Setup Script
 * Run this once after deployment to optimize query performance
 * 
 * Usage: node server/config/setupIndexes.js
 */

require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('./db');

async function setupIndexes() {
    try {
        console.log('🔗 Connecting to MongoDB...');
        await connectDB();

        const db = mongoose.connection.db;

        console.log('\n📊 Creating indexes for properties collection...');

        // Properties collection indexes
        const propertiesCollection = db.collection('properties');

        // Index for filtering by type and category
        await propertiesCollection.createIndex({ type: 1, category: 1 });
        console.log('✅ Created index: type + category');

        // Index for location search (text search)
        await propertiesCollection.createIndex({ location: 'text', title: 'text', description: 'text' });
        console.log('✅ Created text index: location, title, description');

        // Index for price range queries
        await propertiesCollection.createIndex({ price: 1 });
        console.log('✅ Created index: price');

        // Index for featured properties
        await propertiesCollection.createIndex({ featured: 1, createdAt: -1 });
        console.log('✅ Created index: featured + createdAt');

        // Compound index for common query patterns
        await propertiesCollection.createIndex({ type: 1, category: 1, price: 1 });
        console.log('✅ Created compound index: type + category + price');

        // Index for sorting by creation date
        await propertiesCollection.createIndex({ createdAt: -1 });
        console.log('✅ Created index: createdAt (descending)');

        console.log('\n📊 Creating indexes for enquiries collection...');

        // Enquiries collection indexes
        const enquiriesCollection = db.collection('enquiries');

        // Index for sorting by creation date
        await enquiriesCollection.createIndex({ createdAt: -1 });
        console.log('✅ Created index: createdAt (descending)');

        // Index for property reference
        await enquiriesCollection.createIndex({ property: 1 });
        console.log('✅ Created index: property reference');

        console.log('\n📊 Creating indexes for users collection...');

        // Users collection indexes
        const usersCollection = db.collection('users');

        // Unique index for username
        await usersCollection.createIndex({ username: 1 }, { unique: true });
        console.log('✅ Created unique index: username');

        // List all indexes
        console.log('\n📋 Current indexes:');
        const propertyIndexes = await propertiesCollection.indexes();
        console.log('\nProperties:', propertyIndexes.map(idx => idx.name).join(', '));

        const enquiryIndexes = await enquiriesCollection.indexes();
        console.log('Enquiries:', enquiryIndexes.map(idx => idx.name).join(', '));

        const userIndexes = await usersCollection.indexes();
        console.log('Users:', userIndexes.map(idx => idx.name).join(', '));

        console.log('\n✨ All indexes created successfully!');
        console.log('💡 Queries will now be much faster.\n');

        process.exit(0);
    } catch (error) {
        console.error('❌ Error creating indexes:', error);
        process.exit(1);
    }
}

// Run if executed directly
if (require.main === module) {
    setupIndexes();
}

module.exports = setupIndexes;
