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
  const [events, setEvents] = useState(mockEvents);
  // NOVO: Estado para controlar qual evento está selecionado e exibir o modal
  const [selectedEvent, setSelectedEvent] = useState(null);

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
      <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-orange-500">Calendário de Agendamentos</h1>
          <p className="text-gray-400 mt-1">Gerencie a agenda da <span className="font-semibold text-orange-400">Toca dos Bixos</span></p>
        </div>
        <div className="mt-4 md:mt-0">
          <button 
            className="bg-orange-500 hover:bg-orange-400 text-black px-6 py-2.5 rounded-lg font-bold shadow-lg shadow-orange-500/20 transition-all transform hover:scale-105"
            onClick={() => alert("Modal de criação de um novo agendamento abriria aqui!")}
          >
            + Novo Agendamento
          </button>
        </div>
      </div>

      {/* Container do Calendário */}
      <div className="bg-zinc-900 p-5 rounded-2xl shadow-xl border border-zinc-800 relative z-10">
        <div style={{ height: '75vh' }}>
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
            // NOVO: Evento disparado ao clicar no agendamento
            onSelectEvent={(event) => setSelectedEvent(event)} 
          />
        </div>
      </div>

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
                    onClick={() => { alert('Tem certeza que deseja cancelar?'); handleCloseModal(); }}
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
      
    </div>
  );
}