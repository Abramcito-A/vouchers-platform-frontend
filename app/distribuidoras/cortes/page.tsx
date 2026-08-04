import { HeaderBar } from '@/app/_components/dashboard/distribuidoras/HeaderBar';
import { DateSelector } from '@/app/_components/dashboard/distribuidoras/DateSelector';

export default function CortesPage() {
  const items = [
    { label: 'Límite de crédito', amount: '$457,000' },
    { label: 'Disponible', amount: '$59,801' },
    { label: 'Saldo al corte', amount: '$0' },
    { label: 'Total a cobrar', amount: '$88,333' },
    { label: 'Descuento', amount: '$15,927' },
    { label: 'Préstamo Personal', amount: '$48,511' },
    { label: 'Cantidad a liberar', amount: '$0' },
    { label: 'Total a pagar', amount: '$72,704', isTotal: true },
  ];

  return (
    <div className="min-h-screen bg-white max-w-md mx-auto shadow-2xl pb-10">
      <HeaderBar title="Mis Cortes" />
      <DateSelector label="CORTE" initialDate="21/jul/2026" />

      <div className="px-5 space-y-3">
        {items.map((item, index) => (
          <div
            key={index}
            className={`p-4 rounded-2xl flex justify-between items-center ${
              item.isTotal ? 'bg-sky-50 border border-sky-100' : 'bg-slate-50/80'
            }`}
          >
            <span className={`text-sm font-semibold ${item.isTotal ? 'text-[#082046]' : 'text-slate-700'}`}>
              {item.label}
            </span>
            <span className={`text-base font-extrabold ${item.isTotal ? 'text-indigo-600 text-lg' : 'text-slate-900'}`}>
              {item.amount}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}