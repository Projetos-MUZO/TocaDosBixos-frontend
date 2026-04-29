import { useState } from 'react';
import { Button } from '../components/ui/Button';
import { Calendar, Clock, Scissors, Stethoscope, Syringe } from 'lucide-react';

// Simulação do banco de dados de agendamentos
export const bookingsDB = [];

export const Booking = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    service: '',
    date: '',
    time: '',
    petName: '',
    observations: ''
  });

  const services = [
    { id: 'banho', name: 'Banho e Tosa', icon: <Scissors className="w-5 h-5" />, price: 'R$ 80,00' },
    { id: 'consulta', name: 'Consulta Veterinária', icon: <Stethoscope className="w-5 h-5" />, price: 'R$ 150,00' },
    { id: 'vacina', name: 'Vacinação', icon: <Syringe className="w-5 h-5" />, price: 'R$ 120,00' },
  ];

  const availableTimes = [
    '09:00', '10:00', '11:00', '14:00', '15:00', '16:00', '17:00'
  ];

  const handleServiceSelect = (serviceName) => {
    setFormData({ ...formData, service: serviceName });
    setStep(2);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const newBooking = {
      id: Date.now(),
      ...formData,
      status: 'Confirmado',
      createdAt: new Date().toLocaleString()
    };

    bookingsDB.push(newBooking);
    
    console.log("Agendamento realizado:", newBooking);
    console.log("Todos os agendamentos na 'Agenda':", bookingsDB);
    
    alert(`Agendamento de ${formData.service} para o pet ${formData.petName} realizado com sucesso!`);
    
    // Resetar formulário
    setFormData({ service: '', date: '', time: '', petName: '', observations: '' });
    setStep(1);
  };

  return (
    <div className="min-h-screen bg-zinc-950 py-32 px-6">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-amber-500 mb-4">Agendamento Online</h1>
          <p className="text-zinc-400">Escolha o serviço e o melhor horário para seu pet</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Lado Esquerdo: Formulário/Seleção */}
          <div className="md:col-span-2 space-y-6">
            {step === 1 && (
              <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-3xl">
                <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
                  <Scissors className="text-amber-500" /> 1. Selecione o Serviço
                </h3>
                <div className="grid grid-cols-1 gap-4">
                  {services.map((s) => (
                    <button
                      key={s.id}
                      onClick={() => handleServiceSelect(s.name)}
                      className="flex items-center justify-between p-4 bg-zinc-950 border border-zinc-800 rounded-2xl hover:border-amber-500 transition-all group"
                    >
                      <div className="flex items-center gap-4">
                        <div className="p-3 bg-zinc-900 rounded-xl group-hover:text-amber-500">
                          {s.icon}
                        </div>
                        <span className="font-medium">{s.name}</span>
                      </div>
                      <span className="text-amber-500 font-bold">{s.price}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {step === 2 && (
              <form onSubmit={handleSubmit} className="bg-zinc-900 border border-zinc-800 p-6 rounded-3xl space-y-6">
                <h3 className="text-xl font-semibold flex items-center gap-2">
                  <Calendar className="text-amber-500" /> 2. Data e Horário
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-zinc-400 mb-2">Data</label>
                    <input 
                      type="date" 
                      required
                      value={formData.date}
                      onChange={(e) => setFormData({...formData, date: e.target.value})}
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 outline-none focus:border-amber-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-zinc-400 mb-2">Horário</label>
                    <select 
                      required
                      value={formData.time}
                      onChange={(e) => setFormData({...formData, time: e.target.value})}
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 outline-none focus:border-amber-500"
                    >
                      <option value="">Selecione um horário</option>
                      {availableTimes.map(t => <option key={t} value={t}>{t}</option>)}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-zinc-400 mb-2">Nome do Pet</label>
                  <input 
                    type="text" 
                    placeholder="Ex: Totó"
                    required
                    value={formData.petName}
                    onChange={(e) => setFormData({...formData, petName: e.target.value})}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 outline-none focus:border-amber-500"
                  />
                </div>

                <div className="flex gap-4">
                  <Button type="button" variant="outline" onClick={() => setStep(1)} className="flex-1">Voltar</Button>
                  <Button type="submit" className="flex-1">Confirmar Agendamento</Button>
                </div>
              </form>
            )}
          </div>

          {/* Lado Direito: Resumo da Agenda (O que já foi marcado) */}
          <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-3xl h-fit">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Clock className="text-amber-500 w-5 h-5" /> Próximos na Agenda
            </h3>
            <div className="space-y-4">
              {bookingsDB.length === 0 ? (
                <p className="text-zinc-500 text-sm italic">Nenhum agendamento realizado ainda.</p>
              ) : (
                bookingsDB.map((b) => (
                  <div key={b.id} className="p-3 bg-zinc-950 border-l-4 border-amber-500 rounded-r-xl">
                    <p className="text-sm font-bold text-zinc-200">{b.service}</p>
                    <p className="text-xs text-zinc-400">{b.petName} • {b.date} às {b.time}</p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};