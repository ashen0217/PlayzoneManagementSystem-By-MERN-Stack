import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

const Events = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [notification, setNotification] = useState({ show: false, message: '', type: '' });
  const [formData, setFormData] = useState({
    eventID: '',
    Date: '',
    Venue: '',
    Time: '',
    Participants: '',
    description: '',
  });
  const navigate = useNavigate();

  useEffect(() => {
    fetchEvents();
  }, []);

  // Auto-hide notification after 5 seconds
  useEffect(() => {
    if (notification.show) {
      const timer = setTimeout(() => {
        setNotification({ ...notification, show: false });
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  const showNotification = (message, type = 'error') => {
    setNotification({ show: true, message, type });
  };

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:8000/Events');
      setEvents(response.data.events);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch events. Please try again later.');
      setLoading(false);
      console.error('Error fetching events:', err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'Date') {
      // Ensure the date is in YYYY-MM-DD format
      const date = new Date(value);
      const formattedDate = date.toISOString().split('T')[0];
      setFormData(prev => ({
        ...prev,
        [name]: formattedDate
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const validateForm = () => {
    const { Date: eventDate, Venue, Time, Participants, description } = formData;
    
    // Check if all required fields are filled
    if (!eventDate || !Venue || !Time || !Participants || !description) {
      showNotification('Please fill all required fields', 'error');
      return false;
    }
    
    // Validate date - ensure it's not in the past
    const selectedDate = new Date(eventDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Reset time part for date comparison
    selectedDate.setHours(0, 0, 0, 0); // Reset time part for date comparison
    
    if (selectedDate < today) {
      showNotification('Event date cannot be in the past', 'error');
      return false;
    }
    
    // Validate time format (HH:MM)
    const timeRegex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;
    if (!timeRegex.test(Time)) {
      showNotification('Please enter a valid time in HH:MM format', 'error');
      return false;
    }
    
    // If the selected date is today, validate that the time is in the future
    if (selectedDate.getTime() === today.getTime()) {
      const [hours, minutes] = Time.split(':').map(Number);
      const currentTime = new Date();
      const selectedTime = new Date();
      selectedTime.setHours(hours, minutes, 0, 0);
      
      if (selectedTime.getTime() <= currentTime.getTime()) {
        showNotification('Event time cannot be in the past for today\'s date', 'error');
        return false;
      }
    }
    
    // Validate participants is a positive number
    if (isNaN(Participants) || Participants <= 0) {
      showNotification('Participants must be a positive number', 'error');
      return false;
    }
    
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submitted, validating...");
    
    if (!validateForm()) {
      console.log("Form validation failed");
      return;
    }
    
    console.log("Form validation passed, preparing to submit");

    const method = editingId ? 'put' : 'post';
    const url = editingId
      ? `http://localhost:8000/Events/${editingId}`
      : 'http://localhost:8000/Events';

    // Format the date properly for the backend
    const formattedDate = new Date(formData.Date).toISOString().split('T')[0];
    
    // Create payload with properly formatted date
    const { eventID, Date: eventDate, ...payloadData } = formData;
    const payload = {
      Date: formattedDate,
      Venue: formData.Venue,
      Time: formData.Time,
      Participants: Number(formData.Participants),
      description: formData.description
    };

    console.log(`Submitting event data to ${url} using ${method.toUpperCase()}:`, payload);
    
    try {
      // Add proper headers to handle CORS and content type
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      };
      
      const response = await axios[method](url, payload, config);
      console.log('Response from server:', response);
      
      // Check for both 200 and 201 status codes
      if (response.status === 200 || response.status === 201) {
        console.log("Event saved successfully");
        showNotification(editingId ? 'Event updated successfully!' : 'Event added successfully!', 'success');
        setFormData({
          eventID: '',
          Date: '',
          Venue: '',
          Time: '',
          Participants: '',
          description: '',
        });
        setEditingId(null);
        fetchEvents();
      }
    } catch (err) {
      console.error('Submit error details:', {
        message: err.message,
        response: err.response ? {
          status: err.response.status,
          data: err.response.data,
          headers: err.response.headers
        } : 'No response data',
        request: err.request ? 'Request was made but no response received' : 'Request setup failed'
      });
      
      // Handle 400 Bad Request errors with more specific messages
      if (err.response && err.response.status === 400) {
        const errorData = err.response.data;
        let errorMessage = 'Invalid data submitted: ';
        
        if (errorData.missingFields) {
          const missingFields = Object.entries(errorData.missingFields)
            .filter(([_, missing]) => missing)
            .map(([field]) => field)
            .join(', ');
          errorMessage += `Missing fields: ${missingFields}`;
        } else if (errorData.message) {
          errorMessage += errorData.message;
        } else {
          errorMessage += 'Please check your input and try again';
        }
        
        showNotification(errorMessage, 'error');
      } else {
        showNotification(
          err.response?.data?.message || 
          (err.response ? `Server error: ${err.response.status}` : 'Network error - please check your connection'), 
          'error'
        );
      }
    }
  };

  const handleEdit = (event) => {
    navigate(`/admin/events/edit/${event._id}`);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this event?')) return;
    try {
      const response = await axios.delete(`http://localhost:8000/Events/${id}`);
      if (response.status === 200) {
        showNotification('Event deleted successfully', 'success');
        fetchEvents();
      }
    } catch (err) {
      console.error('Delete error:', err);
      showNotification(err.response?.data?.message || 'Failed to delete event', 'error');
    }
  };

  const exportEvents = () => {
    // Create a new PDF document
    const doc = new jsPDF();
    
    // Add title to the PDF
    doc.setFontSize(18);
    doc.text('Events Report', 14, 15);
    
    // Add date of export
    doc.setFontSize(10);
    doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 14, 22);
    
    // Prepare data for the table
    const tableData = events.map(event => [
      event.Venue,
      new Date(event.Date).toLocaleDateString(),
      event.Time,
      event.Participants,
      event.description
    ]);
    
    // Add the table to the PDF
    autoTable(doc, {
      head: [['Venue', 'Date', 'Time', 'Participants', 'Description']],
      body: tableData,
      startY: 30,
      styles: { fontSize: 8, cellPadding: 2 },
      headStyles: { fillColor: [41, 128, 185], textColor: 255, fontSize: 9, fontStyle: 'bold' },
      alternateRowStyles: { fillColor: [245, 245, 245] },
      margin: { top: 30 }
    });
    
    // Save the PDF
    doc.save('events-report.pdf');
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  // Filter events based on search term
  const filteredEvents = events.filter(event => {
    const searchLower = searchTerm.toLowerCase();
    return (
      event.Venue.toLowerCase().includes(searchLower) ||
      event.description.toLowerCase().includes(searchLower) ||
      event.Time.toLowerCase().includes(searchLower) ||
      event.Participants.toString().includes(searchLower) ||
      new Date(event.Date).toLocaleDateString().includes(searchLower)
    );
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
      {/* Notification Component */}
      {notification.show && (
        <div className={`mb-4 p-4 rounded-md ${
          notification.type === 'error' 
            ? 'bg-red-100 border border-red-400 text-red-700' 
            : 'bg-green-100 border border-green-400 text-green-700'
        }`}>
          <div className="flex items-center">
            {notification.type === 'error' ? (
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            ) : (
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            )}
            <span>{notification.message}</span>
          </div>
        </div>
      )}

      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Event Management</h2>
        <div className="flex space-x-2">
          <button 
            onClick={exportEvents}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Export Events
          </button>
          
        </div>
      </div>

      {/* Event Form */}
      <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
        <h3 className="text-xl font-semibold mb-4">{editingId ? 'Edit Event' : 'Add New Event'}</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Date</label>
              <input
                type="date"
                name="Date"
                value={formData.Date}
                onChange={handleChange}
                min={new Date().toISOString().split('T')[0]}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 [&::-webkit-calendar-picker-indicator]:cursor-pointer"
                required
                placeholder="DD/MM/YYYY"
                data-date-format="DD/MM/YYYY"
                style={{
                  position: 'relative',
                  colorScheme: 'light'
                }}
              />
              <style>
                {`
                  input[type="date"]::-webkit-datetime-edit-text,
                  input[type="date"]::-webkit-datetime-edit-month-field,
                  input[type="date"]::-webkit-datetime-edit-day-field,
                  input[type="date"]::-webkit-datetime-edit-year-field {
                    color: #374151;
                  }
                  input[type="date"]:invalid::-webkit-datetime-edit {
                    color: #6B7280;
                  }
                  input[type="date"]:focus::-webkit-datetime-edit {
                    color: #374151;
                  }
                `}
              </style>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Time</label>
              <input
                type="time"
                name="Time"
                value={formData.Time}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Venue</label>
              <input
                type="text"
                name="Venue"
                value={formData.Venue}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Participants</label>
              <input
                type="number"
                name="Participants"
                value={formData.Participants}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="3"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              {editingId ? 'Update Event' : 'Add Event'}
            </button>
          </div>
        </form>
      </div>

      {/* Events List */}
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="p-4 border-b">
          <div className="flex space-x-4">
            <input
              type="text"
              placeholder="Search events..."
              className="px-4 py-2 border rounded-lg flex-1"
              value={searchTerm}
              onChange={handleSearch}
            />
            <select className="px-4 py-2 border rounded-lg">
              <option value="">All Venues</option>
              {[...new Set(events.map(event => event.Venue))].map(venue => (
                <option key={venue} value={venue}>{venue}</option>
              ))}
            </select>
          </div>
        </div>

        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Venue
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Time
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Participants
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Description
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredEvents.map((event) => (
              <tr key={event._id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{event.Venue}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    {new Date(event.Date).toLocaleDateString()}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{event.Time}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{event.Participants}</div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-900">{event.description}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    onClick={() => handleEdit(event)}
                    className="text-indigo-600 hover:text-indigo-900 mr-3"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(event._id)}
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
    </div>
  );
};

export default Events;
