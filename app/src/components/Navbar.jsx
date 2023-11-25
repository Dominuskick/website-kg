import React from "react";
import {logo} from '../assets'


const Navbar = () => {
  return (
    
      <nav className="h-20">
        <div className="flex flex-wrap items-center justify-between py-[10px] px-[40px]">
          <a href="/" className="flex items-center">
              <img src={logo} className="w-[60px] rounded-full" alt="Flowbite Logo" />
          </a>
          <button type="button" className="flex justify-center items-center bg-button w-40 h-10">
              <span className="font-inter text-2xl tracking-[2.4px] font-semibold">About</span>
          </button>
        </div>
      </nav>

  );
};

export default Navbar;