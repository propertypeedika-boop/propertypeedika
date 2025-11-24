import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Bed, Bath, Square, ArrowRight } from 'lucide-react';

const PropertyCard = ({ property }) => {
    const mainImage = property.images && property.images.length > 0 ? property.images[0] : 'https://via.placeholder.com/800x400';
    const id = property._id || property.id; // Fallback for dummy data if mixed

    return (
        <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 border border-gray-100">
            <div className="relative h-64">
                <img
                    src={mainImage}
                    alt={property.title}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
                <div className="absolute top-4 left-4 bg-green-700 text-white px-3 py-1 rounded-md text-sm font-semibold">
                    For {property.type}
                </div>
                <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-md text-green-700 font-bold">
                    {property.price}
                </div>
            </div>

            <div className="p-6">
                <div className="flex items-center text-gray-500 text-sm mb-2">
                    <MapPin className="h-4 w-4 mr-1" />
                    {property.location}
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-4 line-clamp-1">{property.title}</h3>

                <div className="flex justify-between border-t border-gray-100 pt-4 mb-4">
                    {property.specs?.beds > 0 && (
                        <div className="flex items-center text-gray-600">
                            <Bed className="h-4 w-4 mr-2 text-green-500" />
                            <span className="text-sm">{property.specs.beds} Beds</span>
                        </div>
                    )}
                    {property.specs?.baths > 0 && (
                        <div className="flex items-center text-gray-600">
                            <Bath className="h-4 w-4 mr-2 text-green-500" />
                            <span className="text-sm">{property.specs.baths} Baths</span>
                        </div>
                    )}
                    <div className="flex items-center text-gray-600">
                        <Square className="h-4 w-4 mr-2 text-green-500" />
                        <span className="text-sm">{property.specs?.area}</span>
                    </div>
                </div>

                <Link
                    to={`/property/${id}`}
                    className="w-full flex items-center justify-center bg-gray-50 hover:bg-green-50 text-green-700 font-semibold py-3 rounded-md transition-colors border border-green-100 hover:border-green-200"
                >
                    View Details <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
            </div>
        </div>
    );
};

export default PropertyCard;
