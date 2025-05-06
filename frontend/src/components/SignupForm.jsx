import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar2 from "./Navbar2";

const url = "http://localhost:8000/Users";

export default function SignupForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    age: "",
    gender: "",
    phone: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    let newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required.";
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email address is required.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email format.";
    }
    if (!formData.age.trim()) {
      newErrors.age = "Age range is required.";
    }
    if (!formData.gender.trim()) {
      newErrors.gender = "Gender is required.";
    }
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required.";
    } else if (!/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = "Phone number must be 10 digits.";
    }
    if (!formData.password.trim()) {
      newErrors.password = "Password is required.";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const res = await axios.post(url, formData);
      console.log("User registered successful");
      navigate("/login", { state: { user: res.data } });
    } catch (error) {
      console.error("Error registering user", error);
    }
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/bg10.png')" }}
    >
      <Navbar2 />

      <div className="bg-white p-8 rounded-2xl shadow-lg w-96 py-10">
        <br />
        <br />
        <br />
        <h2 className="text-2xl font-semibold text-center mb-6">Sign Up</h2>
        <br />
        <br />
        <form onSubmit={handleSubmit} className="space-y-4">
          {Object.keys(formData).map((key) => (
            <div key={key}>
              <label className="block text-gray-700">
                {key.charAt(0).toUpperCase() + key.slice(1)}
              </label>
              {key === "gender" ? (
                <select
                  name={key}
                  value={formData[key]}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                  <option value="">Select gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              ) : key === "age" ? (
                <select
                  name={key}
                  value={formData[key]}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                  <option value="">Select age range</option>
                  <option value="1-12">Child (1-12 years)</option>
                  <option value="13-19">Teenager (13-19 years)</option>
                  <option value="20-29">Young Adult (20-29 years)</option>
                  <option value="30-49">Adult (30-49 years)</option>
                  <option value="50+">Senior (50+ years)</option>
                </select>
              ) : (
                <input
                  type={
                    key === "password"
                      ? "password"
                      : key === "phone"
                      ? "tel"
                      : "text"
                  }
                  name={key}
                  value={formData[key]}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder={`Enter your ${key}`}
                />
              )}
              {errors[key] && (
                <p className="text-red-500 text-sm">{errors[key]}</p>
              )}
            </div>
          ))}
          <button
            onClick={validateForm}
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}
