import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MOCK_CHEFS } from '../constants';
import { CartItem } from '../types';
import { Star, MapPin, Clock, Award, ArrowLeft, Plus } from 'lucide-react';
import Footer from '../components/Footer';

interface Props {
  addToCart: (item: CartItem) => void;
}

const ChefDetails: React.FC<Props> = ({ addToCart }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const chef = MOCK_CHEFS.find(c => c.id === id);

  if (!chef) return <div>Chef not found</div>;

  return (
    <div className="bg-stone-50 min-h-screen pb-24">
      {/* Hero Header */}
      <div className="relative h-64">
        <img src={chef.image} className="w-full h-full object-cover filter blur-sm brightness-50" alt="Background" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        
        <button 
          onClick={() => navigate(-1)}
          className="absolute top-4 left-4 w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white/40 transition-colors"
        >
          <ArrowLeft size={24} />
        </button>

        <div className="absolute -bottom-12 left-6 right-6">
           <div className="bg-white rounded-3xl p-6 shadow-lg flex items-start space-x-4">
              <img src={chef.image} alt={chef.name} className="w-20 h-20 rounded-2xl object-cover border-4 border-white shadow-sm -mt-10" />
              <div className="flex-1 pt-1">
                 <h1 className="text-xl font-bold text-stone-800 leading-tight">{chef.name}</h1>
                 <p className="text-terracotta-600 font-bold text-sm">{chef.specialty}</p>
                 <div className="flex items-center text-stone-400 text-xs mt-2 space-x-3">
                    <span className="flex items-center"><Star size={12} className="mr-1 text-yellow-400" fill="currentColor" /> {chef.rating}</span>
                    <span className="flex items-center"><MapPin size={12} className="mr-1" /> {chef.distance}</span>
                 </div>
              </div>
           </div>
        </div>
      </div>

      {/* Bio Section */}
      <div className="mt-16 px-6">
         <div className="flex flex-wrap gap-2 mb-4">
            {chef.badges.map(badge => (
              <span key={badge} className="px-3 py-1 bg-olive-100 text-olive-700 rounded-full text-[10px] font-bold uppercase tracking-wider flex items-center">
                <Award size={12} className="mr-1" /> {badge}
              </span>
            ))}
         </div>
         <p className="text-stone-600 text-sm leading-relaxed italic">"{chef.bio}"</p>
      </div>

      {/* Menu Section */}
      <div className="mt-8 px-6">
        <h3 className="font-bold text-lg text-stone-800 mb-4">Menu</h3>
        <div className="space-y-4">
          {chef.menu.map(dish => (
            <div key={dish.id} className="bg-white p-4 rounded-2xl shadow-sm border border-stone-100 flex space-x-4">
              <img src={dish.image} alt={dish.name} className="w-24 h-24 rounded-xl object-cover" />
              <div className="flex-1 flex flex-col justify-between">
                <div>
                   <div className="flex justify-between items-start">
                      <h4 className="font-bold text-stone-800 text-sm line-clamp-1">{dish.name}</h4>
                      {dish.isVeg ? 
                        <div className="w-2 h-2 rounded-full bg-green-500 mt-1" title="Veg" /> : 
                        <div className="w-2 h-2 rounded-full bg-red-500 mt-1" title="Non-Veg" />
                      }
                   </div>
                   <p className="text-xs text-stone-400 mt-1 line-clamp-2">{dish.description}</p>
                </div>
                <div className="flex justify-between items-end mt-2">
                   <span className="font-bold text-lg text-stone-800">${dish.price.toFixed(2)}</span>
                   <button 
                     onClick={() => addToCart({ ...dish, quantity: 1, chefId: chef.id, chefName: chef.name })}
                     className="px-4 py-2 bg-stone-100 text-stone-600 rounded-xl font-bold text-xs flex items-center hover:bg-terracotta-600 hover:text-white transition-colors"
                   >
                     <Plus size={14} className="mr-1" /> Add
                   </button>
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

export default ChefDetails;