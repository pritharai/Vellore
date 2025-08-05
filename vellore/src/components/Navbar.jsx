// import React, { useState, useEffect } from "react";
// import {
//   FaPhone,
//   FaSearch,
//   FaHeart,
//   FaShoppingCart,
// } from "react-icons/fa";
// import { Link } from "react-router-dom";

// const Navbar = () => {
//   const [isScrolled, setIsScrolled] = useState(false);

//   useEffect(() => {
//     const handleScroll = () => {
//       const scrollTop = window.scrollY;
//       setIsScrolled(scrollTop > 50);
//     };
//     handleScroll()
//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   return (
//     <>
//       <header className="shadow-md max-w-[1560px] mx-auto fixed top-0 right-0 left-0 z-50 bg-white">
//         {!isScrolled && (
//           <div className="hidden md:flex justify-between items-center px-20 py-6">
//             <div className="text-6xl font-bold text-primary"><Link to="/">Vellor</Link></div>
//             <div className="flex items-center gap-6 text-2xl text-primary">
//               <Link to="/search"><FaSearch className="cursor-pointer hover:text-gray-400 transition-colors" /></Link>

//               <div className="relative cursor-pointer">
//                 <Link to="/wishlist"><FaHeart className="hover:text-gray-400 transition-colors" /></Link>

//               </div>
//               <div className="relative cursor-pointer">
//                 <Link to="/cart"><FaShoppingCart className="hover:text-gray-400 transition-colors" /></Link>

//               </div>
//               <div className="relative cursor-pointer">
//                 <Link to="/auth" className="hover:text-gray-400 transition-colors">LOGIN</Link>
//               </div>
//             </div>
//           </div>
//         )}

//         {!isScrolled && (
//           <hr className="mx-auto" width="1400" />
//         )}

//         <nav className={`hidden md:flex items-center px-20 text-md ${isScrolled ? 'justify-between py-6' : 'justify-center py-4'
//           }`}>
//           {isScrolled && (
//             <div className="text-2xl font-bold text-primary">
//               <Link to="/">Vellor</Link>
//             </div>
//           )}

//           <ul className="flex gap-6 text-primary">
//             <li className="">
//               <Link to="/" className="nav-list-item relative">HOME</Link>
//             </li>
//             <li className="hover:text-gray-400 transition-colors">
//               <Link to="/product" className="nav-list-item relative">PRODUCTS</Link>
//             </li>
//             <li className="hover:text-gray-400 transition-colors">
//               <Link to="/about" className="nav-list-item relative">ABOUT</Link>
//             </li>
//           </ul>


//           {isScrolled && (
//             <div className="flex items-center gap-4 text-xl text-primary">
//               <Link to="/search"><FaSearch className="cursor-pointer hover:text-gray-400 transition-colors" /></Link>

//               <div className="relative cursor-pointer">
//                 <Link to="/wishlist"><FaHeart className="hover:text-gray-400 transition-colors" /></Link>

//               </div>
//               <div className="relative cursor-pointer">
//                 <Link to="/cart"><FaShoppingCart className="hover:text-gray-400 transition-colors" /></Link>

//               </div>

//             </div>
//           )}
//         </nav>

//         <div className="fixed bottom-0 left-0 right-0 md:hidden bg-white z-50 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] rounded-t-xl">
//           <div className="flex justify-around items-center py-2 text-xl text-primary">
//             <Link to="/search"><FaSearch className="cursor-pointer hover:text-gray-400 transition-colors" /></Link>
//             <div className="relative">
//               <Link to="/wishlist"><FaHeart className="hover:text-gray-400 transition-colors" /></Link>
//             </div>
//             <Link to="/">
//               <div className="text-xl font-bold">Vellor</div>
//             </Link>
//             <div className="relative">
//               <Link to="/cart"><FaShoppingCart className="hover:text-gray-400 transition-colors" /></Link>
//             </div>
//             <FaPhone className="hover:text-gray-400 transition-colors" />
//           </div>
//         </div>
//       </header>

//     </>
//   );
// };

// export default Navbar;

import React, { useState, useEffect } from "react";
import { FaPhone, FaSearch, FaHeart, FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 50);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header className="shadow-md max-w-[1560px] mx-auto fixed top-0 right-0 left-0 z-50 bg-white">
        {!isScrolled && (
          <div className="hidden md:flex justify-between items-center px-20 py-6">
            <div className="text-6xl font-bold text-primary" style={{ fontFamily: 'Brittany Signature' }}>
              <Link to="/">Vellor</Link>
            </div>
            <div className="flex items-center gap-6 text-2xl text-primary">
              <Link to="/search">
                <FaSearch className="cursor-pointer hover:text-gray-400 transition-colors" />
              </Link>
              <div className="relative cursor-pointer">
                <Link to="/wishlist">
                  <FaHeart className="hover:text-gray-400 transition-colors" />
                </Link>
              </div>
              <div className="relative cursor-pointer">
                <Link to="/cart">
                  <FaShoppingCart className="hover:text-gray-400 transition-colors" />
                </Link>
              </div>
              <div className="relative cursor-pointer">
                <Link to="/auth" className="hover:text-gray-400 transition-colors">
                  LOGIN
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
          </ul>

          {isScrolled && (
            <div className="flex items-center gap-4 text-xl text-primary">
              <Link to="/search">
                <FaSearch className="cursor-pointer hover:text-gray-400 transition-colors" />
              </Link>
              <div className="relative cursor-pointer">
                <Link to="/wishlist">
                  <FaHeart className="hover:text-gray-400 transition-colors" />
                </Link>
              </div>
              <div className="relative cursor-pointer">
                <Link to="/cart">
                  <FaShoppingCart className="hover:text-gray-400 transition-colors" />
                </Link>
              </div>
            </div>
          )}
        </nav>

        <div className="fixed bottom-0 left-0 right-0 md:hidden bg-white z-50 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] rounded-t-xl">
          <div className="flex justify-around items-center py-2 text-xl text-primary">
            <Link to="/search">
              <FaSearch className="cursor-pointer hover:text-gray-400 transition-colors" />
            </Link>
            <div className="relative">
              <Link to="/wishlist">
                <FaHeart className="hover:text-gray-400 transition-colors" />
              </Link>
            </div>
            <Link to="/">
              <div className="text-xl font-bold" style={{ fontFamily: 'Brittany Signature' }}>Vellor</div>
            </Link>
            <div className="relative">
              <Link to="/cart">
                <FaShoppingCart className="hover:text-gray-400 transition-colors" />
              </Link>
            </div>
            <Link to='/contact' >
            <FaPhone className="hover:text-gray-400 transition-colors" />
            </Link>
          </div>
        </div>
      </header>
    </>
  );
};

export default Navbar;