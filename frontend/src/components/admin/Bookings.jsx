import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// Update your imports at the top of the file
import { jsPDF } from 'jspdf';
import {autoTable} from 'jspdf-autotable';

const Bookings = () => {
  // State to store bookings data
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [dateFilter, setDateFilter] = useState('');
  const [packageFilter, setPackageFilter] = useState('');
  const [searchField, setSearchField] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const [exporting, setExporting] = useState(false);
  const navigate = useNavigate();

  // Fetch bookings data when component mounts
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        setLoading(true);
        const response = await axios.get('/api/bookings');
        setBookings(response.data.bookings);
        setError(null);
      } catch (err) {
        console.error('Error fetching bookings:', err);
        setError('Failed to load bookings. Please try again later.');
        toast.error('Failed to load bookings. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  // Add this function to your Bookings component
  const exportBookingsToPDF = async () => {
    try {
      setExporting(true);
      
      const bookingsToExport = filteredBookings.length > 0 ? filteredBookings : bookings;
      
      if (bookingsToExport.length === 0) {
        toast.warning('No bookings to export');
        setExporting(false);
        return;
      }
      
      // Create new PDF instance
      const doc = new jsPDF();
      
      // Add title
      doc.setFontSize(20);
      doc.setTextColor(40);
      doc.text('Bookings Report', 105, 20, { align: 'center' });
      
      // Add date
      doc.setFontSize(12);
      doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 105, 30, { align: 'center' });
      
      // Prepare table data
      const headers = [
        'User', 
        'Email', 
        'Package', 
        'Date', 
        'Time Slot', 
        'Status'
      ];
      
      const data = bookingsToExport.map(booking => [
        booking.username,
        booking.email,
        booking.packageType,
        new Date(booking.date).toLocaleDateString(),
        booking.timeSlot,
        booking.message
      ]);
      
      // Add table using autoTable plugin
      autoTable(doc, {
        head: [headers],
        body: data,
        startY: 40,
        theme: 'grid',
        headStyles: {
          fillColor: [41, 128, 185],
          textColor: 255,
          fontStyle: 'bold'
        },
        alternateRowStyles: {
          fillColor: [240, 240, 240]
        },
        styles: {
          fontSize: 9,
          cellPadding: 3,
          overflow: 'linebreak'
        },
        margin: { top: 40 }
      });
      
      // Save the PDF
      const dateStr = new Date().toISOString().split('T')[0];
      doc.save(`bookings_report_${dateStr}.pdf`);
      
      toast.success(`Exported ${bookingsToExport.length} bookings to PDF`);
    } catch (err) {
      console.error('Error exporting PDF:', err);
      toast.error('Failed to export PDF. Please try again.');
    } finally {
      setExporting(false);
    }
  };

  // Filter bookings based on search term and filters
  const filteredBookings = bookings.filter(booking => {
    // Search term filtering based on selected field
    let matchesSearch = true;
    if (searchTerm) {
      switch (searchField) {
        case 'username':
          matchesSearch = booking.username.toLowerCase().includes(searchTerm.toLowerCase());
          break;
        case 'email':
          matchesSearch = booking.email.toLowerCase().includes(searchTerm.toLowerCase());
          break;
        case 'package':
          matchesSearch = booking.packageType.toLowerCase().includes(searchTerm.toLowerCase());
          break;
        case 'timeSlot':
          matchesSearch = booking.timeSlot.toLowerCase().includes(searchTerm.toLowerCase());
          break;
        case 'all':
        default:
          matchesSearch = 
            booking.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
            booking.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            booking.packageType.toLowerCase().includes(searchTerm.toLowerCase()) ||
            booking.timeSlot.toLowerCase().includes(searchTerm.toLowerCase());
          break;
      }
    }
    
    // Status filter
    const matchesStatus = statusFilter === '' || booking.message === statusFilter;
    
    // Package filter
    const matchesPackage = packageFilter === '' || booking.packageType === packageFilter;
    
    // Date filter
    let matchesDate = true;
    if (dateFilter) {
      const bookingDate = new Date(booking.date).toLocaleDateString();
      matchesDate = bookingDate === new Date(dateFilter).toLocaleDateString();
    }
    
    return matchesSearch && matchesStatus && matchesPackage && matchesDate;
  });

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Handle search field change
  const handleSearchFieldChange = (e) => {
    setSearchField(e.target.value);
  };

  // Handle status filter change
  const handleStatusChange = (e) => {
    setStatusFilter(e.target.value);
  };

  // Handle package filter change
  const handlePackageChange = (e) => {
    setPackageFilter(e.target.value);
  };

  // Handle date filter change
  const handleDateChange = (e) => {
    setDateFilter(e.target.value);
  };

  // Toggle filters visibility
  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  // Clear all filters
  const clearFilters = () => {
    setSearchTerm('');
    setStatusFilter('');
    setDateFilter('');
    setPackageFilter('');
    setSearchField('all');
  };

  // Handle booking deletion
  const handleDeleteBooking = async (id) => {
    if (window.confirm('Are you sure you want to delete this booking?')) {
      try {
        await axios.delete(`/api/bookings/${id}`);
        // Remove the deleted booking from the local state
        setBookings(bookings.filter(booking => booking._id !== id));
        toast.success('Booking deleted successfully');
      } catch (err) {
        console.error('Error deleting booking:', err);
        toast.error('Failed to delete booking. Please try again.');
      }
    }
  };

    // Handle booking confirmation
    const handleConfirmBooking = async (id) => {
      try {
        await axios.put(`/api/bookings/${id}`, { status: 'Confirmed' });
        // Update the local state after successful API call
        setBookings(bookings.map(booking => 
          booking._id === id ? { ...booking, message: 'Confirmed' } : booking
        ));
        toast.success('Booking confirmed successfully');
      } catch (err) {
        console.error('Error confirming booking:', err);
        toast.error('Failed to confirm booking. Please try again.');
      }
    };

  // Get unique package types for filter dropdown
  const getUniquePackages = () => {
    const packages = [...new Set(bookings.map(booking => booking.packageType))];
    return packages;
  };

  // Export bookings to CSV
  const exportBookingsToCSV = () => {
    try {
      setExporting(true);
      
      // Get the bookings to export (filtered or all)
      const bookingsToExport = filteredBookings.length > 0 ? filteredBookings : bookings;
      
      if (bookingsToExport.length === 0) {
        toast.warning('No bookings to export');
        setExporting(false);
        return;
      }
      
      // Define CSV headers
      const headers = [
        'ID',
        'Username',
        'Email',
        'Package Type',
        'Date',
        'Time Slot',
        'Status'
      ];
      
      // Convert bookings to CSV rows
      const csvRows = bookingsToExport.map(booking => [
        booking._id,
        booking.username,
        booking.email,
        booking.packageType,
        new Date(booking.date).toLocaleDateString(),
        booking.timeSlot,
        booking.message
      ]);
      
      // Combine headers and rows
      const csvContent = [
        headers.join(','),
        ...csvRows.map(row => row.map(cell => `"${cell}"`).join(','))
      ].join('\n');
      
      // Create a Blob with the CSV content
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      
      // Create a download link
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      
      // Set the download attributes
      const date = new Date().toISOString().split('T')[0];
      link.setAttribute('href', url);
      link.setAttribute('download', `bookings_${date}.csv`);
      link.style.visibility = 'hidden';
      
      // Append to the document, click it, and remove it
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      toast.success(`Exported ${bookingsToExport.length} bookings to CSV`);
    } catch (err) {
      console.error('Error exporting bookings:', err);
      toast.error('Failed to export bookings. Please try again.');
    } finally {
      setExporting(false);
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Booking Management</h2>
        <div className="flex space-x-2">
          <button 
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 flex items-center"
            onClick={exportBookingsToCSV}
            disabled={exporting}
          >
            {exporting ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Exporting...
              </>
            ) : (
              <>
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                </svg>
                Export CSV
              </>
            )}
          </button>
          <button 
  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 flex items-center"
  onClick={exportBookingsToPDF}
  disabled={exporting}
>
  {exporting ? (
    <>
      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
      Exporting...
    </>
  ) : (
    <>
      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
      </svg>
      Export PDF
    </>
  )}
</button>
        </div>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="p-4 border-b">
          <div className="flex flex-col space-y-4">
            <div className="flex space-x-4">
              <div className="flex-1">
                <div className="flex space-x-2">
                  <select 
                    className="px-3 py-2 border rounded-lg"
                    value={searchField}
                    onChange={handleSearchFieldChange}
                  >
                    <option value="all">All Fields</option>
                    <option value="username">Username</option>
                    <option value="email">Email</option>
                    <option value="package">Package</option>
                    <option value="timeSlot">Time Slot</option>
                  </select>
                  <input
                    type="text"
                    placeholder="Search bookings..."
                    className="px-4 py-2 border rounded-lg flex-1"
                    value={searchTerm}
                    onChange={handleSearchChange}
                  />
                </div>
              </div>
              <button 
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
                onClick={toggleFilters}
              >
                {showFilters ? 'Hide Filters' : 'Show Filters'}
              </button>
            </div>
            
            {showFilters && (
              <div className="flex flex-wrap gap-4 pt-2 border-t">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <select 
                    className="px-3 py-2 border rounded-lg"
                    value={statusFilter}
                    onChange={handleStatusChange}
                  >
                    <option value="">All Status</option>
                    <option value="Pending">Pending</option>
                    <option value="Confirmed">Confirmed</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Package</label>
                  <select 
                    className="px-3 py-2 border rounded-lg"
                    value={packageFilter}
                    onChange={handlePackageChange}
                  >
                    <option value="">All Packages</option>
                    {getUniquePackages().map(pkg => (
                      <option key={pkg} value={pkg}>{pkg}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                  <input
                    type="date"
                    className="px-3 py-2 border rounded-lg"
                    value={dateFilter}
                    onChange={handleDateChange}
                  />
                </div>
                
                <div className="flex items-end">
                  <button 
                    className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                    onClick={clearFilters}
                  >
                    Clear Filters
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {loading ? (
          <div className="p-8 text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
            <p className="mt-2 text-gray-500">Loading bookings...</p>
          </div>
        ) : (
          <>
            <div className="px-4 py-2 bg-gray-50 border-b">
              <p className="text-sm text-gray-600">
                Showing {filteredBookings.length} of {bookings.length} bookings
              </p>
            </div>
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    User
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Package
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Time Slot
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredBookings.length > 0 ? (
                  filteredBookings.map((booking) => (
                    <tr key={booking._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{booking.username}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{booking.email}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{booking.packageType}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {new Date(booking.date).toLocaleDateString()}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{booking.timeSlot}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          booking.message === 'Confirmed' ? 'bg-green-100 text-green-800' : 
                          booking.message === 'Pending' ? 'bg-yellow-100 text-yellow-800' : 
                          'bg-red-100 text-red-800'
                        }`}>
                          {booking.message}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex space-x-2">
                    <button
                      className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 text-sm"
                      onClick={() => handleConfirmBooking(booking._id)}
                    >
                      Confirm
                    </button>
                    <button 
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-sm"
                      onClick={() => handleDeleteBooking(booking._id)}
                    >
                      Delete
                    </button>
                  </div>
                </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="px-6 py-4 text-center text-gray-500">
                      No bookings found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </>
        )}
      </div>
    </div>
  );
};

export default Bookings;