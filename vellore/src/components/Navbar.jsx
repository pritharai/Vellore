import React from "react";
import { FaSearch, FaHeart, FaShoppingCart, FaUser } from "react-icons/fa";

const Navbar = () => {
  return (
    <nav className="fixed top-0 w-full z-50 bg-transparent text-white px-6 py-4 flex justify-between items-center">
      <div className="text-2xl font-bold">VELLORE</div>
      <ul className="hidden md:flex gap-8 text-lg font-medium">
        <li><a href="#">Home</a></li>
        <li><a href="#">Shop</a></li>
        <li><a href="#">Rentals</a></li>
        <li><a href="#">Thrift</a></li>
      </ul>
      <div className="flex gap-4 text-xl">
        <FaSearch />
        <FaHeart />
        <FaShoppingCart />
        <FaUser />
      </div>
    </nav>
  );
};

export default Navbar;
