import React from 'react';
import { Users, Target, Shield } from 'lucide-react';

const About = () => {
    return (
        <div className="min-h-screen bg-gray-50">
            <div className="bg-green-700 text-white py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-6">Explore Kerala's real estate with Property Peedika - Where Vision Meets Opportunity!</h1>
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
                            Our journey began long before PropertyPeedika was born. One founder spent 26 years deeply involved in Kerala’s real estate market, experiencing every high and low, learning how families dream, how deals work, and where customers often get hurt. The other founder lived the life of an NRI, watching people struggle to buy property from afar — losing money, facing trust issues, and dealing with tenants or property managers who didn’t always act responsibly.
                        </p>
                        <p className="mb-4">
                            These two worlds came together with one realization: Kerala needed a real estate platform that people could trust — whether living at home or miles away.
                        </p>
                        <p>
                            And so, in 2024, PropertyPeedika LLP was created with a commitment to bring honesty, clarity, and transparency into every deal. By 2025, we completed all official licensing, marking the beginning of a new chapter — one where real estate in Kerala becomes simpler, safer, and more reliable for everyone.
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
