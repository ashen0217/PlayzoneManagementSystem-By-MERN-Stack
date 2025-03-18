import React from 'react'
import { assets, projectsData, ServiceData } from '../assets/assets'

const Services = () => {

  return (
    <div className='container mx-auto py-4 pt-20 px-6 md:px-20 lg:px-32 my-20 w-full overflow-hidden' id='Services'> 
      <h1 className='text-2xl sm:text-4xl font-bold mb-2 text-center'>Activities <span className='underline underline-offset-4 decoration-1 under font-light'>That We Implemented</span></h1>
      <p className='text-center text-gray-500 mb-8 max-w-80 mx-auto'>Simplifying Play, Enhancing Joy!</p> 

      <h3 className='text-2xl sm:text-4xl font-bold mb-2 text-center'>Scroll right to see more</h3>
        {/*project slider container*/}
        <div className='overflow-auto'>
            <div  className='flex gap-8 transition-transform duration-500 ease-in-out'>
                {projectsData.map((project,index)=>(
                    <div key={index} className='relative flex-shrink-0 w-full sm:w-1/4'>
                        <img src={project.image} alt={project.title}/>
                        <div className='absolute left-0 right-0 bottom-5 flex justify-center'>
                            <div className='inline-block bg-white w-3/4 px-4 py-2 shadow-md'>
                                <h2 className='text-xl font-semibold text-gray-800'>{project.title}</h2>
                            </div>
                            <p className='text-gray-500 text-sm bg-white'>
                                {project.price} <span> </span> {project.location}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>

        <br /><br /> <br /> 
        <h3 className='text-2xl sm:text-4xl font-bold mb-2 text-center'>Scroll right to see more</h3>
        {/*project slider container*/}
        <div className='overflow-auto'>
            <div  className='flex gap-8 transition-transform duration-500 ease-in-out'>
                {ServiceData.map((service,index)=>(
                    <div key={index} className='relative flex-shrink-0 w-full sm:w-1/4'>
                        <img src={service.image} alt={service.title}/>
                        <div className='absolute left-0 right-0 bottom-5 flex justify-center'>
                            <div className='inline-block bg-white w-3/4 px-4 py-2 shadow-md'>
                                <h2 className='text-xl font-semibold text-gray-800'>{service.title}</h2>
                            </div>
                            <p className='text-gray-500 text-sm bg-white'>
                                {service.price} <span> </span> {service.location}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </div>
  )
}

export default Services
