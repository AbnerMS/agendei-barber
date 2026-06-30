import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Cadastro from './pages/Cadastro';
import Agenda from './pages/Agenda';
import Dashboard from './pages/Dashboard';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rotas Públicas */}
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />

        {/* Rotas Privadas (Futuramente protegidas por login) */}
        <Route path="/agenda" element={<Agenda />} />
        <Route path="/dashboard" element={<Dashboard />} />

        {/* Redireciona qualquer rota desconhecida para o Login */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
}