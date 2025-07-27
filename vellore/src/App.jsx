import React from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';

const App = () => {
  return (
    <>
     <Navbar/>
      <HeroSection/>
      <div className='h-400'></div>
    </>
  );
};

export default App;
