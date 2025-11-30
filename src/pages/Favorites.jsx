import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropertyCard from '../components/PropertyCard';
import SEO from '../components/SEO';
import { propertyAPI } from '../services/api';
import { Heart } from 'lucide-react';

const Favorites = () => {
    const [favorites, setFavorites] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchFavorites = async () => {
            try {
                const savedIds = JSON.parse(localStorage.getItem('favorites') || '[]');

                if (savedIds.length === 0) {
                    setFavorites([]);
                    setLoading(false);
                    return;
                }

                // Fetch all properties and filter (optimized for small scale, ideally backend should support getByIds)
                // Since we don't have a getByIds endpoint yet, we'll fetch all and filter.
                // Note: For production with many properties, add a specific endpoint.
                // Fetch all properties (with high limit to ensure we get all potential favorites)
                // TODO: Implement a specific getByIds endpoint for better performance
                const response = await propertyAPI.getAll({ limit: 1000 });

                // Handle new paginated response structure
                const allProperties = response.data.properties || response.data;

                if (Array.isArray(allProperties)) {
                    const savedProperties = allProperties.filter(p => savedIds.includes(p._id));
                    setFavorites(savedProperties);
                } else {
                    console.error("Unexpected API response format:", response.data);
                    setFavorites([]);
                }
            } catch (err) {
                console.error("Error fetching favorites:", err);
                setError("Failed to load favorites");
            } finally {
                setLoading(false);
            }
        };

        fetchFavorites();
    }, []);

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <SEO title="My Favorites" description="Your saved properties on PropertyPeedika" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center mb-8">
                    <Heart className="h-8 w-8 text-red-500 mr-3" fill="currentColor" />
                    <h1 className="text-3xl font-bold text-gray-900">My Favorites</h1>
                </div>

                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
                    </div>
                ) : error ? (
                    <div className="text-center text-red-600 py-12">{error}</div>
                ) : favorites.length === 0 ? (
                    <div className="text-center py-16 bg-white rounded-lg shadow-sm">
                        <Heart className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">No favorites yet</h2>
                        <p className="text-gray-500 mb-6">Start exploring and save properties you like!</p>
                        <Link
                            to="/listings"
                            className="inline-block bg-[var(--primary-green)] text-white font-semibold px-6 py-3 rounded-md hover:bg-[var(--primary-green-dark)] transition-colors"
                        >
                            Browse Properties
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {favorites.map((property) => (
                            <PropertyCard key={property._id} property={property} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Favorites;
