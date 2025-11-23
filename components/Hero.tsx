import React from 'react';

const Hero: React.FC = () => {
  return (
    <div className="relative h-48 mx-6 mt-4 rounded-3xl overflow-hidden shadow-lg group">
      <img 
        src="https://images.unsplash.com/photo-1543339308-43e59d6b73a6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
        alt="Home cooking" 
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent flex items-center p-6">
        <div className="text-white max-w-[240px]">
          <div className="inline-block px-2 py-1 bg-terracotta-600 text-[10px] font-bold uppercase tracking-wider rounded-md mb-2">
            Featured
          </div>
          <h2 className="text-2xl font-extrabold leading-tight mb-2 font-serif">Taste the Love of Home</h2>
          <p className="text-xs text-warm-50 opacity-90 font-semibold leading-relaxed">
            Order fresh, safe, and delicious meals from your neighbors today.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Hero;