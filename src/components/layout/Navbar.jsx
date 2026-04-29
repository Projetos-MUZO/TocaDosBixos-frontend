import React from 'react';
import { Link } from 'react-router-dom';
import { PawPrint, LogOut, Lock, ShieldCheck } from 'lucide-react';

export const Navbar = () => {
  const isAuthenticated = !!localStorage.getItem('user_token');
  const isAdmin = localStorage.getItem('user_email') === 'admin@gmail.com';

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = '/';
  };

  return (
    <nav className="fixed top-0 w-full z-50 bg-zinc-950/80 backdrop-blur-md border-b border-zinc-800">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2 group">
          <PawPrint className="text-amber-500 group-hover:rotate-12 transition-transform" />
          <span className="text-xl font-bold tracking-tighter">TOCA DOS BICHOS</span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <Link to="/" className="text-sm font-medium hover:text-amber-500 transition-colors">Home</Link>
          <Link to="/agendamento" className="text-sm font-medium hover:text-amber-500 transition-colors flex items-center gap-1">
            {!isAuthenticated && <Lock size={12} className="text-zinc-500" />} Agendar
          </Link>
          
          {isAuthenticated ? (
            <div className="flex items-center gap-4">
              {isAdmin && (
                <Link to="/admin" className="text-sm text-amber-500 hover:text-amber-400 font-bold flex items-center gap-1">
                  <ShieldCheck size={16} /> Painel Admin
                </Link>
              )}
              
              <button 
                onClick={handleLogout}
                className="flex items-center gap-2 bg-zinc-900 border border-zinc-800 hover:text-red-500 px-4 py-2 rounded-xl transition-all text-sm font-medium"
              >
                <LogOut size={16} /> Sair
              </button>
            </div>
          ) : (
            <Link to="/login" className="bg-amber-500 text-zinc-950 px-6 py-2 rounded-full text-sm font-bold hover:bg-amber-400 transition-all">
              LOGIN
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};