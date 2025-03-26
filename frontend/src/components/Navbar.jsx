import React from 'react'


const Navbar = () => {
  return (
    <div className='absolute top-0 left-0 w-full z-10'>
      <div className='container mx-auto flex justify-between items-center py-4 px-6 md:px-20 lg:px-32 bg-transparent'>
        <ul className='hidden md:flex gap-7 bg-gray-800 text-white p-4 shadow-md'>
            <a href="#Header" className='cursor-pointer hover:text-gray-400'>Home</a>
            <a href="#Services" className='cursor-pointer hover:text-gray-400'>Activities</a>
            <a href="#Packages" className='cursor-pointer hover:text-gray-400'>ADD  Booking</a>
            <a href="#Header" className='cursor-pointer hover:text-gray-400'>Complains</a>
            <a href="#Payment" className='cursor-pointer hover:text-gray-400'>Payment</a>
            <a href="#UserProfile" className='cursor-pointer hover:text-gray-400'>Your Profile</a>
            <a href="#Testimonials" className='cursor-pointer hover:text-gray-400'>Customer Feedbacks</a>
            <a href="#Header" className='cursor-pointer hover:text-gray-400'>Complains</a>
            <a href="#Contact" className='cursor-pointer hover:text-gray-400'>What's On your Mind</a>
        </ul>
        <br /><br/>
        <a href="#Signup" className='hidden md:block bg-white px-8 py-2 rounded-full cursor-pointer'>Sign up</a>
        <a href="#Login" className='hidden md:block bg-white px-8 py-2 rounded-full cursor-pointer'>Login</a>   
      </div>
    </div>
  );
};

export default Navbar;
