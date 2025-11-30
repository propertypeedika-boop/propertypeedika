require('dotenv').config();
const mongoose = require('mongoose');
const Property = require('./models/Property');
const connectDB = require('./config/db');

const sampleProperties = [
    {
        title: "Luxury 3BHK Apartment in Downtown",
        description: "Spacious 3-bedroom apartment in the heart of the city with modern amenities. Features include a fully equipped kitchen, large balcony with city views, and access to a swimming pool and gym. Perfect for families looking for urban convenience.",
        price: 8500000,
        location: "Downtown, Mumbai",
        type: "sale",
        category: "apartment",
        specs: {
            beds: 3,
            baths: 2,
            area: "1850 sq ft"
        },
        amenities: ["Swimming Pool", "Gym", "Parking", "24/7 Security", "Power Backup", "Lift"],
        featured: true,
        coordinates: {
            lat: 19.0760,
            lng: 72.8777
        }
    },
    {
        title: "Modern 4BHK Villa with Garden",
        description: "Beautiful standalone villa with private garden and terrace. This property features premium finishes, spacious rooms, and a modern kitchen. Includes a dedicated parking space for 2 cars and a beautiful landscaped garden.",
        price: 15000000,
        location: "Bandra West, Mumbai",
        type: "sale",
        category: "villa",
        specs: {
            beds: 4,
            baths: 3,
            area: "2800 sq ft"
        },
        amenities: ["Private Garden", "Terrace", "Parking", "Security", "Modular Kitchen", "Study Room"],
        featured: true,
        coordinates: {
            lat: 19.0596,
            lng: 72.8295
        }
    },
    {
        title: "Cozy 2BHK House for Rent",
        description: "Well-maintained 2-bedroom house in a peaceful neighborhood. Ideal for small families or working professionals. Close to schools, hospitals, and shopping centers. Semi-furnished with basic amenities.",
        price: 35000,
        location: "Andheri East, Mumbai",
        type: "rent",
        category: "house",
        specs: {
            beds: 2,
            baths: 1,
            area: "1200 sq ft"
        },
        amenities: ["Parking", "Water Supply", "Electricity Backup", "Gated Community"],
        featured: false,
        coordinates: {
            lat: 19.1136,
            lng: 72.8697
        }
    },
    {
        title: "Prime Commercial Plot in IT Park",
        description: "Excellent investment opportunity! Commercial plot in the rapidly developing IT corridor. Perfect for building office spaces, tech parks, or commercial complexes. Clear title, ready for construction.",
        price: 25000000,
        location: "Powai, Mumbai",
        type: "sale",
        category: "plot",
        specs: {
            beds: 0,
            baths: 0,
            area: "5000 sq ft"
        },
        amenities: ["Clear Title", "Road Access", "Electricity Connection", "Water Connection"],
        featured: true,
        coordinates: {
            lat: 19.1176,
            lng: 72.9060
        }
    },
    {
        title: "Spacious Office Space for Rent",
        description: "Premium office space in a modern commercial building. Fully furnished with workstations, meeting rooms, and pantry. High-speed internet connectivity and 24/7 power backup. Ideal for startups and small businesses.",
        price: 150000,
        location: "Lower Parel, Mumbai",
        type: "rent",
        category: "commercial",
        specs: {
            beds: 0,
            baths: 2,
            area: "3000 sq ft"
        },
        amenities: ["Furnished", "AC", "Parking", "Lift", "Security", "Power Backup", "Cafeteria"],
        featured: false,
        coordinates: {
            lat: 18.9984,
            lng: 72.8301
        }
    },
    {
        title: "Elegant 2BHK Apartment with Sea View",
        description: "Stunning apartment with breathtaking sea views. Modern architecture with premium fittings and fixtures. Located in a high-rise building with world-class amenities including clubhouse and jogging track.",
        price: 12000000,
        location: "Worli, Mumbai",
        type: "sale",
        category: "apartment",
        specs: {
            beds: 2,
            baths: 2,
            area: "1400 sq ft"
        },
        amenities: ["Sea View", "Clubhouse", "Swimming Pool", "Gym", "Jogging Track", "Children's Play Area", "Parking"],
        featured: true,
        coordinates: {
            lat: 19.0176,
            lng: 72.8156
        }
    },
    {
        title: "Affordable 1BHK for First-time Buyers",
        description: "Perfect starter home for young professionals and couples. Compact yet functional layout with all basic amenities. Located in a well-connected area with easy access to public transport.",
        price: 4500000,
        location: "Thane West, Thane",
        type: "sale",
        category: "apartment",
        specs: {
            beds: 1,
            baths: 1,
            area: "650 sq ft"
        },
        amenities: ["Parking", "Lift", "Security", "Water Supply"],
        featured: false,
        coordinates: {
            lat: 19.2183,
            lng: 72.9781
        }
    },
    {
        title: "Residential Plot in Gated Community",
        description: "Premium residential plot in an exclusive gated community. Surrounded by greenery with all modern infrastructure. Perfect for building your dream home. Clear title and ready for construction.",
        price: 8000000,
        location: "Lonavala, Pune",
        type: "sale",
        category: "plot",
        specs: {
            beds: 0,
            baths: 0,
            area: "2400 sq ft"
        },
        amenities: ["Gated Community", "24/7 Security", "Landscaped Gardens", "Club House", "Street Lights"],
        featured: false,
        coordinates: {
            lat: 18.7537,
            lng: 73.4057
        }
    },
    {
        title: "Penthouse with Private Terrace",
        description: "Luxurious penthouse on the top floor with a massive private terrace. Panoramic city views, premium interiors, and exclusive amenities. This is the epitome of luxury living with 4 spacious bedrooms and a home theater.",
        price: 35000000,
        location: "Juhu, Mumbai",
        type: "sale",
        category: "villa",
        specs: {
            beds: 4,
            baths: 4,
            area: "4500 sq ft"
        },
        amenities: ["Private Terrace", "Home Theater", "Jacuzzi", "Modular Kitchen", "Smart Home", "Parking", "Gym", "Swimming Pool"],
        featured: true,
        coordinates: {
            lat: 19.0990,
            lng: 72.8265
        }
    }
];

async function addSampleProperties() {
    try {
        console.log('🔗 Connecting to MongoDB...');
        await connectDB();

        console.log('📊 Adding 9 sample properties...\n');

        for (let i = 0; i < sampleProperties.length; i++) {
            const property = sampleProperties[i];
            const created = await Property.create(property);
            console.log(`✅ ${i + 1}/9 Added: ${property.title}`);
            console.log(`   📍 ${property.location}`);
            console.log(`   💰 ₹${property.price.toLocaleString('en-IN')}`);
            console.log(`   🏠 ${property.category} - ${property.type}\n`);
        }

        console.log('✨ Successfully added all 9 properties!');
        console.log('\n📈 Database Summary:');
        const total = await Property.countDocuments();
        const featured = await Property.countDocuments({ featured: true });
        const forSale = await Property.countDocuments({ type: 'sale' });
        const forRent = await Property.countDocuments({ type: 'rent' });

        console.log(`   Total Properties: ${total}`);
        console.log(`   Featured: ${featured}`);
        console.log(`   For Sale: ${forSale}`);
        console.log(`   For Rent: ${forRent}`);

        console.log('\n🎉 Your website is now ready to showcase!');

        process.exit(0);
    } catch (error) {
        console.error('❌ Error adding properties:', error);
        process.exit(1);
    }
}

// Run if executed directly
if (require.main === module) {
    addSampleProperties();
}

module.exports = addSampleProperties;
