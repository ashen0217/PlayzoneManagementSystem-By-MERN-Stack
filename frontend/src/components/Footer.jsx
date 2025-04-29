import React, { useState } from 'react'
import { assets } from '../assets/assets'
import { toast } from 'react-toastify'

const Footer = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    
    if (!email) {
      toast.error('Please enter your email address');
      return;
    }
    
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error('Please enter a valid email address');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Create form data with the email and access key
      const formData = new FormData();
      formData.append("email", email);
      formData.append("access_key", "ee2a13d2-c198-4c6f-95b6-826790c23996");
      formData.append("subject", "Newsletter Subscription");
      formData.append("message", "New newsletter subscription request");

      // Send the data to web3forms API
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });

      const data = await response.json();

      if (data.success) {
        toast.success('Thank you for subscribing to our newsletter!');
        setEmail('');
      } else {
        toast.error('Failed to subscribe. Please try again later.');
        console.error('Subscription error:', data);
      }
    } catch (error) {
      toast.error('Failed to subscribe. Please try again later.');
      console.error('Subscription error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

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
                <form onSubmit={handleSubscribe} className='flex flex-col md:flex-row gap-2'>
                    <input 
                      className='p-2 rounded bg-gray-800 text-gray-400 border border-gray-700 focus:outline-none w-full md:w-auto' 
                      type="email" 
                      placeholder='Enter your email'
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <button 
                      className='py-2 px-4 rounded bg-blue-500 text-white hover:bg-blue-600 transition-colors'
                      type="submit"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? 'Subscribing...' : 'Subscribe'}
                    </button>
                </form>
            </div>
        </div>
        <div className='border-t border-gray-700 py-4 mt-10 text-center text-gray-500'>
            Copyright 2025 @PlayzonePro All Right Reserved
        </div>
    </div>
  )
}

export default Footer
