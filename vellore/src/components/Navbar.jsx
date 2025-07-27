import React, { useState, useEffect } from "react";
import {
  FaPhone,
  FaSearch,
  FaHeart,
  FaShoppingCart,
} from "react-icons/fa";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 50); // Trigger animation after 50px scroll
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header className={`shadow-md max-w-[1560px] mx-auto fixed top-0 right-0 left-0 z-50 bg-white transition-all duration-500 ease-in-out ${
        isScrolled ? 'py-2' : 'py-0'
      }`}>
        {/* Top Bar - Desktop Only */}
        <div className={`hidden md:flex justify-between items-center px-20 transition-all duration-500 ease-in-out ${
          isScrolled ? 'py-0 opacity-0 h-0 overflow-hidden' : 'py-10 opacity-100 h-auto'
        }`}>
          <div className="text-6xl font-bold text-primary">Vellor</div>
          <div className="flex gap-10 text-sm">
            {/* Commented content remains as is */}
          </div>
          <div className="flex items-center gap-6 text-2xl text-primary">
            <FaSearch className="cursor-pointer hover:text-gray-400 transition-colors" />
            <div className="relative cursor-pointer">
              <FaHeart className="hover:text-gray-400 transition-colors" />
            </div>
            <div className="relative cursor-pointer">
              <FaShoppingCart className="hover:text-gray-400 transition-colors" />
            </div>
          </div>
        </div>
        
        <hr className={`mx-auto transition-all duration-500 ease-in-out ${
          isScrolled ? 'opacity-0 h-0' : 'opacity-100 h-auto'
        }`} width="1400"/>
        
        {/* Main Navigation */}
        <nav className={`hidden md:flex items-center px-20 text-md transition-all duration-500 ease-in-out ${
          isScrolled ? 'justify-between py-4' : 'justify-between py-3'
        }`}>
          {/* Logo for scrolled state */}
          <div className={`text-2xl font-bold text-primary transition-all duration-500 ease-in-out ${
            isScrolled ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
          }`}>
            Vellor
          </div>
          
          <ul className="flex gap-6 text-primary">
            <li className="hover:text-gray-400 transition-colors">
              <a href="#home">HOME</a>
            </li>
            <li className="hover:text-gray-400 transition-colors">
              <a href="#shop">SHOP</a>
            </li>
            <li className="hover:text-gray-400 transition-colors">
              <a href="#product">PRODUCT</a>
            </li>
            <li className="hover:text-gray-400 transition-colors">
              <a href="#about">ABOUT</a>
            </li>
          </ul>
          
          {/* Icons for scrolled state */}
          <div className={`flex items-center gap-4 text-xl text-primary transition-all duration-500 ease-in-out ${
            isScrolled ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
          }`}>
            <FaSearch className="cursor-pointer hover:text-gray-400 transition-colors" />
            <div className="relative cursor-pointer">
              <FaHeart className="hover:text-gray-400 transition-colors" />
            </div>
            <div className="relative cursor-pointer">
              <FaShoppingCart className="hover:text-gray-400 transition-colors" />
            </div>
          </div>
        </nav>

        {/* Bottom Navbar - Mobile Only */}
        <div className="fixed bottom-5 left-0 right-0 md:hidden bg-white z-50 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] rounded-t-xl">
          <div className="flex justify-around items-center py-2 text-xl text-primary">
            <FaSearch className="hover:text-gray-400 transition-colors" />
            <div className="relative">
              <FaHeart className="hover:text-gray-400 transition-colors" />
            </div>
            <div className="text-xl font-bold">Vellor</div>
            <div className="relative">
              <FaShoppingCart className="hover:text-gray-400 transition-colors" />
            </div>
            <FaPhone className="hover:text-gray-400 transition-colors" />
          </div>
        </div>
      </header>
      
      {/* Demo content to enable scrolling
      <div className="pt-32 md:pt-48">
        <div className="max-w-4xl mx-auto p-8 space-y-8">
          <h1 className="text-4xl font-bold text-center mb-8">Scroll down to see the navbar animation</h1>
          {[...Array(20)].map((_, i) => (
            <div key={i} className="bg-gray-100 p-6 rounded-lg">
              <h2 className="text-2xl font-semibold mb-4">Section {i + 1}</h2>
              <p className="text-gray-600 leading-relaxed">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor 
                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis 
                nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore 
                eu fugiat nulla pariatur.
              </p>
            </div>
          ))}
        </div>
      </div> */}
    </>
  );
};

export default Navbar;