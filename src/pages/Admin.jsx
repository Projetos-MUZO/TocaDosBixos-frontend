import React, { useState } from 'react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import ptBR from 'date-fns/locale/pt-BR';
import 'react-big-calendar/lib/css/react-big-calendar.css';

// Configuração de localização para deixar o calendário em Português
const locales = {
  'pt-BR': ptBR,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

// Funções auxiliares para gerar horários baseados no dia atual (para a demo)
const getTodayAt = (hours, minutes = 0) => {
  const date = new Date();
  date.setHours(hours, minutes, 0, 0);
  return date;
};

const getTomorrowAt = (hours, minutes = 0) => {
  const date = new Date();
  date.setDate(date.getDate() + 1);
  date.setHours(hours, minutes, 0, 0);
  return date;
};

// Dados fictícios estruturados para o react-big-calendar
const mockEvents = [
  {
    id: 1,
    title: 'Rex (Banho e Tosa) - Carlos Souza',
    start: getTodayAt(9, 0),
    end: getTodayAt(10, 30),
    type: 'banho',
  },
  {
    id: 2,
    title: 'Mimi (Consulta) - Ana Luiza',
    start: getTodayAt(10, 30),
    end: getTodayAt(11, 30),
    type: 'consulta',
  },
  {
    id: 3,
    title: 'Thor (Vacinação) - Mariana',
    start: getTodayAt(13, 0),
    end: getTodayAt(13, 30),
    type: 'consulta',
  },
  {
    id: 4,
    title: 'Luna (Banho) - Roberto',
    start: getTodayAt(15, 0),
    end: getTodayAt(16, 0),
    type: 'banho',
  },
  {
    id: 5,
    title: 'Bidu (Avaliação) - Fernanda',
    start: getTomorrowAt(8, 30),
    end: getTomorrowAt(9, 30),
    type: 'consulta',
  },
  {
    id: 6,
    title: 'Zeus (Adestramento) - Marcos',
    start: getTomorrowAt(14, 0),
    end: getTomorrowAt(15, 30),
    type: 'outro',
  },
];

export default function Admin() {
  const [activeTab, setActiveTab] = useState('calendar');
  const [events, setEvents] = useState(mockEvents);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newEvent, setNewEvent] = useState({
    petName: '',
    serviceId: '',
    date: format(new Date(), 'yyyy-MM-dd'),
    time: '09:00'
  });

  const [services, setServices] = useState(() => {
    const saved = localStorage.getItem('toca_servicos');
    return saved ? JSON.parse(saved) : [
      { id: 1, name: 'Banho e Tosa', price: 'R$ 80,00', duration: 60 },
      { id: 2, name: 'Consulta Veterinária', price: 'R$ 150,00', duration: 30 }
    ];
  });

  const handleAddEvent = (e) => {
    e.preventDefault();
    const service = services.find(s => s.id === parseInt(newEvent.serviceId));
    if (!service) return;

    const start = new Date(`${newEvent.date}T${newEvent.time}:00`);
    const end = new Date(start.getTime() + service.duration * 60000);

    const event = {
      id: Date.now(),
      title: `${newEvent.petName} (${service.name})`,
      start,
      end,
      type: service.name.toLowerCase().includes('consulta') ? 'consulta' : 'banho'
    };

    setEvents([...events, event]);
    setIsAddModalOpen(false);
    setNewEvent({ petName: '', serviceId: '', date: format(new Date(), 'yyyy-MM-dd'), time: '09:00' });
  };

  const handleUpdateService = (id, field, value) => {
    const updated = services.map(s => s.id === id ? { ...s, [field]: value } : s);
    setServices(updated);
    localStorage.setItem('toca_servicos', JSON.stringify(updated));
  };

  const handleAddService = () => {
    const newService = {
      id: Date.now(),
      name: 'Novo Serviço',
      price: 'R$ 0,00',
      duration: 30
    };
    const updated = [...services, newService];
    setServices(updated);
    localStorage.setItem('toca_servicos', JSON.stringify(updated));
  };

  const handleDeleteService = (id) => {
    const updated = services.filter(s => s.id !== id);
    setServices(updated);
    localStorage.setItem('toca_servicos', JSON.stringify(updated));
  };

  // Customização das cores dos eventos no calendário (Tema Laranja/Preto)
  const eventStyleGetter = (event) => {
    let backgroundColor = '#f97316'; // Laranja padrão (Banhos/Tosas)
    let color = '#000000'; // Texto preto para contrastar com o laranja
    let border = 'none';

    if (event.type === 'consulta') {
      backgroundColor = '#000000'; // Fundo preto
      color = '#f97316'; // Texto laranja
      border = '1px solid #f97316'; // Borda laranja
    } else if (event.type === 'outro') {
      backgroundColor = '#27272a'; // Cinza bem escuro
      color = '#ea580c'; // Laranja mais forte
      border = '1px solid #3f3f46';
    }

    return {
      style: {
        backgroundColor,
        color,
        border,
        borderRadius: '6px',
        opacity: 0.95,
        display: 'block',
        fontWeight: '600',
        padding: '2px 6px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
        cursor: 'pointer' // Adicionado cursor de clique
      }
    };
  };

  // NOVO: Função para fechar o modal
  const handleCloseModal = () => {
    setSelectedEvent(null);
  };

  return (
    <div className="min-h-screen bg-black p-6 font-sans text-gray-100 relative">
      
      {/* Estilos CSS embutidos para forçar o React Big Calendar no modo Dark/Laranja */}
      <style>{`
        .rbc-calendar { color: #f4f4f5; font-family: inherit; }
        .rbc-header { padding: 10px 0; border-bottom: 1px solid #3f3f46 !important; border-left: 1px solid #3f3f46 !important; font-weight: 600; text-transform: uppercase; font-size: 0.85rem; color: #a1a1aa; }
        .rbc-month-view, .rbc-time-view, .rbc-agenda-view { border: 1px solid #3f3f46 !important; border-radius: 0.5rem; overflow: hidden; background-color: #18181b; }
        .rbc-day-bg { border-left: 1px solid #3f3f46 !important; }
        .rbc-month-row { border-top: 1px solid #3f3f46 !important; }
        .rbc-timeslot-group { border-bottom: 1px solid #3f3f46 !important; }
        .rbc-time-content { border-top: 1px solid #3f3f46 !important; }
        .rbc-time-header-content { border-left: 1px solid #3f3f46 !important; }
        .rbc-time-content > * + * > * { border-left: 1px solid #3f3f46 !important; }
        .rbc-day-slot .rbc-time-slot { border-top: 1px solid #27272a !important; }
        .rbc-off-range-bg { background: #09090b !important; }
        .rbc-today { background: rgba(249, 115, 22, 0.08) !important; }
        
        /* Botões do Toolbar do Calendário */
        .rbc-toolbar button { color: #f4f4f5 !important; border: 1px solid #3f3f46 !important; background: #27272a !important; transition: all 0.2s; border-radius: 6px; margin-right: 6px; padding: 6px 14px; cursor: pointer; }
        .rbc-toolbar button:hover { background: #3f3f46 !important; border-color: #f97316 !important; color: #f97316 !important; }
        .rbc-toolbar button.rbc-active { background: #f97316 !important; color: #000 !important; border-color: #f97316 !important; font-weight: bold; }
        .rbc-toolbar .rbc-toolbar-label { font-weight: bold; font-size: 1.25rem; color: #f97316; }
      `}</style>

      {/* Cabeçalho */}
      <div className="mb-8 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black text-white tracking-tighter">ADMINISTRAÇÃO</h1>
          <p className="text-zinc-500 font-medium uppercase tracking-[0.2em] text-xs mt-1">Painel de Controle Toca dos Bixos</p>
        </div>
        
        <div className="flex bg-zinc-900/50 p-1.5 rounded-2xl border border-zinc-800">
          <button 
            onClick={() => setActiveTab('calendar')}
            className={`px-6 py-2.5 rounded-xl font-bold transition-all ${activeTab === 'calendar' ? 'bg-orange-500 text-black shadow-lg shadow-orange-500/20' : 'text-zinc-500 hover:text-white'}`}
          >
            Calendário
          </button>
          <button 
            onClick={() => setActiveTab('services')}
            className={`px-6 py-2.5 rounded-xl font-bold transition-all ${activeTab === 'services' ? 'bg-orange-500 text-black shadow-lg shadow-orange-500/20' : 'text-zinc-500 hover:text-white'}`}
          >
            Serviços
          </button>
        </div>
      </div>

      {activeTab === 'calendar' ? (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="flex justify-end mb-4">
            <button 
              onClick={() => setIsAddModalOpen(true)}
              className="bg-orange-500 hover:bg-orange-400 text-black px-6 py-2.5 rounded-xl font-bold shadow-lg shadow-orange-500/20 transition-all flex items-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
              Novo Agendamento
            </button>
          </div>
          {/* Container do Calendário */}
          <div className="bg-zinc-900 p-5 rounded-2xl shadow-xl border border-zinc-800 relative z-10">
            <div style={{ height: '70vh' }}>
              <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                style={{ height: '100%' }}
                messages={{
                  next: "Próximo",
                  previous: "Anterior",
                  today: "Hoje",
                  month: "Mês",
                  week: "Semana",
                  day: "Dia",
                  agenda: "Agenda",
                  date: "Data",
                  time: "Hora",
                  event: "Evento",
                  noEventsInRange: "Nenhum agendamento neste período."
                }}
                culture="pt-BR"
                eventPropGetter={eventStyleGetter}
                defaultView="week"
                step={30}
                min={new Date(0, 0, 0, 7, 0, 0)}
                max={new Date(0, 0, 0, 19, 0, 0)}
                onSelectEvent={(event) => setSelectedEvent(event)} 
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-5xl">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-white">Gestão de Serviços</h2>
              <p className="text-zinc-500 text-sm">Configure os serviços e suas durações para o agendamento.</p>
            </div>
            <button 
              onClick={handleAddService}
              className="bg-zinc-800 hover:bg-zinc-700 text-white px-4 py-2 rounded-xl font-bold border border-zinc-700 transition-all flex items-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
              Novo Serviço
            </button>
          </div>

          <div className="grid gap-4">
            {services.map((service) => (
              <div key={service.id} className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl flex flex-wrap items-center gap-6 group hover:border-orange-500/50 transition-all">
                <div className="flex-1 min-w-[200px] space-y-1">
                  <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Nome do Serviço</label>
                  <input 
                    type="text" 
                    value={service.name} 
                    onChange={(e) => handleUpdateService(service.id, 'name', e.target.value)}
                    className="w-full bg-black border border-zinc-800 rounded-lg px-3 py-2 text-zinc-100 focus:border-orange-500 outline-none transition-all"
                  />
                </div>
                
                <div className="w-32 space-y-1">
                  <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Preço</label>
                  <input 
                    type="text" 
                    value={service.price} 
                    onChange={(e) => handleUpdateService(service.id, 'price', e.target.value)}
                    className="w-full bg-black border border-zinc-800 rounded-lg px-3 py-2 text-orange-500 font-bold focus:border-orange-500 outline-none transition-all"
                  />
                </div>

                <div className="w-40 space-y-1">
                  <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Duração (minutos)</label>
                  <div className="flex items-center gap-3">
                    <input 
                      type="number" 
                      value={service.duration} 
                      onChange={(e) => handleUpdateService(service.id, 'duration', parseInt(e.target.value))}
                      className="w-full bg-black border border-zinc-800 rounded-lg px-3 py-2 text-zinc-100 focus:border-orange-500 outline-none transition-all"
                    />
                    <span className="text-zinc-500 text-xs font-bold uppercase">min</span>
                  </div>
                </div>

                <div className="flex items-end h-full pt-5">
                  <button 
                    onClick={() => handleDeleteService(service.id)}
                    className="p-2 text-zinc-600 hover:text-red-500 transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/></svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* NOVO: Modal de Detalhes do Evento */}
      {selectedEvent && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4 transition-opacity">
          <div className="bg-zinc-900 border border-zinc-700 rounded-2xl p-6 w-full max-w-md shadow-2xl shadow-orange-900/20 transform transition-all">
            
            <div className="flex justify-between items-start mb-6">
              <h2 className="text-2xl font-bold text-orange-500">Detalhes do Agendamento</h2>
              <button onClick={handleCloseModal} className="text-zinc-400 hover:text-white transition-colors bg-zinc-800 hover:bg-zinc-700 p-2 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>

            <div className="space-y-5">
              <div className="bg-black/50 p-4 rounded-xl border border-zinc-800">
                <span className="text-xs text-zinc-500 uppercase tracking-widest font-bold block mb-1">Serviço e Cliente</span>
                <p className="text-lg font-semibold text-zinc-100">{selectedEvent.title}</p>
                <span className="inline-block mt-2 px-3 py-1 bg-zinc-800 text-orange-400 text-xs font-bold rounded-md border border-zinc-700 uppercase">
                  Tipo: {selectedEvent.type}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-black/50 p-4 rounded-xl border border-zinc-800">
                  <span className="text-xs text-zinc-500 uppercase tracking-widest font-bold block mb-1">Início</span>
                  <p className="text-sm font-medium text-orange-400">
                    {format(selectedEvent.start, "dd/MM/yyyy 'às' HH:mm", { locale: ptBR })}
                  </p>
                </div>
                <div className="bg-black/50 p-4 rounded-xl border border-zinc-800">
                  <span className="text-xs text-zinc-500 uppercase tracking-widest font-bold block mb-1">Término</span>
                  <p className="text-sm font-medium text-orange-400">
                    {format(selectedEvent.end, "dd/MM/yyyy 'às' HH:mm", { locale: ptBR })}
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-zinc-800">
                <div className="flex gap-3">
                  <button 
                    onClick={() => { alert('Aqui abriria a tela para editar!'); handleCloseModal(); }}
                    className="flex-1 bg-orange-500 hover:bg-orange-400 text-black py-2.5 rounded-xl font-bold transition-colors"
                  >
                    Editar
                  </button>
                  <button 
                    onClick={() => { 
                      if (window.confirm('Tem certeza que deseja cancelar este agendamento?')) {
                        setEvents(events.filter(e => e.id !== selectedEvent.id));
                        handleCloseModal();
                      }
                    }}
                    className="flex-1 bg-transparent border border-red-500/50 text-red-400 hover:bg-red-500 hover:text-white py-2.5 rounded-xl font-bold transition-colors"
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* NOVO: Modal para Adicionar Agendamento */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-300">
          <div className="bg-zinc-900 border border-zinc-700 rounded-2xl p-8 w-full max-w-lg shadow-2xl relative">
            <button 
              onClick={() => setIsAddModalOpen(false)}
              className="absolute top-4 right-4 text-zinc-500 hover:text-white transition-colors p-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
            </button>

            <h2 className="text-2xl font-black text-orange-500 mb-6 uppercase tracking-tight">Novo Agendamento</h2>
            
            <form onSubmit={handleAddEvent} className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest ml-1">Nome do Pet</label>
                <input 
                  required
                  type="text"
                  placeholder="Ex: Rex"
                  className="w-full bg-black border border-zinc-800 rounded-xl px-4 py-3 text-zinc-100 focus:border-orange-500 outline-none transition-all"
                  value={newEvent.petName}
                  onChange={(e) => setNewEvent({...newEvent, petName: e.target.value})}
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest ml-1">Serviço</label>
                <select 
                  required
                  className="w-full bg-black border border-zinc-800 rounded-xl px-4 py-3 text-zinc-100 focus:border-orange-500 outline-none transition-all appearance-none"
                  value={newEvent.serviceId}
                  onChange={(e) => setNewEvent({...newEvent, serviceId: e.target.value})}
                >
                  <option value="">Selecione um serviço</option>
                  {services.map(s => (
                    <option key={s.id} value={s.id}>{s.name} ({s.duration} min)</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest ml-1">Data</label>
                  <input 
                    required
                    type="date"
                    className="w-full bg-black border border-zinc-800 rounded-xl px-4 py-3 text-zinc-100 focus:border-orange-500 outline-none transition-all"
                    value={newEvent.date}
                    onChange={(e) => setNewEvent({...newEvent, date: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest ml-1">Horário</label>
                  <input 
                    required
                    type="time"
                    className="w-full bg-black border border-zinc-800 rounded-xl px-4 py-3 text-zinc-100 focus:border-orange-500 outline-none transition-all"
                    value={newEvent.time}
                    onChange={(e) => setNewEvent({...newEvent, time: e.target.value})}
                  />
                </div>
              </div>

              <button 
                type="submit"
                className="w-full bg-orange-500 hover:bg-orange-400 text-black py-4 rounded-xl font-black uppercase tracking-widest transition-all shadow-lg shadow-orange-500/20 mt-4"
              >
                Criar Agendamento
              </button>
            </form>
          </div>
        </div>
      )}
      
    </div>
  );
}