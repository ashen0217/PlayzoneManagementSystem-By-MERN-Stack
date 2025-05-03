import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import Navbar2 from "./Navbar2";

const url = "http://localhost:8000/Users";

export default function LoginForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    let newerrors = {};

    if (!formData.email.includes("@")) {
      alert("Please enter a valid email address.");
      newerrors.email = "Invalid email.";
    }
    if (!formData.password) {
      alert("Please enter a password.");
      newerrors.password = "Password is required.";
    }

    setErrors(newerrors);
    return Object.keys(newerrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
  
    const adminCredentials = {
      email: "admin@example.com",
      password: "admin123"
    };
  
    try {
      const response = await axios.get(url); // Get all users
      const users = response.data.Users;
  
      // Find the matching user
      const matchedUser = users.find(
        (user) =>
          user.email === formData.email &&
          user.password === formData.password
      );
  
      if (!matchedUser) {
        alert("Login Error: Invalid email or password. Please try again.");
        return;
      }
  
      // Admin check
      if (
        formData.email === adminCredentials.email &&
        formData.password === adminCredentials.password
      ) {
        alert("Login successful! Welcome, Admin.");
        navigate("/admin-dashboard");
      } else {
        // Show success message for regular users
        alert("Login successful! Welcome, " + matchedUser.name);
        // Navigate to user profile with full details
        navigate("/user-profile", { state: { user: matchedUser } });
      }
    } catch (error) {
      console.error("Login error:", error);
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        alert("Login Error: Server error. Status: " + error.response.status);
      } else if (error.request) {
        // The request was made but no response was received
        alert("Login Error: No response from server. Please check your connection.");
      } else {
        // Something happened in setting up the request that triggered an Error
        alert("Login Error: " + error.message);
      }
    }
  };
  

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-gray-100"
      style={{ backgroundImage: "url('/bg2.png')" }}
    >
      <Navbar2/>
      <div className="bg-white p-8 rounded-2xl shadow-lg w-96">

        <h2 className="text-2xl font-semibold text-center mb-6">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {Object.keys(formData).map((key) => (
            <div key={key}>
              <label className="block text-gray-700">{key.charAt(0).toUpperCase() + key.slice(1)}</label>
              <input
                type={key === "password" ? "password" : "text"}
                name={key}
                value={formData[key]}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder={`Enter your ${key}`}
              />
              {errors[key] && <p className="text-red-500 text-sm">{errors[key]}</p>}
            </div>
          ))}
          <div className="text-right">
            <Link 
              to="/forgot-password" 
              className="text-blue-500 hover:text-blue-700 text-sm"
              style={{ textDecoration: 'none' }}
            >
              Forgot Password?
            </Link>
          </div>
          <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition">
            Log in
          </button>
        </form>

        {/* Social Logins */}
        <div className="mt-4 space-y-2">
          <button className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600">
            Login with Google
          </button>
          <button className="w-full bg-blue-700 text-white py-2 rounded-lg hover:bg-blue-800">
            Login with Facebook
          </button>
        </div>
      </div>
    </div>
  );
}
