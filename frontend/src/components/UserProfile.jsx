import React, { useState, useEffect } from "react";
import axios from "axios";
import { assets } from "../assets/assets";
import Navbar from "./Navbar";
import { useLocation, useParams } from "react-router-dom";
import { Link } from "react-router-dom";



const URL = "http://localhost:8000/Users";

const UserProfile = () => {
  const location = useLocation();
  const [user, setUser] = useState(location.state?.user || null);
  const { id } = useParams(); // from `/user-profile/:id`

  useEffect(() => {
    // Only fetch from server if user not passed from SignupForm
    if (!user) {
      const fetchHandler = async () => {
        try {
          const response = await axios.get(URL);
          console.log("API response:", response.data);
          setUser(response.data.Users[0]); // Fallback: first user from DB
        } catch (error) {
          console.error("Error fetching users:", error);
        }
      };
      fetchHandler();
    }
  }, [user]);

  if (!user) return <p className="text-center mt-10 text-gray-500">Loading user...</p>;

  const { _id, name, email, age, gender, phone, password, image, alt } = user;

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('/bg6.jpg')" }}
    >
      <Navbar/>
      <br /><br /><br /><br /><br />
      <div className="bg-white p-10 rounded-2xl shadow-2xl w-full max-w-md">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Customer Profile
        </h1>
        
        <div className="flex flex-col items-center">
          <img
            className="w-24 h-24 rounded-full mb-6 border-4 border-blue-400"
            src="profile_img_1.png"
            alt={alt || "User Avatar"}
          />

          <div className="w-full space-y-4">
            {/* Name */}
            <div>
              <label className="text-gray-700 font-semibold block mb-1">Name</label>
              <input
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                type="text"
                value={name}
                readOnly
              />
            </div>

            {/* Email */}
            <div>
              <label className="text-gray-700 font-semibold block mb-1">Email</label>
              <input
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                type="email"
                value={email}
                readOnly
              />
            </div>

            {/* Age */}
            <div>
              <label className="text-gray-700 font-semibold block mb-1">Age</label>
              <input
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                type="number"
                value={age}
                readOnly
              />
            </div>

            {/* Gender */}
            <div>
              <label className="text-gray-700 font-semibold block mb-1">Gender</label>
              <input
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                type="text"
                value={gender}
                readOnly
              />
            </div>

            {/* Phone */}
            <div>
              <label className="text-gray-700 font-semibold block mb-1">Phone</label>
              <input
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                type="text"
                value={phone}
                readOnly
              />
            </div>

            {/* Password */}
            <div>
              <label className="text-gray-700 font-semibold block mb-1">Password</label>
              <input
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                type="password"
                value={password}
                readOnly
              />
            </div>
            <div>
                <Link to={`/user-profile/${_id}`} className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition">
                  Update
                </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
