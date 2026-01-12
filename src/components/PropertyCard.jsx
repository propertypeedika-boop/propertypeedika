import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Bed, Bath, Square, ArrowRight, ChevronLeft, ChevronRight, Camera, Heart } from 'lucide-react';
import { formatPrice } from '../utils/formatPrice';

const PropertyCard = ({ property }) => {
    const images = property.images && property.images.length > 0 ? property.images : ['https://via.placeholder.com/800x400'];
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isFavorite, setIsFavorite] = useState(false);
    const id = property._id || property.id;

    useEffect(() => {
        const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
        setIsFavorite(favorites.includes(id));
    }, [id]);

    const toggleFavorite = (e) => {
        e.preventDefault();
        e.stopPropagation();
        const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
        let newFavorites;
        if (favorites.includes(id)) {
            newFavorites = favorites.filter(favId => favId !== id);
        } else {
            newFavorites = [...favorites, id];
        }
        localStorage.setItem('favorites', JSON.stringify(newFavorites));
        setIsFavorite(!isFavorite);
    };

    const handlePrevImage = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    };

    const handleNextImage = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    };

    return (
        <div className="glass-card rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 border border-gray-100 relative">
            <div className="relative h-64 group">
                <img
                    src={images[currentImageIndex]}
                    alt={`${property.title} - Image ${currentImageIndex + 1}`}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    loading="lazy"
                />

                <button
                    onClick={toggleFavorite}
                    className="absolute top-4 right-4 z-20 p-2 rounded-full bg-white/80 hover:bg-white text-gray-600 hover:text-red-500 transition-all duration-300 shadow-sm"
                    aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
                >
                    <Heart className={`h-5 w-5 ${isFavorite ? 'fill-red-500 text-red-500' : ''}`} />
                </button>

                {/* Image navigation arrows - only show if multiple images */}
                {images.length > 1 && (
                    <>
                        <button
                            onClick={handlePrevImage}
                            className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full opacity-60 group-hover:opacity-100 transition-all duration-300 shadow-lg z-10 hover:scale-110"
                            aria-label="Previous image"
                        >
                            <ChevronLeft className="h-5 w-5" />
                        </button>
                        <button
                            onClick={handleNextImage}
                            className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full opacity-60 group-hover:opacity-100 transition-all duration-300 shadow-lg z-10 hover:scale-110"
                            aria-label="Next image"
                        >
                            <ChevronRight className="h-5 w-5" />
                        </button>

                        {/* Image counter */}
                        <div className="absolute bottom-4 right-4 bg-black/60 text-white px-3 py-1 rounded-md text-sm font-medium flex items-center gap-1">
                            <Camera className="h-4 w-4" />
                            {currentImageIndex + 1}/{images.length}
                        </div>
                    </>
                )}

                <div className="absolute top-4 left-4 bg-[var(--primary-green)] text-white px-3 py-1 rounded-md text-sm font-semibold">
                    For {property.type}
                </div>
                <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-md text-[var(--primary-green)] font-bold">
                    {formatPrice(property.price)}
                </div>
            </div>

            <div className="p-6">
                <div className="flex items-center text-gray-500 text-sm mb-2">
                    <MapPin className="h-4 w-4 mr-1" />
                    {property.location}
                </div>

                <h3 className="text-lg font-bold text-gray-900 mb-4 line-clamp-2 min-h-[3.5rem] break-words" title={property.title}>{property.title}</h3>

                <div className="flex justify-between border-t border-gray-100 pt-4 mb-4">
                    {property.specs?.beds > 0 && (
                        <div className="flex items-center text-gray-600">
                            <Bed className="h-4 w-4 mr-2 text-[var(--primary-green)]" />
                            <span className="text-sm">{property.specs.beds} Beds</span>
                        </div>
                    )}
                    {property.specs?.baths > 0 && (
                        <div className="flex items-center text-gray-600">
                            <Bath className="h-4 w-4 mr-2 text-[var(--primary-green)]" />
                            <span className="text-sm">{property.specs.baths} Baths</span>
                        </div>
                    )}
                    <div className="flex items-center text-gray-600">
                        <Square className="h-4 w-4 mr-2 text-[var(--primary-green)]" />
                        <span className="text-sm">{property.specs?.area}</span>
                    </div>
                </div>

                <Link
                    to={`/property/${id}`}
                    className="w-full flex items-center justify-center bg-gray-50 hover:bg-[var(--primary-green-light)] text-[var(--primary-green)] font-semibold py-3 rounded-md transition-colors border border-[var(--primary-green-light)] hover:border-[var(--primary-green)]"
                >
                    View Details <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
            </div>
        </div>
    );
};

export default PropertyCard;
