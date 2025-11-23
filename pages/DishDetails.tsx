
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MOCK_CHEFS } from '../constants';
import { CartItem } from '../types';
import { ArrowLeft, Clock, Flame, Info, Heart, Plus, Minus } from 'lucide-react';

interface Props {
  addToCart: (item: CartItem) => void;
}

const DishDetails: React.FC<Props> = ({ addToCart }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [quantity, setQuantity] = React.useState(1);

  // Find dish and chef
  let foundDish: any = null;
  let foundChef: any = null;

  for (const chef of MOCK_CHEFS) {
    const dish = chef.menu.find(d => d.id === id);
    if (dish) {
      foundDish = dish;
      foundChef = chef;
      break;
    }
  }

  if (!foundDish || !foundChef) return <div className="p-10 text-center">Dish not found</div>;

  const handleAddToCart = () => {
    addToCart({
      ...foundDish,
      quantity: quantity,
      chefId: foundChef.id,
      chefName: foundChef.name
    });
    navigate('/cart');
  };

  return (
    <div className="bg-white min-h-screen pb-32 relative">
      {/* Image Header */}
      <div className="relative h-96 w-full">
         <img src={foundDish.image} alt={foundDish.name} className="w-full h-full object-cover" />
         <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
         <div className="absolute top-0 left-0 w-full p-6 flex justify-between items-center">
            <button 
              onClick={() => navigate(-1)}
              className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white/40 transition-colors"
            >
              <ArrowLeft size={24} />
            </button>
            <button className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white/40 transition-colors">
               <Heart size={20} />
            </button>
         </div>
      </div>

      {/* Content Content */}
      <div className="-mt-12 relative z-10 bg-white rounded-t-[40px] p-8 min-h-[400px]">
         <div className="w-16 h-1 bg-stone-200 rounded-full mx-auto mb-6"></div>
         
         <div className="flex justify-between items-start mb-2">
            <h1 className="text-2xl font-extrabold text-stone-800 leading-tight flex-1 mr-4">{foundDish.name}</h1>
            <div className="text-right">
               <span className="block text-2xl font-bold text-terracotta-600">${foundDish.price}</span>
            </div>
         </div>
         
         <div className="flex items-center space-x-4 mb-6 text-sm text-stone-500">
             {foundDish.isVeg ? 
                <span className="px-2 py-0.5 bg-green-100 text-green-700 rounded font-bold text-[10px] uppercase tracking-wider">Veg</span> : 
                <span className="px-2 py-0.5 bg-red-100 text-red-700 rounded font-bold text-[10px] uppercase tracking-wider">Non-Veg</span>
             }
             {foundDish.prepTime && (
               <span className="flex items-center"><Clock size={14} className="mr-1"/> {foundDish.prepTime}</span>
             )}
             {foundDish.calories && (
               <span className="flex items-center"><Flame size={14} className="mr-1"/> {foundDish.calories} cal</span>
             )}
         </div>

         <p className="text-stone-600 leading-relaxed mb-8">
            {foundDish.description}
         </p>

         {/* Ingredients */}
         <div className="mb-8">
            <h3 className="font-bold text-stone-800 mb-3">Ingredients</h3>
            <div className="flex flex-wrap gap-2">
               {foundDish.ingredients.map((ing: string) => (
                  <span key={ing} className="px-3 py-1.5 bg-stone-50 text-stone-600 rounded-xl text-xs font-semibold border border-stone-100">
                     {ing}
                  </span>
               ))}
            </div>
         </div>
         
         {/* Chef Info */}
         <div className="bg-stone-50 p-4 rounded-2xl flex items-center space-x-4 mb-8 cursor-pointer hover:bg-stone-100 transition-colors" onClick={() => navigate(`/chef/${foundChef.id}`)}>
             <img src={foundChef.image} alt={foundChef.name} className="w-12 h-12 rounded-full object-cover" />
             <div className="flex-1">
                <p className="text-xs text-stone-400 font-bold uppercase">Prepared by</p>
                <h4 className="font-bold text-stone-800">{foundChef.name}</h4>
             </div>
             <ArrowLeft size={18} className="rotate-180 text-stone-300" />
         </div>
      </div>

      {/* Sticky Bottom Action */}
      <div className="fixed bottom-0 left-0 w-full bg-white border-t border-stone-100 p-6 z-30 pb-8">
         <div className="flex items-center space-x-6 max-w-md mx-auto">
            <div className="flex items-center space-x-4 bg-stone-100 rounded-xl p-1">
               <button 
                 onClick={() => setQuantity(Math.max(1, quantity - 1))}
                 className="w-10 h-10 bg-white rounded-lg flex items-center justify-center text-stone-600 shadow-sm active:scale-95 transition-transform"
               >
                  <Minus size={18} />
               </button>
               <span className="font-bold text-lg w-4 text-center">{quantity}</span>
               <button 
                 onClick={() => setQuantity(quantity + 1)}
                 className="w-10 h-10 bg-white rounded-lg flex items-center justify-center text-stone-600 shadow-sm active:scale-95 transition-transform"
               >
                  <Plus size={18} />
               </button>
            </div>
            <button 
              onClick={handleAddToCart}
              className="flex-1 bg-stone-800 text-white py-4 rounded-xl font-bold text-lg shadow-lg hover:bg-stone-700 transition-colors flex items-center justify-center space-x-2"
            >
              <span>Add to Order</span>
              <span className="bg-white/20 px-2 py-0.5 rounded text-sm ml-2">${(foundDish.price * quantity).toFixed(2)}</span>
            </button>
         </div>
      </div>
    </div>
  );
};

export default DishDetails;