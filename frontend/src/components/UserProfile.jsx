import React, { useState, useEffect } from "react";
import axios from "axios";
import { assets } from "../assets/assets";
import Navbar from "./Navbar";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const URL = "http://localhost:8000/Users";

const UserProfile = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [user, setUser] = useState(location.state?.user || null);
  const { id } = useParams();
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  useEffect(() => {
    const fetchHandler = async () => {
      try {
        if (id) {
          const response = await axios.get(`${URL}/${id}`);
          if (response.data && response.data.Users) {
            setUser(response.data.Users);
            setPreviewImage(response.data.Users.image || "profile_img_1.png");
          }
        } else if (!user) {
          const response = await axios.get(URL);
          if (response.data && response.data.Users && response.data.Users.length > 0) {
            setUser(response.data.Users[0]);
            setPreviewImage(response.data.Users[0].image || "profile_img_1.png");
          }
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchHandler();
  }, [id, user]);

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await axios.delete(`${URL}/${user._id}`);
        alert("User deleted successfully");
        navigate("/");
      } catch (error) {
        console.error("Error deleting user:", error);
        alert("Error deleting user. Please try again.");
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageUpload = async () => {
    if (!selectedImage) return;

    try {
      const formData = new FormData();
      formData.append("image", selectedImage);

      const response = await axios.put(`${URL}/${user._id}/image`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 200) {
        alert("Profile picture updated successfully!");
        setUser({ ...user, image: response.data.image });
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Error updating profile picture. Please try again.");
    }
  };

  if (!user)
    return <p className="text-center mt-10 text-gray-500">Loading user...</p>;

  const { _id, name, email, age, gender, phone, password } = user;

  return (
    <div 
      className="min-h-screen bg-cover bg-center bg-fixed relative"
      style={{ backgroundImage: "url('/bg5.jpg')" }}
    >
      <div className="absolute inset-0 bg-black/50"></div>
      <Navbar />
      <br /><br /><br />
      <div className="container mx-auto px-4 py-12 relative z-10">
        <div className="flex flex-col md:flex-row gap-8 max-w-7xl mx-auto">
          {/* Left Sidebar */}
          <div className="w-full md:w-1/4">
            <div className="bg-white/20 backdrop-blur-lg p-8 rounded-2xl shadow-xl border border-white/30">
              <div className="flex flex-col items-center space-y-8">
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/80 to-purple-500/80 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <img
                    className="w-40 h-40 rounded-full border-4 border-white/40 object-cover relative z-10 transform transition-transform duration-300 group-hover:scale-105"
                    src={previewImage}
                    alt="Profile"
                  />
                  <div className="absolute bottom-2 right-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full p-3 cursor-pointer hover:scale-110 transform transition-transform duration-300 z-20">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                      id="profileImage"
                    />
                    <label htmlFor="profileImage" className="cursor-pointer">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                    </label>
                  </div>
                </div>
                {selectedImage && (
                  <button
                    onClick={handleImageUpload}
                    className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-3 rounded-xl hover:from-blue-600 hover:to-purple-600 transform hover:scale-105 transition-all duration-300 font-semibold shadow-lg"
                  >
                    Update Profile Picture
                  </button>
                )}
                <button
                  onClick={handleLogout}
                  className="w-full bg-gradient-to-r from-red-500 to-pink-500 text-white py-3 rounded-xl hover:from-red-600 hover:to-pink-600 transform hover:scale-105 transition-all duration-300 font-semibold shadow-lg"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="w-full md:w-3/4">
            <div className="bg-white/20 backdrop-blur-lg p-10 rounded-2xl shadow-xl border border-white/30">
              <h1 className="text-4xl font-bold text-center text-white mb-8 tracking-wide">
                Customer Profile
              </h1>

              <div className="space-y-6">
                {/* Name */}
                <div className="group">
                  <label className="block text-white/90 font-medium mb-2 group-hover:text-white transition-colors duration-300">
                    Name
                  </label>
                  <input
                    className="w-full px-6 py-3 bg-white/20 border border-white/30 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                    type="text"
                    value={name}
                    readOnly
                  />
                </div>

                {/* Email */}
                <div className="group">
                  <label className="block text-white/90 font-medium mb-2 group-hover:text-white transition-colors duration-300">
                    Email
                  </label>
                  <input
                    className="w-full px-6 py-3 bg-white/20 border border-white/30 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                    type="email"
                    value={email}
                    readOnly
                  />
                </div>

                {/* Age */}
                <div className="group">
                  <label className="block text-white/90 font-medium mb-2 group-hover:text-white transition-colors duration-300">
                    Age
                  </label>
                  <input
                    className="w-full px-6 py-3 bg-white/20 border border-white/30 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                    type="number"
                    value={age}
                    readOnly
                  />
                </div>

                {/* Gender */}
                <div className="group">
                  <label className="block text-white/90 font-medium mb-2 group-hover:text-white transition-colors duration-300">
                    Gender
                  </label>
                  <input
                    className="w-full px-6 py-3 bg-white/20 border border-white/30 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                    type="text"
                    value={gender}
                    readOnly
                  />
                </div>

                {/* Phone */}
                <div className="group">
                  <label className="block text-white/90 font-medium mb-2 group-hover:text-white transition-colors duration-300">
                    Phone
                  </label>
                  <input
                    className="w-full px-6 py-3 bg-white/20 border border-white/30 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                    type="text"
                    value={phone}
                    readOnly
                  />
                </div>

                {/* Password */}
                <div className="group">
                  <label className="block text-white/90 font-medium mb-2 group-hover:text-white transition-colors duration-300">
                    Password
                  </label>
                  <input
                    className="w-full px-6 py-3 bg-white/20 border border-white/30 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                    type="password"
                    value={password}
                    readOnly
                  />
                </div>

                <div className="flex gap-6 pt-4">
                  <Link
                    to={`/user-profile/${_id}`}
                    className="flex-1 bg-gradient-to-r from-blue-500 to-purple-500 text-white py-3 rounded-xl hover:from-blue-600 hover:to-purple-600 transform hover:scale-105 transition-all duration-300 font-semibold shadow-lg text-center"
                  >
                    Update
                  </Link>
                  <button
                    onClick={handleDelete}
                    className="flex-1 bg-gradient-to-r from-red-500 to-pink-500 text-white py-3 rounded-xl hover:from-red-600 hover:to-pink-600 transform hover:scale-105 transition-all duration-300 font-semibold shadow-lg"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
