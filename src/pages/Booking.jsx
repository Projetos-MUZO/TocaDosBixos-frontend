import React, { useState } from 'react';
import { Button } from '../components/ui/Button';
import { Calendar, Clock, PawPrint, CheckCircle2, MessageSquare, ArrowRight, ArrowLeft } from 'lucide-react';

export const Booking = () => {
  const [step, setStep] = useState(1);
  
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

  const handleStep1 = (serviceName) => {
    setFormData({...formData, service: serviceName});
    setStep(2);
  };

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 bg-zinc-950 text-zinc-100">
      <div className="max-w-3xl mx-auto">
        
        {/* Progress Bar Premium */}
        <div className="flex items-center justify-between mb-16 relative px-4">
          <div className="absolute top-1/2 left-0 w-full h-0.5 bg-zinc-800 -translate-y-1/2 z-0" />
          {[1, 2, 3].map((i) => (
            <div key={i} className={`relative z-10 flex flex-col items-center gap-3`}>
              <div className={`w-10 h-10 rounded-full border-2 flex items-center justify-center font-bold transition-all duration-500 ${step >= i ? 'border-amber-500 bg-amber-500 text-black shadow-[0_0_15px_rgba(245,158,11,0.4)]' : 'border-zinc-800 bg-zinc-950 text-zinc-600'}`}>
                {step > i ? <CheckCircle2 size={20} /> : i}
              </div>
              <span className={`text-xs font-bold uppercase tracking-widest ${step >= i ? 'text-amber-500' : 'text-zinc-600'}`}>
                {i === 1 ? 'Serviço' : i === 2 ? 'Detalhes' : 'Finalizado'}
              </span>
            </div>
          ))}
        </div>

        {step === 1 && (
          <div className="animate-in fade-in slide-in-from-bottom-8 duration-700">
            <h2 className="text-3xl font-bold mb-8 text-center tracking-tight">O que vamos fazer hoje?</h2>
            <div className="grid gap-4">
              {services.map((s) => (
                <button
                  key={s.id}
                  onClick={() => handleStep1(s.name)}
                  className="flex items-center justify-between p-7 bg-zinc-900 border border-zinc-800 rounded-[2rem] hover:border-amber-500 transition-all group text-left hover:scale-[1.02] active:scale-[0.98] shadow-xl"
                >
                  <div className="flex items-center gap-5">
                    <div className="w-14 h-14 rounded-2xl bg-zinc-800 flex items-center justify-center group-hover:bg-amber-500/20 transition-colors">
                      <PawPrint className="text-zinc-500 group-hover:text-amber-500" size={28} />
                    </div>
                    <div>
                      <h3 className="font-bold text-xl tracking-tight">{s.name}</h3>
                      <p className="text-zinc-500 text-sm">Profissionais qualificados</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-amber-500 font-black text-2xl">{s.price}</span>
                    <ArrowRight className="text-zinc-700 group-hover:text-amber-500 transition-colors" size={20} />
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="bg-zinc-900 border border-zinc-800 p-10 rounded-[2.5rem] shadow-2xl animate-in zoom-in-95 duration-500">
            <div className="flex items-center gap-3 mb-8">
               <div className="w-2 h-8 bg-amber-500 rounded-full" />
               <h2 className="text-2xl font-bold">Informações Necessárias</h2>
            </div>
            
            <div className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-zinc-500 uppercase ml-1">Quem é o pet?</label>
                  <input className="w-full bg-zinc-950 border border-zinc-800 rounded-2xl px-5 py-4 outline-none focus:border-amber-500 transition-all text-zinc-100" placeholder="Nome do amiguinho" onChange={(e) => setFormData({...formData, petName: e.target.value})} />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-zinc-500 uppercase ml-1">Qual a raça?</label>
                  <input className="w-full bg-zinc-950 border border-zinc-800 rounded-2xl px-5 py-4 outline-none focus:border-amber-500 transition-all text-zinc-100" placeholder="Ex: Shih Tzu" onChange={(e) => setFormData({...formData, petBreed: e.target.value})} />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-zinc-500 uppercase ml-1">Melhor dia</label>
                  <div className="relative">
                    <Calendar className="absolute left-4 top-4.5 text-zinc-600" size={20} />
                    <input type="date" className="w-full bg-zinc-950 border border-zinc-800 rounded-2xl pl-12 pr-5 py-4 outline-none focus:border-amber-500 text-zinc-300" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-zinc-500 uppercase ml-1">Horário</label>
                  <div className="relative">
                    <Clock className="absolute left-4 top-4.5 text-zinc-600" size={20} />
                    <input type="time" className="w-full bg-zinc-950 border border-zinc-800 rounded-2xl pl-12 pr-5 py-4 outline-none focus:border-amber-500 text-zinc-300" />
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-3 pt-4">
                <Button onClick={() => setStep(3)} className="w-full py-5 text-lg font-black tracking-widest shadow-lg shadow-amber-500/20">CONFIRMAR AGENDAMENTO</Button>
                <button onClick={() => setStep(1)} className="flex items-center justify-center gap-2 text-zinc-500 hover:text-zinc-300 transition-colors text-sm font-bold uppercase tracking-tighter">
                  <ArrowLeft size={16} /> Voltar para serviços
                </button>
              </div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="text-center py-16 animate-in fade-in zoom-in-95 duration-700 bg-zinc-900 border border-zinc-800 rounded-[3rem] px-10 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-amber-500 to-yellow-300" />
            <div className="w-24 h-24 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-8">
              <CheckCircle2 className="text-green-500" size={48} />
            </div>
            <h2 className="text-4xl font-black mb-4 tracking-tight text-zinc-100">Sucesso Total!</h2>
            <p className="text-zinc-400 mb-10 text-lg leading-relaxed max-w-sm mx-auto">
              O agendamento de <strong>{formData.service}</strong> para o <strong>{formData.petName}</strong> foi registrado no nosso sistema.
            </p>
            
            <div className="bg-zinc-950 border border-zinc-800 p-8 rounded-[2rem] flex flex-col items-center gap-4 relative shadow-inner">
              <div className="bg-green-500 p-2 rounded-full absolute -top-4 shadow-lg shadow-green-500/40">
                <MessageSquare className="text-white" size={20} />
              </div>
              <p className="text-zinc-100 font-bold text-lg leading-snug">
                Fique atento ao seu celular!
              </p>
              <p className="text-zinc-500 text-sm">
                Enviamos agora mesmo uma confirmação detalhada para o seu <strong>WhatsApp</strong>.
              </p>
            </div>

            <Button onClick={() => window.location.href = '/'} className="mt-12 px-16 py-4 rounded-2xl uppercase font-black tracking-widest">Finalizar</Button>
          </div>
        )}
      </div>
    </div>
  );
};