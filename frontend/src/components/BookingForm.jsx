import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Navbar2 from "./Navbar2";

const BookingForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [packageType, setPackageType] = useState("Basic");
  const [date, setDate] = useState(null);
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !date) {
      alert("Please fill in all required fields.");
      return;
    }
    alert(`Booking Confirmed!\nName: ${name}\nEmail: ${email}\nPackage: ${packageType}\nDate: ${date.toDateString()}`);
    setName("");
    setEmail("");
    setPackageType("Basic");
    setDate(null);
    setMessage("");
  }; 

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100" id="Booking" style={{ backgroundImage: "url('/bg8.jpg')" }}>
       <Navbar2/>
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Book a Package</h2>
        
        <label className="block mb-2">Full Name:</label>
        <input
          type="text"
          className="w-full p-2 border rounded mb-4"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <label className="block mb-2">Email Address:</label>
        <input
          type="email"
          className="w-full p-2 border rounded mb-4"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label className="block mb-2">Select Package:</label>
        <select
          className="w-full p-2 border rounded mb-4"
          value={packageType}
          onChange={(e) => setPackageType(e.target.value)}
        >
          <option value="Basic">Basic</option>
          <option value="Standard">Standard</option>
          <option value="Premium">Premium</option>
        </select>

        <label className="block mb-2">Select Date:</label>
        <DatePicker
          selected={date}
          onChange={(date) => setDate(date)}
          minDate={new Date()}
          className="w-full p-2 border rounded mb-4"
          placeholderText="Select a date"
          required
        />

        <label className="block mb-2">Additional Message:</label>
        <textarea
          className="w-full p-2 border rounded mb-4"
          placeholder="Optional message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />

        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
          Confirm Booking
        </button>
      </form>
    </div>
  );
};

export default BookingForm;
