import { useState } from "react";

export default function LoginForm() {
  const [formData, setFormData] = useState({ email: "",password: "",});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
   // Function to validate the email
   const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      return 'Please enter a valid email address.';
    }
    return '';
  };

  const validateForm = () => {
    let newErrors = {};
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/; 

    if (!emailRegex.test(formData.email)) {
      alert('Please enter a valid email address');
      return 'Please enter a valid email address.';
    }
    if (!formData.email.trim()) {
        alert("Please enter the Email Address");
        newErrors.email = "Email address is required."; 
    }
    if (!formData.password) {
        alert("Please enter the Password");
        newErrors.password = "Please enter the Passsword.";
    }
    else {
        alert("Form Submitted successfully");
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Email:", email, "Password:", password);
  };

  const handleGoogleLogin = () => {
    console.log("Logging in with Google");
  };

  const handleFacebookLogin = () => {
    console.log("Logging in with Facebook");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100" style={{backgroundImage: "url('/bg2.png')"}} id="Login">
      
      <div className="bg-white p-8 rounded-2xl shadow-lg w-96">
        
        <h2 className="text-2xl font-semibold text-center mb-6">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className="text-right">
            <a href="#" className="text-blue-500 text-sm hover:underline">Forgot Password?</a>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
            onClick={validateForm}
          >
            Login
          </button>
        </form>
        <div className="mt-4 space-y-2">
          <button
            onClick={handleGoogleLogin}
            className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition"
          >
            Login with Google
          </button>
          <button
            onClick={handleFacebookLogin}
            className="w-full bg-blue-700 text-white py-2 rounded-lg hover:bg-blue-800 transition"
          >
            Login with Facebook
          </button>
        </div>
      </div>
    </div>
  );
}
