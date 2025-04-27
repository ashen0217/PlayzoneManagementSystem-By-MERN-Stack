import React from 'react'
import {Link} from 'react-router-dom'

const Navbar = () => {
  return (
    <div className="absolute top-0 left-0 w-full z-10">
      <div>
        <ul className='hidden md:flex gap-7 bg-gray-800 text-white p-4 shadow-md'>
            <Link to="/activities" className='cursor-pointer hover:text-gray-400'>Activities</Link>
            <Link to="/addbook" className='cursor-pointer hover:text-gray-400'>ADD  Booking</Link>
            <Link to="/complains" className='cursor-pointer hover:text-gray-400'>Complains</Link>
            <Link to="/payments" className='cursor-pointer hover:text-gray-400'>Payment</Link>
            <Link to="/user-profile" className='cursor-pointer hover:text-gray-400'>Your Profile</Link>
            <Link to="/testimonials" className='cursor-pointer hover:text-gray-400'>Customer Feedbacks</Link>
            <Link to="/complains" className='cursor-pointer hover:text-gray-400'>Complains</Link>
            <Link to="/contact" className='cursor-pointer hover:text-gray-400'>What's On your Mind</Link>
        </ul>
        <br /><br/>
      </div>
    </div>
  );
};

export default Navbar;
