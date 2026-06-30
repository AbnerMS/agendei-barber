import { useState } from 'react';
import Calendar from '../../components/Calendar';
import { format } from 'date-fns';
import { useEffect } from 'react';

export default function Agenda() {
  // Modifica o título da aba da página
  useEffect(() => {
    document.title = "Agendar Horário | Agendei Barber";
  }, []);

  // Estados mockados para controlar a seleção do usuário
  const [servico, setServico] = useState('');
  const [barbeiro, setBarbeiro] = useState('');
  const [data, setData] = useState('');
  const [horario, setHorario] = useState('');

  // Captura o dia de hoje e corta o texto para o formato YYYY-MM-DD
  const hojeString = format(new Date(), 'yyyy-MM-dd');

  // Converte a data selecionada no calendário para string apenas se ela existir
  const dataSelecionadaString = data ? format(data, 'yyyy-MM-dd') : '';

  // Dados dos serviços para renderizar na tela
  const servicos = [
    { id: 1, nome: 'Cabelo', preco: 'R$ 45,00', tempo: '30 min' },
    { id: 2, nome: 'Barba', preco: 'R$ 35,00', tempo: '20 min' },
    { id: 3, nome: 'Combo (Cabelo + Barba)', preco: 'R$ 70,00', tempo: '50 min' },
  ];

  const barbeiros = [
    { id: 1, nome: 'Rodrigo (Corte Geral)' },
  ];

  // lista base de horários
  const todosHorarios = ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00', '17:00'];

  // Aplica o filtro dinâmico
  const horariosFiltrados = todosHorarios.filter(h => {
    // Compara a string da data selecionada com a string de hoje
    if (dataSelecionadaString === hojeString) {
      const agora = new Date();
      const horaAtual = agora.getHours();
      const minutoAtual = agora.getMinutes();
  
      // Divide a string "14:00" em números (14 e 0)
      const [horaHorario, minutoHorario] = h.split(':').map(Number);

      // Só mantém o horário se a hora for maior, ou se for a mesma hora mas com minutos maiores
      return horaHorario > horaAtual || (horaHorario === horaAtual && minutoHorario > minutoAtual);
    }
    return true; // Se for outro dia, mostra todos os horários
  });

  const handleAgendar = (e) => {
    e.preventDefault();
    if (!servico || !barbeiro || !data || !horario) {
      alert('Por favor, preencha todos os campos!');
      return;
    }
    alert(`Agendamento realizado!\nServiço ID: ${servico}\nBarbeiro ID: ${barbeiro}\nData: ${data}\nHora: ${horario}`);
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col items-center py-10 px-4">
      <div className="w-full max-w-2xl bg-zinc-900 border border-zinc-800 rounded-xl p-6 md:p-8 shadow-2xl">
        
        {/* Cabeçalho */}
        <header className="text-center mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-amber-500">Agendei Barber</h1>
          <p className="text-zinc-400 mt-2 text-sm">Escolha os melhores serviços e horários em poucos cliques.</p>
        </header>

        <form onSubmit={handleAgendar} className="space-y-6">
          
          {/* 1. Seleção de Serviço */}
          <div>
            <label className="block text-sm font-medium mb-2 text-zinc-300">1. Selecione o Serviço</label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {servicos.map((s) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => setServico(s.id)}
                  className={`p-4 rounded-lg border text-left transition-all ${
                    servico === s.id
                      ? 'border-amber-500 bg-amber-500/10 text-amber-500'
                      : 'border-zinc-800 bg-zinc-900 hover:border-zinc-700 text-zinc-300'
                  }`}
                >
                  <p className="font-semibold text-sm">{s.nome}</p>
                  <div className="flex justify-between items-center mt-2 text-xs text-zinc-400">
                    <span>{s.preco}</span>
                    <span>{s.tempo}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* 2. Seleção de Barbeiro */}
          <div>
            <label className="block text-sm font-medium mb-2 text-zinc-300">2. Escolha o Profissional</label>
            <select
              value={barbeiro}
              onChange={(e) => setBarbeiro(e.target.value)}
              className="w-full p-3 rounded-lg border border-zinc-800 bg-zinc-900 text-zinc-300 focus:outline-none focus:border-amber-500 transition-colors"
            >
              <option value="">Selecione um barbeiro...</option>
              {barbeiros.map((b) => (
                <option key={b.id} value={b.id}>{b.nome}</option>
              ))}
            </select>
          </div>

          {/* 3. Data e Horário */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2 text-zinc-300">3. Escolha a Data</label>
              <div className="bg-zinc-900 border border-zinc-800 p-4 rounded-xl shadow-md inline-block">
                <Calendar
                  selectedDate={data} // Seu estado 'data' da página de agendamentos
                  onDateSelect={(date) => {
                    setData(date);
                    setHorario(''); // Limpa o horário antigo
                  }}
                  // Propriedade para bloquear datas anteriores ao dia atual:
                  disabled={{ before: new Date() }}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-zinc-300">4. Horários Disponíveis</label>
              <div className="grid grid-cols-3 gap-2">
                {horariosFiltrados.map((h) => (
                  <button
                    key={h}
                    type="button"
                    onClick={() => setHorario(h)}
                    className={`p-2.5 text-sm font-medium rounded-md transition-all border ${
                      horario === h
                        ? 'bg-amber-500 text-zinc-950 border-amber-500 font-bold'
                        : 'bg-zinc-900 border-zinc-800 text-zinc-300 hover:border-zinc-700'
                    }`}
                  >
                    {h}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Botão de Confirmação */}
          <button
            type="submit"
            className="w-full mt-4 bg-amber-500 hover:bg-amber-600 text-zinc-950 font-bold p-3.5 rounded-lg transition-colors shadow-lg shadow-amber-500/10"
          >
            Confirmar Agendamento
          </button>

        </form>
      </div>
    </div>
  );
}