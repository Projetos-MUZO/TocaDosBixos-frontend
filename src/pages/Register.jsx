import { useState } from 'react';
import { Button } from '../components/ui/Button';
import { Link, useNavigate } from 'react-router-dom';

// Array simulando o banco de dados em memória
export const usersDB = [];

export const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    petName: ''
  });
  
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Adicionando o novo usuário ao nosso "banco de dados" array
    const newUser = {
      id: Date.now(),
      ...formData
    };
    
    usersDB.push(newUser);
    
    // Exibindo no console para você confirmar que o array está salvando
    console.log("Banco de dados atualizado (usuários cadastrados):", usersDB);
    alert("Cadastro realizado com sucesso! Verifique o console do navegador.");
    
    // Redireciona para a tela de login após registrar
    navigate('/login');
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6 bg-zinc-950 py-32">
      <div className="w-full max-w-md bg-zinc-900 border border-zinc-800 p-8 rounded-3xl shadow-2xl">
        <h2 className="text-3xl font-bold text-amber-500 mb-2 text-center">Crie sua Conta</h2>
        <p className="text-zinc-400 text-center mb-8">Cadastre-se e ao seu pet para agendar serviços</p>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-1">Seu Nome</label>
            <input 
              required
              type="text" 
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 focus:border-amber-500 outline-none text-zinc-100 transition-colors"
              placeholder="Seu nome completo"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-1">E-mail</label>
            <input 
              required
              type="email" 
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 focus:border-amber-500 outline-none text-zinc-100 transition-colors"
              placeholder="seu@email.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-1">Senha</label>
            <input 
              required
              type="password" 
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 focus:border-amber-500 outline-none text-zinc-100 transition-colors"
              placeholder="••••••••"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-1">Nome do Pet</label>
            <input 
              required
              type="text" 
              name="petName"
              value={formData.petName}
              onChange={handleChange}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 focus:border-amber-500 outline-none text-zinc-100 transition-colors"
              placeholder="Ex: Thor"
            />
          </div>
          
          <div className="pt-4">
            <Button type="submit" className="w-full">Registrar</Button>
          </div>
        </form>
        
        <p className="mt-6 text-center text-zinc-500 text-sm">
          Já tem uma conta? <Link to="/login" className="text-amber-500 hover:underline">Faça login</Link>
        </p>
      </div>
    </div>
  );
};