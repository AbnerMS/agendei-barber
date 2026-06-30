import { useState, useEffect } from 'react';

export default function Cadastro() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [tipoUsuario, setTipoUsuario] = useState('cliente'); // 'cliente' ou 'barbeiro'

  useEffect(() => {
    document.title = "Criar Conta | Agendei Barber";
  }, []);

  const handleCadastro = (e) => {
    e.preventDefault();
    // Lógica de envio para a API entrará aqui
    alert(`Cadastro enviado: ${nome} como ${tipoUsuario}`);
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-zinc-900 border border-zinc-800 p-8 rounded-2xl shadow-2xl space-y-6">
        
        {/* Cabeçalho */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-amber-500 tracking-tight">Crie sua conta</h1>
          <p className="text-sm text-zinc-400">Preencha os dados abaixo para começar.</p>
        </div>

        {/* Formulário */}
        <form onSubmit={handleCadastro} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1.5 text-zinc-300">Nome Completo</label>
            <input
              type="text"
              required
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              placeholder="Seu nome"
              className="w-full p-3 rounded-lg border border-zinc-800 bg-zinc-950 text-zinc-300 focus:outline-none focus:border-amber-500 transition-colors"
            />
          </div>

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
              placeholder="Mínimo 6 caracteres"
              className="w-full p-3 rounded-lg border border-zinc-800 bg-zinc-950 text-zinc-300 focus:outline-none focus:border-amber-500 transition-colors"
            />
          </div>

          {/* Tipo de Perfil */}
          <div>
            <label className="block text-sm font-medium mb-1.5 text-zinc-300">Eu sou:</label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setTipoUsuario('cliente')}
                className={`p-3 rounded-lg border font-medium text-sm transition-all ${
                  tipoUsuario === 'cliente'
                    ? 'border-amber-500 bg-amber-500/10 text-amber-500'
                    : 'border-zinc-800 bg-zinc-950 text-zinc-400 hover:border-zinc-700'
                }`}
              >
                Cliente
              </button>
              <button
                type="button"
                onClick={() => setTipoUsuario('barbeiro')}
                className={`p-3 rounded-lg border font-medium text-sm transition-all ${
                  tipoUsuario === 'barbeiro'
                    ? 'border-amber-500 bg-amber-500/10 text-amber-500'
                    : 'border-zinc-800 bg-zinc-950 text-zinc-400 hover:border-zinc-700'
                }`}
              >
                Barbeiro
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-amber-500 text-zinc-950 font-bold p-3 rounded-lg hover:bg-amber-600 transition-colors shadow-md shadow-amber-500/10 pt-2"
          >
            Cadastrar
          </button>
        </form>

        {/* Link para Login */}
        <div className="text-center text-sm text-zinc-500">
          Já possui uma conta?{' '}
          <a href="/login" className="text-amber-500 hover:underline font-medium">
            Faça login
          </a>
        </div>

      </div>
    </div>
  );
}