import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { PawPrint } from 'lucide-react';

export const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '', email: '', cpf: '', password: '', petName: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'cpf') {
      const val = value.replace(/\D/g, '').replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
      setFormData(prev => ({ ...prev, cpf: val.substring(0, 14) }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem('user_token', 'true');
    window.location.href = '/agendamento';
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-lg bg-zinc-900 border border-zinc-800 p-8 rounded-3xl shadow-2xl">
        <h2 className="text-2xl font-bold text-center mb-6 flex items-center justify-center gap-2">
          <PawPrint className="text-amber-500" /> Cadastro de Tutor & Pet
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input name="name" required placeholder="Seu Nome" onChange={handleChange} className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 outline-none focus:border-amber-500" />
            <input name="cpf" required placeholder="CPF (000.000.000-00)" value={formData.cpf} onChange={handleChange} className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 outline-none focus:border-amber-500" />
          </div>
          <input name="email" type="email" required placeholder="E-mail" onChange={handleChange} className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 outline-none focus:border-amber-500" />
          <input name="password" type="password" required placeholder="Senha" onChange={handleChange} className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 outline-none focus:border-amber-500" />
          <div className="pt-4 border-t border-zinc-800">
            <input name="petName" required placeholder="Nome do seu Pet" onChange={handleChange} className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 outline-none focus:border-amber-500" />
          </div>
          <Button type="submit" className="w-full py-4">Finalizar Cadastro</Button>
        </form>
      </div>
    </div>
  );
};