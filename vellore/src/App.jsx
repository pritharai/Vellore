import React from 'react';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import ProductDetail from './components/ProductDetails';


const App = () => {
  return (
    <>
     <Navbar/>
     <div>
      {/* <Home/> */}
      <ProductDetail/>
     </div>
    </>
  );
};

export default App;
