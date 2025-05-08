import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useParams, useNavigate } from "react-router-dom";

const URL = "http://localhost:8000/Users";

const UserProfile = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();
  const [user, setUser] = useState(location.state?.user || null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState({
    name: "",
    email: "",
    age: "",
    gender: "",
    phone: "",
    password: "",
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchHandler = async () => {
      try {
        let userData = null;
        if (id) {
          const response = await axios.get(`${URL}/${id}`);
          userData = response.data?.Users;
        } else if (!user) {
          const response = await axios.get(URL);
          userData = response.data?.Users?.[0];
        }

        if (userData) {
          setUser(userData);
          setEditedUser({
            name: userData.name || "",
            email: userData.email || "",
            age: userData.age || "",
            gender: userData.gender || "",
            phone: userData.phone || "",
            password: userData.password || "",
          });
          setPreviewImage(userData.image || "profile_img_1.png");
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchHandler();
  }, [id, user]);

  const validateForm = () => {
    const newErrors = {};
    let isValid = true;

    if (!editedUser.name || editedUser.name.trim() === "") {
      newErrors.name = "Name is required";
      isValid = false;
    } else if (editedUser.name.length < 2) {
      newErrors.name = "Name must be at least 2 characters";
      isValid = false;
    }

    if (!editedUser.email || editedUser.email.trim() === "") {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(editedUser.email)) {
      newErrors.email = "Please enter a valid email address";
      isValid = false;
    }

    if (!editedUser.age || editedUser.age === "") {
      newErrors.age = "Age is required";
      isValid = false;
    } else if (isNaN(editedUser.age)) {
      newErrors.age = "Age must be a number";
      isValid = false;
    } else if (editedUser.age < 1) {
      newErrors.age = "Age must be positive";
      isValid = false;
    } else if (editedUser.age > 120) {
      newErrors.age = "Please enter a valid age";
      isValid = false;
    }

    if (!editedUser.gender || editedUser.gender.trim() === "") {
      newErrors.gender = "Gender is required";
      isValid = false;
    } else if (!["male", "female", "other"].includes(editedUser.gender.toLowerCase())) {
      newErrors.gender = "Please enter a valid gender (male, female, other)";
      isValid = false;
    }

    if (!editedUser.phone || editedUser.phone.trim() === "") {
      newErrors.phone = "Phone number is required";
      isValid = false;
    } else if (!/^\d{10,15}$/.test(editedUser.phone)) {
      newErrors.phone = "Please enter a valid phone number (10-15 digits)";
      isValid = false;
    }

    /*if (!editedUser.password || editedUser.password.trim() === "") {
      newErrors.password = "Password is required";
      isValid = false;
    } else if (editedUser.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
      isValid = false;
    }*/

    setErrors(newErrors);
    return isValid;
  };

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
    localStorage.removeItem("admin");
    navigate("/login");
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.match("image.*")) {
        alert("Please select an image file");
        return;
      }
      if (file.size > 2 * 1024 * 1024) {
        alert("Image size should be less than 2MB");
        return;
      }

      setSelectedImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageUpload = async () => {
    if (!selectedImage) {
      alert("Please select an image first");
      return;
    }

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
        setSelectedImage(null);
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Error updating profile picture. Please try again.");
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
    setErrors({});
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedUser((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleUpdate = async () => {
    if (!validateForm()) return;

    if (window.confirm("Are you sure you want to update your profile?")) {
      try {
        const response = await axios.put(`${URL}/${user._id}`, editedUser);
        if (response.data?.Users) {
          setUser(response.data.Users);
          setIsEditing(false);
          alert("Profile updated successfully!");
        }
      } catch (error) {
        console.error("Error updating user:", error);
        alert("Error updating profile. Please try again.");
      }
    }
  };

  const handleCancel = () => {
    setEditedUser({
      name: user?.name || "",
      email: user?.email || "",
      age: user?.age || "",
      gender: user?.gender || "",
      phone: user?.phone || "",
      password: user?.password || "",
    });
    setIsEditing(false);
    setErrors({});
  };

  if (!user)
    return <p className="text-center mt-10 text-gray-500">Loading user...</p>;

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-fixed relative"
      style={{ backgroundImage: "url('/bg5.jpg')" }}
    >
      <br />
      <br />
      <div className="absolute inset-0 bg-black/50"></div>
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
                        className="h-6 w-6 text-black"
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
                    className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-black py-3 rounded-xl hover:from-blue-600 hover:to-purple-600 transform hover:scale-105 transition-all duration-300 font-semibold shadow-lg"
                  >
                    Update Profile Picture
                  </button>
                )}
                <button
                  onClick={handleLogout}
                  className="w-full bg-gradient-to-r from-red-500 to-pink-500 text-black py-3 rounded-xl hover:from-red-600 hover:to-pink-600 transform hover:scale-105 transition-all duration-300 font-semibold shadow-lg"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="w-full md:w-3/4">
            <div className="bg-white/20 backdrop-blur-lg p-10 rounded-2xl shadow-xl border border-white/30">
              <h1 className="text-4xl font-bold text-center text-black mb-8 tracking-wide">
                Customer Profile
              </h1>

              <div className="space-y-6">
                {/* Name */}
                <div className="group">
                  <label className="block text-black font-medium mb-2 group-hover:text-black transition-colors duration-300">
                    Name
                  </label>
                  <input
                    className={`w-full px-6 py-3 bg-white/20 border ${
                      errors.name ? "border-red-500" : "border-white/30"
                    } rounded-xl text-black placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300`}
                    type="text"
                    name="name"
                    value={isEditing ? editedUser.name : user.name || ""}
                    onChange={handleChange}
                    disabled={!isEditing}
                  />
                  {errors.name && (
                    <p className="mt-1 text-red-400 text-sm">{errors.name}</p>
                  )}
                </div>

                {/* Email */}
                <div className="group">
                  <label className="block text-black font-medium mb-2 group-hover:text-black transition-colors duration-300">
                    Email
                  </label>
                  <input
                    className={`w-full px-6 py-3 bg-white/20 border ${
                      errors.email ? "border-red-500" : "border-white/30"
                    } rounded-xl text-black placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300`}
                    type="email"
                    name="email"
                    value={isEditing ? editedUser.email : user.email || ""}
                    onChange={handleChange}
                    disabled={!isEditing}
                  />
                  {errors.email && (
                    <p className="mt-1 text-red-400 text-sm">{errors.email}</p>
                  )}
                </div>

                {/* Age */}
                <div className="group">
                  <label className="block text-black font-medium mb-2 group-hover:text-black transition-colors duration-300">
                    Age
                  </label>
                  <input
                    className={`w-full px-6 py-3 bg-white/20 border ${
                      errors.age ? "border-red-500" : "border-white/30"
                    } rounded-xl text-black placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300`}
                    type="number"
                    name="age"
                    min="1"
                    max="120"
                    value={isEditing ? editedUser.age : user.age || ""}
                    onChange={handleChange}
                    disabled={!isEditing}
                  />
                  {errors.age && (
                    <p className="mt-1 text-red-400 text-sm">{errors.age}</p>
                  )}
                </div>

                {/* Gender */}
                <div className="group">
                  <label className="block text-black font-medium mb-2 group-hover:text-black transition-colors duration-300">
                    Gender
                  </label>
                  <select
                    className={`w-full px-6 py-3 bg-white/20 border ${
                      errors.gender ? "border-red-500" : "border-white/30"
                    } rounded-xl text-black focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300`}
                    name="gender"
                    value={isEditing ? editedUser.gender : user.gender || ""}
                    onChange={handleChange}
                    disabled={!isEditing}
                  >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                  {errors.gender && (
                    <p className="mt-1 text-red-400 text-sm">{errors.gender}</p>
                  )}
                </div>

                {/* Phone */}
                <div className="group">
                  <label className="block text-black font-medium mb-2 group-hover:text-black transition-colors duration-300">
                    Phone
                  </label>
                  <input
                    className={`w-full px-6 py-3 bg-white/20 border ${
                      errors.phone ? "border-red-500" : "border-white/30"
                    } rounded-xl text-black placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300`}
                    type="tel"
                    name="phone"
                    value={isEditing ? editedUser.phone : user.phone || ""}
                    onChange={handleChange}
                    disabled={!isEditing}
                  />
                  {errors.phone && (
                    <p className="mt-1 text-red-400 text-sm">{errors.phone}</p>
                  )}
                </div>

                {/* Password */}
                <div className="group">
                  <label className="block text-black font-medium mb-2 group-hover:text-black transition-colors duration-300">
                    Password
                  </label>
                  <input
                    className={`w-full px-6 py-3 bg-white/20 border text-black ${
                      errors.password ? "border-red-500" : "border-white/30"
                    } rounded-xl text-black placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300`}
                    type="password"
                    name="password"
                    value={isEditing ? editedUser.password : user.password || ""}
                    onChange={handleChange}
                    readOnly
                    disabled={!isEditing}
                  />
                  {errors.password && (
                    <p className="mt-1 text-red-400 text-sm">{errors.password}</p>
                  )}
                </div>

                <div className="flex gap-6 pt-4">
                  {!isEditing ? (
                    <button
                      onClick={handleEdit}
                      className="flex-1 bg-gradient-to-r from-blue-500 to-purple-500 text-black py-3 rounded-xl hover:from-blue-600 hover:to-purple-600 transform hover:scale-105 transition-all duration-300 font-semibold shadow-lg text-center"
                    >
                      Edit Profile
                    </button>
                  ) : (
                    <>
                      <button
                        onClick={handleUpdate}
                        className="flex-1 bg-gradient-to-r from-green-500 to-emerald-500 text-black py-3 rounded-xl hover:from-green-600 hover:to-emerald-600 transform hover:scale-105 transition-all duration-300 font-semibold shadow-lg"
                      >
                        Save Changes
                      </button>
                      <button
                        onClick={handleCancel}
                        className="flex-1 bg-gradient-to-r from-red-500 to-pink-500 text-black py-3 rounded-xl hover:from-red-600 hover:to-pink-600 transform hover:scale-105 transition-all duration-300 font-semibold shadow-lg"
                      >
                        Cancel
                      </button>
                    </>
                  )}
                  <button
                    onClick={handleDelete}
                    className="flex-1 bg-gradient-to-r from-red-500 to-pink-500 text-black py-3 rounded-xl hover:from-red-600 hover:to-pink-600 transform hover:scale-105 transition-all duration-300 font-semibold shadow-lg"
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