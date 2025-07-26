import React from 'react';

const App = () => {
  return (
    <div className="h-screen w-screen overflow-hidden flex items-center justify-center">
      <video
        className="w-full h-full object-cover"
        autoPlay
        muted
        loop
        playsInline 
      >
        <source src="/videos/TshirtVideo-vmake.mov" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default App;
