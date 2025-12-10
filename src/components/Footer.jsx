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
                            <a
                                href="https://www.facebook.com/propertypeedika"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-400 hover:text-white transition-colors"
                                aria-label="Visit our Facebook page"
                            >
                                <Facebook size={20} />
                            </a>
                            <a
                                href="https://twitter.com/propertypeedika"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-400 hover:text-white transition-colors"
                                aria-label="Visit our Twitter page"
                            >
                                <Twitter size={20} />
                            </a>
                            <a
                                href="https://www.instagram.com/propertypeedika"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-400 hover:text-white transition-colors"
                                aria-label="Visit our Instagram page"
                            >
                                <Instagram size={20} />
                            </a>
                            <a
                                href="https://www.linkedin.com/company/propertypeedika"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-400 hover:text-white transition-colors"
                                aria-label="Visit our LinkedIn page"
                            >
                                <Linkedin size={20} />
                            </a>
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
                                <span className="text-gray-400">TC 25/1958-7, Sharon Bliss, 3rd Floor, Plamoodu, Pattom, Trivandrum Thiruvananthapuram</span>
                            </li>
                            <li className="flex items-center">
                                <Phone className="h-5 w-5 text-green-400 mr-2" />
                                <span className="text-gray-400">+91 89214 94011</span>
                            </li>
                            <li className="flex items-center">
                                <Mail className="h-5 w-5 text-green-400 mr-2" />
                                <span className="text-gray-400">propertypeedika@gmail.com</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Google Maps Section */}
                <div className="mt-12">
                    <h4 className="text-lg font-semibold mb-4 text-center">Find Us</h4>
                    <div className="glass-card rounded-xl overflow-hidden" style={{ height: '300px' }}>
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3945.6891234567!2d76.9474!3d8.5241!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zOMKwMzEnMjYuOCJOIDc2wrA1Nic1MC42IkU!5e0!3m2!1sen!2sin!4v1234567890"
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allowFullScreen=""
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            title="PropertyPeedika Office Location"
                        ></iframe>
                    </div>
                    <p className="text-center text-gray-400 text-sm mt-3">
                        <MapPin className="h-4 w-4 inline mr-1 text-green-400" />
                        TC 25/1958-7, Sharon Bliss, 3rd Floor, Plamoodu, Pattom, Trivandrum Thiruvananthapuram
                    </p>
                </div>

                <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-500">
                    <p>&copy; {new Date().getFullYear()} PropertyPeedika. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
