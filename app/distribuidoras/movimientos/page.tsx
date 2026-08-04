import { HeaderBar } from '@/app/_components/dashboard/distribuidoras/HeaderBar';
import { DateSelector } from '@/app/_components/dashboard/distribuidoras/DateSelector';

export default function MovimientosPage() {
  const movimientosAyer = [
    { title: 'Abono', desc: 'Se recibió por cajas de abono', amount: '+$28,704', time: '11:52hrs', isPositive: true },
    { title: 'Abono', desc: 'Se recibió por cajas de abono', amount: '+$44,000', time: '11:51hrs', isPositive: true },
    { title: 'Abono', desc: 'Se recibió por cajas de abono', amount: '+$450', time: '10:52hrs', isPositive: true },
    { title: 'Abono', desc: 'Se recibió por cajas de abono', amount: '+$15,476', time: '10:52hrs', isPositive: true },
  ];

  const movimientosAgosto = [
    { title: 'Viridiana Delgado Hernandez', desc: 'Se activó un Vale Financiero', amount: '$4,000', time: '13:06hrs', isPositive: false },
  ];

  return (
    <div className="min-h-screen bg-white max-w-md mx-auto shadow-2xl pb-10">
      <HeaderBar title="Mis movimientos" />
      <DateSelector label="Fecha corte" initialDate="21/jul/2026" />

      <div className="px-5 space-y-6">
        {/* Grupo Ayer */}
        <div>
          <h2 className="text-sm font-bold text-indigo-900 mb-3">Ayer</h2>
          <div className="divide-y divide-slate-100">
            {movimientosAyer.map((mov, i) => (
              <div key={i} className="py-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-800">{mov.title}</p>
                    <p className="text-xs text-slate-500">{mov.desc}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-extrabold text-emerald-600">{mov.amount}</p>
                  <p className="text-[11px] text-slate-400">{mov.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Grupo 01 de agosto */}
        <div>
          <h2 className="text-sm font-bold text-indigo-900 mb-3">01 de agosto</h2>
          <div className="divide-y divide-slate-100">
            {movimientosAgosto.map((mov, i) => (
              <div key={i} className="py-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-800">{mov.title}</p>
                    <p className="text-xs text-slate-500">{mov.desc}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-extrabold text-slate-800">{mov.amount}</p>
                  <p className="text-[11px] text-slate-400">{mov.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}