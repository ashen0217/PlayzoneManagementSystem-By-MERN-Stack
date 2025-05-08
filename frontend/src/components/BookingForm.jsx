import React, { useState } from "react";
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

  const timeSlots = [
    "Morning (9AM-12PM)",
    "Afternoon (1PM-4PM)",
    "Evening (5PM-8PM)",
  ];
  const packageOptions = [
    {
      value: "Basic",
      label: "Basic Package",
      description: "Essential services at an affordable price",
    },
    {
      value: "Standard",
      label: "Standard Package",
      description: "More features for better results",
    },
    {
      value: "Premium",
      label: "Premium Package",
      description: "Our most comprehensive offering",
    },
  ];

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

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });

    const error = validateField(name, value);
    setErrors({
      ...errors,
      [name]: error,
    });
  };

  const handleDateChange = (date) => {
    setFormData({
      ...formData,
      date: date,
    });

    const error = validateField("date", date);
    setErrors({
      ...errors,
      date: error,
    });
  };

  const validateForm = () => {
    const newErrors = {};
    let isValid = true;

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

    if (!validateForm()) {
      toast.error("Please fix the errors in the form");
      return;
    }

    try {
      setLoading(true);

      const formattedDate = formData.date.toISOString();

      const bookingData = {
        username: formData.username,
        email: formData.email,
        packageType: formData.packageType,
        date: formattedDate,
        timeSlot: formData.timeSlot,
        message: formData.message,
      };

      const response = await axios.post("/api/bookings", bookingData);

      setSuccess(true);
      toast.success("Booking submitted successfully!");

      // Navigate to payment page after successful booking
      setTimeout(() => {
        navigate("/payments", {
          state: {
            bookingId: response.data?.booking?._id,
            packageType: formData.packageType,
            customerEmail: formData.email,
          },
        });
      }, 1500);
    } catch (err) {
      console.error("Error submitting booking:", err);

      if (err.response) {
        toast.error(
          err.response.data.message ||
            "Failed to submit booking. Please try again."
        );
      } else if (err.request) {
        toast.error(
          "No response from server. Please check your connection and try again."
        );
      } else {
        toast.error("An unexpected error occurred. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div
        className="relative py-16 px-4 sm:px-6 lg:px-8"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('/bg8.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: "calc(100vh - 64px)",
        }}
      >
        <div className="absolute inset-0 bg-black/30"></div>

        <div className="relative max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <p className="mt-5 max-w-xl mx-auto text-xl text-gray-100">
              <h1 className="text-4xl font-extrabold text-white sm:text-5xl sm:tracking-tight lg:text-6xl">
                Book Your Session
              </h1>
              Fill out the form below to reserve your appointment
            </p>
          </div>

          <div className="flex justify-center">
            <div className="w-full max-w-2xl bg-white rounded-xl shadow-2xl overflow-hidden">
              <div className="p-8 sm:p-10">
                <div className="mb-8 text-center">
                  <h2 className="text-3xl font-bold text-gray-900">
                    Booking Details
                  </h2>
                  <p className="mt-2 text-gray-600">
                    Please provide your information to complete the booking
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <div className="sm:col-span-2">
                      <label
                        htmlFor="username"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="username"
                        id="username"
                        className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm py-3 px-4 border ${
                          errors.username ? "border-red-500" : ""
                        }`}
                        placeholder="John Doe"
                        value={formData.username}
                        onChange={handleChange}
                      />
                      {errors.username && (
                        <p className="mt-2 text-sm text-red-600">
                          {errors.username}
                        </p>
                      )}
                    </div>

                    <div className="sm:col-span-2">
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Email Address <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        id="email"
                        className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm py-3 px-4 border ${
                          errors.email ? "border-red-500" : ""
                        }`}
                        placeholder="you@example.com"
                        value={formData.email}
                        onChange={handleChange}
                      />
                      {errors.email && (
                        <p className="mt-2 text-sm text-red-600">
                          {errors.email}
                        </p>
                      )}
                    </div>

                    <div className="sm:col-span-2">
                      <label
                        htmlFor="packageType"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Package Type <span className="text-red-500">*</span>
                      </label>
                      <select
                        name="packageType"
                        id="packageType"
                        className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm py-3 px-4 border ${
                          errors.packageType ? "border-red-500" : ""
                        }`}
                        value={formData.packageType}
                        onChange={handleChange}
                      >
                        {packageOptions.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                      {formData.packageType && (
                        <p className="mt-2 text-sm text-gray-500">
                          {
                            packageOptions.find(
                              (p) => p.value === formData.packageType
                            )?.description
                          }
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="timeSlot"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Select Date <span className="text-red-500">*</span>
                      </label>
                      <DatePicker
                        selected={formData.date}
                        onChange={handleDateChange}
                        minDate={new Date()}
                        className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm py-3 px-4 border ${
                          errors.date ? "border-red-500" : ""
                        }`}
                        placeholderText="Select a date"
                        id="date"
                      />
                      {errors.date && (
                        <p className="mt-2 text-sm text-red-600">
                          {errors.date}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="timeSlot"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Time Slot <span className="text-red-500">*</span>
                      </label>
                      <select
                        name="timeSlot"
                        id="timeSlot"
                        className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm py-3 px-4 border ${
                          errors.timeSlot ? "border-red-500" : ""
                        }`}
                        value={formData.timeSlot}
                        onChange={handleChange}
                      >
                        <option value="">Select a time</option>
                        {timeSlots.map((slot) => (
                          <option key={slot} value={slot}>
                            {slot}
                          </option>
                        ))}
                      </select>
                      {errors.timeSlot && (
                        <p className="mt-2 text-sm text-red-600">
                          {errors.timeSlot}
                        </p>
                      )}
                    </div>

                    <div className="sm:col-span-2">
                      <label
                        htmlFor="message"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Booking Status
                      </label>
                      <select
                        name="message"
                        id="message"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm py-3 px-4 border"
                        value={formData.message}
                        onChange={handleChange}
                      >
                        <option value="Pending">Pending</option>
                        <option value="Confirmed">Confirmed</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </div>
                  </div>

                  <div className="pt-4">
                    <button
                      type="submit"
                      disabled={loading}
                      className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200 ${
                        loading ? "opacity-70 cursor-not-allowed" : ""
                      }`}
                    >
                      {loading ? (
                        <>
                          <svg
                            className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                          Processing...
                        </>
                      ) : (
                        "Confirm Booking"
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingForm;
