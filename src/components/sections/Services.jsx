import { Droplets, Stethoscope, Home, Car } from 'lucide-react';

const ServiceCard = ({ title, icon: Icon }) => (
  <div className="p-8 bg-zinc-900 rounded-3xl border border-zinc-800 hover:border-amber-500/50 transition-all hover:shadow-2xl hover:shadow-amber-500/5 group">
    <div className="w-14 h-14 bg-zinc-950 border border-zinc-800 text-amber-500 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-amber-500 group-hover:text-zinc-950 transition-colors">
      <Icon size={28} />
    </div>
    <h3 className="text-xl font-bold text-zinc-100 mb-4">{title}</h3>
    <p className="text-zinc-400 text-sm leading-relaxed">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut enim ad minim veniam, quis nostrud exercitation.
    </p>
  </div>
);

export const Services = () => {
  return (
    <section className="py-24 bg-zinc-950">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-3xl lg:text-5xl font-bold text-zinc-100 mb-4">Nossos Mimos</h2>
        <p className="text-zinc-400 max-w-2xl mx-auto mb-16 italic">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <ServiceCard title="Banho & Tosa" icon={Droplets} />
          <ServiceCard title="Veterinária" icon={Stethoscope} />
          <ServiceCard title="Hotel Pet" icon={Home} />
          <ServiceCard title="Taxi Dog" icon={Car} />
        </div>
      </div>
    </section>
  );
};