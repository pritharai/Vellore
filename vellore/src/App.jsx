import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './index.css'
import Hero from './components/Hero.jsx'
import ScrollToTop from './components/ScrolltoTop.jsx' 
import Navbar from './components/Navbar.jsx'

function App() {

  return (
     <div className="App">
      <Navbar/>
      <Hero/>
      <ScrollToTop/>
    </div>
  )
}

export default App
