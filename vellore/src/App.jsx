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

import AboutPage from './pages/AboutPage';
import Footer from './components/Footer';
import AuthPage from './pages/AuthPage';

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Auth Page — no navbar/footer */}
        <Route path="/auth" element={<AuthPage />} />

        {/* Other routes — include navbar/footer */}
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
