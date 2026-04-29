import React, { useState, useEffect } from 'react';
import { Button } from '../components/ui/Button';
import { Package, Trash2, ShieldCheck } from 'lucide-react';

export const Admin = () => {
  const [activeTab, setActiveTab] = useState('appointments');
  
  const [services, setServices] = useState(() => {
    const saved = localStorage.getItem('toca_servicos');
    return saved ? JSON.parse(saved) : [
      { id: 1, name: 'Banho e Tosa', price: 'R$ 80,00' },
      { id: 2, name: 'Consulta Veterinária', price: 'R$ 150,00' }
    ];
  });

  const [newName, setNewName] = useState('');
  const [newPrice, setNewPrice] = useState('');

  useEffect(() => {
    localStorage.setItem('toca_servicos', JSON.stringify(services));
  }, [services]);

  const handleAddService = (e) => {
    e.preventDefault();
    if (!newName || !newPrice) return;
    const newService = {
      id: Date.now(),
      name: newName,
      price: `R$ ${newPrice}`
    };
    setServices([...services, newService]);
    setNewName('');
    setNewPrice('');
  };

  const handleRemoveService = (id) => {
    setServices(services.filter(s => s.id !== id));
  };

  return (
    <div className="min-h-screen pt-12 pb-12 px-6 bg-zinc-950">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-3xl font-bold text-amber-500 flex items-center gap-2">
             <ShieldCheck /> Painel Admin
          </h1>
          <div className="flex bg-zinc-900 p-1 rounded-2xl border border-zinc-800">
            <button onClick={() => setActiveTab('appointments')} className={`px-6 py-2 rounded-xl transition-all font-bold ${activeTab === 'appointments' ? 'bg-amber-500 text-black' : 'text-zinc-400'}`}>Agenda</button>
            <button onClick={() => setActiveTab('services')} className={`px-6 py-2 rounded-xl transition-all font-bold ${activeTab === 'services' ? 'bg-amber-500 text-black' : 'text-zinc-400'}`}>Serviços</button>
          </div>
        </div>

        {activeTab === 'appointments' ? (
          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl overflow-hidden">
             <table className="w-full text-left text-zinc-100">
                <thead className="bg-zinc-800/50 text-amber-500 text-sm uppercase font-bold">
                  <tr>
                    <th className="p-5">Horário</th>
                    <th className="p-5">Cliente / Pet</th>
                    <th className="p-5">Serviço</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-800">
                  <tr>
                    <td className="p-5 font-mono text-zinc-400">30/04/2026 - 10:00</td>
                    <td className="p-5">
                      <p className="font-bold">Murilo</p>
                      <p className="text-sm text-zinc-500">Thor</p>
                    </td>
                    <td className="p-5"><span className="bg-amber-500/10 text-amber-500 px-3 py-1 rounded-full text-xs font-bold border border-amber-500/20 text-center inline-block">Banho</span></td>
                  </tr>
                </tbody>
             </table>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <form onSubmit={handleAddService} className="bg-zinc-900 p-6 rounded-3xl border border-zinc-800 h-fit shadow-2xl">
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2 text-zinc-100"><Package className="text-amber-500" /> Novo Serviço</h3>
              <div className="space-y-4">
                <input value={newName} onChange={(e) => setNewName(e.target.value)} className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 outline-none focus:border-amber-500 text-zinc-100" placeholder="Nome do Serviço" />
                <input value={newPrice} onChange={(e) => setNewPrice(e.target.value)} className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 outline-none focus:border-amber-500 text-zinc-100" placeholder="Preço (ex: 95,00)" />
                <Button type="submit" className="w-full font-bold">ADICIONAR</Button>
              </div>
            </form>

            <div className="md:col-span-2 space-y-4">
              {services.map(s => (
                <div key={s.id} className="bg-zinc-900 border border-zinc-800 p-5 rounded-2xl flex justify-between items-center transition-all hover:border-zinc-700">
                  <div>
                    <p className="font-bold text-lg text-zinc-100">{s.name}</p>
                    <p className="text-amber-500 font-mono font-bold">{s.price}</p>
                  </div>
                  <button onClick={() => handleRemoveService(s.id)} className="p-3 bg-red-500/10 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all">
                    <Trash2 size={18}/>
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};