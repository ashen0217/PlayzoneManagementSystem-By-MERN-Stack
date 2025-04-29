import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Navbar from "./Navbar";
import axios from "axios";

const BookingForm = () => {
  const [username, setName] = useState("");
  const [email, setEmail] = useState("");
  const [packageType, setPackageType] = useState("Basic");
  const [date, setDate] = useState(null);
  const [timeSlot, setTimeSlot] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const timeSlots = ["10:00 AM", "12:00 PM", "2:00 PM", "4:00 PM"];

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate required fields
    if (!username || !email || !date || !timeSlot) {
      setError("Please fill in all required fields.");
      return;
    }
    
    try {
      setLoading(true);
      setError(null);
      
      // Format date to ISO string for API
      const formattedDate = date.toISOString();
      
      // Prepare booking data
      const bookingData = {
        username,
        email,
        packageType,
        date: formattedDate,
        timeSlot,
        message: message || "Pending" // Default to "Pending" if not provided
      };
      
      // Send booking data to backend API
      const response = await axios.post("/api/bookings", bookingData);
      
      // Show success message
      setSuccess(true);
      
      // Reset form
      setName("");
      setEmail("");
      setPackageType("Basic");
      setDate(null);
      setTimeSlot("");
      setMessage("");
      
      // Hide success message after 5 seconds
      setTimeout(() => {
        setSuccess(false);
      }, 5000);
      
    } catch (err) {
      console.error("Error submitting booking:", err);
      
      // Handle different types of errors
      if (err.response) {
        // Server responded with an error
        setError(err.response.data.message || "Failed to submit booking. Please try again.");
      } else if (err.request) {
        // Request was made but no response received
        setError("No response from server. Please check your connection and try again.");
      } else {
        // Something else happened
        setError("An unexpected error occurred. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="flex justify-center items-center min-h-screen bg-gray-100"
      id="Booking"
      style={{ backgroundImage: "url('/bg8.jpg')", backgroundSize: "cover", backgroundPosition: "center" }}
    >
      <Navbar />
      <form
        onSubmit={handleSubmit}
        className="bg-white/90 backdrop-blur-sm p-8 rounded-lg shadow-xl w-full max-w-md mx-4"
      >
        <br /><br />
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Book a Package</h2>

        {success && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
            Booking submitted successfully!
          </div>
        )}

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <label className="block mb-2 text-gray-700 font-medium">Full Name:</label>
        <input
          type="text"
          className="w-full p-2 border rounded mb-4 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Enter your name"
          value={username}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <label className="block mb-2 text-gray-700 font-medium">Email Address:</label>
        <input
          type="email"
          className="w-full p-2 border rounded mb-4 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label className="block mb-2 text-gray-700 font-medium">Select Package:</label>
        <select
          className="w-full p-2 border rounded mb-4 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          value={packageType}
          onChange={(e) => setPackageType(e.target.value)}
        >
          <option value="Basic">Basic</option>
          <option value="Standard">Standard</option>
          <option value="Premium">Premium</option>
        </select>

        <label className="block mb-2 text-gray-700 font-medium">Select Date:</label>
        <DatePicker
          selected={date}
          onChange={(date) => setDate(date)}
          minDate={new Date()}
          className="w-full p-2 border rounded mb-4 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholderText="Select a date"
          required
        />
        <br />

        <label className="block mb-2 text-gray-700 font-medium">Time Slot</label>
        <select
          className="w-full p-2 border rounded mb-4 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          value={timeSlot}
          onChange={(e) => setTimeSlot(e.target.value)}
          required
        >
          <option value="">Select Time Slot</option>
          {timeSlots.map((slot) => (
            <option key={slot} value={slot}>
              {slot}
            </option>
          ))}
        </select>

        <label className="block mb-2 text-gray-700 font-medium">Additional Message (Optional)</label>
        <textarea
          className="w-full p-2 border rounded mb-4 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Any additional information..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />

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
