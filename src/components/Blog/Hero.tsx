import React from 'react';

const Hero: React.FC = () => {
  return (
    <section className="text-white relative overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ 
          backgroundImage: 'url(https://cdn.prod.website-files.com/637b744b358cdaf264dbff82/6721f71ca7c82c886f10e1a4_eco-friendly-home-products-on-a-bamboo-leaf.webp)',
          backgroundSize: '125%'
        }}
      ></div>
      
      <div className="container mx-auto px-4 py-16 md:py-44  relative z-10 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-4 tracking-tight text-[#EDF1D6]">
          TRASHURE BLOG
        </h1>
        <p className="text-2xl max-w-2xl mx-auto leading-relaxed text-center text-[#EDF1D6]">
          Stay informed, shop smarter, and<br />
          join us on the journey to a greener future!
      </p>
      </div>
    </section>
  );
};

export default Hero;