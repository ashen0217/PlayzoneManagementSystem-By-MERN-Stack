import React from "react";
import { Link } from "react-router-dom";
import Navbar2 from "./Navbar2";

const Home = () => {
  return (
    <div
      className="filter brightness-75 h-screen min-h-screen mb-4 bg-cover bg-center flex items-center w-full overflow-hidden"
      style={{ backgroundImage: "url('/bg2.png')" }}
    >
      <Navbar2/>
      

      <div className="container text-center mx-auto py-25 px-10 md:px-25 lg:px-40 text-black bg-amber-400 bg-auto">
        <h2 className="text-center sm:text-20xl md:text-[100px] inline-block max-w-8xl font-semibold pt-20">
          Let's make your day filled with lots of pleasure
        </h2>
        <div className="space-x-6 mt-16">
          <Link
            to="/contact"
            className="bg-amber-50 border border-white px-8 py-3 rounded"
          >
            Contact-us
          </Link>
          <Link to="/about" className="bg-white px-8 py-3 rounded">
            About-us
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
