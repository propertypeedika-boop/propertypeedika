const mongoose = require('mongoose');
const Property = require('./models/Property');
require('dotenv').config({ path: __dirname + '/.env' });

const sampleProperties = [
    {
        title: "Luxury Villa in Kowdiar",
        description: "Stunning 4BHK luxury villa with modern amenities, spacious garden, and premium finishes. Located in the heart of Kowdiar, one of Trivandrum's most prestigious neighborhoods. Features include a modular kitchen, marble flooring, and a private swimming pool.",
        price: 12500000, // 1.25 Cr
        location: "Kowdiar, Trivandrum",
        type: "sale",
        category: "villa",
        specs: {
            beds: 4,
            baths: 4,
            area: "3500 sq.ft"
        },
        amenities: [
            "Swimming Pool",
            "Modular Kitchen",
            "Parking for 2 Cars",
            "24/7 Security",
            "Power Backup",
            "Garden",
            "Marble Flooring",
            "Gated Community"
        ],
        images: [
            "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80",
            "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",
            "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80",
            "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&q=80",
            "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80"
        ],
        featured: true
    },
    {
        title: "Modern 3BHK Apartment in Vazhuthacaud",
        description: "Spacious 3BHK apartment in a premium gated community. Perfect for families looking for a comfortable living space with excellent connectivity. Close to schools, hospitals, and shopping centers. Ready to move in.",
        price: 6500000, // 65 Lakhs
        location: "Vazhuthacaud, Trivandrum",
        type: "sale",
        category: "apartment",
        specs: {
            beds: 3,
            baths: 3,
            area: "1850 sq.ft"
        },
        amenities: [
            "Gym",
            "Children's Play Area",
            "Lift",
            "Parking",
            "Power Backup",
            "Security",
            "Intercom",
            "Visitor Parking"
        ],
        images: [
            "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80",
            "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80",
            "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80",
            "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80"
        ],
        featured: true
    },
    {
        title: "Affordable 2BHK House for Rent in Pattom",
        description: "Well-maintained 2BHK independent house available for rent. Ideal for small families or working professionals. Located in a quiet residential area with easy access to Technopark and the city center. Semi-furnished with basic amenities.",
        price: 18000, // 18,000 per month
        location: "Pattom, Trivandrum",
        type: "rent",
        category: "house",
        specs: {
            beds: 2,
            baths: 2,
            area: "1200 sq.ft"
        },
        amenities: [
            "Semi-Furnished",
            "Parking",
            "Water Supply",
            "Balcony",
            "Separate Kitchen",
            "Geyser"
        ],
        images: [
            "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800&q=80",
            "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&q=80",
            "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80",
            "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800&q=80"
        ],
        featured: false
    }
];

async function addSampleProperties() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB');

        // Clear existing properties (optional - remove this if you want to keep existing data)
        // await Property.deleteMany({});
        // console.log('Cleared existing properties');

        // Insert sample properties
        const result = await Property.insertMany(sampleProperties);
        console.log(`Successfully added ${result.length} sample properties`);

        result.forEach((property, index) => {
            console.log(`\n${index + 1}. ${property.title}`);
            console.log(`   - Price: ₹${property.price.toLocaleString('en-IN')}`);
            console.log(`   - Location: ${property.location}`);
            console.log(`   - Images: ${property.images.length}`);
        });

        process.exit(0);
    } catch (error) {
        console.error('Error adding sample properties:', error);
        process.exit(1);
    }
}

addSampleProperties();
