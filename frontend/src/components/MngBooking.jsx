import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MngBooking = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchUserBookings = async () => {
      try {
        setLoading(true);
        setError(null);

        // Get user ID from localStorage or state management
        const userId = localStorage.getItem("userId") || id;

        if (!userId) {
          setError("User ID not found. Please login again.");
          setLoading(false);
          return;
        }

        // Try different possible API endpoints
        let response;
        try {
          // First try the main endpoint
          response = await axios.get(
            `http://localhost:8000/api/bookings/user/${userId}`
          );
        } catch (err) {
          // If that fails, try alternative endpoints
          try {
            response = await axios.get(
              `http://localhost:8000/bookings/user/${userId}`
            );
          } catch (err) {
            // If that also fails, try getting all bookings and filter client-side
            response = await axios.get(`http://localhost:8000/bookings`);
            if (response.data && Array.isArray(response.data)) {
              response.data = {
                bookings: response.data.filter(
                  (booking) => booking.userId === userId
                ),
              };
            }
          }
        }

        console.log("User Bookings API response:", response.data);

        if (response.data && Array.isArray(response.data.bookings)) {
          setBookings(response.data.bookings);
        } else if (response.data && response.data.bookings) {
          // Handle case where bookings is not an array
          setBookings([response.data.bookings]);
        } else if (response.data && Array.isArray(response.data)) {
          // Handle case where response is directly an array
          setBookings(response.data);
        } else {
          setError("No bookings found for this user");
        }
      } catch (err) {
        console.error("Error fetching user bookings:", err);
        if (err.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          setError(
            `Error: ${err.response.data?.message || "Failed to fetch bookings"}`
          );
        } else if (err.request) {
          // The request was made but no response was received
          setError(
            "No response from server. Please check if the backend is running."
          );
        } else {
          // Something happened in setting up the request that triggered an Error
          setError(`Error: ${err.message}`);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUserBookings();
  }, [id]);

  const handleRequestEdit = async (bookingId) => {
    if (!bookingId) return;

    setIsSubmitting(true);

    try {
      const formData = new FormData();
      formData.append("access_key", "ee2a13d2-c198-4c6f-95b6-826790c23996");
      formData.append("subject", "Booking Edit Request");
      formData.append("booking_id", bookingId);

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        toast.success(
          "Edit request sent successfully! Admin will review your request."
        );
      } else {
        toast.error("Failed to send edit request. Please try again later.");
      }
    } catch (error) {
      toast.error("Failed to send edit request. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div
        className="flex items-center justify-center min-h-screen bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/bg10.png')" }}
      >
        <Navbar />
        <div className="max-w-2xl mx-auto p-6">
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading booking details...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div
        className="flex items-center justify-center min-h-screen bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/bg10.png')" }}
      >
        <Navbar />
        <div className="max-w-2xl mx-auto p-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="text-center py-8">
              <div className="text-red-500 text-xl mb-4">Error</div>
              <p className="text-gray-600 mb-4">{error}</p>
              <button
                onClick={() => navigate("/")}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Back to Home
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen bg-gray-100"
      style={{
        backgroundImage: "url('/bg8.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Navbar />
      <br />
      <br />
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Your bookings,please Ensure that you can only request to edit the status whether your booking is confirm or not...
          </h2>

          {bookings.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-600 mb-4">No bookings found</p>
              <button
                onClick={() => navigate("/addbook")}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Make a New Booking
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              {bookings.map((booking) => (
                <div
                  key={booking._id}
                  className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Full Name
                      </label>
                      <div className="mt-1 p-2 border rounded bg-gray-50">
                        {booking.username}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Email
                      </label>
                      <div className="mt-1 p-2 border rounded bg-gray-50">
                        {booking.email}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Package Type
                      </label>
                      <div className="mt-1 p-2 border rounded bg-gray-50">
                        {booking.packageType}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Date
                      </label>
                      <div className="mt-1 p-2 border rounded bg-gray-50">
                        {new Date(booking.date).toLocaleDateString()}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Time Slot
                      </label>
                      <div className="mt-1 p-2 border rounded bg-gray-50">
                        {booking.timeSlot}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Status
                      </label>
                      <div className="mt-1">
                        <span
                          className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium
                          ${
                            booking.message === "Pending"
                              ? "bg-yellow-100 text-yellow-800"
                              : booking.message === "Confirmed"
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {booking.message}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 flex justify-end space-x-4">
                    <button
                      onClick={() => handleRequestEdit(booking._id)}
                      disabled={isSubmitting}
                      className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
                    >
                      {isSubmitting ? "Sending Request..." : "Request To Edit Status"}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MngBooking;
