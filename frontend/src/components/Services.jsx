import React from 'react'
import { projectsData, ServiceData } from '../assets/assets'
import Navbar2 from './Navbar2'

const Services = () => {
  return (
    <div>
      <Navbar2 />
      <div className='container mx-auto py-4 pt-20 px-6 md:px-20 lg:px-32 my-20 w-full' id='Services'>
        <h1 className='text-2xl sm:text-4xl font-bold mb-2 text-center'>
          Activities <span className='underline underline-offset-4 decoration-1 font-light' id='Activities'>That We Implemented</span>
        </h1>
        <p className='text-center text-gray-500 mb-8 mx-auto max-w-md'>Simplifying Play, Enhancing Joy!</p>

        <h3 className='text-xl sm:text-2xl font-bold mb-6 text-center'>Scroll right to see more</h3>
        
        {/* Projects slider container */}
        <div className='relative'>
          <div className='overflow-x-auto pb-4'>
            <div className='flex gap-6 w-max'>
              {projectsData.map((project, index) => (
                <div key={index} className='relative flex-shrink-0 w-64 sm:w-80'>
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className='w-full h-48 sm:h-56 object-cover rounded-lg'
                  />
                  <div className='absolute inset-x-0 bottom-0 p-4'>
                    <div className='bg-white rounded-lg p-3 shadow-md'>
                      <h2 className='text-lg font-semibold text-gray-800'>{project.title}</h2>
                      <p className='text-gray-500 text-sm mt-1'>
                        {project.price} {project.location && `• ${project.location}`}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <br /><br /><br />
        
        <h3 className='text-xl sm:text-2xl font-bold mb-6 text-center'>Scroll right to see more</h3>
        
        {/* Services slider container */}
        <div className='relative'>
          <div className='overflow-x-auto pb-4'>
            <div className='flex gap-6 w-max'>
              {ServiceData.map((service, index) => (
                <div key={index} className='relative flex-shrink-0 w-64 sm:w-80'>
                  <img 
                    src={service.image} 
                    alt={service.title}
                    className='w-full h-48 sm:h-56 object-cover rounded-lg'
                  />
                  <div className='absolute inset-x-0 bottom-0 p-4'>
                    <div className='bg-white rounded-lg p-3 shadow-md'>
                      <h2 className='text-lg font-semibold text-gray-800'>{service.title}</h2>
                      <p className='text-gray-500 text-sm mt-1'>
                        {service.price} {service.location && `• ${service.location}`}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Services