import { Hero } from './components/sections/Hero';
import { Services } from './components/sections/Services';
import { Location } from './components/sections/Location';
import { Footer } from './components/layout/Footer';
import { Button } from './components/ui/Button';

function App() {
  return (
    <div className="antialiased bg-zinc-950 min-h-screen font-sans">
      {/* Navbar Dark/Gold */}
      <nav className="fixed top-0 w-full z-50 bg-zinc-950/80 backdrop-blur-md border-b border-zinc-800">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="text-2xl font-black text-amber-500 tracking-tighter">TOCA.</div>
          <div className="hidden md:flex gap-8 font-medium text-zinc-300">
            <a href="#" className="hover:text-amber-500 transition">Início</a>
            <a href="#" className="hover:text-amber-500 transition">Serviços</a>
            <a href="#" className="hover:text-amber-500 transition">Contato</a>
          </div>
          <Button variant="outline" className="px-6 py-2">Login</Button>
        </div>
      </nav>

      <Hero />
      <Services />
      
      {/* Seção Extra de Chamada para Ação */}
      <section className="py-20 bg-zinc-800 border-t border-zinc-800">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-zinc-100 mb-8">Pronto para dar o melhor ao seu amigo?</h2>
          <Button>CADASTRAR MEU PET AGORA</Button>
        </div>
      </section>

      {/* Nova Seção com o Mapa */}
      <Location />

      <Footer />
    </div>
  );
}

export default App;