import React from 'react';
import { CartItem } from '../types';
import { Minus, Plus, Trash2, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Props {
  cart: CartItem[];
  removeFromCart: (id: string) => void;
  clearCart: () => void;
}

const Cart: React.FC<Props> = ({ cart, removeFromCart, clearCart }) => {
  const navigate = useNavigate();
  const subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const deliveryFee = 2.50;
  const total = subtotal + deliveryFee;

  if (cart.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-screen px-6">
        <div className="w-24 h-24 bg-stone-100 rounded-full flex items-center justify-center mb-6">
          <Trash2 size={32} className="text-stone-300" />
        </div>
        <h2 className="text-xl font-bold text-stone-800">Your Plate is Empty</h2>
        <p className="text-stone-500 text-center mt-2 mb-8">Looks like you haven't added any homemade goodness yet.</p>
        <button 
          onClick={() => navigate('/home')}
          className="px-8 py-3 bg-terracotta-600 text-white rounded-2xl font-bold shadow-lg"
        >
          Explore Food
        </button>
      </div>
    );
  }

  return (
    <div className="pb-32 bg-stone-50 min-h-screen">
      <div className="p-6 bg-white shadow-sm rounded-b-[32px] mb-6">
        <h1 className="text-2xl font-bold text-stone-800">Your Cart</h1>
        <p className="text-stone-400 text-sm">{cart.length} items from neighbors</p>
      </div>

      <div className="px-6 space-y-4">
        {cart.map(item => (
          <div key={item.id} className="bg-white p-4 rounded-2xl shadow-sm flex items-center justify-between">
            <div className="flex items-center space-x-3">
               <img src={item.image} alt={item.name} className="w-16 h-16 rounded-xl object-cover" />
               <div>
                 <h4 className="font-bold text-stone-800 text-sm">{item.name}</h4>
                 <p className="text-xs text-stone-500">by {item.chefName}</p>
                 <p className="text-terracotta-600 font-bold text-sm mt-1">${item.price}</p>
               </div>
            </div>
            <div className="flex items-center space-x-3">
              <span className="font-bold text-stone-800">x{item.quantity}</span>
              <button onClick={() => removeFromCart(item.id)} className="text-stone-300 hover:text-red-500">
                <Trash2 size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Bill Details */}
      <div className="px-6 mt-8">
        <div className="bg-white p-6 rounded-3xl shadow-sm">
          <h3 className="font-bold text-stone-800 mb-4">Bill Details</h3>
          <div className="space-y-2 text-sm text-stone-600">
            <div className="flex justify-between">
              <span>Item Total</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Delivery Fee</span>
              <span>${deliveryFee.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-stone-300">
              <span>Platform Fee</span>
              <span>$0.00</span>
            </div>
            <div className="border-t border-stone-100 my-2 pt-2 flex justify-between font-bold text-lg text-stone-800">
              <span>Total Pay</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Checkout Bar */}
      <div className="fixed bottom-20 left-0 w-full px-6 z-40">
        <button 
          onClick={() => { clearCart(); navigate('/orders'); }}
          className="w-full bg-stone-800 text-white p-4 rounded-2xl shadow-xl flex items-center justify-between"
        >
          <div className="text-left">
            <span className="block text-xs text-stone-400">Total</span>
            <span className="font-bold text-lg">${total.toFixed(2)}</span>
          </div>
          <div className="flex items-center space-x-2 font-bold">
            <span>Place Order</span>
            <ArrowRight size={18} />
          </div>
        </button>
      </div>
    </div>
  );
};

export default Cart;