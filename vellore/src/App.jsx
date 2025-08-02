import React from 'react';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import ProductDetail from './components/ProductDetails';
import Cart from './components/Cart';
import Wishlist from './components/Wishlist';
import Testimonials from './components/Testimonials';
import ProductBanner from './components/ProductsBanner';
import Products from './components/Product';


const App = () => {
  return (
    <>
      <Navbar />
      <div>
        {/* <Home/> */}
        {/* <ProductDetail/> */}
        {/* <Cart/> */}
        {/* <Wishlist/> */}
        <ProductBanner />
        <Products />
      </div>
    </>
  );
};

export default App;
