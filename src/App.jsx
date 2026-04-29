import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Hero } from './components/sections/Hero';
import { Services } from './components/sections/Services';
import { Location } from './components/sections/Location';
import { Footer } from './components/layout/Footer';
import { Navbar } from './components/layout/Navbar'; // Criaremos este componente
import { Login } from './pages/Login';
import { Booking } from './pages/Booking';

function App() {
  return (
    <Router>
      <div className="antialiased bg-zinc-950 min-h-screen font-sans text-zinc-100">
        <Navbar />
        
        <Routes>
          <Route path="/" element={
            <>
              <Hero />
              <Services />
              <section className="py-20 bg-zinc-900 border-t border-zinc-800">
                <div className="container mx-auto px-6 text-center">
                  <h2 className="text-3xl lg:text-4xl font-bold mb-8">Pronto para dar o melhor ao seu amigo?</h2>
                  <a href="/agendamento" className="bg-amber-500 text-zinc-950 px-8 py-3 rounded-full font-bold hover:bg-amber-400 transition-all inline-block">
                    CADASTRAR MEU PET AGORA
                  </a>
                </div>
              </section>
              <Location />
            </>
          } />
          
          <Route path="/login" element={<Login />} />
          <Route path="/agendamento" element={<Booking />} />
        </Routes>

        <Footer />
      </div>
    </Router>
  );
}

export default App;