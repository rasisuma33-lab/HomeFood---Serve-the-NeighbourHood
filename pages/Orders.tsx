import React from 'react';
import { CheckCircle } from 'lucide-react';
import Footer from '../components/Footer';

const Orders: React.FC = () => {
  return (
    <div className="bg-stone-50 min-h-screen flex flex-col">
       <div className="p-6 bg-white shadow-sm rounded-b-[32px] mb-6 sticky top-0 z-10">
        <h1 className="text-2xl font-bold text-stone-800">Your Orders</h1>
        <p className="text-xs text-stone-400">Track your yummy food</p>
      </div>

      <div className="px-6 space-y-6 flex-1">
        {/* Active Order */}
        <div className="bg-white p-6 rounded-3xl shadow-md border-l-4 border-terracotta-500">
           <div className="flex justify-between items-start mb-4">
             <div>
                <h3 className="font-bold text-lg text-stone-800">Order #8821</h3>
                <p className="text-xs text-stone-500">From Aisha Khan • Today, 12:30 PM</p>
             </div>
             <span className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-xs font-bold animate-pulse">
               Preparing
             </span>
           </div>
           
           <div className="space-y-4">
             {/* Progress Bar */}
             <div className="relative pt-1">
               <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-stone-100">
                 <div style={{ width: "60%" }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-terracotta-500"></div>
               </div>
               <div className="flex justify-between text-xs text-stone-400 font-bold">
                  <span>Accepted</span>
                  <span className="text-terracotta-600">Cooking</span>
                  <span>Delivery</span>
               </div>
             </div>
             
             <div className="flex items-center space-x-3 p-3 bg-stone-50 rounded-xl">
                <img src="https://picsum.photos/400/300?random=10" className="w-12 h-12 rounded-lg object-cover" alt="Dish" />
                <div className="flex-1">
                  <p className="font-bold text-sm text-stone-700">Home-Style Chicken Biryani x1</p>
                  <p className="text-xs text-stone-500">$12.50</p>
                </div>
             </div>
           </div>
        </div>

        {/* Past Order */}
        <div className="bg-white p-6 rounded-3xl shadow-sm opacity-70 grayscale hover:grayscale-0 transition-all">
           <div className="flex justify-between items-start mb-4">
             <div>
                <h3 className="font-bold text-lg text-stone-800">Order #8805</h3>
                <p className="text-xs text-stone-500">From Sarah Jenkins • Yesterday</p>
             </div>
             <span className="bg-stone-100 text-stone-600 px-3 py-1 rounded-full text-xs font-bold flex items-center">
               <CheckCircle size={12} className="mr-1" /> Delivered
             </span>
           </div>
            <div className="flex items-center space-x-3 p-3 bg-stone-50 rounded-xl">
                <img src="https://picsum.photos/400/300?random=13" className="w-12 h-12 rounded-lg object-cover" alt="Dish" />
                <div className="flex-1">
                  <p className="font-bold text-sm text-stone-700">Apple Pie Slice x2</p>
                  <p className="text-xs text-stone-500">$13.00</p>
                </div>
             </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Orders;