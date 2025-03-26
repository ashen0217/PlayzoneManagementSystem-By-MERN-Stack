import React from 'react'
import Navbar from './Navbar'

const Header = () => {
  return (
    <div className='filter brightness-75 h-screen min-h-screen mb-4 bg-cover bg-center flex items-center w-full overflow-hidden' style={{backgroundImage: "url('/bg3.png')"}} id='Header'>
      <Navbar/>
      <div className='container text-center mx-auto py-4 px-6 md:px-20 lg:px-32 text-black bg-blue-600 bg-auto'>
        <h2 className=' text-10xl text-center sm:text-6xl md:text-[82px] inline-block max-w-3xl font-semibold pt-20'>Let's make your day filled with lot's of pleasure</h2>
        <div className='space-x-6 mt-16'>
          <a className='bg-blue-400 border border-white px-8 py-3 rounded' href="#Contact">Contact-us</a> 
          <a className='bg-white px-8 py-3 rounded' href="#About">About-us</a>
        </div>
      </div>
    </div>
  )
};

export default Header;
