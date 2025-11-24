import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { propertyAPI } from '../services/api';
import ContactForm from '../components/ContactForm';
import { MapPin, Bed, Bath, Square, Check, ArrowLeft } from 'lucide-react';

const PropertyDetails = () => {
    const { id } = useParams();
    const [property, setProperty] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProperty = async () => {
            try {
                const response = await propertyAPI.getOne(id);
                setProperty(response.data);
            } catch (err) {
                console.error("Error fetching property:", err);
                setError("Property not found");
            } finally {
                setLoading(false);
            }
        };

        fetchProperty();
    }, [id]);

    if (loading) {
        return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
    }

    if (error || !property) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Property Not Found</h2>
                    <Link to="/listings" className="text-green-700 hover:underline">Back to Listings</Link>
                </div>
            </div>
        );
    }

    // Use the first image as main, or a placeholder
    const mainImage = property.images && property.images.length > 0 ? property.images[0] : 'https://via.placeholder.com/800x400';

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <Link to="/listings" className="inline-flex items-center text-gray-600 hover:text-green-700 mb-6 transition-colors">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back to Listings
                </Link>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-8">
                            <img
                                src={mainImage}
                                alt={property.title}
                                className="w-full h-[400px] object-cover"
                            />
                        </div>

                        {/* Thumbnail gallery if multiple images */}
                        {property.images && property.images.length > 1 && (
                            <div className="grid grid-cols-4 gap-4 mb-8">
                                {property.images.map((img, idx) => (
                                    <img
                                        key={idx}
                                        src={img}
                                        alt={`${property.title} ${idx + 1}`}
                                        className="w-full h-24 object-cover rounded-lg cursor-pointer hover:opacity-75 transition-opacity"
                                    // Add onClick handler to change main image if we want to implement that state
                                    />
                                ))}
                            </div>
                        )}

                        <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
                            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                                <div>
                                    <h1 className="text-3xl font-bold text-gray-900 mb-2">{property.title}</h1>
                                    <div className="flex items-center text-gray-600">
                                        <MapPin className="h-5 w-5 mr-2 text-green-500" />
                                        {property.location}
                                    </div>
                                </div>
                                <div className="mt-4 md:mt-0">
                                    <span className="block text-3xl font-bold text-green-700">{property.price}</span>
                                    <span className="block text-right text-gray-500 text-sm">For {property.type}</span>
                                </div>
                            </div>

                            <div className="grid grid-cols-3 gap-4 border-t border-b border-gray-100 py-6 mb-6">
                                <div className="text-center border-r border-gray-100 last:border-0">
                                    <span className="block text-gray-500 text-sm mb-1">Bedrooms</span>
                                    <div className="flex items-center justify-center font-bold text-lg">
                                        <Bed className="h-5 w-5 mr-2 text-green-500" />
                                        {property.specs?.beds || '-'}
                                    </div>
                                </div>
                                <div className="text-center border-r border-gray-100 last:border-0">
                                    <span className="block text-gray-500 text-sm mb-1">Bathrooms</span>
                                    <div className="flex items-center justify-center font-bold text-lg">
                                        <Bath className="h-5 w-5 mr-2 text-green-500" />
                                        {property.specs?.baths || '-'}
                                    </div>
                                </div>
                                <div className="text-center">
                                    <span className="block text-gray-500 text-sm mb-1">Area</span>
                                    <div className="flex items-center justify-center font-bold text-lg">
                                        <Square className="h-5 w-5 mr-2 text-green-500" />
                                        {property.specs?.area || '-'}
                                    </div>
                                </div>
                            </div>

                            <div className="mb-8">
                                <h2 className="text-xl font-bold text-gray-900 mb-4">Description</h2>
                                <p className="text-gray-600 leading-relaxed">
                                    {property.description}
                                </p>
                            </div>

                            <div>
                                <h2 className="text-xl font-bold text-gray-900 mb-4">Amenities</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {property.amenities && property.amenities.map((amenity, index) => (
                                        <div key={index} className="flex items-center text-gray-700">
                                            <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center mr-3">
                                                <Check className="h-4 w-4 text-green-600" />
                                            </div>
                                            {amenity}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="lg:col-span-1">
                        <div className="sticky top-24">
                            <ContactForm title="Interested in this property?" propertyId={property._id} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PropertyDetails;
