import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';

const ResourceRetrieve = () => {
    const [resources, setResources] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchField, setSearchField] = useState('resource'); // Default search field
    const navigate = useNavigate();

    useEffect(() => {
        const fetchResources = async () => {
            try {
                setLoading(true);
                const response = await axios.get('http://localhost:8000/Resources');
                setResources(response.data.Resources);
                setLoading(false);
            } catch (err) {
                setError('Failed to fetch resources. Please try again later.');
                setLoading(false);
                console.error('Error fetching resources:', err);
            }
        };

        fetchResources();
    }, []);

    const handleEdit = (id) => {
        navigate(`/admin/resources/edit/${id}`);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this resource?')) {
            try {
                await axios.delete(`http://localhost:8000/Resources/${id}`);
                setResources(resources.filter(resource => resource._id !== id));
            } catch (err) {
                setError('Failed to delete resource');
                console.error('Error deleting resource:', err);
            }
        }
    };

    const exportToPDF = () => {
        try {
            console.log('Starting PDF export...');
            console.log('Resources data:', resources);

            const doc = new jsPDF();
            
            // Add title
            doc.setFontSize(16);
            doc.text('Resources List', 14, 15);
            
            // Add date
            doc.setFontSize(10);
            doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 14, 25);
            
            // Prepare table data
            const tableData = resources.map(resource => [
                resource.resource || 'N/A',
                resource.resType || 'N/A',
                resource.Purpose || 'N/A',
                resource.PurchaseDate ? new Date(resource.PurchaseDate).toLocaleDateString() : 'N/A',
                resource.DistributeDate ? new Date(resource.DistributeDate).toLocaleDateString() : 'N/A'
            ]);
            
            console.log('Table data prepared:', tableData);

            // Add table using autoTable directly
            autoTable(doc, {
                startY: 35,
                head: [['Resource', 'Type', 'Purpose', 'Purchase Date', 'Distribution Date']],
                body: tableData,
                theme: 'grid',
                headStyles: { 
                    fillColor: [66, 139, 202],
                    textColor: [255, 255, 255],
                    fontSize: 10
                },
                styles: { 
                    fontSize: 9,
                    cellPadding: 3
                },
                columnStyles: {
                    0: { cellWidth: 40 },
                    1: { cellWidth: 30 },
                    2: { cellWidth: 50 },
                    3: { cellWidth: 30 },
                    4: { cellWidth: 30 }
                },
                margin: { top: 35 }
            });
            
            console.log('PDF generated, saving...');
            
            // Save the PDF
            doc.save('resources-list.pdf');
            
            console.log('PDF saved successfully');
        } catch (error) {
            console.error('Error generating PDF:', error);
            alert('Failed to generate PDF. Please check the console for details.');
        }
    };

    const filteredResources = resources.filter(resource => {
        const searchValue = searchTerm.toLowerCase();
        const resourceValue = String(resource[searchField] || '').toLowerCase();
        return resourceValue.includes(searchValue);
    });

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
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Resource List</h2>
                <button 
                    onClick={exportToPDF}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                    Export Resources
                </button>
            </div>

            {/* Search Section */}
            <div className="mb-6 flex gap-4 items-center">
                <div className="flex-1">
                    <input
                        type="text"
                        placeholder="Search resources..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <select
                    value={searchField}
                    onChange={(e) => setSearchField(e.target.value)}
                    className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <option value="resource">Resource Name</option>
                    <option value="resType">Type</option>
                    <option value="Purpose">Purpose</option>
                </select>
            </div>

            {filteredResources.length === 0 ? (
                <div className="bg-white rounded-lg shadow-lg p-8 text-center">
                    <p className="text-gray-500">No resources found.</p>
                </div>
            ) : (
                <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Resource
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Type
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Purpose
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Purchase Date
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Distribution Date
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {filteredResources.map((resource) => (
                                <tr key={resource._id}>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm font-medium text-gray-900">{resource.resource}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-500">{resource.resType}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-500">{resource.Purpose}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-500">
                                            {new Date(resource.PurchaseDate).toLocaleDateString()}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-500">
                                            {new Date(resource.DistributeDate).toLocaleDateString()}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                        <button 
                                            onClick={() => handleEdit(resource._id)}
                                            className="text-indigo-600 hover:text-indigo-900 mr-3"
                                        >
                                            Edit
                                        </button>
                                        <button 
                                            onClick={() => handleDelete(resource._id)}
                                            className="text-red-600 hover:text-red-900"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default ResourceRetrieve; 