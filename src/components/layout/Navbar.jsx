import { Link } from 'react-router-dom';
import { Button } from '../ui/Button';

export const Navbar = () => {
  return (
    <nav className="fixed top-0 w-full z-50 bg-zinc-950/80 backdrop-blur-md border-b border-zinc-800">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo que volta para a home */}
        <Link to="/" className="text-2xl font-black text-amber-500 tracking-tighter">
          TOCA.
        </Link>

        {/* Links de Navegação */}
        <div className="hidden md:flex gap-8 font-medium text-zinc-300">
          <Link to="/" className="hover:text-amber-500 transition-colors">Início</Link>
          <Link to="/agendamento" className="hover:text-amber-500 transition-colors">Agendar</Link>
        </div>

        {/* Botão de Login */}
        <Link to="/login">
          <Button variant="outline" className="px-6 py-2 text-sm">
            Login
          </Button>
        </Link>
      </div>
    </nav>
  );
};