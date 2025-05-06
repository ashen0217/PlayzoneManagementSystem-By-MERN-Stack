import { useState } from "react";
import Navbar2 from "./Navbar2";

export default function ComplainFeedbackForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    age: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    let newErrors = {};
    if (!formData.name.trim()) {
      alert("Please enter your Name");
      newErrors.name = "Name is required.";
    }
    if (!formData.email.trim()) {
      alert("Please enter the Email Address");
      newErrors.email = "Email address is required.";
    }
    if (!formData.age) {
      alert("Please enter the Age");
      newErrors.age = "Please enter the Age.";
    }
    if (!formData.password) {
      alert("Please enter the Password");
      newErrors.password = "Please enter the Passsword.";
    } else {
      alert("Form Submitted successfully");
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Email:", email, "Password:", password);
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/bg10.png')" }}
    >
      <Navbar2 />
      <div className="bg-white p-8 rounded-2xl shadow-lg w-96">
        <h2 className="text-2xl font-semibold text-center mb-6">
          Make a Complain or Provide Feedback
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
              placeholder="Enter your Name"
            />
          </div>
          <div>
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
              placeholder="Enter the email address"
            />
          </div>
          <div>
            <label className="block text-gray-700">Age </label>
            <input
              type="text"
              name="age"
              value={formData.age}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
              placeholder="Enter your Age"
            />
          </div>
          <div>
            <label className="block text-gray-700">Password </label>
            <input
              type="text"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
              placeholder="Enter your Age"
            />
          </div>
          <div>
            <label className="block text-gray-700">Confirm Password</label>
            <input
              type="password"
              name="cnfpassword"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="Enter the password"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
            onClick={validateForm}
          >
            SignUp
          </button>
        </form>
      </div>
    </div>
  );
}
