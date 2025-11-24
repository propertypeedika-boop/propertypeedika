import React, { useState } from 'react';
import { Search, MapPin, Home, Wallet } from 'lucide-react';

const SearchBar = ({ onSearch }) => {
    const [filters, setFilters] = useState({
        type: 'any',
        location: '',
        category: 'any',
        budget: 'any'
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFilters(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (onSearch) onSearch(filters);
    };

    return (
        <div className="bg-white p-4 rounded-lg shadow-lg max-w-4xl mx-auto -mt-10 relative z-10 border border-gray-100">
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Home className="h-5 w-5 text-gray-400" />
                    </div>
                    <select
                        name="type"
                        className="pl-10 w-full p-3 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent appearance-none bg-white"
                        value={filters.type}
                        onChange={handleChange}
                    >
                        <option value="any">Buy / Rent</option>
                        <option value="sale">Buy</option>
                        <option value="rent">Rent</option>
                    </select>
                </div>

                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <MapPin className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                        type="text"
                        name="location"
                        placeholder="Location (e.g. Kowdiar)"
                        className="pl-10 w-full p-3 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        value={filters.location}
                        onChange={handleChange}
                    />
                </div>

                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Home className="h-5 w-5 text-gray-400" />
                    </div>
                    <select
                        name="category"
                        className="pl-10 w-full p-3 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent appearance-none bg-white"
                        value={filters.category}
                        onChange={handleChange}
                    >
                        <option value="any">Property Type</option>
                        <option value="apartment">Apartment</option>
                        <option value="villa">Villa</option>
                        <option value="house">House</option>
                        <option value="plot">Plot</option>
                        <option value="commercial">Commercial</option>
                    </select>
                </div>

                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Wallet className="h-5 w-5 text-gray-400" />
                    </div>
                    <select
                        name="budget"
                        className="pl-10 w-full p-3 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent appearance-none bg-white"
                        value={filters.budget}
                        onChange={handleChange}
                    >
                        <option value="any">Budget Range</option>
                        <option value="low">Under 50L</option>
                        <option value="medium">50L - 1 Cr</option>
                        <option value="high">1 Cr - 2 Cr</option>
                        <option value="luxury">Above 2 Cr</option>
                    </select>
                </div>

                <button
                    type="submit"
                    className="bg-green-700 text-white font-bold py-3 px-6 rounded-md hover:bg-green-800 transition-colors flex items-center justify-center col-span-1 md:col-span-4 lg:col-span-1"
                >
                    <Search className="h-5 w-5 mr-2" />
                    Search
                </button>
            </form>
        </div>
    );
};

export default SearchBar;
