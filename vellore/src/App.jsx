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
import ShippingPolicy from './components/ShippingPolicy'; 

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
                <Route path="*" element={<h2 className="text-center mt-10">404 - Page Not Found</h2>} />
              </Routes>
              <Footer />
            </>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
