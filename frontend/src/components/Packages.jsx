import React from 'react'
import { packageData } from '../assets/assets'
import Navbar from './Navbar2';

const Packages = () => {
  return (
    <div>
    <Navbar/>
    <div style={{ backgroundImage: "url('/bg2.png')", backgroundSize: "cover", backgroundPosition: "center" }}>
    <div className='container mx-auto py-10 lg:px-32 w-full overflow-hidden bg-amber-50' id='Package ' >
      
      <br /><br />
          <h1 className='text-2xl sm:text-4xl font-bold mb-2 text-center'>Our Packages <br /> <span className='underline underline-offset-4 decoration-1 under font-light' id='Packages'>Types</span></h1>
          <p className='text-center text-gray-500 mb-12 max-w-80 mx-auto'></p> <br />
    
          <div className='flex flex-wrap justify-center gap-8'>
            {packageData.map((pkg, index)=>(
                <div key={index} className='max-w-[340px] border shadow-lg rounded px-8 py-12 bg-yellow-300'>
                    <img className='w-20 h-20 rounded-full mx-auto mb-4' src={pkg.image} alt={pkg.alt} />
                    <h2 className='text-xl text-gray-700 font-medium'>{pkg.name}</h2>
                    <p className='text-gray-500 mb-4 text-sm'>{pkg.description}</p>
                    <div className='flex justify-center gap-1 text-red-500 mb-4'>
                        <ul className='hidden md:flex gap-7 bg-amber-700 text-white p-4 shadow-md'>
                            <a href="Activities" className='cursor-pointer text-white hover:text-gray-400' style={{ textDecoration: 'none' }}> Learn more </a>
                        </ul>
                    </div>
                    <p className='text-gray-600'>{pkg.price}</p>
                </div>
            ))}
          </div>
          <br /><br />
    </div>
    </div>
    </div>
  )
}

export default Packages;
