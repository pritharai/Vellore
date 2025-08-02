import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import ProductDetail from './components/ProductDetails';
import Cart from './components/Cart';
import Wishlist from './components/Wishlist';
import Testimonials from './components/Testimonials';
import ProductBanner from './components/ProductsBanner';
import Products from './components/Product';

import About from './components/About';

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        {/* Home page (root) */}
        <Route path="/" element={<Home />} />
        
        {/* Individual routes */}
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/testimonials" element={<Testimonials />} />
        <Route path="/products-banner" element={<ProductBanner />} />
        <Route path="/products" element={<Products />} />
        <Route path="/about" element={<About/>} />

        {/* Optional: Add a fallback 404 route */}
        <Route path="*" element={<h2 className="text-center mt-10">404 - Page Not Found</h2>} />
      </Routes>
    </Router>

  );
};

export default App;
