import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-white pt-12 pb-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="col-span-1 md:col-span-1">
                        <h3 className="text-2xl font-bold mb-4">PropertyPeedika</h3>
                        <p className="text-gray-400 mb-4">
                            Your trusted partner for finding the perfect home in Trivandrum. We specialize in sales, rentals, and property management.
                        </p>
                        <div className="flex space-x-4">
                            <a href="#" className="text-gray-400 hover:text-white transition-colors"><Facebook size={20} /></a>
                            <a href="#" className="text-gray-400 hover:text-white transition-colors"><Twitter size={20} /></a>
                            <a href="#" className="text-gray-400 hover:text-white transition-colors"><Instagram size={20} /></a>
                            <a href="#" className="text-gray-400 hover:text-white transition-colors"><Linkedin size={20} /></a>
                        </div>
                    </div>

                    <div>
                        <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
                        <ul className="space-y-2">
                            <li><Link to="/" className="text-gray-400 hover:text-white transition-colors">Home</Link></li>
                            <li><Link to="/listings" className="text-gray-400 hover:text-white transition-colors">Properties</Link></li>
                            <li><Link to="/about" className="text-gray-400 hover:text-white transition-colors">About Us</Link></li>
                            <li><Link to="/contact" className="text-gray-400 hover:text-white transition-colors">Contact</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-lg font-semibold mb-4">Properties</h4>
                        <ul className="space-y-2">
                            <li><Link to="/listings?type=sale" className="text-gray-400 hover:text-white transition-colors">Buy Property</Link></li>
                            <li><Link to="/listings?type=rent" className="text-gray-400 hover:text-white transition-colors">Rent Property</Link></li>
                            <li><Link to="/listings?category=commercial" className="text-gray-400 hover:text-white transition-colors">Commercial</Link></li>
                            <li><Link to="/listings?category=plot" className="text-gray-400 hover:text-white transition-colors">Plots/Land</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
                        <ul className="space-y-4">
                            <li className="flex items-start">
                                <MapPin className="h-5 w-5 text-green-400 mr-2 mt-1" />
                                <span className="text-gray-400">TC 12/345, Kowd

                                    iar Main Road, Trivandrum, Kerala 695003</span>
                            </li>
                            <li className="flex items-center">
                                <Phone className="h-5 w-5 text-green-400 mr-2" />
                                <span className="text-gray-400">+91 98765 43210</span>
                            </li>
                            <li className="flex items-center">
                                <Mail className="h-5 w-5 text-green-400 mr-2" />
                                <span className="text-gray-400">info@propertypeedika.com</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-500">
                    <p>&copy; {new Date().getFullYear()} PropertyPeedika. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
