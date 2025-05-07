import React from 'react'
import { assets } from '../assets/assets'
import Navbar2 from './Navbar2'

const About = () => {
  return (
    <div>
    <Navbar2/>
    <div className='flex flex-col items-center justify-center container mx-auto p-14 md:px-20 lg:px-32 w-full overflow-hidden' id='About'>
        
        <br/><br/>
        <h1 className='text-2xl sm:text-4xl font-bold mb-2 '>About us <span className='underline underline-offset-4 decoration-1 under font-light'>our Brand</span></h1>
        <p className='text-gray-500  text-center mb-8'>Welcome to PlayZone Pro. We are dedicated to creating a seamless 
            and efficient experience for managing 
            playzones, recreational centers, and 
            indoor playgrounds. Our mission is to 
            empower businesses with innovative tools
            that simplify operations, enhance customer
            experiences, and promote safe and fun 
            environments for children and families.
        </p>
        <p className='text-gray-500  text-center mb-8'>
            Ultimately, the system will modernize the play zone’s operations, enabling the business to
            scale effectively while maintaining a high level of service. With features designed to
            automate routine tasks, improve security, and enhance customer satisfaction, the Playzone
            Management System is essential for improving both operational efficiency and the overall
            customer experience.
        </p>
        <p className='text-gray-500  text-center mb-8'>
            Our Mission is to

                Simplify playzone management with user-friendly and efficient software solutions,

                Enhance safety standards and operational efficiency,

                Deliver exceptional customer service and continuous support,

                Innovate continuously to meet the evolving needs of recreational spaces,
        </p>
                
        
        <p className='text-gray-500  text-center mb-8'>
                Why Choose Us?

                    Comprehensive Management Tools: From booking systems to attendance tracking, we offer an all-in-one solution.

                    User-Friendly Interface: Designed for ease of use, ensuring smooth operations for staff and management.

                    Safety First: Features that promote the safety and well-being of children in play environments.

                    Dedicated Support: Our team is always ready to assist with any questions or technical needs.

                Join Us in Creating Joyful Play Experiences
                We believe that play is essential for growth and development. By simplifying management tasks, we allow playzone operators to focus on providing joyful and memorable experiences. Partner with PlayZone Management System and take your playzone to the next level!
        </p>

        <div className='flex flex-col md:flex-row items-center md:items-start md:gap-20'>
            <img src={assets.oip} alt="" />
            <div className='flex flex-col items-center md:items-start mt-10 text-gray-600 '>
                <div className='grid grid-cols-2 gap-6 md:gap-10 w-full 2xl:pr-28 '>
                    <div >
                        <p className='text-4xl font-medium text-gray-800 text-bold'>10+</p>
                        <p>Years of Experience</p>
                    </div>
                    <div >
                        <p className='text-4xl font-medium text-gray-800 text-bold'>12+</p>
                        <p>Restaurants</p>
                    </div>
                    <div >
                        <p className='text-4xl font-medium text-gray-800 text-bold'>15+</p>
                        <p>Kids zones </p>
                    </div>
                    <div >
                        <p className='text-4xl font-medium text-gray-800 text-bold'>25+</p>
                        <p>Indoor and outdoor activities</p>
                    </div>
                </div>
                <br />
                <button className='bg-blue-600 text-white px-8 py-2 rounded'>Learn more</button>
            </div>
        </div>
    </div>
    </div>
  )
}

export default About
