import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Events = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingId, setEditingId] = useState(null);
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
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = () => {
    const { Date, Venue, Time, Participants, description } = formData;
    
    // Check if all required fields are filled
    if (!Date || !Venue || !Time || !Participants || !description) {
      alert('Please fill all fields');
      return false;
    }
    
    // Validate date - ensure it's not in the past
    const selectedDate = new Date(Date);
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Reset time part for date comparison
    
    if (selectedDate < today) {
      alert('Event date cannot be in the past');
      return false;
    }
    
    // Validate time format (HH:MM)
    const timeRegex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;
    if (!timeRegex.test(Time)) {
      alert('Please enter a valid time in HH:MM format');
      return false;
    }
    
    // Validate participants is a positive number
    if (isNaN(Participants) || Participants <= 0) {
      alert('Participants must be a positive number');
      return false;
    }
    
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const method = editingId ? 'put' : 'post';
    const url = editingId
      ? `http://localhost:8000/Events/${editingId}`
      : 'http://localhost:8000/Events';

    const { eventID, ...payloadData } = formData;
    const payload = editingId 
      ? { ...payloadData, eventID: formData.eventID } 
      : payloadData;

    try {
      const response = await axios[method](url, payload);
      if (response.status === 200) {
        alert(editingId ? 'Event updated!' : 'Event added!');
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
      console.error('Submit error:', err);
      alert('Error: ' + (err.response?.data?.message || 'Failed to save event'));
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
        alert('Event deleted');
        fetchEvents();
      }
    } catch (err) {
      console.error('Delete error:', err);
      alert('Delete failed: ' + (err.response?.data?.message || 'Failed to delete event'));
    }
  };

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
        <h2 className="text-2xl font-bold">Event Management</h2>
        <button 
          onClick={() => {
            setEditingId(null);
            setFormData({
              eventID: '',
              Date: '',
              Venue: '',
              Time: '',
              Participants: '',
              description: '',
            });
          }}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          New Event
        </button>
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
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
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
            {events.map((event) => (
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
