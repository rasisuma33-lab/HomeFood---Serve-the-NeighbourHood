import React from 'react';
import { useNavigate } from 'react-router-dom';
import { User, MapPin, CreditCard, Bell, Shield, HelpCircle, ChevronRight, LogOut, Heart } from 'lucide-react';
import Footer from '../components/Footer';

const CustomerProfile: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-stone-50 min-h-screen">
      {/* Profile Header */}
      <div className="relative bg-white pb-10 rounded-b-[40px] shadow-lg overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-32 bg-terracotta-600" />
        
        <div className="relative pt-16 px-6 flex flex-col items-center text-center">
          <div className="w-28 h-28 rounded-full p-1 bg-white shadow-xl mb-4">
             <img 
               src="https://picsum.photos/200/200?random=99" 
               alt="Profile" 
               className="w-full h-full rounded-full object-cover border-4 border-stone-100" 
             />
          </div>
          <h1 className="text-2xl font-bold text-stone-800">Julia Roberts</h1>
          <p className="text-stone-500 font-medium">Food Lover • Joined Oct 2023</p>
          
          <div className="flex items-center justify-center space-x-6 mt-6 w-full max-w-xs">
            <div className="text-center">
              <span className="block text-xl font-bold text-terracotta-600">12</span>
              <span className="text-xs text-stone-400 font-bold uppercase tracking-wider">Orders</span>
            </div>
            <div className="w-px h-8 bg-stone-200"></div>
            <div className="text-center">
              <span className="block text-xl font-bold text-terracotta-600">5</span>
              <span className="text-xs text-stone-400 font-bold uppercase tracking-wider">Favorites</span>
            </div>
            <div className="w-px h-8 bg-stone-200"></div>
             <div className="text-center">
              <span className="block text-xl font-bold text-terracotta-600">2</span>
              <span className="text-xs text-stone-400 font-bold uppercase tracking-wider">Reviews</span>
            </div>
          </div>
        </div>
      </div>

      {/* Options List */}
      <div className="px-6 py-8 space-y-4">
        <h3 className="text-stone-800 font-bold text-lg px-2">Account Settings</h3>
        
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <button onClick={() => navigate('/orders')} className="w-full p-4 flex items-center justify-between border-b border-stone-50 hover:bg-stone-50 transition-colors">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center text-orange-600">
                <User size={20} />
              </div>
              <span className="font-bold text-stone-700">Personal Information</span>
            </div>
            <ChevronRight size={18} className="text-stone-300" />
          </button>
          
          <button className="w-full p-4 flex items-center justify-between border-b border-stone-50 hover:bg-stone-50 transition-colors">
             <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
                <MapPin size={20} />
              </div>
              <span className="font-bold text-stone-700">Saved Addresses</span>
            </div>
            <ChevronRight size={18} className="text-stone-300" />
          </button>
          
           <button className="w-full p-4 flex items-center justify-between hover:bg-stone-50 transition-colors">
             <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-green-600">
                <CreditCard size={20} />
              </div>
              <span className="font-bold text-stone-700">Payment Methods</span>
            </div>
            <ChevronRight size={18} className="text-stone-300" />
          </button>
        </div>

        <h3 className="text-stone-800 font-bold text-lg px-2 mt-6">Support</h3>
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
           <button className="w-full p-4 flex items-center justify-between border-b border-stone-50 hover:bg-stone-50 transition-colors">
             <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center text-purple-600">
                <Shield size={20} />
              </div>
              <span className="font-bold text-stone-700">Safety Center</span>
            </div>
            <ChevronRight size={18} className="text-stone-300" />
          </button>
           <button className="w-full p-4 flex items-center justify-between hover:bg-stone-50 transition-colors">
             <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center text-yellow-600">
                <HelpCircle size={20} />
              </div>
              <span className="font-bold text-stone-700">Help & FAQ</span>
            </div>
            <ChevronRight size={18} className="text-stone-300" />
          </button>
        </div>

        <button onClick={() => navigate('/')} className="w-full mt-6 p-4 bg-stone-200 text-stone-600 font-bold rounded-2xl flex items-center justify-center space-x-2 hover:bg-red-100 hover:text-red-600 transition-colors">
          <LogOut size={20} />
          <span>Log Out</span>
        </button>
      </div>

      <Footer />
    </div>
  );
};

export default CustomerProfile;