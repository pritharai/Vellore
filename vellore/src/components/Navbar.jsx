import React, { useState, useEffect } from "react";
import { FaPhone, FaSearch, FaHeart, FaShoppingCart, FaEllipsisV, FaUser } from "react-icons/fa";
import { GiClothes } from "react-icons/gi";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useSelector } from "react-redux";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const { isAuthenticated } = useAuth();
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 50);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  
  const accountRoute = isAuthenticated ? "/my-account" : "/auth";
  const isAdmin = isAuthenticated && user?.role === "admin";

  return (
    <>
      <header className="shadow-md max-w-[1560px] mx-auto fixed top-0 right-0 left-0 z-50 bg-white">
        {!isScrolled && (
          <div className="hidden md:flex justify-between items-center px-20 py-6">
            <div className="text-[38px] font-bold text-primary" style={{ fontFamily: 'Brittany Signature' }}>
              <Link to="/">Vellor</Link>
            </div>
            <div className="flex items-center gap-6 text-2xl text-primary">
              <Link to="/search">
                <FaSearch className="cursor-pointer hover:text-primary-hover transition-colors" />
              </Link>
              <div className="relative cursor-pointer">
                <Link to="/wishlist">
                  <FaHeart className="hover:text-primary-hover transition-colors" />
                </Link>
              </div>
              <div className="relative cursor-pointer">
                <Link to="/cart">
                  <FaShoppingCart className="hover:text-primary-hover transition-colors" />
                </Link>
              </div>
              <div className="relative cursor-pointer">
                <Link to={accountRoute} className="hover:text-primary-hover transition-colors">
                  <FaUser className="hover:text-primary-hover transition-colors" />
                </Link>
              </div>
            </div>
          </div>
        )}

        {!isScrolled && <hr className="mx-auto" width="1400" />}

        <nav
          className={`hidden md:flex items-center px-20 text-md ${
            isScrolled ? "justify-between py-6" : "justify-center py-4"
          }`}
        >
          {isScrolled && (
            <div className="text-2xl font-bold text-primary" style={{ fontFamily: 'Brittany Signature' }}>
              <Link to="/">Vellor</Link>
            </div>
          )}

          <ul className="flex gap-6 text-primary">
            <li>
              <Link to="/" className="list-item relative px-2 py-1">
                HOME
              </Link>
            </li>
            <li>
              <Link to="/products" className="list-item relative px-2 py-1">
                PRODUCTS
              </Link>
            </li>
            <li>
              <Link to="/about" className="list-item relative px-2 py-1">
                ABOUT
              </Link>
            </li>
            <li>
              <Link to="/contact" className="list-item relative px-2 py-1">
                CONTACT
              </Link>
            </li>
            {isAdmin && (
              <>
                <li>
                  <Link to="/admin/dashboard" className="list-item relative px-2 py-1">
                    ADMIN DASHBOARD
                  </Link>
                </li>
                <li>
                  <Link to="/admin/products" className="list-item relative px-2 py-1">
                    PRODUCT MANAGEMENT
                  </Link>
                </li>
              </>
            )}
          </ul>

          {isScrolled && (
            <div className="flex items-center gap-4 text-xl text-primary">
              <Link to="/search">
                <FaSearch className="cursor-pointer hover:text-primary-hover transition-colors" />
              </Link>
              <div className="relative cursor-pointer">
                <Link to="/wishlist">
                  <FaHeart className="hover:text-primary-hover transition-colors" />
                </Link>
              </div>
              <div className="relative cursor-pointer">
                <Link to="/cart">
                  <FaShoppingCart className="hover:text-primary-hover transition-colors" />
                </Link>
              </div>
              <div className="relative cursor-pointer">
                <Link to={accountRoute} className="hover:text-primary-hover transition-colors">
                  <FaUser className="hover:text-primary-hover transition-colors" />
                </Link>
              </div>
            </div>
          )}
        </nav>

        <div className="fixed bottom-0 left-0 right-0 md:hidden bg-white z-50 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] rounded-t-xl">
          <div className="flex justify-around items-center py-2 text-xl text-primary">
            <Link to="/products" className="hover:text-primary-hover transition-colors">
              <GiClothes className="cursor-pointer" />
            </Link>
            <Link to="/">
              <div className="text-xl font-bold" style={{ fontFamily: 'Brittany Signature' }}>
                Vellor
              </div>
            </Link>
            <Link to="/cart">
              <FaShoppingCart className="hover:text-primary-hover transition-colors" />
            </Link>
            <button
              onClick={() => setShowMore(!showMore)}
              className="hover:text-primary-hover transition-colors"
            >
              <FaEllipsisV />
            </button>
          </div>

          {showMore && (
            <div className="absolute bottom-14 right-4 bg-white shadow-lg rounded-lg p-3 flex flex-col gap-3 text-primary text-lg">
              <Link to="/search" className="hover:text-primary-hover transition-colors">
                <FaSearch className="inline mr-2" /> Search
              </Link>
              <Link to="/wishlist" className="hover:text-primary-hover transition-colors">
                <FaHeart className="inline mr-2" /> Wishlist
              </Link>
              <Link to="/contact" className="hover:text-primary-hover transition-colors">
                <FaPhone className="inline mr-2" /> Contact
              </Link>
              <Link to={accountRoute} className="hover:text-primary-hover transition-colors">
                <FaUser className="inline mr-2" /> {isAuthenticated ? "My Account" : "Login / Sign Up"}
              </Link>
              {isAdmin && (
                <>
                  <Link to="/admin/dashboard" className="hover:text-primary-hover transition-colors">
                    Admin Dashboard
                  </Link>
                  <Link to="/admin/products" className="hover:text-primary-hover transition-colors">
                    Product Management
                  </Link>
                </>
              )}
            </div>
          )}
        </div>
      </header>
    </>
  );
};

export default Navbar;