import { Button } from '../ui/Button';
import { Star, PawPrint } from 'lucide-react';

export const Hero = () => {
  return (
    <section className="relative pt-32 pb-20 overflow-hidden bg-zinc-950">
      {/* Elemento Decorativo */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-zinc-900 rounded-l-[100px] -z-10 hidden lg:block" />
      
      <div className="container mx-auto px-6 flex flex-col lg:flex-row items-center">
        <div className="lg:w-1/2 text-center lg:text-left">
          <span className="inline-flex items-center gap-2 bg-zinc-900 border border-amber-500/30 text-amber-500 px-4 py-1 rounded-full text-sm font-bold tracking-wide uppercase">
            <PawPrint size={16} /> O melhor amigo do seu pet
          </span>
          <h1 className="text-5xl lg:text-7xl font-extrabold text-zinc-100 mt-6 leading-tight">
            Toca dos Bichos <br/> 
            <span className="text-amber-500">Petshop</span>
          </h1>
          <p className="text-zinc-400 mt-8 text-lg lg:pr-20 leading-relaxed">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <Button>Agendar Banho</Button>
            <Button variant="outline">Ver Serviços</Button>
          </div>
        </div>
        
        <div className="lg:w-1/2 mt-12 lg:mt-0 relative">
          {/* Imagem de Exemplo */}
          <div className="w-full h-[450px] bg-zinc-800 rounded-[40px] shadow-2xl border-4 border-zinc-800 overflow-hidden transform rotate-2">
            <img 
              src="https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&w=800&q=80" 
              alt="Cachorro no Petshop" 
              className="w-full h-full object-cover"
            />
          </div>
          {/* Badge flutuante com Lucide Icon */}
          <div className="absolute -bottom-6 -left-6 bg-zinc-900 p-6 rounded-2xl shadow-xl border-l-4 border-amber-500">
             <div className="flex items-center gap-2">
               <Star className="text-amber-500" fill="currentColor" size={20} />
               <p className="text-sm font-bold text-zinc-100">4.9/5 Estrelas</p>
             </div>
             <p className="text-xs text-zinc-400 mt-1">Mais de 500 pets felizes</p>
          </div>
        </div>
      </div>
    </section>
  );
};