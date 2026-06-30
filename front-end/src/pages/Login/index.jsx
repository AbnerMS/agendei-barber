import { useState, useEffect } from 'react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  useEffect(() => { 
    document.title = "Entrar | Agendei Barber";
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    // Lógica de autenticação entrará aqui quando conectarmos o backend
    alert(`Tentando logar com: ${email}`);
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-zinc-900 border border-zinc-800 p-8 rounded-2xl shadow-2xl space-y-6">
        
        {/* Cabeçalho */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-amber-500 tracking-tight">Agendei Barber</h1>
          <p className="text-sm text-zinc-400">Faça login para gerenciar ou realizar seus agendamentos.</p>
        </div>

        {/* Formulário */}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1.5 text-zinc-300">E-mail</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="seuemail@exemplo.com"
              className="w-full p-3 rounded-lg border border-zinc-800 bg-zinc-950 text-zinc-300 focus:outline-none focus:border-amber-500 transition-colors"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1.5 text-zinc-300">Senha</label>
            <input
              type="password"
              required
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              placeholder="••••••••"
              className="w-full p-3 rounded-lg border border-zinc-800 bg-zinc-950 text-zinc-300 focus:outline-none focus:border-amber-500 transition-colors"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-amber-500 text-zinc-950 font-bold p-3 rounded-lg hover:bg-amber-600 transition-colors shadow-md shadow-amber-500/10"
          >
            Entrar
          </button>
        </form>

        {/* Link para Cadastro */}
        <div className="text-center text-sm text-zinc-500">
          Não tem uma conta?{' '}
          <a href="/cadastro" className="text-amber-500 hover:underline font-medium">
            Cadastre-se aqui
          </a>
        </div>

      </div>
    </div>
  );
}