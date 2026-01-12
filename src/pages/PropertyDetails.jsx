import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { propertyAPI, settingsAPI } from '../services/api';
import ContactForm from '../components/ContactForm';
import SEO from '../components/SEO';
import PropertyCard from '../components/PropertyCard';
import { MapPin, Bed, Bath, Square, Check, ArrowLeft, ChevronLeft, ChevronRight, Camera, Heart, MessageCircle, Share2 } from 'lucide-react';
import { formatPrice } from '../utils/formatPrice';
import {
    FacebookShareButton,
    TwitterShareButton,
    WhatsappShareButton,
    FacebookIcon,
    TwitterIcon,
    WhatsappIcon
} from "react-share";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix Leaflet icon issue
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

const PropertyDetails = () => {
    const { id } = useParams();
    const [property, setProperty] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isFavorite, setIsFavorite] = useState(false);
    const [similarProperties, setSimilarProperties] = useState([]);
    const [whatsappNumber, setWhatsappNumber] = useState('919876543210'); // Default fallback

    useEffect(() => {
        const fetchSettings = async () => {
            try {
                const response = await settingsAPI.get();
                if (response.data && response.data.whatsappNumber) {
                    setWhatsappNumber(response.data.whatsappNumber);
                }
            } catch (error) {
                console.error("Error fetching settings:", error);
            }
        };
        fetchSettings();
    }, []);

    useEffect(() => {
        const fetchProperty = async () => {
            try {
                const response = await propertyAPI.getOne(id);
                setProperty(response.data);

                // Fetch similar properties
                const similarResponse = await propertyAPI.getSimilar(id);
                setSimilarProperties(similarResponse.data);
            } catch (err) {
                console.error("Error fetching property:", err);
                setError("Property not found");
            } finally {
                setLoading(false);
            }
        };

        fetchProperty();
    }, [id]);

    useEffect(() => {
        const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
        setIsFavorite(favorites.includes(id));
    }, [id]);

    const toggleFavorite = () => {
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

    // Get images or use placeholder
    const images = property.images && property.images.length > 0 ? property.images : ['https://via.placeholder.com/800x400'];
    const mainImage = images[currentImageIndex];
    const shareUrl = window.location.href;

    const handlePrevImage = () => {
        setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    };

    const handleNextImage = () => {
        setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    };

    const handleThumbnailClick = (index) => {
        setCurrentImageIndex(index);
    };

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <SEO
                title={property.title}
                description={property.description.substring(0, 150)}
                image={mainImage}
            />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <Link to="/listings" className="inline-flex items-center text-gray-600 hover:text-green-700 mb-6 transition-colors">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back to Listings
                </Link>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-8 relative group">
                            <img
                                src={mainImage}
                                alt={`${property.title} - Image ${currentImageIndex + 1}`}
                                className="w-full h-[400px] object-cover"
                            />

                            <button
                                onClick={toggleFavorite}
                                className="absolute top-4 right-4 z-20 p-3 rounded-full bg-white/90 hover:bg-white text-gray-600 hover:text-red-500 transition-all duration-300 shadow-md"
                                aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
                            >
                                <Heart className={`h-6 w-6 ${isFavorite ? 'fill-red-500 text-red-500' : ''}`} />
                            </button>

                            {/* Navigation arrows - only show if multiple images */}
                            {images.length > 1 && (
                                <>
                                    <button
                                        onClick={handlePrevImage}
                                        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 p-3 rounded-full opacity-60 group-hover:opacity-100 transition-all duration-300 shadow-lg z-10 hover:scale-110"
                                        aria-label="Previous image"
                                    >
                                        <ChevronLeft className="h-6 w-6" />
                                    </button>
                                    <button
                                        onClick={handleNextImage}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 p-3 rounded-full opacity-60 group-hover:opacity-100 transition-all duration-300 shadow-lg z-10 hover:scale-110"
                                        aria-label="Next image"
                                    >
                                        <ChevronRight className="h-6 w-6" />
                                    </button>

                                    {/* Image counter */}
                                    <div className="absolute bottom-4 right-4 bg-black/70 text-white px-4 py-2 rounded-md text-sm font-medium flex items-center gap-2">
                                        <Camera className="h-4 w-4" />
                                        {currentImageIndex + 1} / {images.length}
                                    </div>
                                </>
                            )}
                        </div>

                        {/* Thumbnail gallery if multiple images */}
                        {images.length > 1 && (
                            <div className="grid grid-cols-4 gap-4 mb-8">
                                {images.map((img, idx) => (
                                    <img
                                        key={idx}
                                        src={img}
                                        alt={`${property.title} ${idx + 1}`}
                                        onClick={() => handleThumbnailClick(idx)}
                                        className={`w-full h-24 object-cover rounded-lg cursor-pointer transition-all duration-300 ${idx === currentImageIndex
                                            ? 'ring-4 ring-green-500 opacity-100 scale-105'
                                            : 'hover:opacity-75 hover:scale-105'
                                            }`}
                                    />
                                ))}
                            </div>
                        )}

                        <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
                            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                                <div className="w-full md:w-auto pr-0 md:pr-4">
                                    <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2 break-words w-full">{property.title}</h1>
                                    <div className="flex items-center text-gray-600">
                                        <MapPin className="h-5 w-5 mr-2 text-green-500 flex-shrink-0" />
                                        <span className="break-words">{property.location}</span>
                                    </div>
                                </div>
                                <div className="mt-4 md:mt-0 text-right">
                                    <span className="block text-3xl font-bold text-green-700">{formatPrice(property.price)}</span>
                                    <span className="block text-gray-500 text-sm">For {property.type}</span>
                                </div>
                            </div>

                            {/* Specs Grid */}
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 border-t border-gray-100 pt-6">
                                {property.specs?.beds > 0 && (
                                    <div className="flex items-center text-gray-600 bg-gray-50 p-3 rounded-lg">
                                        <Bed className="h-5 w-5 mr-2 text-green-600" />
                                        <span>{property.specs?.beds} Beds</span>
                                    </div>
                                )}
                                {property.specs?.baths > 0 && (
                                    <div className="flex items-center text-gray-600 bg-gray-50 p-3 rounded-lg">
                                        <Bath className="h-5 w-5 mr-2 text-green-600" />
                                        <span>{property.specs?.baths} Baths</span>
                                    </div>
                                )}
                                <div className="flex items-center text-gray-600 bg-gray-50 p-3 rounded-lg">
                                    <Square className="h-5 w-5 mr-2 text-green-600" />
                                    <span>{property.specs?.area}</span>
                                </div>
                                <div className="flex items-center text-gray-600 bg-gray-50 p-3 rounded-lg">
                                    <MapPin className="h-5 w-5 mr-2 text-green-600" />
                                    <span className="truncate">{property.location}</span>
                                </div>
                            </div>

                            {/* Description */}
                            <div className="mb-8">
                                <h2 className="text-xl font-bold text-gray-900 mb-4">Description</h2>
                                <p className="text-gray-600 leading-relaxed whitespace-pre-line">
                                    {property.description}
                                </p>
                            </div>

                            {/* Amenities */}
                            <div className="mb-8">
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

                            {/* Map Section */}
                            {property.coordinates && property.coordinates.lat && property.coordinates.lng && (
                                <div className="mt-8 pt-8 border-t border-gray-200">
                                    <h2 className="text-xl font-bold text-gray-900 mb-4">Location</h2>
                                    <div className="h-[400px] rounded-lg overflow-hidden shadow-sm border border-gray-200 z-0">
                                        <MapContainer
                                            center={[property.coordinates.lat, property.coordinates.lng]}
                                            zoom={13}
                                            scrollWheelZoom={false}
                                            style={{ height: '100%', width: '100%' }}
                                        >
                                            <TileLayer
                                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                            />
                                            <Marker position={[property.coordinates.lat, property.coordinates.lng]}>
                                                <Popup>
                                                    {property.title} <br /> {property.location}
                                                </Popup>
                                            </Marker>
                                        </MapContainer>
                                    </div>
                                </div>
                            )}

                            {/* External Link Button */}
                            {property.externalLink && (
                                <div className="mt-8 pt-8 border-t border-gray-200">
                                    <h2 className="text-xl font-bold text-gray-900 mb-4">View on Other Platform</h2>
                                    <a
                                        href={property.externalLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center justify-center bg-[var(--primary-green)] text-white font-semibold px-8 py-4 rounded-lg transition-all hover:bg-[var(--primary-green-dark)] hover:shadow-lg"
                                    >
                                        <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                        </svg>
                                        View on External Site
                                    </a>
                                    <p className="text-sm text-gray-500 mt-2">This property is also listed on another platform</p>
                                </div>
                            )}

                            {/* Similar Properties Section */}
                            {similarProperties.length > 0 && (
                                <div className="mt-12 pt-8 border-t border-gray-200">
                                    <h2 className="text-2xl font-bold text-gray-900 mb-6">You Might Also Like</h2>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {similarProperties.map(prop => (
                                            <PropertyCard key={prop._id} property={prop} />
                                        ))}
                                    </div>
                                </div>
                            )}

                        </div>
                    </div>

                    <div className="lg:col-span-1">
                        <div className="sticky top-24 space-y-6">
                            {/* Action Buttons */}
                            <div className="bg-white rounded-lg shadow-sm p-6">
                                <a
                                    href={`https://wa.me/${whatsappNumber}?text=Hi, I'm interested in this property: ${property.title} - ${window.location.href}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-full flex items-center justify-center bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold py-3 rounded-lg transition-colors mb-4 shadow-sm"
                                >
                                    <MessageCircle className="h-5 w-5 mr-2" />
                                    Chat on WhatsApp
                                </a>

                                <div className="border-t border-gray-100 pt-4">
                                    <p className="text-sm font-semibold text-gray-500 mb-3 flex items-center">
                                        <Share2 className="h-4 w-4 mr-2" />
                                        Share this Property
                                    </p>
                                    <div className="flex gap-2">
                                        <WhatsappShareButton url={shareUrl} title={property.title}>
                                            <WhatsappIcon size={40} round />
                                        </WhatsappShareButton>
                                        <FacebookShareButton url={shareUrl} quote={property.title}>
                                            <FacebookIcon size={40} round />
                                        </FacebookShareButton>
                                        <TwitterShareButton url={shareUrl} title={property.title}>
                                            <TwitterIcon size={40} round />
                                        </TwitterShareButton>
                                    </div>
                                </div>
                            </div>

                            <ContactForm title="Interested in this property?" propertyId={property._id} propertyTitle={property.title} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PropertyDetails;
