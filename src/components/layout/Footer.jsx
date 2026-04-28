import { MapPin, Clock, Phone, Mail, MessageCircle } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-zinc-950 text-zinc-300 pt-16 pb-8 border-t border-zinc-900">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12 border-b border-zinc-900 pb-12">
        <div>
          <h3 className="text-2xl font-bold text-amber-500 mb-6">Toca dos Bichos</h3>
          <p className="text-zinc-400 leading-relaxed">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut enim ad minim veniam, quis nostrud exercitation.
          </p>
        </div>
        
        <div>
          <h4 className="text-lg font-bold text-zinc-100 mb-6">Onde Estamos</h4>
          <ul className="text-zinc-400 space-y-4">
            <li className="flex items-start gap-3">
              <MapPin className="text-amber-500 shrink-0 mt-1" size={20} />
              <span>Estrada Morro dos Olhos DAgua, 58 <br/> São Paulo, Brazil<br/>CEP: 08270-360</span>
            </li>
            <li className="flex items-center gap-3">
              <Clock className="text-amber-500 shrink-0" size={20} />
              <span>Seg a Sáb: 9:00 às 18:00</span>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-lg font-bold text-zinc-100 mb-6">Contato Direto</h4>
          <div className="flex items-center gap-3 mb-2">
            <Phone className="text-amber-500" size={24} />
            <p className="text-3xl font-bold text-zinc-100">99693-4452</p>
          </div>
          <p className="text-xl text-zinc-400 ml-9">2737-7089</p>
          
          <div className="mt-6 flex gap-4">
             {/* Ícone de Email */}
             <a href="#" className="w-10 h-10 bg-zinc-900 border border-zinc-800 rounded-full flex items-center justify-center text-zinc-400 hover:text-amber-500 hover:border-amber-500 transition" title="Enviar E-mail">
               <Mail size={20} />
             </a>
             {/* Ícone de Chat/Mensagem */}
             <a href="#" className="w-10 h-10 bg-zinc-900 border border-zinc-800 rounded-full flex items-center justify-center text-zinc-400 hover:text-amber-500 hover:border-amber-500 transition" title="Enviar Mensagem">
               <MessageCircle size={20} />
             </a>
          </div>
        </div>
      </div>
      <p className="text-center text-zinc-500 mt-8 text-sm">
        © 2026 Toca dos Bichos. Desenvolvido com ❤️ para os pets.
      </p>
    </footer>
  );
};