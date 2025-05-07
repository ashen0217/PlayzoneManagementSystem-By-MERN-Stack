import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Navbar from "./Navbar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const BookingForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    packageType: "Basic",
    date: null,
    timeSlot: "",
    message: "Pending",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const timeSlots = ["10:00 AM", "12:00 PM", "2:00 PM", "4:00 PM"];

  // Validate form on input change
  const validateField = (name, value) => {
    let error = "";

    switch (name) {
      case "username":
        if (!value.trim()) {
          error = "Name is required";
        } else if (value.trim().length < 3) {
          error = "Name must be at least 3 characters";
        } else if (!/^[a-zA-Z\s]*$/.test(value.trim())) {
          error = "Name can only contain letters and spaces";
        }
        break;

      case "email":
        if (!value.trim()) {
          error = "Email is required";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          error = "Please enter a valid email address";
        }
        break;

      case "packageType":
        if (!value) {
          error = "Package type is required";
        }
        break;

      case "date":
        if (!value) {
          error = "Date is required";
        } else {
          const selectedDate = new Date(value);
          const today = new Date();
          today.setHours(0, 0, 0, 0);

          if (selectedDate < today) {
            error = "Date cannot be in the past";
          }
        }
        break;

      case "timeSlot":
        if (!value) {
          error = "Time slot is required";
        }
        break;

      default:
        break;
    }

    return error;
  };

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });

    // Validate the field
    const error = validateField(name, value);
    setErrors({
      ...errors,
      [name]: error,
    });
  };

  // Handle date change
  const handleDateChange = (date) => {
    setFormData({
      ...formData,
      date: date,
    });

    // Validate the date
    const error = validateField("date", date);
    setErrors({
      ...errors,
      date: error,
    });
  };

  // Validate entire form
  const validateForm = () => {
    const newErrors = {};
    let isValid = true;

    // Validate all fields
    Object.keys(formData).forEach((key) => {
      const error = validateField(key, formData[key]);
      if (error) {
        newErrors[key] = error;
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate the form
    if (!validateForm()) {
      toast.error("Please fix the errors in the form");
      return;
    }

    try {
      setLoading(true);

      // Format date to ISO string for API
      const formattedDate = formData.date.toISOString();

      // Prepare booking data
      const bookingData = {
        username: formData.username,
        email: formData.email,
        packageType: formData.packageType,
        date: formattedDate,
        timeSlot: formData.timeSlot,
        message: formData.message,
      };

      console.log("Submitting booking data:", bookingData);

      // Send booking data to backend API
      const response = await axios.post("/api/bookings", bookingData);

      console.log("Booking submission response:", response.data);

      // Show success message
      setSuccess(true);
      toast.success("Booking submitted successfully!");

      // Navigate to the booking management page with the new booking ID
      if (response.data && response.data.booking && response.data.booking._id) {
        setTimeout(() => {
          navigate(`/manage-bookings/${response.data.booking._id}`);
        }, 1500);
      }
    } catch (err) {
      console.error("Error submitting booking:", err);

      // Handle different types of errors
      if (err.response) {
        // Server responded with an error
        toast.error(
          err.response.data.message ||
            "Failed to submit booking. Please try again."
        );
      } else if (err.request) {
        // Request was made but no response received
        toast.error(
          "No response from server. Please check your connection and try again."
        );
      } else {
        // Something else happened
        toast.error("An unexpected error occurred. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/bg6.jpg')" }}
    >
      <Navbar />
      <br /><br /><br />
      <form
        onSubmit={handleSubmit}
        className="bg-white/90 backdrop-blur-sm p-8 rounded-lg shadow-xl w-full max-w-md mx-4"
      >
        <br />
        <br />
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Book a Package
        </h2>

        {success && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
            Booking submitted successfully! Redirecting to booking details...
          </div>
        )}

        <div className="mb-4">
          <label className="block mb-2 text-gray-700 font-medium">
            Full Name:
          </label>
          <input
            type="text"
            name="username"
            className={`w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
              errors.username ? "border-red-500" : ""
            }`}
            placeholder="Enter your name"
            value={formData.username}
            onChange={handleChange}
            required
          />
          {errors.username && (
            <p className="text-red-500 text-sm mt-1">{errors.username}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block mb-2 text-gray-700 font-medium">
            Email Address:
          </label>
          <input
            type="email"
            name="email"
            className={`w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
              errors.email ? "border-red-500" : ""
            }`}
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block mb-2 text-gray-700 font-medium">
            Select Package:
          </label>
          <select
            name="packageType"
            className={`w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
              errors.packageType ? "border-red-500" : ""
            }`}
            value={formData.packageType}
            onChange={handleChange}
          >
            <option value="Basic">Basic</option>
            <option value="Standard">Standard</option>
            <option value="Premium">Premium</option>
          </select>
          {errors.packageType && (
            <p className="text-red-500 text-sm mt-1">{errors.packageType}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block mb-2 text-gray-700 font-medium">
            Select Date:
          </label>
          <DatePicker
            selected={formData.date}
            onChange={handleDateChange}
            minDate={new Date()}
            className={`w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
              errors.date ? "border-red-500" : ""
            }`}
            placeholderText="Select a date"
            required
          />
          {errors.date && (
            <p className="text-red-500 text-sm mt-1">{errors.date}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block mb-2 text-gray-700 font-medium">
            Time Slot
          </label>
          <select
            name="timeSlot"
            className={`w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
              errors.timeSlot ? "border-red-500" : ""
            }`}
            value={formData.timeSlot}
            onChange={handleChange}
            required
          >
            <option value="">Select Time Slot</option>
            {timeSlots.map((slot) => (
              <option key={slot} value={slot}>
                {slot}
              </option>
            ))}
          </select>
          {errors.timeSlot && (
            <p className="text-red-500 text-sm mt-1">{errors.timeSlot}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block mb-2 text-gray-700 font-medium">
            Booking Status
          </label>
          <select
            name="message"
            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={formData.message}
            onChange={handleChange}
          >
            <option value="Pending">Pending</option>
            <option value="Confirmed">Confirmed</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-colors duration-200 font-medium"
          disabled={loading}
        >
          {loading ? "Submitting..." : "Confirm Booking"}
        </button>
      </form>
    </div>
  );
};

export default BookingForm;
