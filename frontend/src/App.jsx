import React from 'react'
import Header from './components/Header'
import About from './components/About'
import Services from './components/Services'
import Testimonials from './components/Testimonials'
import Contact from './components/Contact'
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from './components/Footer'
import Login from './components/Login'
import Signup from './components/Signup'
import UserProfile from './components/UserProfile'
import Payments from './components/Payments'
import Packages from './components/Packages'
import BookingForm from './components/BookingForm'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


const App = () => {
  return (
    <div className='w-full overflow-hidden'>
      <ToastContainer/>
      <Header/>
      <Login />
      <Signup/>
      <UserProfile/>
      <BookingForm />
      <Packages />
      <Payments/>
      <About/>
      <Services/>
      <loginSignup/>
      <Testimonials/>
      <Contact/>
      <Footer/>
    </div>
  )
}

export default App
