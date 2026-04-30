import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { PawPrint, Mail, Lock, AlertCircle } from 'lucide-react';

export const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    
    localStorage.setItem('user_token', 'true');
    localStorage.setItem('user_email', formData.email);

    // Se for admin, manda para o painel, se não, para o agendamento
    if (formData.email === 'admin@gmail.com') {
      window.location.href = '/admin';
    } else{
      window.location.href = '/agendamento';
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-zinc-900 border border-zinc-800 p-8 rounded-3xl shadow-2xl">
        
        <div className="mb-6 flex items-start gap-3 bg-amber-500/10 border border-amber-500/20 p-4 rounded-2xl">
          <AlertCircle className="text-amber-500 shrink-0" size={20} />
          <p className="text-sm text-amber-200/80">
            <strong>Atenção:</strong> Para agendar um serviço, é necessário fazer login primeiro.
          </p>
        </div>

        <div className="text-center mb-8">
          <PawPrint className="w-12 h-12 text-amber-500 mx-auto mb-4" />
          <h1 className="text-3xl font-bold">Entrar</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="email"
            required
            className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 outline-none focus:border-amber-500 text-zinc-100"
            placeholder="E-mail"
            onChange={(e) => setFormData({...formData, email: e.target.value})}
          />
          <input
            type="password"
            required
            className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 outline-none focus:border-amber-500 text-zinc-100"
            placeholder="Senha"
            onChange={(e) => setFormData({...formData, password: e.target.value})}
          />
          <Button type="submit" className="w-full py-4 text-lg font-bold">ENTRAR</Button>
        </form>
        
        <p className="text-center text-zinc-500 mt-6">
          Não tem conta? <Link to="/registrar" className="text-amber-500 hover:underline">Cadastre-se</Link>
        </p>
      </div>
    </div>
  );
};