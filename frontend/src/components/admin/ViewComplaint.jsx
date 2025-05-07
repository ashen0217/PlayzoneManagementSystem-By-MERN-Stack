import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Sidebar from './Sidebar';
import Header from './Header';

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
      await axios.put(`http://localhost:8000/Complaints/complaints/${id}`, {
        status: complaint.status,
        priority: complaint.priority
      });
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
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
          <div className="max-w-4xl mx-auto p-6">
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="p-8">
                <div className="flex justify-between items-center mb-8">
                  <h2 className="text-2xl font-bold text-gray-800">
                    {isEditing ? 'Edit Complaint' : 'Complaint Details'}
                  </h2>
                  {!isEditing && (
                    <div className="flex space-x-3">
                      <button
                        onClick={() => setIsEditing(true)}
                        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition duration-200"
                      >
                        Edit
                      </button>
                    </div>
                  )}
                </div>

                {isEditing ? (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                        <input
                          type="text"
                          name="name"
                          readOnly
                          value={complaint.name}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                        <input
                          type="email"
                          name="email"
                          value={complaint.email}
                          readOnly
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Complaint</label>
                      <textarea
                        name="complain"
                        value={complaint.complain}
                        readOnly
                        rows="4"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Feedback</label>
                      <textarea
                        name="feedback"
                        value={complaint.feedback}
                        readOnly
                        rows="4"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Rating</label>
                        <select
                          name="ratings"
                          value={complaint.ratings}
                          readOnly
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100"
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
                        <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                        <select
                          name="status"
                          value={complaint.status}
                          onChange={handleChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                        >
                          <option value="Pending">Pending</option>
                          <option value="In Progress">In Progress</option>
                          <option value="Resolved">Resolved</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
                        <select
                          name="priority"
                          value={complaint.priority}
                          onChange={handleChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                        >
                          <option value="Low">Low</option>
                          <option value="Medium">Medium</option>
                          <option value="High">High</option>
                        </select>
                      </div>
                    </div>

                    <div className="flex justify-end space-x-4 pt-4">
                      <button
                        type="button"
                        onClick={() => setIsEditing(false)}
                        className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition duration-200"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition duration-200"
                      >
                        Save Changes
                      </button>
                    </div>
                  </form>
                ) : (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Name</h3>
                        <p className="mt-1 text-lg font-medium text-gray-900">{complaint.name}</p>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Email</h3>
                        <p className="mt-1 text-lg font-medium text-gray-900">{complaint.email}</p>
                      </div>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Complaint</h3>
                      <p className="mt-2 text-gray-700 whitespace-pre-line">{complaint.complain}</p>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Feedback</h3>
                      <p className="mt-2 text-gray-700 whitespace-pre-line">{complaint.feedback}</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Rating</h3>
                        <p className="mt-2 text-2xl text-yellow-500">
                          {complaint.ratings ? '⭐'.repeat(complaint.ratings) : 'Not rated'}
                        </p>
                      </div>

                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</h3>
                        <span className={`mt-2 inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                          complaint.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                          complaint.status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
                          'bg-green-100 text-green-800'
                        }`}>
                          {complaint.status}
                        </span>
                      </div>

                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Priority</h3>
                        <span className={`mt-2 inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                          complaint.priority === 'High' ? 'bg-red-100 text-red-800' :
                          complaint.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-green-100 text-green-800'
                        }`}>
                          {complaint.priority}
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ViewComplaint;