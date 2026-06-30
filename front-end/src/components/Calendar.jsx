import { DayPicker } from 'react-day-picker';
import { enUS, ptBR } from 'date-fns/locale';

export default function Calendar({ selectedDate, onDateSelect, ...props }) {
  return (
    <DayPicker
      mode="single"
      selected={selectedDate}
      onSelect={(date) => date && onDateSelect(date)}
      locale={ptBR}
      classNames={{
        outside: 'text-zinc-600 opacity-50 pointer-events-none',
        // 🔽 Para estilizar os dias desativados (apagados e sem clique)
        disabled: 'text-zinc-700 opacity-90 pointer-events-none strike-through',
      }}
      {...props} // Permite passar propriedades extras se necessário (ex: minDate)
    />
  );
}