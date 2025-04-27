import React from 'react';

const Hero: React.FC = () => {
  return (
    <section className="bg-green-700 text-white relative overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-30"
        style={{ 
          backgroundImage: 'url(https://images.pexels.com/photos/6195328/pexels-photo-6195328.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)' 
        }}
      ></div>
      
      <div className="container mx-auto px-4 py-16 md:py-24 relative z-10 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">
          TRASHURE BLOG
        </h1>
        <p className="text-xl max-w-2xl mx-auto leading-relaxed">
          Discover innovative ways to reduce, reuse, and recycle as we guide you through the journey to a greener future
        </p>
      </div>
    </section>
  );
};

export default Hero;