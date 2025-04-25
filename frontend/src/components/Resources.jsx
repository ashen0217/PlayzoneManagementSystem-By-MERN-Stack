import React, { useState } from 'react';
import Navbar from './Navbar';

const Resources = () => {
    const [formData, setFormData] = useState({ 
        resource:"",
        restype: "", 
        purpose: "", 
        purchaseDate: "", 
        distributeDate: ""
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // TODO: Add API call to save resource
        console.log("Form submitted:", formData);
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
                            name="type"
                            value={formData.resource}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                            placeholder="Enter resource type"
                            required
                        />
                        <label className="block text-gray-700 text-sm font-bold mb-2">Resource Type</label>
                        <input
                            type="text"
                            name="type"
                            value={formData.restype}
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
                            name="purpose"
                            value={formData.purpose}
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
                            name="purchaseDate"
                            value={formData.purchaseDate}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2">Distribution Date</label>
                        <input
                            type="date"
                            name="distributeDate"
                            value={formData.distributeDate}
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