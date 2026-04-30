import { MapPin, Clock, Phone, Camera, MessageCircle } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-zinc-950 text-zinc-300 pt-16 pb-8 border-t border-zinc-900">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12 border-b border-zinc-900 pb-12">
        {/* Sobre */}
        <div>
          <h3 className="text-2xl font-bold text-amber-500 mb-6 tracking-tighter">TOCA DOS BICHOS</h3>
          <p className="text-zinc-400 leading-relaxed">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.
          </p>
        </div>
        
        {/* Localização e Horário */}
        <div>
          <h4 className="text-lg font-bold text-zinc-100 mb-6 italic uppercase tracking-widest text-sm">Onde Estamos</h4>
          <ul className="text-zinc-400 space-y-4">
            <li className="flex items-start gap-3">
              <MapPin className="text-amber-500 shrink-0 mt-1" size={20} />
              <span>
                Estrada Morro dos Olhos DAgua, 58 <br/> 
                São Paulo, Brazil - CEP: 08270-360
              </span>
            </li>
            <li className="flex items-center gap-3">
              <Clock className="text-amber-500 shrink-0" size={20} />
              <span>Segunda a Sábado: 09h às 18h</span>
            </li>
          </ul>
        </div>

        {/* Canais de Contato Explicitos */}
        <div>
          <h4 className="text-lg font-bold text-zinc-100 mb-6 italic uppercase tracking-widest text-sm">Contatos Diretos</h4>
          
          <div className="space-y-6">
            {/* WhatsApp */}
            <a 
              href="https://wa.me/5511996934452" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-4 group hover:bg-zinc-900 p-3 rounded-2xl transition-all border border-transparent hover:border-amber-500/20"
            >
              <div className="w-12 h-12 bg-zinc-900 border border-zinc-800 rounded-full flex items-center justify-center text-amber-500 group-hover:bg-amber-500 group-hover:text-zinc-950 transition-colors">
                <MessageCircle size={24} />
              </div>
              <div>
                <p className="text-xs text-zinc-500 font-bold uppercase">WhatsApp</p>
                <p className="text-xl font-bold text-zinc-100">(11) 99693-4452</p>
              </div>
            </a>

            {/* Instagram */}
            <a 
              href="https://www.instagram.com/tocadosbichos_petshop_/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-4 group hover:bg-zinc-900 p-3 rounded-2xl transition-all border border-transparent hover:border-amber-500/20"
            >
              <div className="w-12 h-12 bg-zinc-900 border border-zinc-800 rounded-full flex items-center justify-center text-amber-500 group-hover:bg-amber-500 group-hover:text-zinc-950 transition-colors">
                <Camera size={24} />
              </div>
              <div>
                <p className="text-xs text-zinc-500 font-bold uppercase">Instagram</p>
                <p className="text-zinc-100 font-medium">@tocadosbichos_petshop_</p>
              </div>
            </a>

            {/* Telefone Fixo */}
            <div className="flex items-center gap-4 p-3">
              <div className="w-12 h-12 bg-zinc-900 border border-zinc-800 rounded-full flex items-center justify-center  text-amber-500 group-hover:bg-amber-500">
                <Phone size={24} />
              </div>
              <div>
                <p className="text-xs text-zinc-500 font-bold uppercase">Telefone Fixo</p>
                <p className="text-zinc-100 font-medium">(11) 2737-7089</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <p className="text-center text-zinc-600 mt-8 text-xs tracking-widest uppercase">
        © 2026 Toca dos Bichos. Design de Luxo para seu Pet.
      </p>
    </footer>
  );
};