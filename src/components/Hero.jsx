import React, { useState, useEffect } from 'react';
import SearchBar from './SearchBar';
import { useNavigate } from 'react-router-dom';

const heroImages = [
    "https://static.vecteezy.com/system/resources/thumbnails/071/068/927/small/luxury-home-at-sunset-modern-exterior-stone-accents-and-warm-lighting-large-windows-manicured-landscaping-photo.jpeg",
    "https://images.unsplash.com/photo-1568605114967-8130f3a36994?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
    "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
    "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
    "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
    "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
];

const Hero = () => {
    const navigate = useNavigate();
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((prevIndex) => (prevIndex + 1) % heroImages.length);
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    const handleSearch = (filters) => {
        const params = new URLSearchParams();
        if (filters.location) params.append('location', filters.location);
        if (filters.type && filters.type !== 'any') params.append('type', filters.type);
        if (filters.category && filters.category !== 'any') params.append('category', filters.category);
        if (filters.minBudget) params.append('minBudget', filters.minBudget);
        if (filters.maxBudget) params.append('maxBudget', filters.maxBudget);

        navigate(`/listings?${params.toString()}`);
    };

    return (
        <div className="relative">
            <div className="h-[600px] w-full relative overflow-hidden">
                <div className="absolute inset-0 bg-black/40 z-10"></div>
                {heroImages.map((image, index) => (
                    <img
                        key={index}
                        src={image}
                        alt={`Hero Slide ${index + 1}`}
                        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-[3000ms] ease-in-out ${index === currentImageIndex ? 'opacity-100' : 'opacity-0'
                            }`}
                    />
                ))}

                <div className="absolute inset-0 z-20 flex flex-col justify-center items-center text-center px-4">
                    <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 drop-shadow-lg" style={{ fontFamily: 'var(--font-heading)' }}>
                        Find your dream feature in <span className="text-[var(--primary-green-light)]">kerala</span>
                    </h1>
                    <p className="text-xl text-gray-100 max-w-2xl drop-shadow-md mb-8">
                        discover the apartments, villas and plot for sale and rent in kerala . Especially in Trivandrum(capital city)
                    </p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <SearchBar onSearch={handleSearch} />
            </div>
        </div>
    );
};

export default Hero;
