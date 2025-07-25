import React from "react";

const Hero = () => {
  return (
    <section className="relative h-screen w-full">
      {/* Video Background */}
      <video className="absolute inset-0 w-full h-full object-cover" autoPlay muted loop playsInline>
        <source src="/videos/TshirtVideo-vmake.mov" type="video/mp4"></source>
      </video>
   
      {/* Semi-transparent overlay - placed between video and content */}
      {/* <div className="absolute inset-0 bg-black bg-opacity-40"></div> */}
      {/* Adjust bg-opacity value (10-90) to control darkness */}

      {/* Content - z-10 ensures it stays above the overlay */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center px-6">
        <h1 className="text-6xl md:text-6xl font-bold mb-4 text-red-800">Vellore</h1>
        <h4 className="text-2xl md:text-3xl font-bold mb-8 text-orange-800">Every Fit Tells a Story</h4>
        <div className="flex gap-6">
          <button className="border-2 border-red-500 text-red-500 px-6 py-2 rounded-full hover:bg-red-600 hover:text-white transition">
            Shop Now
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;