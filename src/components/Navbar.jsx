import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Heart } from 'lucide-react';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="glass-navbar sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex items-center">
                        <Link to="/" className="flex items-center">
                            <img
                                src="/logo.png"
                                alt="PropertyPeedika Logo"
                                className="h-10 w-10 fit-contain"
                            />
                            <span className="ml-2 text-xl font-bold text-green-700">PropertyPeedika</span>
                        </Link>
                    </div>

                    <div className="hidden md:flex items-center space-x-8">
                        <Link to="/" className="text-gray-700 hover:text-[var(--primary-green)] font-medium transition-colors">Home</Link>
                        <Link to="/listings" className="text-gray-700 hover:text-[var(--primary-green)] font-medium transition-colors">Listings</Link>
                        <Link to="/about" className="text-gray-700 hover:text-[var(--primary-green)] font-medium transition-colors">About</Link>
                        <Link to="/favorites" className="text-gray-700 hover:text-[var(--primary-green)] font-medium transition-colors flex items-center">
                            <Heart className="h-5 w-5 mr-1" /> Favorites
                        </Link>
                        <Link to="/contact" className="bg-[var(--primary-green)] text-white px-4 py-2 rounded-md hover:bg-[var(--primary-green-dark)] transition-colors">Contact Us</Link>
                    </div>

                    <div className="md:hidden flex items-center">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="text-gray-700 hover:text-green-700 focus:outline-none"
                        >
                            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {isOpen && (
                <div className="md:hidden bg-white border-t">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        <Link to="/" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-green-700 hover:bg-gray-50" onClick={() => setIsOpen(false)}>Home</Link>
                        <Link to="/listings" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-green-700 hover:bg-gray-50" onClick={() => setIsOpen(false)}>Listings</Link>
                        <Link to="/favorites" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-green-700 hover:bg-gray-50 flex items-center" onClick={() => setIsOpen(false)}>
                            <Heart className="h-5 w-5 mr-2" /> Favorites
                        </Link>
                        <Link to="/about" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-green-700 hover:bg-gray-50" onClick={() => setIsOpen(false)}>About</Link>
                        <Link to="/contact" className="block px-3 py-2 rounded-md text-base font-medium text-green-700 font-bold hover:bg-gray-50" onClick={() => setIsOpen(false)}>Contact Us</Link>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
