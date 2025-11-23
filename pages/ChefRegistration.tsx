
import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserRole } from '../types';
import { generateChefBio } from '../services/geminiService';
import { ChefHat, Wand2, Camera, MapPin, Upload } from 'lucide-react';

interface Props {
  setUserRole: (role: UserRole) => void;
}

const ChefRegistration: React.FC<Props> = ({ setUserRole }) => {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [name, setName] = useState('');
  const [specialties, setSpecialties] = useState('');
  const [location, setLocation] = useState('');
  const [bio, setBio] = useState('');
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerateBio = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (!name || !specialties) return;
    
    setIsGenerating(true);
    const generatedBio = await generateChefBio(name, specialties);
    setBio(generatedBio);
    setIsGenerating(false);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would send { name, location, specialties, bio, profileImage } to the backend
    console.log('Registering Chef:', { name, location, specialties, bio, profileImage });
    setUserRole(UserRole.CHEF);
    navigate('/chef-dashboard');
  };

  return (
    <div className="min-h-screen bg-stone-50 flex flex-col">
      <div className="bg-terracotta-600 p-6 pb-12 rounded-b-[40px] shadow-lg relative">
         <div className="absolute top-4 left-4">
            <button onClick={() => navigate('/')} className="text-white/80 font-bold text-sm">Back</button>
         </div>
         <div className="mt-4 flex flex-col items-center text-white">
            <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm mb-4">
                <ChefHat size={40} />
            </div>
            <h1 className="text-2xl font-bold">Join the Kitchen</h1>
            <p className="text-terracotta-100 text-sm">Become a Home Chef today</p>
         </div>
      </div>

      <div className="flex-1 px-6 -mt-8 pb-8">
        <form onSubmit={handleSubmit} className="bg-white rounded-3xl shadow-xl p-6 space-y-6">
            
            {/* Photo Upload */}
            <div className="flex flex-col items-center">
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  className="hidden" 
                  accept="image/*"
                  onChange={handleImageUpload}
                />
                <div 
                  onClick={triggerFileInput}
                  className={`w-24 h-24 rounded-full flex items-center justify-center border-2 border-dashed cursor-pointer transition-all overflow-hidden ${profileImage ? 'border-terracotta-500' : 'border-stone-300 bg-stone-100 hover:bg-stone-200'}`}
                >
                    {profileImage ? (
                      <img src={profileImage} alt="Profile Preview" className="w-full h-full object-cover" />
                    ) : (
                      <Camera size={24} className="text-stone-400" />
                    )}
                </div>
                <p className="text-xs text-stone-400 mt-2 font-bold">
                  {profileImage ? 'Change Photo' : 'Upload Profile Photo'}
                </p>
            </div>

            <div>
                <label className="block text-xs font-bold text-stone-500 uppercase mb-1">Full Name</label>
                <input 
                    type="text" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full p-3 bg-stone-50 rounded-xl border border-stone-200 focus:border-terracotta-400 focus:outline-none"
                    placeholder="e.g. Aisha Khan"
                    required
                />
            </div>

            <div>
                <label className="block text-xs font-bold text-stone-500 uppercase mb-1">Kitchen Address</label>
                <div className="relative">
                    <MapPin size={18} className="absolute left-3 top-3.5 text-stone-400" />
                    <input 
                        type="text" 
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        className="w-full p-3 pl-10 bg-stone-50 rounded-xl border border-stone-200 focus:border-terracotta-400 focus:outline-none"
                        placeholder="e.g. 123 Maple Street"
                        required
                    />
                </div>
            </div>

             <div>
                <label className="block text-xs font-bold text-stone-500 uppercase mb-1">Specialties</label>
                <input 
                    type="text" 
                    value={specialties}
                    onChange={(e) => setSpecialties(e.target.value)}
                    className="w-full p-3 bg-stone-50 rounded-xl border border-stone-200 focus:border-terracotta-400 focus:outline-none"
                    placeholder="e.g. Biryani, Sourdough, Pies"
                    required
                />
            </div>

            <div>
                <div className="flex justify-between items-center mb-1">
                    <label className="block text-xs font-bold text-stone-500 uppercase">Bio</label>
                    <button 
                        onClick={handleGenerateBio}
                        disabled={!name || !specialties || isGenerating}
                        className={`text-[10px] flex items-center space-x-1 px-2 py-1 rounded-lg transition-colors ${(!name || !specialties) ? 'text-stone-300' : 'bg-indigo-50 text-indigo-600 hover:bg-indigo-100'}`}
                    >
                       {isGenerating ? <span>Writing...</span> : <><Wand2 size={10} /> <span>Auto-Write with AI</span></>}
                    </button>
                </div>
                <textarea 
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    className="w-full p-3 bg-stone-50 rounded-xl border border-stone-200 focus:border-terracotta-400 focus:outline-none text-sm"
                    rows={4}
                    placeholder="Tell your neighbors about your cooking..."
                    required
                />
            </div>

            <button 
                type="submit"
                className="w-full py-4 bg-terracotta-600 text-white rounded-2xl font-bold text-lg shadow-lg hover:bg-terracotta-700 transition-transform active:scale-95 flex items-center justify-center space-x-2"
            >
                <ChefHat size={20} />
                <span>Start Cooking</span>
            </button>
        </form>
      </div>
    </div>
  );
};

export default ChefRegistration;
