// ViewComplaint.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const ViewComplaint = ({ mode = 'view', onUpdate }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [complaint, setComplaint] = useState({
    name: '',
    email: '',
    complain: '',
    feedback: '',
    ratings: '',
    status: 'Pending',
    priority: 'Medium'
  });
  const [isEditing, setIsEditing] = useState(mode === 'edit');

  useEffect(() => {
    const fetchComplaint = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/Complaints/complaints/${id}`);
        setComplaint(response.data);
      } catch (error) {
        toast.error('Error fetching complaint details');
        console.error(error);
      }
    };
    fetchComplaint();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setComplaint(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8000/Complaints/complaints/${id}`, complaint);
      toast.success('Complaint updated successfully');
      setIsEditing(false);
      if (onUpdate) onUpdate();
    } catch (error) {
      toast.error('Error updating complaint');
      console.error(error);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:8000/Complaints/complaints/${id}`);
      toast.success('Complaint deleted successfully');
      navigate('/complaints');
    } catch (error) {
      toast.error('Error deleting complaint');
      console.error(error);
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow">
      {isEditing ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                name="name"
                value={complaint.name}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                value={complaint.email}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Complaint</label>
            <textarea
              name="complain"
              value={complaint.complain}
              onChange={handleChange}
              rows="4"
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Feedback</label>
            <textarea
              name="feedback"
              value={complaint.feedback}
              onChange={handleChange}
              rows="4"
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Rating</label>
              <select
                name="ratings"
                value={complaint.ratings}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              >
                <option value="">Select rating</option>
                <option value="1">⭐ Poor</option>
                <option value="2">⭐⭐ Fair</option>
                <option value="3">⭐⭐⭐ Good</option>
                <option value="4">⭐⭐⭐⭐ Very Good</option>
                <option value="5">⭐⭐⭐⭐⭐ Excellent</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Status</label>
              <select
                name="status"
                value={complaint.status}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              >
                <option value="Pending">Pending</option>
                <option value="In Progress">In Progress</option>
                <option value="Resolved">Resolved</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Priority</label>
              <select
                name="priority"
                value={complaint.priority}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="px-4 py-2 bg-gray-500 text-white rounded-md"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md"
            >
              Save Changes
            </button>
          </div>
        </form>
      ) : (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="text-sm font-medium text-gray-500">Name</h3>
              <p className="mt-1 text-sm text-gray-900">{complaint.name}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">Email</h3>
              <p className="mt-1 text-sm text-gray-900">{complaint.email}</p>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-500">Complaint</h3>
            <p className="mt-1 text-sm text-gray-900 whitespace-pre-line">{complaint.complain}</p>
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-500">Feedback</h3>
            <p className="mt-1 text-sm text-gray-900 whitespace-pre-line">{complaint.feedback}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <h3 className="text-sm font-medium text-gray-500">Rating</h3>
              <p className="mt-1 text-sm text-gray-900">
                {complaint.ratings ? '⭐'.repeat(complaint.ratings) : 'Not rated'}
              </p>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-500">Status</h3>
              <span className={`mt-1 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                complaint.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                complaint.status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
                'bg-green-100 text-green-800'
              }`}>
                {complaint.status}
              </span>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-500">Priority</h3>
              <span className={`mt-1 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                complaint.priority === 'High' ? 'bg-red-100 text-red-800' :
                complaint.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                'bg-green-100 text-green-800'
              }`}>
                {complaint.priority}
              </span>
            </div>
          </div>

          <div className="flex justify-end space-x-4">
            <button
              onClick={handleDelete}
              className="px-4 py-2 bg-red-600 text-white rounded-md"
            >
              Delete
            </button>
            <button
              onClick={() => setIsEditing(true)}
              className="px-4 py-2 bg-blue-600 text-white rounded-md"
            >
              Edit
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewComplaint;