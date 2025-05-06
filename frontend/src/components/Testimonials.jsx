import React, { useState, useEffect } from 'react';
import { assets } from '../assets/assets';
import Navbar2 from './Navbar2';
import axios from 'axios';
import { toast } from 'react-toastify';

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await axios.get('http://localhost:8000/Complaints/testimonials');
        setTestimonials(response.data);
        setLoading(false);
      } catch (error) {
        toast.error('Error fetching testimonials');
        console.error('Error fetching testimonials:', error);
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className='container mx-auto py-10 lg:px-32 w-full overflow-hidden' id='Testimonials'>
      <Navbar2/>
      <br /><br /><br />
      <h1 className='text-2xl sm:text-4xl font-bold mb-2 text-center'>Customer <span className='underline underline-offset-4 decoration-1 under font-light'>Feedbacks</span></h1>
      <p className='text-center text-gray-500 mb-12 max-w-80 mx-auto'>Real Stories from those Who Interact with Us</p> <br /><br /> <br />

      {testimonials.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500">No feedbacks available yet</p>
        </div>
      ) : (
        <div className='flex flex-wrap justify-center gap-8'>
          {testimonials.map((testimonial, index) => (
            <div key={index} className='max-w-[340px] border shadow-lg rounded px-8 py-12'>
              <div className='w-20 h-20 rounded-full mx-auto mb-4 bg-gray-200 flex items-center justify-center text-2xl font-bold'>
                {testimonial.name.charAt(0).toUpperCase()}
              </div>
              <h2 className='text-xl text-gray-700 font-medium text-center'>{testimonial.name}</h2>
              <p className='text-gray-500 mb-4 text-sm text-center'>{testimonial.email}</p>
              <div className='flex justify-center gap-1 text-yellow-500 mb-4'>
                {Array.from({length: testimonial.ratings || 0}, (item,index) => (
                  <span key={index}>⭐</span>
                ))}
              </div>
              <p className='text-gray-600 text-center'>{testimonial.feedback}</p>
            </div>
          ))}
        </div>
      )}
      <br /><br />
    </div>
  );
};

export default Testimonials;