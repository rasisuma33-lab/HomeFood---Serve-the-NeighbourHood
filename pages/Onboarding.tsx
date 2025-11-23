
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserRole } from '../types';
import { ChefHat, Heart, UtensilsCrossed, Sparkles, CheckCircle2, User } from 'lucide-react';

interface Props {
  setUserRole: (role: UserRole) => void;
}

const Onboarding: React.FC<Props> = ({ setUserRole }) => {
  const navigate = useNavigate();
  const [step, setStep] = useState<'welcome' | 'role'>('welcome');

  const handleCustomerSelect = () => {
    setUserRole(UserRole.CUSTOMER);
    navigate('/home');
  };

  const handleChefSelect = () => {
    navigate('/chef-registration');
  };

  const handleGoogleLogin = () => {
    // Simulate login delay
    setTimeout(() => {
      setStep('role');
    }, 500);
  };

  if (step === 'welcome') {
    return (
      <div className="flex flex-col h-screen bg-stone-50 relative overflow-hidden">
         {/* Decorative Background */}
        <div className="absolute top-0 left-0 w-full h-[60%] bg-terracotta-600 rounded-b-[50px] z-0" />
        <div className="absolute top-10 right-10 text-terracotta-500 opacity-20 animate-bounce">
           <Heart size={64} fill="currentColor" />
        </div>

        <div className="z-10 flex flex-col items-center justify-center h-full px-8 text-center">
          {/* Logo Area */}
          <div className="w-32 h-32 bg-white rounded-full flex items-center justify-center shadow-xl mb-8 relative">
             <UtensilsCrossed size={48} className="text-terracotta-600" />
             <div className="absolute -bottom-2 bg-olive-600 text-white text-[10px] px-3 py-1 rounded-full font-bold uppercase tracking-wide">
               Hyperlocal
             </div>
          </div>

          <h1 className="text-3xl font-extrabold text-white mb-2 font-serif tracking-wide">HomeFudio</h1>
          <p className="text-terracotta-100 text-lg mb-10 font-medium">Community Food Network</p>

          {/* Login Card */}
          <div className="w-full bg-white rounded-3xl shadow-2xl p-8 space-y-6">
             <h2 className="text-xl font-bold text-stone-800">Welcome Neighbor!</h2>
             
             <div className="space-y-3 text-left">
               {['Nearby home chefs (< 3km)', 'Support your local community', 'Emergency food assistance'].map((benefit, idx) => (
                 <div key={idx} className="flex items-center space-x-3 text-sm text-stone-600">
                   <CheckCircle2 size={18} className="text-green-500 flex-shrink-0" />
                   <span>{benefit}</span>
                 </div>
               ))}
             </div>

             <button 
               onClick={handleGoogleLogin}
               className="w-full py-3 px-4 bg-white border border-stone-200 rounded-xl shadow-sm hover:bg-stone-50 transition-all flex items-center justify-center space-x-3 group"
             >
               <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="w-6 h-6" alt="Google" />
               <span className="font-bold text-stone-700 group-hover:text-stone-900">Continue with Google</span>
             </button>

             <div className="relative flex items-center justify-center">
               <div className="absolute w-full border-t border-stone-100"></div>
               <span className="bg-white px-3 text-xs text-stone-400 relative">OR</span>
             </div>
             
             <button className="w-full py-3 bg-stone-800 text-white rounded-xl font-bold text-sm">
               Continue with Email
             </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-stone-50 px-6 pt-20 pb-10">
      <div className="text-center mb-12">
        <h2 className="text-2xl font-bold text-stone-800 mb-2">One Last Thing...</h2>
        <p className="text-stone-500">How would you like to use HomeFudio?</p>
      </div>

      <div className="space-y-6 max-w-sm mx-auto w-full">
        {/* Customer Option */}
        <button 
          onClick={handleCustomerSelect}
          className="w-full bg-white p-6 rounded-3xl shadow-md border-2 border-transparent hover:border-terracotta-500 transition-all group text-left relative overflow-hidden"
        >
           <div className="absolute right-[-20px] top-[-20px] w-24 h-24 bg-terracotta-50 rounded-full group-hover:bg-terracotta-100 transition-colors"></div>
           <div className="relative z-10 flex items-center space-x-4">
              <div className="w-14 h-14 bg-terracotta-100 rounded-full flex items-center justify-center text-terracotta-600">
                 <Heart size={28} fill="currentColor" />
              </div>
              <div>
                 <h3 className="font-bold text-lg text-stone-800">I want to Eat</h3>
                 <p className="text-xs text-stone-500 mt-1">Discover nearby home food</p>
              </div>
           </div>
        </button>

        {/* Chef Option */}
        <button 
          onClick={handleChefSelect}
          className="w-full bg-white p-6 rounded-3xl shadow-md border-2 border-transparent hover:border-terracotta-500 transition-all group text-left relative overflow-hidden"
        >
           <div className="absolute right-[-20px] top-[-20px] w-24 h-24 bg-olive-50 rounded-full group-hover:bg-olive-100 transition-colors"></div>
           <div className="relative z-10 flex items-center space-x-4">
              <div className="w-14 h-14 bg-olive-100 rounded-full flex items-center justify-center text-olive-700">
                 <ChefHat size={28} />
              </div>
              <div>
                 <h3 className="font-bold text-lg text-stone-800">I want to Cook</h3>
                 <p className="text-xs text-stone-500 mt-1">Serve your neighborhood</p>
              </div>
           </div>
        </button>
      </div>

      <div className="mt-auto text-center">
         <p className="text-xs text-stone-400">
           By joining, you agree to our <span className="underline">Community Guidelines</span>.
         </p>
      </div>
    </div>
  );
};

export default Onboarding;
