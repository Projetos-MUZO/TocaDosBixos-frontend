import { MapPin } from 'lucide-react';

export const Location = () => {
  return (
    <section className="py-24 bg-zinc-900 border-y border-zinc-800">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-5xl font-bold text-zinc-100 mb-4 flex justify-center items-center gap-4">
            <MapPin className="text-amber-500" size={40} />
            Venha nos Visitar
          </h2>
          <p className="text-zinc-400 max-w-2xl mx-auto text-lg">
            Estamos localizados em um ponto de fácil acesso para garantir o conforto do seu pet desde a chegada. Traga seu melhor amigo para nos conhecer!
          </p>
        </div>
        
        <div className="w-full h-[450px] rounded-3xl overflow-hidden shadow-2xl border-4 border-zinc-800 bg-zinc-950 relative">
          {/* iframe do Google Maps embutido */}
          <iframe 
            src="https://maps.google.com/maps?q=Toca%20dos%20B%C3%ADchos%20Pet%20Shop%20Estrada%20Morro%20dos%20Olhos%20D'Agua%20S%C3%A3o%20Paulo&t=&z=15&ie=UTF8&iwloc=&output=embed"
            width="100%" 
            height="100%" 
            style={{ border: 0 }} 
            allowFullScreen="" 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
            title="Mapa de localização Toca dos Bichos"
            className="grayscale contrast-125 opacity-90 hover:grayscale-0 hover:opacity-100 transition-all duration-700"
          ></iframe>
        </div>
      </div>
    </section>
  );
};