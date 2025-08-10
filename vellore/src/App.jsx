import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';

import Home from './pages/Home';
import ProductDetail from './components/ProductDetails';
import Cart from './components/Cart';
import Wishlist from './components/Wishlist';
import Testimonials from './components/Testimonials';
import ProductBanner from './components/ProductsBanner';
import Products from './components/Product';
import AboutPage from './pages/AboutPage';
import Contact from './components/Contact';
import AuthPage from './pages/AuthPage';
import ShippingPolicy from './pages/ShippingPolicy';
import FAQs from "./pages/Faq";
import MyAccount from './pages/MyAccount';

import { FaInstagram } from 'react-icons/fa';

import InstagramButton from './components/Insta';

const App = () => {
  return (
    <Router>
      <ScrollToTop />

      <Routes>
        {/* Auth page without Navbar/Footer */}
        <Route path="/auth" element={<AuthPage />} />

        {/* All other pages with Navbar/Footer layout */}
        <Route
          path="*"
          element={
            <>
              <Navbar />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/product/:id" element={<ProductDetail />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/wishlist" element={<Wishlist />} />
                <Route path="/testimonials" element={<Testimonials />} />
                <Route path="/products-banner" element={<ProductBanner />} />
                <Route path="/products" element={<Products />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/shipping" element={<ShippingPolicy />} />
                <Route path="/faqs" element={<FAQs />} />
                <Route path="/my-account" element={<MyAccount />} />
                <Route path="*" element={<h2 className="text-center mt-10">404 - Page Not Found</h2>} />
              </Routes>
              <InstagramButton /> {/* Added here so it shows on all pages */}
              <Footer />
            </>
          }
        />
      </Routes>

      {/* Glow animation */}
      <style>
        {`
          @keyframes pulseGlow {
            0% { transform: scale(1); filter: drop-shadow(0 0 6px rgba(255, 105, 180, 0.8)); }
            50% { transform: scale(1.1); filter: drop-shadow(0 0 12px rgba(255, 105, 180, 1)); }
            100% { transform: scale(1); filter: drop-shadow(0 0 6px rgba(255, 105, 180, 0.8)); }
          }
        `}
      </style>
    </Router>
  );
};

export default App;
