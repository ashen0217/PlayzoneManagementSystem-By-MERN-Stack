import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';

const UpdateResource = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [resource, setResource] = useState({
        resource: '',
        resType: '',
        Purpose: '',
        PurchaseDate: '',
        DistributeDate: ''
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [activeSection, setActiveSection] = useState('resources');

    useEffect(() => {
        const fetchResource = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/Resources/${id}`);
                const resourceData = response.data.Resources;
                // Format dates for input fields
                resourceData.PurchaseDate = new Date(resourceData.PurchaseDate).toISOString().split('T')[0];
                resourceData.DistributeDate = new Date(resourceData.DistributeDate).toISOString().split('T')[0];
                setResource(resourceData);
                setLoading(false);
            } catch (err) {
                setError('Failed to fetch resource details');
                setLoading(false);
                console.error('Error fetching resource:', err);
            }
        };

        fetchResource();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setResource(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:8000/Resources/${id}`, resource);
            navigate('/admin/resources');
        } catch (err) {
            setError('Failed to update resource');
            console.error('Error updating resource:', err);
        }
    };

    const renderContent = () => {
        if (loading) {
            return (
                <div className="p-6">
                    <div className="flex justify-center items-center h-64">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                    </div>
                </div>
            );
        }

        if (error) {
            return (
                <div className="p-6">
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                        <strong className="font-bold">Error!</strong>
                        <span className="block sm:inline"> {error}</span>
                    </div>
                </div>
            );
        }

        return (
            <div className="p-6">
                <div className="max-w-2xl mx-auto">
                    <h2 className="text-2xl font-bold mb-6">Update Resource</h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Resource Name</label>
                            <input
                                type="text"
                                name="resource"
                                value={resource.resource}
                                onChange={handleChange}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Resource Type</label>
                            <input
                                type="text"
                                name="resType"
                                value={resource.resType}
                                onChange={handleChange}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Purpose</label>
                            <input
                                type="text"
                                name="Purpose"
                                value={resource.Purpose}
                                onChange={handleChange}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Purchase Date</label>
                            <input
                                type="date"
                                name="PurchaseDate"
                                value={resource.PurchaseDate}
                                onChange={handleChange}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Distribution Date</label>
                            <input
                                type="date"
                                name="DistributeDate"
                                value={resource.DistributeDate}
                                onChange={handleChange}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                required
                            />
                        </div>
                        <div className="flex justify-end space-x-3">
                            <button
                                type="button"
                                onClick={() => navigate('/admin/resources')}
                                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                            >
                                Update Resource
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        );
    };

    return (
        <div className="flex h-screen bg-gray-100">
            <Sidebar activeSection={activeSection} setActiveSection={setActiveSection} />
            <div className="flex-1 flex flex-col overflow-hidden">
                <Header />
                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
                    {renderContent()}
                </main>
            </div>
        </div>
    );
};

export default UpdateResource; 