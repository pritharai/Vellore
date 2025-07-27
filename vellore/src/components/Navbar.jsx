import React from "react";
import {
  FaMapMarkerAlt,
  FaPhone,
  FaSearch,
  FaHeart,
  FaShoppingCart,
} from "react-icons/fa";

const Navbar = () => {
  return (
    <header className="border-b">
      {/* Top Bar - Desktop Only */}
      <div className="hidden md:flex justify-between items-center px-6 py-4">
        <div className="text-2xl font-bold">Vellore</div>
        <div className="flex gap-10 text-sm">
          {/* <div className="flex items-center gap-2">
            <FaMapMarkerAlt className="text-gray-600" />
            <div>
              <div className="text-gray-400 text-xs uppercase">Address</div>
              <div>192 Orchard St, Brooklyn, CA</div>
            </div>
          </div> */}
          <div className="flex items-center gap-2">
            <FaPhone className="text-gray-600" />
            <div>
              <div className="text-gray-400 text-xs uppercase">Phone</div>
              <div>(+0051) 8286 41 53</div>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-4 text-lg">
          <FaSearch className="cursor-pointer" />
          <div className="relative cursor-pointer">
            <FaHeart />
            <span className="absolute -top-2 -right-2 bg-black text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
              0
            </span>
          </div>
          <div className="relative cursor-pointer">
            <FaShoppingCart />
            <span className="absolute -top-2 -right-2 bg-black text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
              0
            </span>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="hidden md:flex justify-between items-center px-6 py-3 border-t text-sm">
        <ul className="flex gap-6">
          <li className="text-gray-400">HOME</li>
          <li className="hover:text-black">SHOP</li>
          <li className="hover:text-black">PRODUCT</li>
          <li className="hover:text-black">BLOG</li>
          <li className="hover:text-black">PAGES</li>
        </ul>
        {/* <div className="flex gap-6">
          <div className="cursor-pointer">ENGLISH ▼</div>
          <div className="cursor-pointer">$ USD ▼</div>
        </div> */}
      </nav>

      {/* Bottom Navbar - Mobile Only */}
      <div className="fixed bottom-0 left-0 right-0 md:hidden bg-white border-t shadow-md z-50">
        <div className="flex justify-around items-center py-2 text-xl">
          <FaSearch className="text-gray-700" />
          <div className="relative">
            <FaHeart className="text-gray-700" />
            <span className="absolute -top-1 -right-2 bg-black text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
              0
            </span>
          </div>
          <div className="text-base font-bold">Vellore</div>
          <div className="relative">
            <FaShoppingCart className="text-gray-700" />
            <span className="absolute -top-1 -right-2 bg-black text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
              0
            </span>
          </div>
          <FaPhone className="text-gray-700" />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
