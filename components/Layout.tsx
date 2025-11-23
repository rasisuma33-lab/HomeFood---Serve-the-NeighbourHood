import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Home, ShoppingBag, User, ChefHat, Heart } from 'lucide-react';
import { UserRole } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  userRole: UserRole;
  cartCount: number;
}

const Layout: React.FC<LayoutProps> = ({ children, userRole, cartCount }) => {
  const navigate = useNavigate();
  const location = useLocation();

  // Hide nav on onboarding
  if (location.pathname === '/' && userRole === UserRole.GUEST) {
    return <>{children}</>;
  }

  const isActive = (path: string) => location.pathname === path ? 'text-terracotta-600' : 'text-stone-400';

  return (
    <div className="min-h-screen pb-20 bg-stone-50 text-stone-800">
      <div className="max-w-md mx-auto min-h-screen bg-white shadow-xl overflow-hidden relative">
        {/* Main Content Area */}
        <main className="h-full overflow-y-auto no-scrollbar">
          {children}
        </main>

        {/* Bottom Navigation */}
        <nav className="fixed bottom-0 w-full max-w-md bg-white border-t border-stone-100 flex justify-around items-center py-3 z-50 rounded-t-2xl shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
          {userRole === UserRole.CUSTOMER && (
            <>
              <button onClick={() => navigate('/home')} className={`flex flex-col items-center ${isActive('/home')}`}>
                <Home size={24} strokeWidth={2.5} />
                <span className="text-xs font-bold mt-1">Home</span>
              </button>
              <button onClick={() => navigate('/favorites')} className={`flex flex-col items-center ${isActive('/favorites')}`}>
                <Heart size={24} strokeWidth={2.5} />
                <span className="text-xs font-bold mt-1">Favs</span>
              </button>
              <button onClick={() => navigate('/cart')} className={`flex flex-col items-center relative ${isActive('/cart')}`}>
                <div className="relative">
                  <ShoppingBag size={24} strokeWidth={2.5} />
                  {cartCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-terracotta-600 text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full">
                      {cartCount}
                    </span>
                  )}
                </div>
                <span className="text-xs font-bold mt-1">Cart</span>
              </button>
              <button onClick={() => navigate('/orders')} className={`flex flex-col items-center ${isActive('/orders')}`}>
                <User size={24} strokeWidth={2.5} />
                <span className="text-xs font-bold mt-1">Orders</span>
              </button>
            </>
          )}

          {userRole === UserRole.CHEF && (
            <>
              <button onClick={() => navigate('/chef-dashboard')} className={`flex flex-col items-center ${isActive('/chef-dashboard')}`}>
                <ChefHat size={24} strokeWidth={2.5} />
                <span className="text-xs font-bold mt-1">Dashboard</span>
              </button>
               <button onClick={() => navigate('/chef-menu')} className={`flex flex-col items-center ${isActive('/chef-menu')}`}>
                <ShoppingBag size={24} strokeWidth={2.5} />
                <span className="text-xs font-bold mt-1">My Menu</span>
              </button>
              <button onClick={() => navigate('/chef-profile')} className={`flex flex-col items-center ${isActive('/chef-profile')}`}>
                <User size={24} strokeWidth={2.5} />
                <span className="text-xs font-bold mt-1">Profile</span>
              </button>
            </>
          )}
        </nav>
      </div>
    </div>
  );
};

export default Layout;