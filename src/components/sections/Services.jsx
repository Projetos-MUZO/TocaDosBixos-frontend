import { useNavigate } from 'react-router-dom';
import { Droplets, Stethoscope, Home, Car, ArrowRight } from 'lucide-react';

const ServiceCard = ({ title, icon: Icon, onClick }) => (
  <div 
    onClick={onClick}
    className="p-8 bg-zinc-900 rounded-3xl border border-zinc-800 hover:border-amber-500/50 transition-all hover:shadow-2xl hover:shadow-amber-500/5 group cursor-pointer text-left"
  >
    <div className="w-14 h-14 bg-zinc-950 border border-zinc-800 text-amber-500 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-amber-500 group-hover:text-zinc-950 transition-colors">
      <Icon size={28} />
    </div>
    <h3 className="text-xl font-bold text-zinc-100 mb-4">{title}</h3>
    <p className="text-zinc-400 text-sm leading-relaxed mb-6">
      Cuidado profissional e carinho garantido para seu pet em cada detalhe do nosso serviço.
    </p>
    <div className="flex items-center gap-2 text-amber-500 text-xs font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
      Agendar agora <ArrowRight size={14} />
    </div>
  </div>
);

export const Services = () => {
  const navigate = useNavigate();

  return (
    <section id="servicos" className="py-24 bg-zinc-950">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-3xl lg:text-5xl font-bold text-zinc-100 mb-4">Nossos Mimos</h2>
        <p className="text-zinc-400 max-w-2xl mx-auto mb-16 italic">
          Oferecemos o que há de melhor para a saúde e bem-estar do seu companheiro.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <ServiceCard title="Banho & Tosa" icon={Droplets} onClick={() => navigate('/agendamento')} />
          <ServiceCard title="Veterinária" icon={Stethoscope} onClick={() => navigate('/agendamento')} />
          <ServiceCard title="Hotel Pet" icon={Home} onClick={() => navigate('/agendamento')} />
          <ServiceCard title="Taxi Dog" icon={Car} onClick={() => navigate('/agendamento')} />
        </div>
      </div>
    </section>
  );
};