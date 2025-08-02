import React from 'react';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import ProductDetail from './components/ProductDetails';
import Cart from './components/Cart';
import Wishlist from './components/Wishlist';
import Testimonials from './components/Testimonials';


const App = () => {
  return (
    <>
     <Navbar/>
     <div>
      <Home/>
      <ProductDetail/>
      <Cart/>
      <Wishlist/>
     </div>
    </>
  );
};

export default App;
