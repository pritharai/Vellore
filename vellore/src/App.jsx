import React from 'react';
import Navbar from './components/Navbar';
import Home from './pages/Home';

import Testimonials from './components/Testimonials';

import ProductDetail from './components/ProductDetails';



const App = () => {
  return (
    <>
     <Navbar/>

      <Home/>
      <Testimonials/>

     <div>
      {/* <Home/> */}
      {/* <ProductDetail/> */}
      {/* <Wishlist/> */}
      <Cart/>
     </div>

    </>
  );
};

export default App;
