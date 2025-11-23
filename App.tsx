
import React, { useState } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Onboarding from './pages/Onboarding';
import Home from './pages/Home';
import ChefDashboard from './pages/ChefDashboard';
import Cart from './pages/Cart';
import Orders from './pages/Orders';
import ChefProfile from './pages/ChefProfile';
import CustomerProfile from './pages/CustomerProfile';
import ChefDetails from './pages/ChefDetails';
import DishDetails from './pages/DishDetails';
import ChefRegistration from './pages/ChefRegistration';
import ChefOrders from './pages/ChefOrders';
import { UserRole, CartItem } from './types';

const App: React.FC = () => {
  const [userRole, setUserRole] = useState<UserRole>(UserRole.GUEST);
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (item: CartItem) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) {
        return prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, item];
    });
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(i => i.id !== id));
  };

  const clearCart = () => setCart([]);

  return (
    <HashRouter>
      <Layout userRole={userRole} cartCount={cart.reduce((a, b) => a + b.quantity, 0)}>
        <Routes>
          <Route path="/" element={<Onboarding setUserRole={setUserRole} />} />
          
          {/* Customer Routes */}
          <Route 
            path="/home" 
            element={userRole === UserRole.CUSTOMER ? <Home addToCart={addToCart} /> : <Navigate to="/" />} 
          />
          <Route 
            path="/favorites" 
            element={userRole === UserRole.CUSTOMER ? <Home addToCart={addToCart} /> : <Navigate to="/" />} 
          />
          <Route 
            path="/cart" 
            element={userRole === UserRole.CUSTOMER ? <Cart cart={cart} removeFromCart={removeFromCart} clearCart={clearCart} /> : <Navigate to="/" />} 
          />
          <Route 
            path="/orders" 
            element={userRole === UserRole.CUSTOMER ? <Orders /> : <Navigate to="/" />} 
          />
           <Route 
            path="/customer-profile" 
            element={userRole === UserRole.CUSTOMER ? <CustomerProfile /> : <Navigate to="/" />} 
          />
          <Route 
            path="/chef/:id" 
            element={userRole === UserRole.CUSTOMER ? <ChefDetails addToCart={addToCart} /> : <Navigate to="/" />} 
          />
           <Route 
            path="/dish/:id" 
            element={userRole === UserRole.CUSTOMER ? <DishDetails addToCart={addToCart} /> : <Navigate to="/" />} 
          />

          {/* Chef Routes */}
          <Route 
            path="/chef-registration" 
            element={<ChefRegistration setUserRole={setUserRole} />} 
          />
          <Route 
            path="/chef-dashboard" 
            element={userRole === UserRole.CHEF ? <ChefDashboard /> : <Navigate to="/" />} 
          />
          <Route 
            path="/chef-orders" 
            element={userRole === UserRole.CHEF ? <ChefOrders /> : <Navigate to="/" />} 
          />
           <Route 
            path="/chef-menu" 
            element={userRole === UserRole.CHEF ? <ChefDashboard /> : <Navigate to="/" />} 
          />
          <Route 
            path="/chef-profile" 
            element={userRole === UserRole.CHEF ? <ChefProfile /> : <Navigate to="/" />} 
          />
        </Routes>
      </Layout>
    </HashRouter>
  );
};

export default App;