import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

const UpdateUser = () => {
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    age: "",
    gender: "",
    phone: "",
    password: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchHandler = async () => {
      try {
        const res = await axios.get(`http://localhost:8000/Users/${id}`);
        if (res.data && res.data.Users) {
          setInputs({
            _id: res.data.Users._id || "",
            name: res.data.Users.name || "",
            email: res.data.Users.email || "",
            age: res.data.Users.age || "",
            gender: res.data.Users.gender || "",
            phone: res.data.Users.phone || "",
            password: res.data.Users.password || "",
          });
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setError("Failed to fetch user data");
        setLoading(false);
      }
    };

    fetchHandler();
  }, [id]);

  const handleChange = (e) => {
    setInputs((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      const response = await axios.put(`http://localhost:8000/Users/${id}`, {
        ...inputs,
        _id: id,
      });
      
      if (response.data && response.data.Users) {
        // Navigate back to profile with updated user data
        navigate(`/user-profile/${id}`, { 
          state: { user: response.data.Users },
          replace: true 
        });
      } else {
        setError("Failed to update user");
      }
    } catch (err) {
      console.error("Error updating user:", err);
      setError("Failed to update user");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p className="text-center">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="p-4 max-w-md mx-auto">
      <Navbar/>
      <br /><br /><br /><br />
      <h2 className="text-2xl font-bold mb-6 text-center">Update User Profile</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {Object.keys(inputs).map(
          (key) =>
            key !== "_id" && (
              <div key={key}>
                <label className="block text-gray-700 font-semibold mb-1">
                  {key.charAt(0).toUpperCase() + key.slice(1)}
                </label>
                <input
                  type={key === "password" ? "password" : "text"}
                  name={key}
                  value={inputs[key]}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder={`Enter your ${key}`}
                  required
                />
              </div>
            )
        )}

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition mt-6"
          disabled={loading}
        >
          {loading ? "Updating..." : "Update Profile"}
        </button>
      </form>
    </div>
  );
};

export default UpdateUser;
