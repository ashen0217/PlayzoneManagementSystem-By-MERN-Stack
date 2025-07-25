import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="absolute top-0 left-0 w-full z-10">
      <div>
        <ul className="hidden md:flex gap-7 bg-gray-800 text-white p-4 shadow-md">
          <Link
            to="/addbook"
            className="cursor-pointer text-white hover:text-gray-400"
          >
            ADD Booking
          </Link>
          <Link
            to="/payments"
            className="cursor-pointer text-white hover:text-gray-400"
          >
            Payment
          </Link>
          <Link
            to="/user-profile"
            className="cursor-pointer text-white hover:text-gray-400"
          >
            Your Profile
          </Link>
          <Link
            to="/submit-complaint"
            className="cursor-pointer text-white hover:text-gray-400"
          >
            Complains
          </Link>
          <Link
            to="/manage-bookings"
            className="cursor-pointer text-white hover:text-gray-400"
          >
            Booking Details
          </Link>
        </ul>
        <br />
        <br />
      </div>
    </div>
  );
};

export default Navbar;
