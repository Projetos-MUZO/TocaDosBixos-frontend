import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { Hero } from './components/sections/Hero';
import { Services } from './components/sections/Services';
import { Location } from './components/sections/Location';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Booking } from './pages/Booking';
import  Admin  from './pages/Admin';

const isAuthenticated = () => !!localStorage.getItem('user_token');
const isAdmin = () => localStorage.getItem('user_email') === 'admin@gmail.com';

function App() {
  return (
    <Router>
      <div className="bg-zinc-950 min-h-screen flex flex-col text-zinc-100 antialiased">
        <Navbar />
        
        <main className="flex-grow pt-20">
          <Routes>
            <Route path="/" element={
              <>
                <Hero />
                {isAuthenticated() && <Services />}
                <Location />
              </>
            } />
            
            <Route path="/login" element={<Login />} />
            <Route path="/registrar" element={<Register />} />
            
            <Route 
              path="/agendamento" 
              element={isAuthenticated() ? <Booking /> : <Navigate to="/login" replace />} 
            />

            <Route 
              path="/admin" 
              element={isAuthenticated() && isAdmin() ? <Admin /> : <Navigate to="/" replace />} 
            />

            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;