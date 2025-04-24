import React from 'react'
import  {useState,useEffect} from "react";
import Navbar from './Navbar'
//import { Link } from "react-router-dom";
import {BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserProfile from "./UserProfile";
import Payments from "./Payments";
import Packages from "./Packages";
import BookingForm from "./BookingForm";
import Footer from './Footer';

const Dashboard = () => {
  return (
        <div className='filter brightness-75 h-screen min-h-screen mb-4 bg-cover bg-center flex items-center w-full overflow-hidden' style={{backgroundImage: "url('/bg3.png')"}} id='Header'>
          <Navbar/>
          



        </div>

  )
};

export default Dashboard;
