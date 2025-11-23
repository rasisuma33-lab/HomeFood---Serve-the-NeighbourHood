
import React, { useState } from 'react';
import { User, Settings, LogOut, Camera, Wand2, Check, X } from 'lucide-react';
import Footer from '../components/Footer';
import { generateChefBio } from '../services/geminiService';

const ChefProfile: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  
  // Profile State
  const [name, setName] = useState('Aisha Khan');
  const [bio, setBio] = useState('Home Chef since 2023. I specialize in Hyderabadi Biryani and authentic spices.');
  const [specialties, setSpecialties] = useState('Biryani, Haleem, Kebabs');
  const [isGenerating, setIsGenerating] = useState(false);

  const handleSave = () => {
    setIsEditing(false);
    // Save logic here
  };

  const handleAIBio = async () => {
    setIsGenerating(true);
    const newBio = await generateChefBio(name, specialties);
    setBio(newBio);
    setIsGenerating(false);
  };

  return (
    <div className="bg-stone-50 min-h-screen flex flex-col">
      {/* Header / Banner */}
      <div className="bg-terracotta-600 text-white p-8 rounded-b-[40px] text-center shadow-lg mb-8 relative overflow-hidden transition-all duration-500">
        
        {/* Edit Actions Top Right */}
        {isEditing ? (
           <div className="absolute top-4 right-4 z-20 flex space-x-2">
              <button onClick={() => setIsEditing(false)} className="w-8 h-8 bg-red-500/20 backdrop-blur rounded-full flex items-center justify-center hover:bg-red-500">
                 <X size={16} />
              </button>
              <button onClick={handleSave} className="w-8 h-8 bg-green-500/20 backdrop-blur rounded-full flex items-center justify-center hover:bg-green-500">
                 <Check size={16} />
              </button>
           </div>
        ) : null}

        <div className="w-24 h-24 bg-white rounded-full mx-auto mb-4 border-4 border-terracotta-400 overflow-hidden relative z-10 group">
          <img src="https://picsum.photos/200/200?random=1" className="w-full h-full object-cover" alt="Chef" />
          {isEditing && (
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center cursor-pointer">
               <Camera size={24} className="text-white" />
            </div>
          )}
        </div>

        {isEditing ? (
          <input 
            type="text" 
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="text-2xl font-bold relative z-10 bg-transparent border-b border-white/30 text-center focus:outline-none focus:border-white w-full max-w-[200px]"
          />
        ) : (
          <h2 className="text-2xl font-bold relative z-10">{name}</h2>
        )}

        <p className="text-terracotta-100 relative z-10 text-sm mt-1">Home Chef</p>
        
        {!isEditing && (
          <div className="flex justify-center space-x-4 mt-6 relative z-10">
            <div className="text-center">
              <span className="block font-bold text-xl">4.8</span>
              <span className="text-xs text-terracotta-200">Rating</span>
            </div>
            <div className="text-center">
              <span className="block font-bold text-xl">1.2k</span>
              <span className="text-xs text-terracotta-200">Orders</span>
            </div>
          </div>
        )}
        
        {/* Background Decoration */}
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-black/10 z-0" />
      </div>

      <div className="px-6 space-y-4 flex-1">
        
        {/* Editing Form Area */}
        {isEditing && (
           <div className="bg-white p-6 rounded-2xl shadow-sm space-y-4 animate-in fade-in slide-in-from-bottom-4">
              <div>
                 <label className="text-xs font-bold text-stone-400 uppercase">Specialties</label>
                 <input 
                    type="text" 
                    value={specialties}
                    onChange={(e) => setSpecialties(e.target.value)}
                    className="w-full p-2 bg-stone-50 rounded-lg border border-stone-100 mt-1"
                 />
              </div>
              <div>
                 <div className="flex justify-between items-center">
                    <label className="text-xs font-bold text-stone-400 uppercase">Bio</label>
                    <button 
                       onClick={handleAIBio}
                       className="text-[10px] bg-terracotta-50 text-terracotta-600 px-2 py-1 rounded flex items-center space-x-1"
                    >
                       {isGenerating ? <Wand2 size={10} className="animate-spin"/> : <Wand2 size={10} />}
                       <span>AI Rewrite</span>
                    </button>
                 </div>
                 <textarea 
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    rows={3}
                    className="w-full p-2 bg-stone-50 rounded-lg border border-stone-100 mt-1 text-sm"
                 />
              </div>
           </div>
        )}

        {!isEditing && (
           <>
             <button className="w-full bg-white p-4 rounded-2xl flex items-center space-x-4 shadow-sm hover:bg-stone-50 transition-colors">
              <div className="w-10 h-10 bg-stone-100 rounded-full flex items-center justify-center text-stone-600">
                <Settings size={20} />
              </div>
              <span className="font-bold text-stone-700">Account Settings</span>
            </button>
            <button 
              onClick={() => setIsEditing(true)}
              className="w-full bg-white p-4 rounded-2xl flex items-center space-x-4 shadow-sm hover:bg-stone-50 transition-colors"
            >
              <div className="w-10 h-10 bg-stone-100 rounded-full flex items-center justify-center text-stone-600">
                <User size={20} />
              </div>
              <span className="font-bold text-stone-700">Edit Profile</span>
            </button>
          </>
        )}

        <button className="w-full bg-red-50 p-4 rounded-2xl flex items-center space-x-4 shadow-sm text-red-600 hover:bg-red-100 transition-colors">
           <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
            <LogOut size={20} />
          </div>
          <span className="font-bold">Log Out</span>
        </button>
      </div>

      <Footer />
    </div>
  );
};

export default ChefProfile;
