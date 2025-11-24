import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import PropertyCard from '../components/PropertyCard';
import { propertyAPI } from '../services/api';
import { Filter } from 'lucide-react';

const Listings = () => {
    const location = useLocation();
    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filters, setFilters] = useState(() => {
        const searchParams = new URLSearchParams(location.search);
        return {
            location: searchParams.get('location') || '',
            type: searchParams.get('type') || 'all',
            category: searchParams.get('category') || 'all',
            budget: searchParams.get('budget') || 'all'
        };
    });

    console.log("Listings Render: location.search =", location.search);

    useEffect(() => {
        console.log("Listings: Location changed", location.search);
        const searchParams = new URLSearchParams(location.search);
        const typeParam = searchParams.get('type');
        const categoryParam = searchParams.get('category');
        const locationParam = searchParams.get('location');
        const budgetParam = searchParams.get('budget');

        const newFilters = {
            type: typeParam || 'all',
            category: categoryParam || 'all',
            location: locationParam || '',
            budget: budgetParam || 'all'
        };
        console.log("Listings: Setting filters from URL", newFilters);

        setFilters(prev => ({
            ...prev,
            ...newFilters
        }));
    }, [location]);

    useEffect(() => {
        const fetchProperties = async () => {
            console.log("Listings: fetchProperties called with filters", filters);
            setLoading(true);
            try {
                // Prepare params for API
                const params = {};
                if (filters.type !== 'all') params.type = filters.type;
                if (filters.category !== 'all') params.category = filters.category;
                if (filters.location) params.location = filters.location;
                if (filters.budget !== 'all') params.budget = filters.budget;

                console.log("Listings: Sending API request with params", params);
                const response = await propertyAPI.getAll(params);
                console.log("Listings: API response length", response.data.length);
                setProperties(response.data);
            } catch (error) {
                console.error("Error fetching properties:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProperties();
    }, [filters.type, filters.category, filters.location, filters.budget]); // Re-fetch when API-supported filters change

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters(prev => ({ ...prev, [name]: value }));
    };

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-4 md:mb-0">Properties in Trivandrum</h1>

                    <div className="flex flex-wrap gap-4 bg-white p-4 rounded-lg shadow-sm">
                        <div className="flex items-center">
                            <Filter className="h-5 w-5 text-gray-500 mr-2" />
                            <span className="font-medium text-gray-700 mr-2">Filter by:</span>
                        </div>

                        <select
                            name="type"
                            value={filters.type}
                            onChange={handleFilterChange}
                            className="border-gray-300 rounded-md text-sm focus:ring-green-500 focus:border-green-500 border p-2"
                        >
                            <option value="all">All Types</option>
                            <option value="sale">For Sale</option>
                            <option value="rent">For Rent</option>
                        </select>

                        <select
                            name="category"
                            value={filters.category}
                            onChange={handleFilterChange}
                            className="border-gray-300 rounded-md text-sm focus:ring-green-500 focus:border-green-500 border p-2"
                        >
                            <option value="all">All Categories</option>
                            <option value="apartment">Apartment</option>
                            <option value="villa">Villa</option>
                            <option value="house">House</option>
                            <option value="plot">Plot</option>
                            <option value="commercial">Commercial</option>
                        </select>
                    </div>
                </div>

                {loading ? (
                    <div className="text-center py-12">Loading...</div>
                ) : properties.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {properties.map(property => (
                            <PropertyCard key={property._id} property={property} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12">
                        <h3 className="text-xl font-medium text-gray-900">No properties found matching your criteria.</h3>
                        <p className="text-gray-500 mt-2">Try adjusting your filters to see more results.</p>
                        <button
                            onClick={() => setFilters({ type: 'all', category: 'all', budget: 'all', location: '' })}
                            className="mt-4 text-green-700 font-semibold hover:underline"
                        >
                            Clear all filters
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Listings;
