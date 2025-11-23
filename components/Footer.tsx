
import React from 'react';
import { Heart } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-stone-100 pt-10 pb-24 px-6 text-center mt-12 rounded-t-[32px] border-t border-stone-200">
      <div className="mb-6">
        <h4 className="font-bold text-stone-700 text-lg mb-2">HomeFudio</h4>
        <p className="text-sm text-stone-500 flex items-center justify-center">
          Building stronger communities through food <Heart size={12} className="ml-1 text-terracotta-500" fill="currentColor" />
        </p>
      </div>
      
      <div className="grid grid-cols-2 gap-4 text-sm text-stone-500 font-semibold mb-8 max-w-xs mx-auto">
        <a href="#" className="hover:text-terracotta-600 transition-colors">About Us</a>
        <a href="#" className="hover:text-terracotta-600 transition-colors">Safety Standards</a>
        <a href="#" className="hover:text-terracotta-600 transition-colors">Be a Chef</a>
        <a href="#" className="hover:text-terracotta-600 transition-colors">Community</a>
      </div>

      <div className="border-t border-stone-200 pt-6">
        <p className="text-[10px] text-stone-400 uppercase tracking-widest">
          © 2024 HomeFudio. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
