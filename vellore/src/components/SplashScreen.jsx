import React, { useEffect, useState } from 'react';

const SplashScreen = () => {
  const [particles, setParticles] = useState([]);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Generate particles
    const particleArray = [];
    for (let i = 0; i < 15; i++) {
      particleArray.push({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 8,
        size: Math.random() * 3 + 2
      });
    }
    setParticles(particleArray);

    // Simulate progress
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + Math.random() * 15 + 5;
      });
    }, 300);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-light/30 via-white to-primary-light/30 flex justify-center items-center overflow-hidden relative">
      
      {/* Floating Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {particles.map(particle => (
          <div
            key={particle.id}
            className="absolute rounded-full bg-primary bg-opacity-60 animate-bounce"
            style={{
              left: `${particle.left}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              animationDelay: `${particle.delay}s`,
              animationDuration: '8s',
              animationIterationCount: 'infinite',
              animationTimingFunction: 'ease-in-out'
            }}
          />
        ))}
      </div>

      {/* Main Loader Container */}
      <div className="text-center relative z-10">
        
        {/* Brand Name */}
        <div className="text-4xl md:text-5xl font-bold text-primary mb-8 tracking-widest opacity-0 animate-pulse" style={{ fontFamily: 'Brittany Signature' }}>
          <span className="inline-block animate-bounce" style={{ animationDelay: '0.5s', animationFillMode: 'forwards' }}>
            Vellor
          </span>
        </div>

        {/* Loader Wrapper */}
        <div className="relative w-32 h-32 mx-auto mb-8">
          
          {/* Orbit Rings */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 border-2 border-primary border-opacity-30 rounded-full animate-spin" style={{ animationDuration: '3s' }}>
            <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-primary rounded-full shadow-lg shadow-white/80" />
          </div>
          
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-36 h-36 border-2 border-primary border-opacity-30 rounded-full animate-spin" style={{ animationDuration: '4s', animationDirection: 'reverse' }}>
            <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg- rounded-full shadow-lg shadow-white/80" />
          </div>

          {/* Shopping Bag */}
          <div className="relative z-20 w-16 h-20 mx-auto animate-bounce" style={{ animationDuration: '2s' }}>
            {/* Bag Handle */}
            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 w-10 h-5 border-3 border-primary border-b-0 rounded-t-2xl bg-transparent" />
            
            {/* Bag Body */}
            <div className="w-16 h-14 bg-primary rounded-b-lg relative">
              {/* Bag Items */}
              <div className="absolute top-3 left-1/2 transform -translate-x-1/2 flex space-x-1">
                <div className="w-2 h-2 bg-white rounded-full animate-pulse" style={{ animationDelay: '0s' }} />
                <div className="w-2 h-2 bg-white rounded-full animate-pulse" style={{ animationDelay: '0.2s' }} />
                <div className="w-2 h-2 bg-white rounded-full animate-pulse" style={{ animationDelay: '0.4s' }} />
              </div>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-48 md:w-64 h-1 bg-white bg-opacity-30 rounded-full mx-auto mb-4 overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-primary-hover via-white to-primary-light rounded-full transition-all duration-300 ease-out"
            style={{ width: `${Math.min(progress, 100)}%` }}
          />
        </div>

        {/* Loading Text */}
        <div className="text-primary text-lg opacity-80 animate-pulse" style={{ animationDuration: '2s' }}>
          Loading your shopping experience...
        </div>

        {/* Percentage Display */}
        <div className="text-primary text-sm mt-2 opacity-60">
          {Math.floor(progress)}%
        </div>
      </div>

      {/* Additional Floating Elements */}
      <div className="absolute top-20 left-20 w-4 h-4 bg-white bg-opacity-40 rounded-full animate-ping" style={{ animationDelay: '1s' }} />
      <div className="absolute bottom-32 right-16 w-3 h-3 bg-pink-300 bg-opacity-50 rounded-full animate-ping" style={{ animationDelay: '2s' }} />
      <div className="absolute top-1/3 right-20 w-2 h-2 bg-blue-300 bg-opacity-60 rounded-full animate-ping" style={{ animationDelay: '0.5s' }} />
      <div className="absolute bottom-20 left-32 w-3 h-3 bg-purple-300 bg-opacity-50 rounded-full animate-ping" style={{ animationDelay: '1.5s' }} />
    </div>
  );
};

export default SplashScreen;