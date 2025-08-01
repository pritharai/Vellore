import React from 'react';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Testimonials from './components/Testimonials';


const App = () => {
  return (
    <>
     <Navbar/>
      <Home/>
      <Testimonials/>
    </>
  );
};

export default App;
