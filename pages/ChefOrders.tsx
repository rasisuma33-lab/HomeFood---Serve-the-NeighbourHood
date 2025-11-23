
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin, Phone, Check, X, Clock, ShoppingBag } from 'lucide-react';
import { Order } from '../types';

// Mock Data for Chef View
const MOCK_ORDERS: Order[] = [
  {
    id: '8824',
    date: 'Today, 12:45 PM',
    status: 'Pending',
    total: 24.50,
    chefName: 'Me',
    customerName: 'Julia Roberts',
    customerAddress: '24 Maple Street (0.5km)',
    deliveryType: 'Delivery',
    items: [
      { id: 'd1', name: 'Chicken Biryani', quantity: 2, price: 12.25, description: '', image: 'https://picsum.photos/400/300?random=10', isVeg: false, availableQty: 10, ingredients: [], chefId: '1', chefName: 'Me' }
    ]
  },
  {
    id: '8821',
    date: 'Today, 12:30 PM',
    status: 'Preparing',
    total: 12.50,
    chefName: 'Me',
    customerName: 'Tom Hanks',
    customerAddress: 'Pickup',
    deliveryType: 'Pickup',
    items: [
      { id: 'd1', name: 'Chicken Biryani', quantity: 1, price: 12.50, description: '', image: 'https://picsum.photos/400/300?random=10', isVeg: false, availableQty: 10, ingredients: [], chefId: '1', chefName: 'Me' }
    ]
  }
];

const ChefOrders: React.FC = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState<Order[]>(MOCK_ORDERS);
  
  // Confirmation Dialog State
  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
  const [actionType, setActionType] = useState<'ACCEPT' | 'REJECT' | null>(null);

  const handleActionClick = (orderId: string, type: 'ACCEPT' | 'REJECT') => {
    setSelectedOrderId(orderId);
    setActionType(type);
    setShowConfirm(true);
  };

  const confirmAction = () => {
    if (selectedOrderId && actionType) {
      setOrders(prev => prev.map(o => {
        if (o.id === selectedOrderId) {
          return { ...o, status: actionType === 'ACCEPT' ? 'Accepted' : 'Cancelled' };
        }
        return o;
      }));
    }
    setShowConfirm(false);
    setSelectedOrderId(null);
    setActionType(null);
  };

  return (
    <div className="bg-stone-50 min-h-screen flex flex-col relative">
      {/* Header */}
      <div className="bg-white p-6 rounded-b-[32px] shadow-sm sticky top-0 z-10">
        <div className="flex items-center space-x-4">
          <button onClick={() => navigate('/chef-dashboard')} className="w-10 h-10 bg-stone-100 rounded-full flex items-center justify-center text-stone-600 transition-colors hover:bg-stone-200">
             <ArrowLeft size={20} />
          </button>
          <div>
             <h1 className="text-xl font-bold text-stone-800">Incoming Orders</h1>
             <p className="text-xs text-stone-400">Manage your kitchen flow</p>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6 flex-1">
        {orders.map(order => (
          <div key={order.id} className={`bg-white rounded-3xl shadow-sm overflow-hidden border-l-4 ${order.status === 'Pending' ? 'border-yellow-400' : order.status === 'Cancelled' ? 'border-red-400' : 'border-green-500'}`}>
             {/* Order Header */}
             <div className="p-4 bg-stone-50 border-b border-stone-100 flex justify-between items-center">
                <div>
                   <span className="font-bold text-stone-800 text-lg">#{order.id}</span>
                   <p className="text-xs text-stone-500">{order.date}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                  order.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' :
                  order.status === 'Preparing' ? 'bg-orange-100 text-orange-700' :
                  order.status === 'Accepted' ? 'bg-blue-100 text-blue-700' :
                  'bg-stone-200 text-stone-600'
                }`}>
                  {order.status}
                </span>
             </div>

             {/* Order Details */}
             <div className="p-4">
                {/* Customer Info */}
                <div className="flex items-start mb-4 pb-4 border-b border-stone-50 border-dashed">
                   <div className="flex-1">
                      <h4 className="font-bold text-stone-700">{order.customerName}</h4>
                      <div className="flex items-center text-xs text-stone-500 mt-1">
                        {order.deliveryType === 'Delivery' ? <MapPin size={12} className="mr-1"/> : <ShoppingBag size={12} className="mr-1"/>}
                        <span>{order.customerAddress}</span>
                      </div>
                   </div>
                   <button className="w-8 h-8 bg-green-100 text-green-600 rounded-full flex items-center justify-center hover:bg-green-200 transition-colors">
                      <Phone size={14} />
                   </button>
                </div>

                {/* Items */}
                <div className="space-y-2 mb-4">
                   {order.items.map((item, idx) => (
                     <div key={idx} className="flex justify-between text-sm">
                        <span className="text-stone-600"><span className="font-bold text-stone-800">x{item.quantity}</span> {item.name}</span>
                        <span className="font-bold text-stone-800">${(item.price * item.quantity).toFixed(2)}</span>
                     </div>
                   ))}
                </div>

                {/* Total */}
                <div className="flex justify-between items-center font-bold text-stone-800 text-lg mb-4">
                   <span>Total Bill</span>
                   <span>${order.total.toFixed(2)}</span>
                </div>

                {/* Actions */}
                {order.status === 'Pending' && (
                  <div className="flex space-x-3">
                    <button 
                      onClick={() => handleActionClick(order.id, 'REJECT')}
                      className="flex-1 py-3 border-2 border-red-100 text-red-500 rounded-xl font-bold flex items-center justify-center space-x-2 hover:bg-red-50 transition-colors"
                    >
                      <X size={18} /> <span>Reject</span>
                    </button>
                    <button 
                      onClick={() => handleActionClick(order.id, 'ACCEPT')}
                      className="flex-1 py-3 bg-green-500 text-white rounded-xl font-bold flex items-center justify-center space-x-2 hover:bg-green-600 shadow-lg shadow-green-200 transition-colors"
                    >
                      <Check size={18} /> <span>Accept Order</span>
                    </button>
                  </div>
                )}

                 {order.status === 'Accepted' && (
                   <button 
                     onClick={() => setOrders(prev => prev.map(o => o.id === order.id ? { ...o, status: 'Preparing' } : o))}
                     className="w-full py-3 bg-terracotta-600 text-white rounded-xl font-bold flex items-center justify-center space-x-2 hover:bg-terracotta-700 transition-colors"
                   >
                     <Clock size={18} /> <span>Start Preparing</span>
                   </button>
                 )}
                 
                 {order.status === 'Preparing' && (
                   <button 
                     className="w-full py-3 bg-stone-800 text-white rounded-xl font-bold flex items-center justify-center space-x-2"
                   >
                     <Check size={18} /> <span>Mark Ready</span>
                   </button>
                 )}
             </div>
          </div>
        ))}
      </div>

      {/* Confirmation Modal */}
      {showConfirm && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-6 animate-in fade-in duration-200">
           <div className="bg-white rounded-3xl p-6 w-full max-w-xs shadow-2xl transform transition-all scale-100">
              <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${actionType === 'ACCEPT' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                 {actionType === 'ACCEPT' ? <Check size={32} strokeWidth={3} /> : <X size={32} strokeWidth={3} />}
              </div>
              <h3 className="text-xl font-bold text-center text-stone-800 mb-2">
                {actionType === 'ACCEPT' ? 'Accept Order?' : 'Reject Order?'}
              </h3>
              <p className="text-center text-stone-500 text-sm mb-8 leading-relaxed">
                {actionType === 'ACCEPT' 
                  ? 'Are you sure you want to accept this order?' 
                  : 'Are you sure you want to reject this order?'}
              </p>
              <div className="grid grid-cols-2 gap-3">
                 <button 
                   onClick={() => setShowConfirm(false)}
                   className="py-3.5 bg-stone-100 text-stone-600 rounded-xl font-bold hover:bg-stone-200 transition-colors text-sm"
                 >
                   No
                 </button>
                 <button 
                   onClick={confirmAction}
                   className={`py-3.5 text-white rounded-xl font-bold shadow-lg transition-transform active:scale-95 text-sm ${actionType === 'ACCEPT' ? 'bg-green-600 hover:bg-green-700' : 'bg-red-600 hover:bg-red-700'}`}
                 >
                   Yes
                 </button>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};

export default ChefOrders;
