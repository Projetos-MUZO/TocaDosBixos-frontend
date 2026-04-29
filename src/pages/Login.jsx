import { Button } from '../components/ui/Button';
import { Link } from 'react-router-dom';

export const Login = () => {
  return (
    <div className="min-h-screen flex items-center justify-center px-6 bg-zinc-950">
      <div className="w-full max-w-md bg-zinc-900 border border-zinc-800 p-8 rounded-3xl shadow-2xl">
        <h2 className="text-3xl font-bold text-amber-500 mb-2 text-center">Acesse sua Conta</h2>
        <p className="text-zinc-400 text-center mb-8">Gerencie os agendamentos do seu pet</p>
        
        <form className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-2">E-mail</label>
            <input 
              type="email" 
              className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 focus:border-amber-500 outline-none text-zinc-100 transition-colors"
              placeholder="seu@email.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-2">Senha</label>
            <input 
              type="password" 
              className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 focus:border-amber-500 outline-none text-zinc-100 transition-colors"
              placeholder="••••••••"
            />
          </div>
          <Button className="w-full">Entrar</Button>
        </form>
        
        <p className="mt-8 text-center text-zinc-500 text-sm">
          Ainda não tem conta? <Link to="/registrar" className="text-amber-500 hover:underline">Cadastre-se</Link>
        </p>
      </div>
    </div>
  );
};