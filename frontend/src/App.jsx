import React from "react";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Dashboard from "./components/Dashboard";
import Home from "./components/Home";
import About from "./components/About";
import Testimonials from "./components/Testimonials";
import Contact from "./components/Contact";
import NotFound from "./components/NotFound"; // New 404 Page Component
import Signup from "./components/SignupForm";
import Login from "./components/Login";
import Footer from "./components/Footer"
import UserProfile from "./components/UserProfile";
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter as Router, Routes, Route } from "react-router-dom";

const App = () => {
  return (
    
      <Router>
        <div className="w-full overflow-hidden">
          <ToastContainer position="top-right" autoClose={3000} />

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/testimonials" element={<Testimonials />} />
            <Route path="/user-profile" element={<UserProfile />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/UserProfile" element={<UserProfile/>}/>
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Footer/>
        </div>
      </Router>
  );
};

export default App;
