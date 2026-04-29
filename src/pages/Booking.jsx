import React, { useState } from 'react';
import { Button } from '../components/ui/Button';
import { Calendar, Clock, PawPrint, CheckCircle2, MessageSquare } from 'lucide-react';

export const Booking = () => {
  const [step, setStep] = useState(1);
  
  // Carrega serviços dinâmicos do Admin
  const [services] = useState(() => {
    const saved = localStorage.getItem('toca_servicos');
    return saved ? JSON.parse(saved) : [
      { id: 1, name: 'Banho e Tosa', price: 'R$ 80,00' },
      { id: 2, name: 'Consulta Veterinária', price: 'R$ 150,00' }
    ];
  });

  const [formData, setFormData] = useState({
    service: '',
    petName: '',
    petBreed: '',
    date: '',
    time: ''
  });

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 bg-zinc-950 text-zinc-100">
      <div className="max-w-3xl mx-auto">
        
        {/* Indicador de Passos */}
        <div className="flex items-center justify-center gap-4 mb-12">
          {[1, 2, 3].map((i) => (
            <div key={i} className={`flex items-center gap-2 ${step >= i ? 'text-amber-500' : 'text-zinc-600'}`}>
              <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center font-bold ${step >= i ? 'border-amber-500 bg-amber-500/10' : 'border-zinc-800'}`}>
                {step > i ? <CheckCircle2 size={18} /> : i}
              </div>
              <span className="text-sm font-bold">{i === 1 ? 'Serviço' : i === 2 ? 'Detalhes' : 'Sucesso'}</span>
              {i < 3 && <div className="w-8 h-px bg-zinc-800" />}
            </div>
          ))}
        </div>

        {/* ETAPA 1: ESCOLHA DO SERVIÇO (DINÂMICO) */}
        {step === 1 && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h2 className="text-2xl font-bold mb-6 text-center text-amber-500">Selecione o Serviço</h2>
            <div className="grid gap-4">
              {services.map((s) => (
                <button
                  key={s.id}
                  onClick={() => { setFormData({...formData, service: s.name}); setStep(2); }}
                  className="flex items-center justify-between p-6 bg-zinc-900 border border-zinc-800 rounded-3xl hover:border-amber-500/50 transition-all group text-left"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-zinc-800 flex items-center justify-center group-hover:bg-amber-500/10">
                      <PawPrint className="text-zinc-400 group-hover:text-amber-500 transition-colors" />
                    </div>
                    <span className="font-bold text-lg">{s.name}</span>
                  </div>
                  <span className="text-amber-500 font-bold text-xl">{s.price}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* ETAPA 2: DETALHES DO PET E DATA */}
        {step === 2 && (
          <div className="bg-zinc-900 border border-zinc-800 p-8 rounded-3xl shadow-2xl animate-in fade-in zoom-in-95 duration-500">
            <h2 className="text-2xl font-bold mb-6 text-amber-500">Quase lá!</h2>
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <input 
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 outline-none focus:border-amber-500" 
                  placeholder="Nome do Pet"
                  onChange={(e) => setFormData({...formData, petName: e.target.value})}
                />
                <input 
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 outline-none focus:border-amber-500" 
                  placeholder="Raça"
                  onChange={(e) => setFormData({...formData, petBreed: e.target.value})}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="relative">
                  <Calendar className="absolute left-4 top-3.5 text-zinc-500" size={18} />
                  <input type="date" className="w-full bg-zinc-950 border border-zinc-800 rounded-xl pl-12 pr-4 py-3 outline-none focus:border-amber-500 text-zinc-300" />
                </div>
                <div className="relative">
                  <Clock className="absolute left-4 top-3.5 text-zinc-500" size={18} />
                  <input type="time" className="w-full bg-zinc-950 border border-zinc-800 rounded-xl pl-12 pr-4 py-3 outline-none focus:border-amber-500 text-zinc-300" />
                </div>
              </div>
              <Button onClick={() => setStep(3)} className="w-full py-4 text-lg font-bold">CONFIRMAR AGENDAMENTO</Button>
              <button onClick={() => setStep(1)} className="w-full text-zinc-500 hover:text-zinc-300 text-sm font-medium">Voltar e mudar serviço</button>
            </div>
          </div>
        )}

        {/* ETAPA 3: SUCESSO E AVISO DO WHATSAPP */}
        {step === 3 && (
          <div className="text-center py-12 animate-in fade-in zoom-in-95 duration-500 bg-zinc-900 border border-zinc-800 rounded-3xl px-8 shadow-2xl">
            <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="text-green-500" size={40} />
            </div>
            <h2 className="text-3xl font-bold mb-4">Agendamento Realizado!</h2>
            <p className="text-zinc-400 mb-8 max-w-sm mx-auto">
              O horário para o <strong>{formData.petName}</strong> foi reservado com sucesso para o serviço de <strong>{formData.service}</strong>.
            </p>
            
            <div className="bg-amber-500/10 border border-amber-500/20 p-6 rounded-2xl flex flex-col items-center gap-3">
              <MessageSquare className="text-amber-500" />
              <p className="text-amber-200/80 font-medium leading-relaxed">
                Fique atento! Uma mensagem de confirmação com todos os detalhes será enviada agora para o seu <strong>WhatsApp</strong>.
              </p>
            </div>

            <Button onClick={() => window.location.href = '/'} className="mt-8 px-12">VOLTAR PARA HOME</Button>
          </div>
        )}
      </div>
    </div>
  );
};