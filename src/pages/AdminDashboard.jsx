import React, { useState, useEffect } from 'react';
import { propertyAPI, authAPI, enquiryAPI, settingsAPI } from '../services/api';
import { useNavigate } from 'react-router-dom';
import { Plus, Edit, Trash2, LogOut, X, LayoutDashboard, MessageSquare, Settings, MapPin } from 'lucide-react';
import { formatPrice } from '../utils/formatPrice';

const AdminDashboard = () => {
    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingProperty, setEditingProperty] = useState(null);
    const navigate = useNavigate();

    // Form state
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        price: '',
        location: '',
        type: 'sale',
        category: 'apartment',
        beds: '',
        baths: '',
        area: '',
        amenities: '',
        externalLink: '',
        featured: false,
        lat: '',
        lng: ''
    });
    const [enquiries, setEnquiries] = useState([]);
    const [activeTab, setActiveTab] = useState('properties');
    const [images, setImages] = useState([]);
    const [settings, setSettings] = useState({ whatsappNumber: '' });
    const [settingsLoading, setSettingsLoading] = useState(false);
    const [geocodingLoading, setGeocodingLoading] = useState(false);

    useEffect(() => {
        verifyAuth();
        fetchProperties();
        fetchEnquiries();
        fetchSettings();
    }, []);

    const verifyAuth = async () => {
        try {
            await authAPI.verify();
        } catch (error) {
            console.error("Auth verification failed:", error);
            navigate('/admin/login');
        }
    };

    const fetchProperties = async () => {
        try {
            const response = await propertyAPI.getAll({ limit: 1000 });
            // Handle new paginated response structure
            const propertiesData = response.data.properties || response.data;
            setProperties(Array.isArray(propertiesData) ? propertiesData : []);
        } catch (error) {
            console.error("Error fetching properties:", error);
        } finally {
            setLoading(false);
        }
    };

    const fetchEnquiries = async () => {
        try {
            const response = await enquiryAPI.getAll();
            setEnquiries(response.data);
        } catch (error) {
            console.error("Error fetching enquiries:", error);
        }
    };

    const fetchSettings = async () => {
        try {
            const response = await settingsAPI.get();
            setSettings(response.data);
        } catch (error) {
            console.error("Error fetching settings:", error);
        }
    };

    const handleSettingsUpdate = async (e) => {
        e.preventDefault();
        setSettingsLoading(true);
        try {
            const response = await settingsAPI.update(settings);
            setSettings(response.data);
            alert("Settings updated successfully!");
        } catch (error) {
            console.error("Error updating settings:", error);
            alert("Failed to update settings");
        } finally {
            setSettingsLoading(false);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/admin/login');
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this property?')) {
            try {
                await propertyAPI.delete(id);
                setProperties(properties.filter(p => p._id !== id));
            } catch (error) {
                console.error("Error deleting property:", error);
                const errorMessage = error.response?.data?.message || error.message || "Failed to delete property";
                alert(`Error: ${errorMessage}`);
            }
        }
    };

    const handleDeleteEnquiry = async (id) => {
        if (window.confirm('Are you sure you want to delete this enquiry?')) {
            try {
                await enquiryAPI.delete(id);
                setEnquiries(enquiries.filter(e => e._id !== id));
            } catch (error) {
                console.error("Error deleting enquiry:", error);
                alert("Failed to delete enquiry");
            }
        }
    };

    const openModal = (property = null) => {
        if (property) {
            setEditingProperty(property);
            setFormData({
                title: property.title,
                description: property.description,
                price: property.price,
                location: property.location,
                type: property.type,
                category: property.category,
                beds: property.specs?.beds || '',
                baths: property.specs?.baths || '',
                area: property.specs?.area || '',
                amenities: property.amenities ? property.amenities.join(', ') : '',
                externalLink: property.externalLink || '',
                featured: property.featured,
                lat: property.coordinates?.lat || '',
                lng: property.coordinates?.lng || ''
            });
        } else {
            setEditingProperty(null);
            setFormData({
                title: '',
                description: '',
                price: '',
                location: '',
                type: 'sale',
                category: 'apartment',
                beds: '',
                baths: '',
                area: '',
                amenities: '',
                externalLink: '',
                featured: false,
                lat: '',
                lng: ''
            });
        }
        setImages([]);
        setIsModalOpen(true);
    };

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleImageChange = (e) => {
        setImages(Array.from(e.target.files));
    };

    const handleGeocode = async () => {
        if (!formData.location) return;

        setGeocodingLoading(true);
        try {
            const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(formData.location)}`);
            const data = await response.json();

            if (data && data.length > 0) {
                setFormData(prev => ({
                    ...prev,
                    lat: data[0].lat,
                    lng: data[0].lon
                }));
            } else {
                alert("Location not found. Please try a more specific address.");
            }
        } catch (error) {
            console.error("Geocoding error:", error);
            alert("Failed to fetch coordinates.");
        } finally {
            setGeocodingLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = new FormData();

        const propertyData = {
            title: formData.title,
            description: formData.description,
            price: parseFloat(formData.price) || 0,
            location: formData.location,
            type: formData.type,
            category: formData.category,
            specs: {
                beds: parseInt(formData.beds) || 0,
                baths: parseInt(formData.baths) || 0,
                area: formData.area
            },
            amenities: formData.amenities.split(',').map(item => item.trim()).filter(item => item !== ''),
            externalLink: formData.externalLink || null,
            featured: formData.featured,
            coordinates: {
                lat: formData.lat ? parseFloat(formData.lat) : null,
                lng: formData.lng ? parseFloat(formData.lng) : null
            }
        };

        data.append('data', JSON.stringify(propertyData));

        // Handle images
        images.forEach(image => {
            data.append('images', image);
        });

        try {
            if (editingProperty) {
                await propertyAPI.update(editingProperty._id, data);
            } else {
                await propertyAPI.create(data);
            }
            setIsModalOpen(false);
            fetchProperties();
        } catch (error) {
            console.error("Error saving property:", error);
            const errorMessage = error.response?.data?.message || error.message || "Failed to save property";
            alert(`Error: ${errorMessage}`);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100">
            <nav className="bg-white shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex items-center">
                            <h1 className="text-xl font-bold text-gray-900">Admin Dashboard</h1>
                            <div className="ml-10 flex items-baseline space-x-4">
                                <button
                                    onClick={() => setActiveTab('properties')}
                                    className={`px-3 py-2 rounded-md text-sm font-medium ${activeTab === 'properties' ? 'bg-green-700 text-white' : 'text-gray-600 hover:bg-gray-200'}`}
                                >
                                    Properties
                                </button>
                                <button
                                    onClick={() => setActiveTab('enquiries')}
                                    className={`px-3 py-2 rounded-md text-sm font-medium ${activeTab === 'enquiries' ? 'bg-green-700 text-white' : 'text-gray-600 hover:bg-gray-200'}`}
                                >
                                    Enquiries
                                </button>
                                <button
                                    onClick={() => setActiveTab('settings')}
                                    className={`px-3 py-2 rounded-md text-sm font-medium ${activeTab === 'settings' ? 'bg-green-700 text-white' : 'text-gray-600 hover:bg-gray-200'}`}
                                >
                                    Settings
                                </button>
                            </div>
                        </div>
                        <div className="flex items-center">
                            <button
                                onClick={handleLogout}
                                className="flex items-center text-gray-600 hover:text-red-600"
                            >
                                <LogOut className="h-5 w-5 mr-2" />
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                <div className="px-4 py-6 sm:px-0">
                    {/* Summary Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                        <div className="bg-white overflow-hidden shadow rounded-lg">
                            <div className="p-5">
                                <div className="flex items-center">
                                    <div className="flex-shrink-0">
                                        <LayoutDashboard className="h-6 w-6 text-gray-400" />
                                    </div>
                                    <div className="ml-5 w-0 flex-1">
                                        <dl>
                                            <dt className="text-sm font-medium text-gray-500 truncate">Total Properties</dt>
                                            <dd>
                                                <div className="text-lg font-medium text-gray-900">{properties.length}</div>
                                            </dd>
                                        </dl>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="bg-white overflow-hidden shadow rounded-lg">
                            <div className="p-5">
                                <div className="flex items-center">
                                    <div className="flex-shrink-0">
                                        <MessageSquare className="h-6 w-6 text-gray-400" />
                                    </div>
                                    <div className="ml-5 w-0 flex-1">
                                        <dl>
                                            <dt className="text-sm font-medium text-gray-500 truncate">Total Enquiries</dt>
                                            <dd>
                                                <div className="text-lg font-medium text-gray-900">{enquiries.length}</div>
                                            </dd>
                                        </dl>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {activeTab === 'properties' ? (
                        <>
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-2xl font-bold text-gray-900">Properties</h2>
                                <button
                                    onClick={() => openModal()}
                                    className="flex items-center bg-green-700 text-white px-4 py-2 rounded-md hover:bg-green-800"
                                >
                                    <Plus className="h-5 w-5 mr-2" />
                                    Add Property
                                </button>
                            </div>

                            {loading ? (
                                <div className="text-center">Loading...</div>
                            ) : (
                                <div className="bg-white shadow overflow-hidden sm:rounded-md">
                                    <ul className="divide-y divide-gray-200">
                                        {properties.map((property) => (
                                            <li key={property._id}>
                                                <div className="px-4 py-4 flex items-center sm:px-6">
                                                    <div className="min-w-0 flex-1 sm:flex sm:items-center sm:justify-between">
                                                        <div className="flex items-center">
                                                            <div className="flex-shrink-0 h-12 w-12">
                                                                <img
                                                                    className="h-12 w-12 rounded-full object-cover"
                                                                    src={property.images && property.images.length > 0 ? property.images[0] : 'https://via.placeholder.com/100'}
                                                                    alt=""
                                                                />
                                                            </div>
                                                            <div className="ml-4">
                                                                <div className="text-sm font-medium text-green-600 truncate">{property.title}</div>
                                                                <div className="flex text-sm text-gray-500">
                                                                    <p className="truncate">{property.location}</p>
                                                                    <span className="mx-1">&middot;</span>
                                                                    <p>{formatPrice(property.price)}</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="ml-5 flex-shrink-0 flex space-x-2">
                                                        <button
                                                            onClick={() => openModal(property)}
                                                            className="text-indigo-600 hover:text-indigo-900 p-2"
                                                        >
                                                            <Edit className="h-5 w-5" />
                                                        </button>
                                                        <button
                                                            onClick={() => handleDelete(property._id)}
                                                            className="text-red-600 hover:text-red-900 p-2"
                                                        >
                                                            <Trash2 className="h-5 w-5" />
                                                        </button>
                                                    </div>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </>
                    ) : activeTab === 'settings' ? (
                        <>
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">Settings</h2>
                            <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                                <div className="px-4 py-5 sm:p-6">
                                    <form onSubmit={handleSettingsUpdate}>
                                        <div className="grid grid-cols-1 gap-6">
                                            <div className="col-span-1 sm:col-span-1">
                                                <label htmlFor="whatsappNumber" className="block text-sm font-medium text-gray-700">
                                                    WhatsApp Number
                                                </label>
                                                <div className="mt-1 flex rounded-md shadow-sm">
                                                    <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                                                        <MessageSquare className="h-4 w-4" />
                                                    </span>
                                                    <input
                                                        type="text"
                                                        name="whatsappNumber"
                                                        id="whatsappNumber"
                                                        value={settings.whatsappNumber}
                                                        onChange={(e) => setSettings({ ...settings, whatsappNumber: e.target.value })}
                                                        className="flex-1 min-w-0 block w-full px-3 py-2 rounded-none rounded-r-md border border-gray-300 focus:ring-green-500 focus:border-green-500 sm:text-sm"
                                                        placeholder="e.g. 919876543210"
                                                    />
                                                </div>
                                                <p className="mt-2 text-sm text-gray-500">
                                                    Enter the number in international format without '+' (e.g., 919876543210 for India).
                                                </p>
                                            </div>
                                        </div>
                                        <div className="mt-6">
                                            <button
                                                type="submit"
                                                disabled={settingsLoading}
                                                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50"
                                            >
                                                {settingsLoading ? 'Saving...' : 'Save Settings'}
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </>
                    ) : (
                        <>
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">Enquiries</h2>
                            <div className="bg-white shadow overflow-hidden sm:rounded-md">
                                <ul className="divide-y divide-gray-200">
                                    {enquiries.length === 0 ? (
                                        <li className="px-4 py-4 text-center text-gray-500">No enquiries found.</li>
                                    ) : (
                                        enquiries.map((enquiry) => (
                                            <li key={enquiry._id}>
                                                <div className="px-4 py-4 sm:px-6">
                                                    <div className="flex items-center justify-between">
                                                        <div className="text-sm font-medium text-green-600 truncate">
                                                            {enquiry.name} <span className="text-gray-500 font-normal">({enquiry.email})</span>
                                                        </div>
                                                        <div className="ml-2 flex-shrink-0 flex">
                                                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                                                {enquiry.status}
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <div className="mt-2 sm:flex sm:justify-between">
                                                        <div className="sm:flex">
                                                            <p className="flex items-center text-sm text-gray-500">
                                                                Phone: {enquiry.phone}
                                                            </p>
                                                            {enquiry.property && (
                                                                <p className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0 sm:ml-6">
                                                                    Property: {enquiry.property.title}
                                                                </p>
                                                            )}
                                                        </div>
                                                        <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                                                            <p>
                                                                {new Date(enquiry.createdAt).toLocaleDateString()}
                                                            </p>
                                                            <button
                                                                onClick={() => handleDeleteEnquiry(enquiry._id)}
                                                                className="ml-4 text-red-600 hover:text-red-900"
                                                            >
                                                                <Trash2 className="h-4 w-4" />
                                                            </button>
                                                        </div>
                                                    </div>
                                                    <div className="mt-2 text-sm text-gray-700">
                                                        <p>{enquiry.message}</p>
                                                    </div>
                                                </div>
                                            </li>
                                        ))
                                    )}
                                </ul>
                            </div>
                        </>
                    )}
                </div>
            </main >

            {/* Modal */}
            {
                isModalOpen && (
                    <div className="fixed inset-0 z-50 overflow-y-auto">
                        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                                <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                            </div>
                            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full relative z-10">
                                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                    <div className="flex justify-between items-center mb-4">
                                        <h3 className="text-lg leading-6 font-medium text-gray-900">
                                            {editingProperty ? 'Edit Property' : 'Add Property'}
                                        </h3>
                                        <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-500">
                                            <X className="h-6 w-6" />
                                        </button>
                                    </div>
                                    <form onSubmit={handleSubmit} className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">Title</label>
                                            <input type="text" name="title" value={formData.title} onChange={handleInputChange} required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 text-gray-900 bg-white" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">Description</label>
                                            <textarea name="description" value={formData.description} onChange={handleInputChange} required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 text-gray-900 bg-white" rows="3"></textarea>
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700">Price</label>
                                                <input type="text" name="price" value={formData.price} onChange={handleInputChange} required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 text-gray-900 bg-white" />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700">Location</label>
                                                <div className="mt-1 flex rounded-md shadow-sm">
                                                    <input
                                                        type="text"
                                                        name="location"
                                                        value={formData.location}
                                                        onChange={handleInputChange}
                                                        required
                                                        className="flex-1 min-w-0 block w-full px-3 py-2 rounded-none rounded-l-md border border-gray-300 focus:ring-green-500 focus:border-green-500 sm:text-sm"
                                                    />
                                                    <button
                                                        type="button"
                                                        onClick={handleGeocode}
                                                        disabled={geocodingLoading || !formData.location}
                                                        className="inline-flex items-center px-3 rounded-r-md border border-l-0 border-gray-300 bg-gray-50 text-gray-500 text-sm hover:bg-gray-100 disabled:opacity-50"
                                                    >
                                                        {geocodingLoading ? '...' : <MapPin className="h-4 w-4" />}
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700">Latitude (Optional)</label>
                                                <input type="number" step="any" name="lat" value={formData.lat} onChange={handleInputChange} placeholder="e.g. 10.015" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 text-gray-900 bg-white" />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700">Longitude (Optional)</label>
                                                <input type="number" step="any" name="lng" value={formData.lng} onChange={handleInputChange} placeholder="e.g. 76.342" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 text-gray-900 bg-white" />
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700">Type</label>
                                                <select name="type" value={formData.type} onChange={handleInputChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 text-gray-900 bg-white">
                                                    <option value="sale">Sale</option>
                                                    <option value="rent">Rent</option>
                                                </select>
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700">Category</label>
                                                <select name="category" value={formData.category} onChange={handleInputChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 text-gray-900 bg-white">
                                                    <option value="apartment">Apartment</option>
                                                    <option value="villa">Villa</option>
                                                    <option value="house">House</option>
                                                    <option value="plot">Plot</option>
                                                    <option value="commercial">Commercial</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-3 gap-4">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700">Beds</label>
                                                <input type="number" name="beds" value={formData.beds} onChange={handleInputChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 text-gray-900 bg-white" />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700">Baths</label>
                                                <input type="number" name="baths" value={formData.baths} onChange={handleInputChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 text-gray-900 bg-white" />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700">Area</label>
                                                <input type="text" name="area" value={formData.area} onChange={handleInputChange} required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 text-gray-900 bg-white" />
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">Amenities (comma separated)</label>
                                            <input type="text" name="amenities" value={formData.amenities} onChange={handleInputChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 text-gray-900 bg-white" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">
                                                Images {images.length > 0 && <span className="text-green-600">({images.length} selected)</span>}
                                            </label>
                                            <input
                                                type="file"
                                                multiple
                                                accept="image/*"
                                                onChange={handleImageChange}
                                                className="mt-1 block w-full text-gray-900 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100"
                                            />
                                            {images.length > 0 && (
                                                <p className="mt-2 text-sm text-gray-500">
                                                    Ready to upload {images.length} image{images.length !== 1 ? 's' : ''}
                                                </p>
                                            )}
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">External Link (Optional)</label>
                                            <input
                                                type="url"
                                                name="externalLink"
                                                value={formData.externalLink}
                                                onChange={handleInputChange}
                                                placeholder="https://example.com/property"
                                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 text-gray-900 bg-white"
                                            />
                                            <p className="mt-1 text-xs text-gray-500">Add a link if this property is listed on another website (e.g., 99acres, MagicBricks)</p>
                                        </div>
                                        <div className="flex items-center">
                                            <input type="checkbox" name="featured" checked={formData.featured} onChange={handleInputChange} className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded" />
                                            <label className="ml-2 block text-sm text-gray-900">Featured Property</label>
                                        </div>
                                        <div className="mt-5 sm:mt-6">
                                            <button type="submit" className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:text-sm">
                                                {editingProperty ? 'Update Property' : 'Create Property'}
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
        </div >
    );
};

export default AdminDashboard;
