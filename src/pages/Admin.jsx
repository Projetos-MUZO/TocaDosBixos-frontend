import React, { useState, useEffect } from 'react';
import { Button } from '../components/ui/Button';
import { Package, Trash2, ShieldCheck, Plus, LayoutDashboard } from 'lucide-react';

export const Admin = () => {
  const [activeTab, setActiveTab] = useState('appointments');
  
  // Estado inicial que será a vitrine do seu produto
  const [services, setServices] = useState(() => {
    const saved = localStorage.getItem('toca_servicos');
    return saved ? JSON.parse(saved) : [
      { id: 1, name: 'Banho e Tosa', price: 'R$ 80,00', duration: '2h' },
      { id: 2, name: 'Consulta Veterinária', price: 'R$ 150,00', duration: '1h' }
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
      price: newPrice.includes('R$') ? newPrice : `R$ ${newPrice}`,
      duration: '1h'
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
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-amber-500 flex items-center gap-2">
               <ShieldCheck className="w-8 h-8" /> Painel de Gestão
            </h1>
            <p className="text-zinc-500 text-sm mt-1">Bem-vindo ao controle da sua empresa.</p>
          </div>
          <div className="flex bg-zinc-900 p-1 rounded-2xl border border-zinc-800 shadow-lg">
            <button onClick={() => setActiveTab('appointments')} className={`px-6 py-2 rounded-xl transition-all font-bold flex items-center gap-2 ${activeTab === 'appointments' ? 'bg-amber-500 text-black' : 'text-zinc-400 hover:text-white'}`}>
              <LayoutDashboard size={18} /> Agenda
            </button>
            <button onClick={() => setActiveTab('services')} className={`px-6 py-2 rounded-xl transition-all font-bold flex items-center gap-2 ${activeTab === 'services' ? 'bg-amber-500 text-black' : 'text-zinc-400 hover:text-white'}`}>
              <Package size={18} /> Serviços
            </button>
          </div>
        </div>

        {activeTab === 'appointments' ? (
          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl overflow-hidden shadow-2xl animate-in fade-in duration-500">
             <table className="w-full text-left text-zinc-100">
                <thead className="bg-zinc-800/50 text-amber-500 text-sm uppercase tracking-wider font-bold">
                  <tr>
                    <th className="p-6">Data & Horário</th>
                    <th className="p-6">Cliente / Pet</th>
                    <th className="p-6">Serviço Solicitado</th>
                    <th className="p-6">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-800">
                  <tr className="hover:bg-zinc-800/30 transition-colors">
                    <td className="p-6 font-mono text-zinc-400 text-sm">30/04/2026 - 10:00</td>
                    <td className="p-6">
                      <p className="font-bold">Murilo (Demo)</p>
                      <p className="text-xs text-zinc-500 italic">Pet: Thor</p>
                    </td>
                    <td className="p-6">
                      <span className="bg-amber-500/10 text-amber-500 px-3 py-1 rounded-full text-xs font-bold border border-amber-500/20">Banho</span>
                    </td>
                    <td className="p-6">
                      <span className="flex items-center gap-2 text-green-500 text-sm font-medium">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" /> Confirmado
                      </span>
                    </td>
                  </tr>
                </tbody>
             </table>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-in slide-in-from-right-4 duration-500">
            <form onSubmit={handleAddService} className="bg-zinc-900 p-8 rounded-3xl border border-zinc-800 h-fit shadow-2xl sticky top-24">
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2 text-zinc-100"><Plus className="text-amber-500" /> Cadastrar Novo</h3>
              <div className="space-y-4">
                <div className="space-y-1">
                  <label className="text-xs text-zinc-500 ml-1">Nome do Serviço</label>
                  <input value={newName} onChange={(e) => setNewName(e.target.value)} className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 outline-none focus:border-amber-500 text-zinc-100 placeholder:text-zinc-700" placeholder="Ex: Tosa Higiênica" />
                </div>
                <div className="space-y-1">
                  <label className="text-xs text-zinc-500 ml-1">Valor</label>
                  <input value={newPrice} onChange={(e) => setNewPrice(e.target.value)} className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 outline-none focus:border-amber-500 text-zinc-100 placeholder:text-zinc-700" placeholder="Ex: 95,00" />
                </div>
                <Button type="submit" className="w-full font-bold h-12 mt-2">ADICIONAR À VITRINE</Button>
              </div>
            </form>

            <div className="lg:col-span-2 space-y-4">
              {services.map(s => (
                <div key={s.id} className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl flex justify-between items-center transition-all hover:border-amber-500/30 group shadow-md">
                  <div>
                    <p className="font-bold text-xl text-zinc-100">{s.name}</p>
                    <p className="text-amber-500 font-mono font-bold text-lg">{s.price}</p>
                  </div>
                  <button onClick={() => handleRemoveService(s.id)} className="p-3 bg-red-500/5 text-zinc-600 rounded-xl hover:bg-red-500 hover:text-white transition-all">
                    <Trash2 size={20}/>
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