import React from 'react'
import {Link} from 'react-router-dom'

const Navbar = () => {
  return (
    <div className="absolute top-0 left-0 w-full z-10">
      <div>
        <ul className='hidden md:flex gap-7 bg-gray-800 text-white p-4 shadow-md'>
            <Link to="/addbook" className='cursor-pointer hover:text-gray-400' style={{ textDecoration: 'none' }}>ADD  Booking</Link>
            <Link to="/payments" className='cursor-pointer hover:text-gray-400' style={{ textDecoration: 'none' }}>Payment</Link>
            <Link to="/user-profile" className='cursor-pointer hover:text-gray-400' style={{ textDecoration: 'none' }}>Your Profile</Link>
            <Link to="/complains" className='cursor-pointer hover:text-gray-400' style={{ textDecoration: 'none' }}>Complains</Link>
            <Link to="/contact" className='cursor-pointer hover:text-gray-400' style={{ textDecoration: 'none' }}>Contact Me via</Link>
            <Link to="/manage-bookings/:id" className='cursor-pointer hover:text-gray-400' style={{ textDecoration: 'none' }}>Booking Details</Link>
        </ul>
        <br /><br/>
      </div>
    </div>
  );
};

export default Navbar;
