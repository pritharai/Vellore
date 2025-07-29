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
      setIsScrolled(scrollTop > 50); 
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header className="max-w-[1560px] mx-auto fixed top-0 right-0 left-0 z-50 bg-white">
        {!isScrolled && (
          <div className="hidden md:flex justify-between items-center px-20 py-6">
            <div className="text-6xl font-bold text-primary">Vellor</div>
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
        )}
        
        {!isScrolled && (
          <hr className="mx-auto" width="1400"/>
        )}
        
        <nav className={`hidden md:flex items-center px-20 text-md ${
          isScrolled ? 'justify-between py-6' : 'justify-center py-4'
        }`}>
          {isScrolled && (
            <div className="text-2xl font-bold text-primary">
              Vellor
            </div>
          )}
          
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
          
          {isScrolled && (
            <div className="flex items-center gap-4 text-xl text-primary">
              <FaSearch className="cursor-pointer hover:text-gray-400 transition-colors" />
              <div className="relative cursor-pointer">
                <FaHeart className="hover:text-gray-400 transition-colors" />
              </div>
              <div className="relative cursor-pointer">
                <FaShoppingCart className="hover:text-gray-400 transition-colors" />
              </div>
            </div>
          )}
        </nav>

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
      
    </>
  );
};

export default Navbar;

