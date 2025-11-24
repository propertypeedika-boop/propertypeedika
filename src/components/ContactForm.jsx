import React, { useState } from 'react';
import { Send } from 'lucide-react';
import { enquiryAPI } from '../services/api';

const ContactForm = ({ title = "Contact Us", propertyId = null }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await enquiryAPI.create({ ...formData, propertyId });
            alert(`Thank you, ${formData.name}! We have received your message. We will contact you shortly.`);
            setFormData({ name: '', email: '', phone: '', message: '' });
        } catch (error) {
            console.error("Error sending enquiry:", error);
            alert("Failed to send message. Please try again.");
        }
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
            <h3 className="text-xl font-bold text-gray-900 mb-4">{title}</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={handleChange}
                    />
                </div>

                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                        placeholder="john@example.com"
                        value={formData.email}
                        onChange={handleChange}
                    />
                </div>

                <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                    <input
                        type="tel"
                        id="phone"
                        name="phone"
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                        placeholder="+91 98765 43210"
                        value={formData.phone}
                        onChange={handleChange}
                    />
                </div>

                <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                    <textarea
                        id="message"
                        name="message"
                        rows="4"
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                        placeholder="I am interested in..."
                        value={formData.message}
                        onChange={handleChange}
                    ></textarea>
                </div>

                <button
                    type="submit"
                    className="w-full bg-green-700 text-white font-bold py-3 px-4 rounded-md hover:bg-green-800 transition-colors flex items-center justify-center"
                >
                    <Send className="h-4 w-4 mr-2" />
                    Send Message
                </button>
            </form>
        </div>
    );
};

export default ContactForm;
