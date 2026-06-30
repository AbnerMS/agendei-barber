import { useEffect, useState } from 'react';
import { DayPicker } from 'react-day-picker';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale'; // Para deixar em português
import Calendar from '../../components/Calendar'; // Importa o Calendário padrão do site

export default function Dashboard() {
  // Modifica o título da aba da página
  useEffect(() => {
    document.title = "Painel de Controle | Agendei Barber";
  }, []);
  
  // Dados mockados de agendamentos para exibição:
  const [agendamentos, setAgendamentos] = useState([
    { id: 1, cliente: 'Carlos Silva', servico: 'Cabelo', hora: '09:00', data: '2026-06-30', status: 'Confirmado' },
    { id: 2, cliente: 'André Souza', servico: 'Combo (Cabelo + Barba)', hora: '10:00', data: '2026-06-30', status: 'Confirmado' },
    { id: 3, cliente: 'Marcos Lima', servico: 'Barba', hora: '14:00', data: '2026-06-30', status: 'Pendente' },
    { id: 4, cliente: 'João Batista', servico: 'Barba', hora: '11:00', data: '2026-07-01', status: 'Confirmado'},
    { id: 4, cliente: 'Fábio José', servico: 'Combo (Cabelo + Barba)', hora: '14:00', data: '2026-07-01', status: 'Pendente'},
  ]);

  // Inicialização do estado da data para um objeto Date:
  const [dataFiltro, setDataFiltro] = useState(new Date());
  const [mostrarCalendario, setMostrarCalendario] = useState(false); // 👈 Controla o modal
  // Formata o Date para string (YYYY-MM-DD):
  const dataFormatadaString = format(dataFiltro, 'yyyy-MM-dd');
  // Formata a data para exibir no texto do botão (ex: "29 de Junho de 2026")
  const dataBotaoTexto = format(dataFiltro, "dd 'de' MMMM", { locale: ptBR });

  // Filtra a lista de agendamentos baseada na data selecionada
  const agendamentosFiltrados = agendamentos.filter(a => a.data === dataFormatadaString);

  // Função simples para simular o cancelamento de um horário
  const handleCancelar = (id) => {
    if (confirm("Deseja realmente cancelar este agendamento?")) {
      setAgendamentos(agendamentos.filter(a => a.id !== id));
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col md:flex-row">
      
      {/* Barra Lateral / Sidebar */}
      <aside className="w-full md:w-64 bg-zinc-900 border-b md:border-b-0 md:border-r border-zinc-800 p-6 flex flex-col justify-between">
        <div>
          <h2 className="text-xl font-bold text-amber-500 mb-6 tracking-tight">Agendei Barber</h2>
          <nav className="space-y-2">
            <a href="#" className="block p-3 rounded-lg bg-zinc-800 text-amber-500 font-medium">Agenda do Dia</a>
            <a href="#" className="block p-3 rounded-lg text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200 transition-colors">Clientes</a>
            <a href="#" className="block p-3 rounded-lg text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200 transition-colors">Configurações</a>
          </nav>
        </div>
        <div className="mt-6 md:mt-0 pt-4 border-t border-zinc-800 text-sm text-zinc-500">
          Barbeiro: <span className="text-zinc-300 font-medium">Rodrigo</span>
        </div>
      </aside>

      {/* Conteúdo Principal */}
      <main className="flex-1 p-6 md:p-10 space-y-8">
        
        {/* Cabeçalho */}
        <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Painel de Controle</h1>
            <p className="text-sm text-zinc-400">Gerencie seus horários marcados.</p>
          </div>

          {/* Filtro de data e contador agrupados */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            
            <div className="relative"> {/* 👈 Garante que o modal se alinhe ao botão */}
              {/* Botão que abre/fecha o calendário */}
              <button
                type="button"
                onClick={() => setMostrarCalendario(!mostrarCalendario)}
                className="bg-zinc-900 border border-zinc-800 px-4 py-2 rounded-lg text-sm font-medium text-zinc-300 hover:border-zinc-700 transition-colors flex items-center gap-2"
              >
                📅 <span>{dataBotaoTexto}</span>
              </button>

              {/* Modal/Popover suspenso */}
              {mostrarCalendario && (
                <>
                  {/* Camada invisível no fundo para fechar o modal ao clicar fora */}
                  <div 
                    className="fixed inset-0 z-10" 
                    onClick={() => setMostrarCalendario(false)} 
                  />

                  {/* Caixa do Calendário */}
                  <div className="absolute right-0 mt-2 p-4 bg-zinc-900 border border-zinc-800 rounded-xl shadow-2xl z-20">
                    <Calendar
                      selectedDate={dataFiltro}
                      onDateSelect={(date) => {
                        setDataFiltro(date);
                        setMostrarCalendario(false);
                      }}
                    />
                  </div>
                </>
              )}
            </div>

            <div className="bg-zinc-900 border border-zinc-800 px-4 py-2.5 rounded-lg text-sm font-medium text-zinc-300 whitespace-nowrap">
              Total do dia: <span className="text-amber-500 font-bold">{agendamentosFiltrados.length} cortes</span>
            </div>
          </div>
        </header>

        {/* Lista de Agendamentos */}
        <section className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden shadow-xl">
          <div className="p-5 border-b border-zinc-800">
            <h3 className="font-semibold text-zinc-200">Próximos Clientes</h3>
          </div>

          <div className="divide-y divide-zinc-800">
            {agendamentosFiltrados.length > 0 ? (
              agendamentosFiltrados.map((a) => (
                <div key={a.id} className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-zinc-900/50 transition-colors">
                  <div className="flex items-start gap-4">
                    {/* Badge da Hora */}
                    <span className="bg-amber-500/10 text-amber-500 font-bold px-3 py-1.5 rounded-md text-sm border border-amber-500/20 whitespace-nowrap">
                      {a.hora}
                    </span>
                    <div>
                      <h4 className="font-medium text-zinc-200">{a.cliente}</h4>
                      <p className="text-xs text-zinc-400 mt-0.5">Serviço: {a.servico}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 justify-between sm:justify-end">
                    <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                      a.status === 'Confirmado' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                    }`}>
                      {a.status}
                    </span>
                    <button
                      onClick={() => handleCancelar(a.id)}
                      className="text-xs text-rose-400 hover:text-rose-300 font-medium transition-colors"
                    >
                      Cancelar
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-10 text-center text-zinc-500 italic text-sm">
                Nenhum agendamento para este dia.
              </div>
            )}
          </div>
        </section>

      </main>
    </div>
  );
}