import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const URL = "http://localhost:8000/Users";

const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchHandler = async () => {
      try {
        const response = await axios.get(URL);
        console.log("API response:", response.data);
        setUsers(response.data.Users);  // ✅ corrected key
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
  
    fetchHandler();
  }, []);

  const handleDelete = async (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        console.log('Attempting to delete user with ID:', userId);
        const response = await axios.delete(`${URL}/${userId}`);
        console.log('Delete response:', response);
        
        if (response.status === 200 || response.status === 204) {
          // Update the users list by filtering out the deleted user
          setUsers(users.filter(user => user.id !== userId));
          alert('User deleted successfully');
        } else {
          throw new Error(`Unexpected response status: ${response.status}`);
        }
      } catch (error) {
        console.error("Error deleting user:", error);
        console.error("Error details:", {
          message: error.message,
          response: error.response?.data,
          status: error.response?.status
        });
        alert(`Failed to delete user: ${error.response?.data?.message || error.message}`);
      }
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">User Management</h2>
        <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          Add New User
        </button>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="p-4 border-b">
          <div className="flex space-x-4">
            <input
              type="text"
              placeholder="Search users..."
              className="px-4 py-2 border rounded-lg flex-1"
            />
            <select className="px-4 py-2 border rounded-lg">
              <option value="">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="suspended">Suspended</option>
            </select>
          </div>
        </div>

        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                User
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Contact
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Join Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Last Login
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
            {users.map((user) => (
              <tr key={user._id || user.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="h-10 w-10 flex-shrink-0">
                      <img
                        className="h-10 w-10 rounded-full"
                        src={`https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}`}
                        alt=""
                      />
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">{user.name}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{user.email}</div>
                  <div className="text-sm text-gray-500">{user.phone}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{user.joinDate}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{user.lastLogin}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    user.status === 'Active' ? 'bg-green-100 text-green-800' : 
                    user.status === 'Inactive' ? 'bg-gray-100 text-gray-800' : 
                    'bg-red-100 text-red-800'
                  }`}>
                    {user.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button 
                    onClick={() => handleDelete(user._id || user.id)}
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

export default Users; 