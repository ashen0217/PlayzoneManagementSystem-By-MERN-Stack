import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <div className='pt-10 px-4 md:px-20 lg:px-32 bg-gray-900 w-full overflow-hidden' id='Footer'>
      <div className='container mx-auto flex flex-col md:flex-row justify-between items-start'>
            <div className='w-full md:w-1/3 mb-8 md:mb-0 '>
                <img src={assets.logo_dark} alt="" />
                <p className='text-gray-400 mt-4'>
                    PlayZone Management System is designed to simplify and streamline the management of playzones, recreational centers, and indoor playgrounds.
                </p>
            </div> <br />
            <div className='w-full md:w-1/3 mb-8 md:mb-0'>
                <ul className='flex flex-col gap-2 text-gray-400'>
                </ul>
            </div>
            <div className='w-full md:w-1/3'>
                <h3 className='text-white text-lg font-bold mb-4'>Subscribe to our news letter</h3>
                <p className='text-gray-400 mb-4 max-w-80'>The latest news, articles and resources sent to your inbox weekly</p>
                <div>
                    <input className='p-2 rounded bg-gray-800 text-gray-400 border border-gray-700 focus:outline-none w-full md:w-auto' type="email" placeholder='Enter your email'/>
                    <button className='py-2 px-4 rounded bg-blue-500 text-white'>Subscribe</button>
                </div>
            </div>
        </div>
        <div className='border-t border-gray-700 py-4 mt-10 text-center text-gray-500'>
            Copyright 2025 @PlayzonePro All Right Reserved
        </div>
    </div>
  )
}

export default Footer
