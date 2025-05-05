import React from "react";
import { Link } from "react-router-dom";

const Navbar2 = () => {
    return (
        <div className="absolute top-0 left-0 w-full z-10">
            <div >
                <ul className='hidden md:flex gap-7 bg-gray-800 text-white p-4 shadow-md'>
                    <li>
                        <Link to="/" className="cursor-pointer hover:text-gray-400 text-white" style={{ textDecoration: 'none' }}>
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link to="/about" className="cursor-pointer hover:text-gray-400 text-white" style={{ textDecoration: 'none' }}>
                            About
                        </Link>
                    </li>
                    <li>
                        <Link to="/testimonials" className="cursor-pointer hover:text-gray-400 text-white" style={{ textDecoration: 'none' }}>
                            Customer Feedbacks
                        </Link>
                    </li>
                    <li>
                        <Link to="/packages" className="cursor-pointer hover:text-gray-400 text-white" style={{ textDecoration: 'none' }}>
                            Packages
                        </Link>
                    </li>
                    <li>
                        <Link to="/activities" className="cursor-pointer hover:text-gray-400 text-white" style={{ textDecoration: 'none' }}>
                            Activities
                        </Link>
                    </li>
                    <li>
                        <Link to="/contact" className="cursor-pointer hover:text-gray-400 text-white" style={{ textDecoration: 'none' }}>
                            Contact
                        </Link>
                    </li>
                    <li>
                        <Link to="/faq" className="cursor-pointer hover:text-gray-400 text-white" style={{ textDecoration: 'none' }}>
                            FAQ's
                        </Link>
                    </li>
                    <li>
                        <Link to="/login" className="bg-white px-8 py-2 rounded-full cursor-pointer text-gray-950 hover:bg-gray-200 transition-colors" style={{ textDecoration: 'none' }}>
                            Login
                        </Link>
                    </li>
                    <li>
                        <Link to="/signup" className="bg-white px-8 py-2 rounded-full cursor-pointer text-gray-950 hover:bg-gray-200 transition-colors" style={{ textDecoration: 'none' }}>
                            Signup
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Navbar2;
