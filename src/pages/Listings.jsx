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
            minBudget: searchParams.get('minBudget') || '',
            maxBudget: searchParams.get('maxBudget') || ''
        };
    });

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const typeParam = searchParams.get('type');
        const categoryParam = searchParams.get('category');
        const locationParam = searchParams.get('location');
        const minBudgetParam = searchParams.get('minBudget');
        const maxBudgetParam = searchParams.get('maxBudget');

        const newFilters = {
            type: typeParam || 'all',
            category: categoryParam || 'all',
            location: locationParam || '',
            minBudget: minBudgetParam || '',
            maxBudget: maxBudgetParam || ''
        };

        setFilters(prev => ({
            ...prev,
            ...newFilters
        }));
    }, [location]);

    useEffect(() => {
        const fetchProperties = async () => {
            setLoading(true);
            try {
                // Prepare params for API
                const params = {};
                if (filters.type !== 'all') params.type = filters.type;
                if (filters.category !== 'all') params.category = filters.category;
                if (filters.location) params.location = filters.location;
                if (filters.minBudget) params.minBudget = filters.minBudget;
                if (filters.maxBudget) params.maxBudget = filters.maxBudget;

                const response = await propertyAPI.getAll(params);

                // Handle both old format (array) and new format (object with properties)
                const propertiesData = response.data.properties || response.data;
                setProperties(Array.isArray(propertiesData) ? propertiesData : []);
            } catch (error) {
                console.error("Error fetching properties:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProperties();
    }, [filters.type, filters.category, filters.location, filters.minBudget, filters.maxBudget]);

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters(prev => ({ ...prev, [name]: value }));
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="container mx-auto px-4">
                <h1 className="text-4xl font-bold text-gray-900 mb-8">Property Listings</h1>

                {/* Filters */}
                <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
                    <div className="flex items-center mb-4">
                        <Filter className="h-5 w-5 mr-2 text-green-600" />
                        <h2 className="text-lg font-semibold">Filters</h2>
                    </div>

                    <div className="flex flex-wrap gap-4">
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
                            onClick={() => setFilters({ type: 'all', category: 'all', minBudget: '', maxBudget: '', location: '' })}
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
