import React from 'react';
import Navbar2 from './Navbar2';

const FAQ = () => {
  const faqs = [
    {
      question: "What is this site about?",
      answer: "Playzone Management System is a comprehensive platform designed to manage and enhance your gaming and entertainment experience. We provide a centralized system for booking facilities, managing events, and accessing various entertainment resources."
    },
    {
      question: "What are the events held in this institute?",
      answer: "We host a variety of events including gaming tournaments, LAN parties, e-sports competitions, and community gaming nights. We also organize special events during holidays and weekends. Check our Events page for the latest schedule and upcoming events."
    },
    {
      question: "What are the packages included?",
      answer: "We offer several packages to suit different needs: Basic (hourly access), Premium (daily access with additional perks), and VIP (monthly membership with exclusive benefits). Each package includes access to our gaming facilities, high-speed internet, and basic amenities. Visit our Packages page for detailed information."
    },
    {
      question: "What are the payment methods available?",
      answer: "We accept various payment methods including credit/debit cards, mobile payments, and cash. Online payments can be made through our secure payment gateway. For more details, please visit our Payments section."
    },
    {
      question: "What activities can we do?",
      answer: "Our facility offers a wide range of activities including PC gaming, console gaming, VR experiences, board games, and social gaming events. We also have dedicated spaces for tournaments and competitions. Check our Activities page for a complete list of available options."
    },
    {
      question: "What resources can we use?",
      answer: "We provide high-end gaming PCs, consoles (PlayStation, Xbox, Nintendo Switch), VR equipment, gaming peripherals, and comfortable gaming chairs. We also have a library of popular games and streaming equipment available for use."
    },
    {
      question: "How can we contact the admin?",
      answer: "You can contact our admin team through multiple channels: via the Contact page on our website, through email at admin@playzone.com, or by calling our support line during business hours. We also have a live chat feature available on our website."
    }
  ];

  return (
    <div className="min-h-screen bg-orange-50 py-12 px-4 sm:px-6 lg:px-8">
      <Navbar2/>
        <br /><br />

      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-orange-900 mb-4">Frequently Asked Questions</h1>
          <p className="text-lg text-orange-800">Find answers to common questions about our services and facilities</p>
        </div>
        
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <div className="p-6">
                <h3 className="text-xl font-semibold text-orange-900 mb-2">{faq.question}</h3>
                <p className="text-orange-800">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-orange-800">
            Can't find what you're looking for?{' '}
            <a href="/contact" className="text-orange-600 hover:text-orange-700 font-medium">
              Contact us
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default FAQ; 