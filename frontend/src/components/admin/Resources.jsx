import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Resources = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ 
        resource: "",
        resType: "", 
        Purpose: "", 
        PurchaseDate: "", 
        DistributeDate: ""
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8000/Resources', formData);
            if (response.status === 201) {
                alert('Resource added successfully!');
                navigate('/resource-retrieve');
            }
        } catch (error) {
            console.error('Error adding resource:', error);
            alert('Failed to add resource. Please try again.');
        }
    };

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Resource Management</h2>
                <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                    Export Resources
                </button>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-8 max-w-2xl mx-auto">
                <h3 className="text-xl font-semibold mb-6">Add New Resource</h3>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2">Resource </label>
                        <input
                            type="text"
                            name="resource"
                            value={formData.resource}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                            placeholder="Enter resource name"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2">Resource Type</label>
                        <input
                            type="text"
                            name="resType"
                            value={formData.resType}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                            placeholder="Enter resource type"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2">Purpose</label>
                        <input
                            type="text"
                            name="Purpose"
                            value={formData.Purpose}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                            placeholder="Enter purpose"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2">Purchase Date</label>
                        <input
                            type="date"
                            name="PurchaseDate"
                            value={formData.PurchaseDate}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2">Distribution Date</label>
                        <input
                            type="date"
                            name="DistributeDate"
                            value={formData.DistributeDate}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                            required
                        />
                    </div>
                    <div className="flex justify-end">
                        <button
                            type="submit"
                            className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition duration-200"
                        >
                            Add Resource
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Resources;