import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Navbar from "./Navbar";

const ComplaintForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    complain: "",
    feedback: "",
    ratings: "",
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    
    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = "Full Name is required";
    } else if (formData.name.trim().length < 3) {
      newErrors.name = "Name must be at least 3 characters";
    } else if (/[^a-zA-Z\s]/.test(formData.name)) {
      newErrors.name = "Name should only contain letters and spaces";
    } else if (/\d/.test(formData.name)) {
      newErrors.name = "Name cannot contain numbers";
    }
    
    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = "Email Address is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    } else if (!formData.email.includes('@')) {
      newErrors.email = "Email must contain @ symbol";
    } else if (!formData.email.split('@')[1].includes('.')) {
      newErrors.email = "Email must contain a domain after @";
    }
    
    // Complaint validation
    if (!formData.complain.trim()) {
      newErrors.complain = "Complaint is required";
    } else if (formData.complain.trim().length < 10) {
      newErrors.complain = "Complaint must be at least 10 characters";
    }
    
    // Feedback validation
    if (!formData.feedback.trim()) {
      newErrors.feedback = "Feedback is required";
    } else if (formData.feedback.trim().length < 10) {
      newErrors.feedback = "Feedback must be at least 10 characters";
    }
    
    // Rating validation
    if (!formData.ratings) {
      newErrors.ratings = "Rating is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Real-time validation for name field
    if (name === "name") {
      if (/[^a-zA-Z\s]/.test(value)) return;
    }
    
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: "",
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) {
      toast.error("Please fix the errors in the form before submitting.");
      return;
    }
    try {
      const response = await axios.post(
        "http://localhost:8000/Complaints/complaints/create",
        formData
      );
      console.log("Complaint submitted successfully:", response.data);
      // Reset form
      setFormData({
        name: "",
        email: "",
        complain: "",
        feedback: "",
        ratings: "",
      });
      toast.success(
        "Your complaint and feedback have been submitted successfully!"
      );
    } catch (error) {
      console.error("Error submitting complaint:", error);
      toast.error(
        "There was an error submitting your complaint. Please try again."
      );
    }
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/bg10.png')" }}
    >
      <Navbar />
      <br />
      <br />
      <div className="min-h-screen bg-black bg-opacity-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl w-full space-y-8 bg-white bg-opacity-90 p-8 rounded-xl shadow-2xl backdrop-blur-sm">
          <div className="text-center">
            <h2 className="mt-6 text-4xl font-extrabold text-gray-900">
              Complaint & Feedback Form
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              We value your feedback and are committed to improving our services
            </p>
          </div>
          <form onSubmit={handleSubmit} className="mt-8 space-y-6" noValidate>
            <div className="rounded-md shadow-sm space-y-4">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`mt-1 appearance-none relative block w-full px-3 py-2 border ${
                    errors.name ? "border-red-500" : "border-gray-300"
                  } placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm`}
                  placeholder="Enter your full name (letters only)"
                  maxLength={50}
                />
                {errors.name && (
                  <p className="text-red-500 text-xs mt-1">{errors.name}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`mt-1 appearance-none relative block w-full px-3 py-2 border ${
                    errors.email ? "border-red-500" : "border-gray-300"
                  } placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm`}
                  placeholder="example@domain.com"
                />
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="complain"
                  className="block text-sm font-medium text-gray-700"
                >
                  Your Complaint
                </label>
                <textarea
                  id="complain"
                  name="complain"
                  value={formData.complain}
                  onChange={handleChange}
                  rows="4"
                  className={`mt-1 appearance-none relative block w-full px-3 py-2 border ${
                    errors.complain ? "border-red-500" : "border-gray-300"
                  } placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm`}
                  placeholder="Please describe your complaint in detail (minimum 10 characters)"
                  minLength={10}
                  maxLength={500}
                />
                {errors.complain && (
                  <p className="text-red-500 text-xs mt-1">{errors.complain}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="feedback"
                  className="block text-sm font-medium text-gray-700"
                >
                  Your Feedback
                </label>
                <textarea
                  id="feedback"
                  name="feedback"
                  value={formData.feedback}
                  onChange={handleChange}
                  rows="4"
                  className={`mt-1 appearance-none relative block w-full px-3 py-2 border ${
                    errors.feedback ? "border-red-500" : "border-gray-300"
                  } placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm`}
                  placeholder="Please provide your feedback (minimum 10 characters)"
                  minLength={10}
                  maxLength={500}
                />
                {errors.feedback && (
                  <p className="text-red-500 text-xs mt-1">{errors.feedback}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="ratings"
                  className="block text-sm font-medium text-gray-700"
                >
                  Overall Rating
                </label>
                <select
                  id="ratings"
                  name="ratings"
                  value={formData.ratings}
                  onChange={handleChange}
                  className={`mt-1 block w-full pl-3 pr-10 py-2 text-base border ${
                    errors.ratings ? "border-red-500" : "border-gray-300"
                  } focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-lg`}
                >
                  <option value="">Select a rating</option>
                  <option value="1">⭐ Poor</option>
                  <option value="2">⭐⭐ Fair</option>
                  <option value="3">⭐⭐⭐ Good</option>
                  <option value="4">⭐⭐⭐⭐ Very Good</option>
                  <option value="5">⭐⭐⭐⭐⭐ Excellent</option>
                </select>
                {errors.ratings && (
                  <p className="text-red-500 text-xs mt-1">{errors.ratings}</p>
                )}
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out transform hover:scale-105"
              >
                Submit Feedback
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ComplaintForm;