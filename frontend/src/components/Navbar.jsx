import React from 'react'
import {Link} from 'react-router-dom'

const Navbar = () => {
  return (
    <div className='absolute top-0 left-0 w-full z-10'>
      <div className='container mx-auto flex justify-between items-center py-4 px-6 md:px-20 lg:px-32 bg-transparent'>
        <ul className='hidden md:flex gap-7 bg-gray-800 text-white p-4 shadow-md'>
            <Link to="/" className='cursor-pointer hover:text-gray-400'>Home</Link>
            <Link to="/activities" className='cursor-pointer hover:text-gray-400'>Activities</Link>
            <Link to="/addbook" className='cursor-pointer hover:text-gray-400'>ADD  Booking</Link>
            <Link to="/complains" className='cursor-pointer hover:text-gray-400'>Complains</Link>
            <Link to="/payment" className='cursor-pointer hover:text-gray-400'>Payment</Link>
            <Link to="/user-profile" className='cursor-pointer hover:text-gray-400'>Your Profile</Link>
            <Link to="/cstmerfeedbakcs" className='cursor-pointer hover:text-gray-400'>Customer Feedbacks</Link>
            <Link to="/complains" className='cursor-pointer hover:text-gray-400'>Complains</Link>
            <Link to="/contact" className='cursor-pointer hover:text-gray-400'>What's On your Mind</Link>
            <Link to="/U" className='cursor-pointer hover:text-gray-400'>UserRetrieve</Link>
        </ul>
        <br /><br/>
        <Link to="/signup" className='hidden md:block bg-white px-8 py-2 rounded-full cursor-pointer'>Sign up</Link>
        <Link to="/login" className='hidden md:block bg-white px-8 py-2 rounded-full cursor-pointer'>Login</Link>   
      </div>
    </div>
  );
};

export default Navbar;
