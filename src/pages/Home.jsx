import React, { useEffect, useState } from 'react';
import Hero from '../components/Hero';
import PropertyCard from '../components/PropertyCard';
import { propertyAPI } from '../services/api';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle } from 'lucide-react';

const Home = () => {
    const [featuredProperties, setFeaturedProperties] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProperties = async () => {
            try {
                const response = await propertyAPI.getAll({ featured: true });
                // Limit to 3 if the API returns more, or rely on API to filter.
                // The API currently filters by featured=true but returns all of them.
                // We'll slice here just in case.
                setFeaturedProperties(response.data.slice(0, 3));
            } catch (error) {
                console.error("Error fetching properties:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProperties();
    }, []);

    return (
        <div className="min-h-screen bg-gray-50">
            <Hero />

            <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-end mb-8">
                    <div>
                        <h2 className="text-3xl font-bold text-gray-900">Featured Listings</h2>
                        <p className="text-gray-600 mt-2">Handpicked properties just for you</p>
                    </div>
                    <Link to="/listings" className="hidden md:flex items-center text-green-700 font-semibold hover:text-green-800">
                        View All Properties <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                </div>

                {loading ? (
                    <div className="text-center py-12">Loading...</div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {featuredProperties.map(property => (
                            <PropertyCard key={property._id} property={property} />
                        ))}
                    </div>
                )}

                <div className="mt-8 text-center md:hidden">
                    <Link to="/listings" className="inline-flex items-center text-green-700 font-semibold hover:text-green-800">
                        View All Properties <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                </div>
            </section>

            <section className="bg-white py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-900">Why Choose PropertyPeedika?</h2>
                        <p className="text-gray-600 mt-2 max-w-2xl mx-auto">
                            We are Trivandrum's most trusted real estate partner, committed to transparency and excellence.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="p-6 bg-gray-50 rounded-lg text-center hover:shadow-md transition-shadow">
                            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <CheckCircle className="h-6 w-6 text-green-700" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">Local Expertise</h3>
                            <p className="text-gray-600">
                                Deep knowledge of Trivandrum's real estate market, from Kowdiar to Technopark.
                            </p>
                        </div>

                        <div className="p-6 bg-gray-50 rounded-lg text-center hover:shadow-md transition-shadow">
                            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <CheckCircle className="h-6 w-6 text-green-700" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">Verified Listings</h3>
                            <p className="text-gray-600">
                                Every property listed on our platform is physically verified by our team.
                            </p>
                        </div>

                        <div className="p-6 bg-gray-50 rounded-lg text-center hover:shadow-md transition-shadow">
                            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <CheckCircle className="h-6 w-6 text-green-700" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">Transparent Deals</h3>
                            <p className="text-gray-600">
                                No hidden fees or surprises. We believe in honest and clear communication.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-16 bg-green-700 text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl font-bold mb-4">Looking to Sell or Rent Your Property?</h2>
                    <p className="text-green-100 mb-8 max-w-2xl mx-auto">
                        List your property with us and reach thousands of potential buyers and tenants in Trivandrum.
                    </p>
                    <Link to="/contact" className="bg-white text-green-700 font-bold py-3 px-8 rounded-md hover:bg-gray-100 transition-colors inline-block">
                        Contact Us Today
                    </Link>
                </div>
            </section>
        </div>
    );
};

export default Home;
