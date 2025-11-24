import React from 'react';
import ContactForm from '../components/ContactForm';
import { MapPin, Phone, Mail, Clock, MessageCircle, Instagram } from 'lucide-react';

const Contact = () => {
    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">Get in Touch</h1>
                    <p className="text-xl text-gray-600">
                        Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    <div>
                        <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">Contact Information</h2>

                            <div className="space-y-6">
                                <div className="flex items-start">
                                    <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center flex-shrink-0 mr-4">
                                        <MapPin className="h-6 w-6 text-green-700" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-900 mb-1">Visit Us</h3>
                                        <p className="text-gray-600">
                                            TC 12/345, Kowdiar Main Road,<br />
                                            Trivandrum, Kerala 695003
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start">
                                    <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center flex-shrink-0 mr-4">
                                        <Phone className="h-6 w-6 text-green-700" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-900 mb-1">Call Us</h3>
                                        <p className="text-gray-600">+91 98765 43210</p>
                                        <p className="text-gray-600">+91 471 2345678</p>
                                    </div>
                                </div>

                                <div className="flex items-start">
                                    <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center flex-shrink-0 mr-4">
                                        <Mail className="h-6 w-6 text-green-700" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-900 mb-1">Email Us</h3>
                                        <p className="text-gray-600">info@propertypeedika.com</p>
                                        <p className="text-gray-600">support@propertypeedika.com</p>
                                    </div>
                                </div>

                                <div className="flex items-start">
                                    <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center flex-shrink-0 mr-4">
                                        <MessageCircle className="h-6 w-6 text-green-700" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-900 mb-1">WhatsApp</h3>
                                        <a
                                            href="https://wa.me/919876543210?text=Hi%2C%20I%27m%20interested%20in%20your%20properties"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center text-green-600 hover:text-green-700 font-medium"
                                        >
                                            <MessageCircle className="h-4 w-4 mr-2" />
                                            Chat with us
                                        </a>
                                    </div>
                                </div>

                                <div className="flex items-start">
                                    <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center flex-shrink-0 mr-4">
                                        <Instagram className="h-6 w-6 text-green-700" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-900 mb-1">Instagram</h3>
                                        <a
                                            href="https://www.instagram.com/property_peedika?igsh=MWRzZWpxYmNuNjd6aw=="
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center text-green-600 hover:text-green-700 font-medium"
                                        >
                                            <Instagram className="h-4 w-4 mr-2" />
                                            @property_peedika
                                        </a>
                                    </div>
                                </div>

                                <div className="flex items-start">
                                    <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center flex-shrink-0 mr-4">
                                        <Clock className="h-6 w-6 text-green-700" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-900 mb-1">Working Hours</h3>
                                        <p className="text-gray-600">Mon - Sat: 9:00 AM - 6:00 PM</p>
                                        <p className="text-gray-600">Sunday: Closed</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-gray-200 rounded-lg h-64 w-full flex items-center justify-center text-gray-500">
                            <div className="text-center">
                                <MapPin className="h-12 w-12 mx-auto mb-2 opacity-50" />
                                <p>Google Map Integration</p>
                            </div>
                        </div>
                    </div>

                    <div>
                        <ContactForm title="Send us a Message" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
