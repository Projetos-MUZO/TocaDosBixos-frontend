import { useState } from 'react';
import { Button } from '../components/ui/Button';
import { Link } from 'react-router-dom';
import { Calendar, Clock, PawPrint, Lock } from 'lucide-react';

export const Booking = () => {
  // Simulando um estado de login (no futuro, isso virá do seu Context ou Auth)
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const services = [
    { id: 'banho', name: 'Apenas Banho', price: 'R$ 50,00' },
    { id: 'banho-tosa', name: 'Banho + Tosa Higiênica', price: 'R$ 85,00' },
    { id: 'banho-tosa-completa', name: 'Banho + Tosa Completa', price: 'R$ 110,00' },
    { id: 'vete', name: 'Consulta Veterinária', price: 'Sob consulta' },
  ];

  // Caso o usuário não esteja logado, mostramos um "bloqueio" amigável
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6 bg-zinc-950">
        <div className="w-full max-w-md bg-zinc-900 border border-zinc-800 p-8 rounded-3xl text-center shadow-2xl">
          <div className="bg-amber-500/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
            <Lock className="text-amber-500" size={30} />
          </div>
          <h2 className="text-2xl font-bold text-zinc-100 mb-4">Acesso Restrito</h2>
          <p className="text-zinc-400 mb-8">
            Para garantir a segurança dos dados do seu pet, você precisa estar logado para realizar um agendamento.
          </p>
          <div className="space-y-4">
            <Link to="/login">
              <Button className="w-full">Fazer Login Agora</Button>
            </Link>
            <button 
              onClick={() => setIsLoggedIn(true)} 
              className="text-sm text-zinc-500 hover:text-zinc-300 transition-colors"
            >
              (Simular Login para teste)
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-32 px-6 bg-zinc-950">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 text-zinc-100">
            Agendar <span className="text-amber-500">Serviço</span>
          </h1>
          <p className="text-zinc-400">Preencha os dados abaixo para reservar o horário do seu pet.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-zinc-900 border border-zinc-800 p-8 rounded-[40px] shadow-xl">
          {/* Coluna 1: Pet e Serviço */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold flex items-center gap-2 text-zinc-100">
              <PawPrint className="text-amber-500" /> Detalhes do Agendamento
            </h3>
            
            <div>
              <label className="block text-sm font-medium text-zinc-400 mb-2">Nome do Pet</label>
              <input 
                placeholder="Ex: Thor" 
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 outline-none focus:border-amber-500 text-zinc-100" 
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-zinc-400 mb-2">Selecione o Serviço</label>
              <select className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 outline-none focus:border-amber-500 text-zinc-100 appearance-none">
                {services.map(s => (
                  <option key={s.id} value={s.id}>{s.name} ({s.price})</option>
                ))}
              </select>
            </div>
          </div>

          {/* Coluna 2: Data e Hora */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold flex items-center gap-2 text-zinc-100">
              <Calendar className="text-amber-500" /> Data e Horário
            </h3>
            
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="block text-sm font-medium text-zinc-400 mb-2">Data</label>
                <input type="date" className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 outline-none focus:border-amber-500 text-zinc-100" />
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-400 mb-2">Horário</label>
                <input type="time" className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 outline-none focus:border-amber-500 text-zinc-100" />
              </div>
            </div>

            <div className="p-4 bg-amber-500/5 border border-amber-500/20 rounded-2xl">
              <p className="text-xs text-amber-200/60 flex items-center gap-2 leading-relaxed">
                <Clock size={14} className="shrink-0" /> 
                A confirmação final será enviada para o seu WhatsApp cadastrado em até 30 minutos.
              </p>
            </div>
            
            <Button className="w-full py-4 text-lg">Finalizar Solicitação</Button>
          </div>
        </div>
      </div>
    </div>
  );
};