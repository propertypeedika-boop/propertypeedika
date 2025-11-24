import React from 'react';
import { Users, Target, Shield } from 'lucide-react';

const About = () => {
    return (
        <div className="min-h-screen bg-gray-50">
            <div className="bg-green-700 text-white py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-6">About PropertyPeedika</h1>
                    <p className="text-xl text-green-100 max-w-2xl mx-auto">
                        Building trust, delivering excellence, and helping you find your perfect space in Trivandrum.
                    </p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="bg-white rounded-lg shadow-sm p-8 mb-12">
                    <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
                    <div className="prose max-w-none text-gray-600">
                        <p className="mb-4">
                            Founded in 2024, PropertyPeedika emerged from a simple observation: finding a reliable  property in Trivandrum was harder than it should be. We set out to change that by creating a platform that prioritizes transparency, verification, and customer satisfaction.
                        </p>
                        <p>
                            Today, we are one of the fastest-growing real estate companies in the capital city, serving hundreds of happy families and businesses. Whether you're looking for a luxury villa in Kowdiar, a modern apartment near Technopark, or a commercial space in the heart of the city, we've got you covered.
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                    <div className="bg-white p-8 rounded-lg shadow-sm text-center">
                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                            <Users className="h-8 w-8 text-green-700" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-4">Customer First</h3>
                        <p className="text-gray-600">
                            Your needs are our priority. We listen, understand, and deliver solutions that match your requirements perfectly.
                        </p>
                    </div>

                    <div className="bg-white p-8 rounded-lg shadow-sm text-center">
                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                            <Shield className="h-8 w-8 text-green-700" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-4">Integrity</h3>
                        <p className="text-gray-600">
                            We believe in honest dealings. No hidden costs, no false promises. Just pure transparency.
                        </p>
                    </div>

                    <div className="bg-white p-8 rounded-lg shadow-sm text-center">
                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                            <Target className="h-8 w-8 text-green-700" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-4">Excellence</h3>
                        <p className="text-gray-600">
                            We strive for excellence in everything we do, from property verification to after-sales support.
                        </p>
                    </div>
                </div>

                <div className="text-center">
                    <h2 className="text-3xl font-bold text-gray-900 mb-8">Meet Our Team</h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Our team of experienced real estate professionals is dedicated to making your property journey smooth and hassle-free.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default About;
