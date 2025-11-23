
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer, CartesianGrid, PieChart, Pie, Cell } from 'recharts';
import { Plus, DollarSign, ShoppingBag, TrendingUp, Sparkles, Wand2, Clock, ChevronDown, HandHeart } from 'lucide-react';
import { generateDishDescription } from '../services/geminiService';
import Footer from '../components/Footer';

const SALES_DATA = [
  { name: 'Mon', sales: 40 },
  { name: 'Tue', sales: 30 },
  { name: 'Wed', sales: 20 },
  { name: 'Thu', sales: 27 },
  { name: 'Fri', sales: 18 },
  { name: 'Sat', sales: 23 },
  { name: 'Sun', sales: 34 },
];

const PIE_DATA = [
  { name: 'Biryani', value: 400 },
  { name: 'Salan', value: 300 },
  { name: 'Kebabs', value: 300 },
];

const COLORS = ['#d84315', '#fb8c00', '#ffcc80'];

const ChefDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'overview' | 'menu'>('overview');
  const [isOnline, setIsOnline] = useState(true);
  const [isPickupOnly, setIsPickupOnly] = useState(false);

  // AI Menu Generator State
  const [newDishName, setNewDishName] = useState('');
  const [newDishIngredients, setNewDishIngredients] = useState('');
  const [prepTime, setPrepTime] = useState('');
  const [generatedDesc, setGeneratedDesc] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerateDescription = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (!newDishName || !newDishIngredients) return;
    setIsGenerating(true);
    const desc = await generateDishDescription(newDishName, newDishIngredients);
    setGeneratedDesc(desc);
    setIsGenerating(false);
  };

  return (
    <div className="bg-stone-50 min-h-screen flex flex-col">
      {/* Header */}
      <div className="bg-white p-6 rounded-b-[32px] shadow-sm mb-6">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h1 className="text-2xl font-bold text-stone-800">Hello, Chef!</h1>
            <p className="text-stone-500 text-sm">Ready to serve your neighbors?</p>
          </div>
          <Link to="/chef-profile" className="w-10 h-10 rounded-full bg-stone-200 overflow-hidden border-2 border-stone-100">
             <img src="https://picsum.photos/200/200?random=1" alt="Profile" />
          </Link>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-between bg-stone-50 p-3 rounded-2xl">
           <div className="flex items-center space-x-2">
            <button 
              onClick={() => setIsOnline(!isOnline)}
              className={`w-12 h-6 rounded-full relative transition-colors ${isOnline ? 'bg-green-500' : 'bg-stone-300'}`}
            >
              <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${isOnline ? 'left-7' : 'left-1'}`}></div>
            </button>
            <span className={`text-xs font-bold ${isOnline ? 'text-green-600' : 'text-stone-400'}`}>
              {isOnline ? 'ONLINE' : 'OFFLINE'}
            </span>
           </div>

           <div className="h-6 w-px bg-stone-200"></div>

           <div className="flex items-center space-x-2 cursor-pointer" onClick={() => setIsPickupOnly(!isPickupOnly)}>
             <span className={`text-xs font-bold ${isPickupOnly ? 'text-terracotta-600' : 'text-stone-400'}`}>
               PICKUP ONLY
             </span>
              <div className={`w-4 h-4 rounded border flex items-center justify-center ${isPickupOnly ? 'bg-terracotta-600 border-terracotta-600' : 'border-stone-300'}`}>
                {isPickupOnly && <div className="w-2 h-2 bg-white rounded-sm" />}
              </div>
           </div>
        </div>
      </div>

      <div className="flex-1">
        {/* Action Banner */}
        <div className="px-6 mb-6">
           <button 
             onClick={() => navigate('/chef-orders')}
             className="w-full bg-stone-800 text-white p-4 rounded-2xl shadow-lg flex items-center justify-between hover:bg-stone-700 transition-colors"
           >
             <div className="flex items-center space-x-3">
               <div className="bg-stone-700 p-2 rounded-full">
                 <ShoppingBag size={20} />
               </div>
               <div className="text-left">
                 <span className="block font-bold text-lg">Manage Orders</span>
                 <span className="text-xs text-stone-400">3 Pending Action</span>
               </div>
             </div>
             <div className="w-8 h-8 bg-terracotta-500 rounded-full flex items-center justify-center font-bold text-sm">3</div>
           </button>
        </div>

        {/* Tabs */}
        <div className="px-6 mb-6">
          <div className="flex space-x-4 border-b border-stone-200">
            <button 
              onClick={() => setActiveTab('overview')}
              className={`pb-3 text-sm font-bold transition-colors ${activeTab === 'overview' ? 'text-terracotta-600 border-b-2 border-terracotta-600' : 'text-stone-400'}`}
            >
              Overview
            </button>
            <button 
              onClick={() => setActiveTab('menu')}
              className={`pb-3 text-sm font-bold transition-colors ${activeTab === 'menu' ? 'text-terracotta-600 border-b-2 border-terracotta-600' : 'text-stone-400'}`}
            >
              Menu Manager
            </button>
          </div>
        </div>

        {activeTab === 'overview' && (
          <div className="px-6 space-y-6">
            
            {/* SERVE A NEIGHBOR WIDGET */}
            <div className="bg-orange-50 border border-orange-100 p-4 rounded-2xl flex items-center justify-between">
               <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center text-orange-600">
                     <HandHeart size={20} />
                  </div>
                  <div>
                     <h3 className="font-bold text-stone-800 text-sm">Serve a Neighbor Today</h3>
                     <p className="text-xs text-stone-500">2 urgent food requests nearby</p>
                  </div>
               </div>
               <button className="bg-orange-500 text-white text-xs font-bold px-3 py-2 rounded-lg">View</button>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white p-4 rounded-2xl shadow-sm border border-stone-100 flex flex-col justify-between h-32">
                <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center text-orange-600">
                  <DollarSign size={20} />
                </div>
                <div>
                  <p className="text-stone-400 text-xs font-bold uppercase">Earnings</p>
                  <h3 className="text-2xl font-bold text-stone-800">$1,240</h3>
                </div>
              </div>
              <div className="bg-white p-4 rounded-2xl shadow-sm border border-stone-100 flex flex-col justify-between h-32">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
                  <TrendingUp size={20} />
                </div>
                <div>
                  <p className="text-stone-400 text-xs font-bold uppercase">Views</p>
                  <h3 className="text-2xl font-bold text-stone-800">856</h3>
                </div>
              </div>
            </div>

            {/* Weekly Chart */}
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-stone-100">
              <h3 className="font-bold text-lg mb-4 text-stone-800">Weekly Orders</h3>
              <div className="h-48 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={SALES_DATA}>
                     <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f5f5f4" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 10, fill: '#a8a29e'}} />
                    <Tooltip 
                      contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)'}}
                      cursor={{fill: '#f5f5f4'}}
                    />
                    <Bar dataKey="sales" fill="#e64a19" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Pie Chart */}
             <div className="bg-white p-6 rounded-3xl shadow-sm border border-stone-100">
              <h3 className="font-bold text-lg mb-4 text-stone-800">Top Items</h3>
              <div className="h-48 w-full flex items-center">
                 <div className="w-1/2 h-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={PIE_DATA}
                          innerRadius={40}
                          outerRadius={60}
                          paddingAngle={5}
                          dataKey="value"
                        >
                          {PIE_DATA.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                      </PieChart>
                    </ResponsiveContainer>
                 </div>
                 <div className="w-1/2 pl-4 space-y-2">
                    {PIE_DATA.map((entry, index) => (
                      <div key={entry.name} className="flex items-center text-xs">
                        <div className="w-2 h-2 rounded-full mr-2" style={{backgroundColor: COLORS[index]}}></div>
                        <span className="text-stone-600">{entry.name}</span>
                      </div>
                    ))}
                 </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'menu' && (
          <div className="px-6 space-y-6">
             {/* AI Add Dish */}
             <div className="bg-gradient-to-br from-terracotta-50 to-white p-6 rounded-3xl border border-terracotta-100">
                <div className="flex items-center space-x-2 mb-4">
                   <Sparkles className="text-terracotta-500" size={20} />
                   <h3 className="font-bold text-stone-800">Add New Special</h3>
                </div>
                
                <div className="space-y-3">
                   <input 
                     type="text" 
                     placeholder="Dish Name (e.g. Spicy Lamb Curry)"
                     className="w-full p-3 rounded-xl border border-terracotta-100 text-sm focus:outline-none focus:border-terracotta-500"
                     value={newDishName}
                     onChange={(e) => setNewDishName(e.target.value)}
                   />
                    <input 
                     type="text" 
                     placeholder="Main Ingredients (e.g. Lamb, Chili, Yogurt)"
                     className="w-full p-3 rounded-xl border border-terracotta-100 text-sm focus:outline-none focus:border-terracotta-500"
                     value={newDishIngredients}
                     onChange={(e) => setNewDishIngredients(e.target.value)}
                   />

                   <div className="relative">
                     <Clock className="absolute left-3 top-3.5 text-terracotta-400" size={18} />
                     <select 
                       className="w-full p-3 pl-10 pr-10 rounded-xl border border-terracotta-100 text-sm focus:outline-none focus:border-terracotta-500 bg-white appearance-none text-stone-700"
                       value={prepTime}
                       onChange={(e) => setPrepTime(e.target.value)}
                     >
                        <option value="" disabled>Est. Prep Time</option>
                        <option value="15 mins">15 mins</option>
                        <option value="30 mins">30 mins</option>
                        <option value="45 mins">45 mins</option>
                        <option value="1 hour">1 hour</option>
                        <option value="90 mins">1.5 hours</option>
                        <option value="2 hours">2 hours</option>
                        <option value="Pre-order">Pre-order (24h)</option>
                     </select>
                     <ChevronDown className="absolute right-3 top-3.5 text-terracotta-400 pointer-events-none" size={18} />
                   </div>
                   
                   <div className="relative">
                      <textarea 
                        placeholder="Description"
                        className="w-full p-3 rounded-xl border border-terracotta-100 text-sm focus:outline-none focus:border-terracotta-500 min-h-[80px]"
                        value={generatedDesc}
                        onChange={(e) => setGeneratedDesc(e.target.value)}
                      />
                      <button 
                        onClick={handleGenerateDescription}
                        disabled={!newDishName || !newDishIngredients || isGenerating}
                        className="absolute right-2 bottom-2 bg-terracotta-600 text-white p-2 rounded-lg text-xs font-bold flex items-center space-x-1 disabled:opacity-50"
                      >
                        {isGenerating ? <Wand2 size={12} className="animate-spin"/> : <Wand2 size={12} />}
                        <span>AI Write</span>
                      </button>
                   </div>

                   <button className="w-full bg-stone-800 text-white py-3 rounded-xl font-bold shadow-lg hover:bg-stone-700 mt-2">
                     Add to Menu
                   </button>
                </div>
             </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default ChefDashboard;
