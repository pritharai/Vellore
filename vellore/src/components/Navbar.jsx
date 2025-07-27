import React from "react";
import {
 
  FaPhone,
  FaSearch,
  FaHeart,
  FaShoppingCart,
} from "react-icons/fa";

const Navbar = () => {
  return (
    <header className="shadow-md">
      {/* Top Bar - Desktop Only */}
      <div className="hidden md:flex justify-between items-center px-20 py-10">
        <div className="text-6xl font-bold">Vellor</div>
        <div className="flex gap-10 text-sm">
          {/* <div className="flex items-center gap-2">
            <FaMapMarkerAlt className="text-gray-600" />
            <div>
              <div className="text-gray-400 text-xs uppercase">Address</div>
              <div>192 Orchard St, Brooklyn, CA</div>
            </div>
          </div> */}
          {/* <div className="flex items-center gap-2">
            <FaPhone className="text-gray-600" />
            <div>
              <div className="text-gray-400 text-xs uppercase">Phone</div>
              <div>(+0051) 8286 41 53</div>
            </div>
          </div> */}
        </div>
        <div className="flex items-center gap-6 text-2xl">
          <FaSearch className="cursor-pointer" />
          <div className="relative cursor-pointer">
            <FaHeart />
            {/* <span className="absolute -top-2 -right-2 bg-black text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
              0
            </span> */}
          </div>
          <div className="relative cursor-pointer">
            <FaShoppingCart />
            {/* <span className="absolute -top-2 -right-2 bg-black text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
              0
            </span> */}
          </div>
        </div>
      </div>
        <hr width="1400" className="mx-auto"/>
      {/* Main Navigation */}
      <nav className="hidden md:flex justify-between items-center px-20 py-3 text-md">
        <ul className="flex gap-6 text-primary">
          <li className="hover:text-gray-400">
            <a href="#home">HOME</a></li>
          <li className="hover:text-gray-400">
            <a href="#shop">SHOP</a></li>
          <li className="hover:text-gray-400">
            <a href="#product">PRODUCT</a></li>
          {/* <li className="hover:text-black">
            <a href="">BLOG</a></li> */}
          <li className="hover:text-gray-400">
            <a href="#about">ABOUT</a></li>
        </ul>
        {/* <div className="flex gap-6">
          <div className="cursor-pointer">ENGLISH ▼</div>
          <div className="cursor-pointer">$ USD ▼</div>
        </div> */}
      </nav>

      {/* Bottom Navbar - Mobile Only */}
      <div className="fixed bottom-5 left-0 right-0 md:hidden bg-white z-50 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] rounded-t-xl">
        <div className="flex justify-around items-center py-2 text-xl text-primary">
          <FaSearch className="hover:text-gray-400" />
          <div className="relative">
            <FaHeart className="hover:text-gray-400" />
            {/* <span className="absolute -top-1 -right-2 bg-black text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
              0
            </span> */}
          </div>
          <div className="text-xl font-bold">Vellor</div>
          <div className="relative">
            <FaShoppingCart className="hover:text-gray-400" />
            {/* <span className="absolute -top-1 -right-2 bg-black text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
              0
            </span> */}
          </div>
          <FaPhone className="hover:text-gray-400" />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
