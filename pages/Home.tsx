
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MOCK_CHEFS, MOCK_REQUESTS } from '../constants';
import { CartItem } from '../types';
import { MapPin, Search, Star, Plus, ChevronRight, User, Heart, ShoppingBag, Settings, SlidersHorizontal, ChevronDown, Flame, AlertCircle } from 'lucide-react';
import Footer from '../components/Footer';

interface Props {
  addToCart: (item: CartItem) => void;
}

const Home: React.FC<Props> = ({ addToCart }) => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState<'ALL' | 'VEG' | 'NON-VEG'>('ALL');
  const [search, setSearch] = useState('');

  // Sorting Logic: Hyperlocal matching (Show chefs within 3 km radius first)
  const sortedChefs = [...MOCK_CHEFS].sort((a, b) => a.distanceValue - b.distanceValue);

  const filteredChefs = sortedChefs.filter(chef => 
    chef.name.toLowerCase().includes(search.toLowerCase()) || 
    chef.menu.some(d => d.name.toLowerCase().includes(search.toLowerCase()))
  );

  // Aggregate daily specials
  const dailySpecials = MOCK_CHEFS.flatMap(chef => 
    chef.menu.filter(dish => dish.isDailySpecial).map(dish => ({...dish, chefName: chef.name, chefId: chef.id}))
  );

  return (
    <div className="min-h-screen flex flex-col bg-stone-50">
      {/* NEW DASHBOARD HERO SECTION */}
      <div className="bg-terracotta-600 pb-8 pt-6 px-6 rounded-b-[40px] shadow-xl relative z-20">
        {/* Header Row */}
        <div className="flex justify-between items-start mb-6">
          <div className="text-white">
             <p className="text-terracotta-100 text-[10px] font-bold uppercase tracking-wider mb-1">Delivering to</p>
             <div className="flex items-center cursor-pointer group">
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center mr-2 backdrop-blur-md group-hover:bg-white/30 transition-colors">
                    <MapPin size={16} className="text-white" />
                </div>
                <div>
                    <span className="font-bold text-lg text-white leading-none block">Maple Street 24</span>
                    <span className="text-xs text-terracotta-100">Home • Within 3km</span>
                </div>
                <ChevronDown size={16} className="ml-2 text-terracotta-200 group-hover:translate-y-1 transition-transform" />
             </div>
          </div>
          <Link to="/customer-profile" className="block">
             <div className="w-12 h-12 rounded-full bg-white p-0.5 shadow-lg border-2 border-terracotta-400">
                 <img src="https://picsum.photos/100/100?random=99" alt="User" className="w-full h-full rounded-full object-cover" />
             </div>
          </Link>
        </div>

        {/* Welcome Text */}
        <h1 className="text-3xl font-extrabold text-white mb-6 leading-tight">
            HomeFudio <br/> <span className="text-terracotta-200 text-lg font-medium">Community Food Network</span>
        </h1>

        {/* Search Bar */}
        <div className="relative mb-8">
            <Search className="absolute left-4 top-4 text-stone-400" size={20} />
            <input 
                type="text" 
                placeholder="Find neighbors cooking nearby..." 
                className="w-full bg-white rounded-2xl py-4 pl-12 pr-12 text-stone-700 shadow-lg shadow-terracotta-900/10 focus:outline-none focus:ring-2 focus:ring-terracotta-400 transition-all"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
             <div className="absolute right-3 top-3 bg-stone-100 p-1.5 rounded-xl cursor-pointer hover:bg-stone-200 transition-colors text-stone-500">
                <SlidersHorizontal size={18} />
            </div>
        </div>

        {/* Quick Actions Grid */}
        <div className="grid grid-cols-4 gap-2">
            <QuickActionButton icon={<User size={20} />} label="Profile" onClick={() => navigate('/customer-profile')} />
            <QuickActionButton icon={<Heart size={20} />} label="Favorites" onClick={() => navigate('/favorites')} />
            <QuickActionButton icon={<ShoppingBag size={20} />} label="Orders" onClick={() => navigate('/orders')} />
            <QuickActionButton icon={<Settings size={20} />} label="Settings" onClick={() => navigate('/customer-profile')} />
        </div>
      </div>

      <div className="flex-1 pt-6">
        
        {/* EMERGENCY FOOD HELP / COMMUNITY ALERTS */}
        <div className="px-6 mb-8">
           <div className="flex items-center space-x-2 mb-3">
              <AlertCircle className="text-orange-500" size={20} fill="currentColor" />
              <h3 className="font-bold text-stone-800">Community Alerts</h3>
           </div>
           <div className="flex space-x-4 overflow-x-auto no-scrollbar pb-2">
              {MOCK_REQUESTS.map(req => (
                 <div key={req.id} className="min-w-[280px] bg-orange-50 border border-orange-100 p-4 rounded-2xl shadow-sm relative">
                    <div className="flex justify-between items-start mb-2">
                       <span className="text-[10px] font-bold bg-orange-200 text-orange-800 px-2 py-0.5 rounded-full">{req.urgency} URGENCY</span>
                       <span className="text-xs text-stone-400">{req.postedAt}</span>
                    </div>
                    <h4 className="font-bold text-stone-800 text-sm mb-1">{req.requesterName}</h4>
                    <p className="text-xs text-stone-600 mb-3 line-clamp-2">"{req.message}"</p>
                    <div className="flex items-center justify-between">
                       <span className="text-xs font-bold text-stone-500 flex items-center"><MapPin size={12} className="mr-1"/> {req.distance}</span>
                       <button className="bg-orange-500 text-white text-xs font-bold px-3 py-1.5 rounded-lg shadow-sm hover:bg-orange-600">Serve a Neighbor</button>
                    </div>
                 </div>
              ))}
           </div>
        </div>

        {/* Daily Specials Section */}
        <div className="pl-6 mb-8">
           <div className="flex items-center justify-between pr-6 mb-4">
              <div className="flex items-center space-x-2">
                 <Flame className="text-terracotta-500" size={20} fill="currentColor" />
                 <h3 className="font-bold text-xl text-stone-800">Daily Specials</h3>
              </div>
              <span className="text-xs text-terracotta-600 font-bold">See All</span>
           </div>
           
           <div className="flex space-x-4 overflow-x-auto no-scrollbar pb-4">
              {dailySpecials.map(dish => (
                 <div 
                   key={dish.id} 
                   onClick={() => navigate(`/dish/${dish.id}`)}
                   className="min-w-[240px] bg-white p-3 rounded-3xl shadow-sm border border-stone-100 flex flex-col cursor-pointer transition-transform hover:scale-95"
                 >
                    <div className="relative h-32 rounded-2xl overflow-hidden mb-3">
                       <img src={dish.image} alt={dish.name} className="w-full h-full object-cover" />
                       <div className="absolute top-2 left-2 bg-white/90 backdrop-blur px-2 py-1 rounded-lg text-[10px] font-bold text-terracotta-700 uppercase shadow-sm">
                          {dish.chefName}
                       </div>
                    </div>
                    <h4 className="font-bold text-stone-800 text-sm line-clamp-1">{dish.name}</h4>
                    <div className="flex justify-between items-center mt-2">
                       <span className="font-extrabold text-terracotta-600">${dish.price}</span>
                       <button 
                         onClick={(e) => {
                           e.stopPropagation();
                           addToCart({ ...dish, quantity: 1, chefId: dish.chefId, chefName: dish.chefName });
                         }}
                         className="w-8 h-8 bg-stone-800 text-white rounded-full flex items-center justify-center hover:bg-terracotta-600 transition-colors"
                       >
                          <Plus size={16} />
                       </button>
                    </div>
                 </div>
              ))}
           </div>
        </div>

        {/* Filters */}
        <div className="px-6 mb-6 flex space-x-3 overflow-x-auto no-scrollbar">
          {['ALL', 'VEG', 'NON-VEG'].map((f) => (
            <button 
              key={f}
              onClick={() => setFilter(f as any)}
              className={`px-5 py-2.5 rounded-full text-xs font-bold whitespace-nowrap transition-all ${filter === f ? 'bg-terracotta-600 text-white shadow-md transform scale-105' : 'bg-white text-stone-500 border border-stone-200 shadow-sm'}`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Support Nearby Home Chefs Feed */}
        <div className="px-6 space-y-6 pb-6">
          <div className="flex justify-between items-end mb-2">
             <div>
                <h3 className="font-bold text-xl text-stone-800">Support Nearby Home Chefs</h3>
                <p className="text-xs text-stone-400">Neighbors cooking within your radius</p>
             </div>
             <span className="text-xs text-terracotta-600 font-bold uppercase tracking-wider cursor-pointer">View Map</span>
          </div>

          {filteredChefs.map(chef => (
            <div key={chef.id} className="bg-white rounded-3xl shadow-sm overflow-hidden border border-stone-100 transition-all hover:shadow-md group relative">
              {/* Nearby Badge if < 3km */}
              {chef.distanceValue <= 3 && (
                 <div className="absolute top-0 right-0 bg-green-500 text-white text-[10px] font-bold px-3 py-1 rounded-bl-2xl z-10">
                    NEARBY
                 </div>
              )}
              
              {/* Chef Header Card */}
              <div 
                onClick={() => navigate(`/chef/${chef.id}`)}
                className="p-4 flex items-center space-x-4 cursor-pointer hover:bg-stone-50 transition-colors relative"
              >
                <div className="relative">
                  <img src={chef.image} alt={chef.name} className="w-16 h-16 rounded-2xl object-cover border-2 border-stone-100 group-hover:border-terracotta-200 transition-colors" />
                  {chef.isOnline && <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></span>}
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-lg text-stone-800 leading-tight">{chef.name}</h3>
                  <div className="flex items-center text-xs text-stone-500 space-x-3 mt-1">
                    <span className="flex items-center text-stone-800 font-bold bg-yellow-50 px-1.5 py-0.5 rounded-md"><Star size={10} fill="currentColor" className="text-yellow-500 mr-1"/>{chef.rating}</span>
                    <span className={`flex items-center font-bold ${chef.distanceValue <= 3 ? 'text-green-600' : 'text-stone-400'}`}>
                        <MapPin size={10} className="mr-1" /> {chef.distance}
                    </span>
                  </div>
                  <p className="text-xs text-terracotta-600 font-semibold mt-1.5 line-clamp-1">{chef.specialty}</p>
                </div>
                <div className="w-8 h-8 bg-stone-50 rounded-full flex items-center justify-center text-stone-400 group-hover:bg-terracotta-50 group-hover:text-terracotta-500 transition-colors">
                    <ChevronRight size={18} />
                </div>
              </div>

              {/* Featured Menu Preview */}
              <div className="px-4 pb-4">
                <div className="border-t border-stone-50 pt-3">
                   {chef.menu
                     .filter(d => filter === 'ALL' ? true : filter === 'VEG' ? d.isVeg : !d.isVeg)
                     .slice(0, 1) // Only show 1 item
                     .map(dish => (
                     <div 
                       key={dish.id} 
                       onClick={() => navigate(`/dish/${dish.id}`)}
                       className="flex items-center bg-stone-50 p-2.5 rounded-2xl cursor-pointer hover:bg-stone-100 transition-colors"
                     >
                       <img src={dish.image} alt={dish.name} className="w-10 h-10 rounded-lg object-cover" />
                       <div className="ml-3 flex-1">
                          <div className="flex justify-between items-center">
                             <h4 className="font-bold text-xs text-stone-700 line-clamp-1">{dish.name}</h4>
                             <span className="font-bold text-xs text-stone-900 bg-white px-2 py-0.5 rounded-md shadow-sm">${dish.price}</span>
                          </div>
                       </div>
                       <button 
                         onClick={(e) => {
                           e.stopPropagation();
                           addToCart({ ...dish, quantity: 1, chefId: chef.id, chefName: chef.name });
                         }}
                         className="ml-2 w-8 h-8 bg-white rounded-full shadow-sm flex items-center justify-center text-stone-600 hover:text-white hover:bg-terracotta-600 transition-colors border border-stone-100"
                       >
                         <Plus size={14} strokeWidth={3} />
                       </button>
                     </div>
                   ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
};

const QuickActionButton: React.FC<{icon: React.ReactNode, label: string, onClick: () => void}> = ({icon, label, onClick}) => (
    <button onClick={onClick} className="flex flex-col items-center justify-center p-2 rounded-2xl hover:bg-white/10 transition-colors group">
        <div className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center text-white border border-white/10 shadow-sm mb-2 group-hover:scale-105 group-hover:bg-white/20 transition-all">
            {icon}
        </div>
        <span className="text-[10px] font-bold text-terracotta-100 group-hover:text-white tracking-wide">{label}</span>
    </button>
);

export default Home;
