import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Payments from "./components/PayForm";
import Home from "./components/Home";
import About from "./components/About";
import Testimonials from "./components/Testimonials";
import Contact from "./components/Contact";
import NotFound from "./components/NotFound"; // New 404 Page Component
import SignupForm from "./components/SignupForm";
import Login from "./components/Login";
import Footer from "./components/Footer"
import UserProfile from "./components/UserProfile";
import AdminDashboard from "./components/admin/AdminDashboard";
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter as Router, Routes, Route } from "react-router-dom";   
import UpdateUser from "./components/UpdateUser";
import BookingForm from "./components/BookingForm";
import ResourceRetrieve from "./components/admin/ResourceRetrieve";
import UpdateResource from "./components/admin/updateResource";
import Events from "./components/admin/Events";
import EventUpdate from "./components/admin/EventUpdate";
import Services from "./components/Services";
import PayUpdate from "./components/admin/PayUpdate";
import Packages from "./components/Packages";
import Bookings from "./components/admin/Bookings";
import BookingUpdate from "./components/admin/BookingUpdate";
import MngBookings from "./components/MngBooking";
import ForgotPassword from "./components/ForgotPassword";
import FAQ from "./components/FAQ";
import Complaints from "./components/admin/Complaints";
import ComplaintForm from "./components/ComplaintForm";
import ViewComplaint from "./components/admin/ViewComplaint";
import Navbar2 from "./components/Navbar";

const App = () => {
  return (
    <Router>
      <div className="w-full overflow-hidden">
        <Navbar2/>
        <ToastContainer position="top-right" autoClose={3000} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/signup" element={<SignupForm />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/testimonials" element={<Testimonials />} />
          <Route path="/user-profile" element={<UserProfile />} />
          <Route path="/addbook" element={<BookingForm/>}/>
          <Route path="/admin/resources" element={<ResourceRetrieve/>}/>
          <Route path="/admin/resources/edit/:id" element={<UpdateResource/>}/>
          <Route path="/payments" element={<Payments/>} />
          <Route path="/admin-dashboard" element={<AdminDashboard/>}/>
          <Route path="/user-profile/:id" element={<UpdateUser/>}/>
          <Route path="/admin/events" element={<Events/>}/>
          <Route path="/admin/events/edit/:id" element={<EventUpdate/>}/>
          <Route path="/admin/payments/update/:id" element={<PayUpdate/>}/>
          <Route path="/packages"  element={<Packages/>}/>
          <Route path="/activities" element={<Services/>}/>
          <Route path="/admin/bookings/update/:id" element={<BookingUpdate />} />
          <Route path="admin/bookings" element={<Bookings/>}/>
          <Route path="/manage-bookings" element={<MngBookings/>}/>
          {/* <Route path="/manage-bookings/:id" element={<MngBookings/>}/> */}
          <Route path="/faq" element={<FAQ />} />
          <Route path="/admin/complaints" element={<Complaints />} />
          <Route path="/submit-complaint" element={<ComplaintForm />} />
          <Route path="/complaints/:id" element={<ViewComplaint/>}/>


          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer/>
      </div>
    </Router>
  );
};

export default App;
