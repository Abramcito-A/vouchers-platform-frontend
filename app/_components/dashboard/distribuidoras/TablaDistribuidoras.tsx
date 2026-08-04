'use client';

export interface Distribuidora {
  id: string;
  nombre: string;
  valesEmitidos: number;
  limiteCredito: number;
  estado: 'Activa' | 'Inactiva';
}

interface Props {
  distribuidoras: Distribuidora[];
}

export function TablaDistribuidoras({ distribuidoras }: Props) {
  return (
    <div className="w-full bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm text-slate-600">
          <thead className="bg-[#082046] text-white text-xs uppercase tracking-wider">
            <tr>
              <th className="py-3.5 px-5 font-semibold">Distribuidora</th>
              <th className="py-3.5 px-5 font-semibold">Vales Emitidos</th>
              <th className="py-3.5 px-5 font-semibold">Límite de Crédito</th>
              <th className="py-3.5 px-5 font-semibold">Estatus</th>
              <th className="py-3.5 px-5 font-semibold text-right">Acción</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {distribuidoras.map((item) => (
              <tr key={item.id} className="hover:bg-sky-50/50 transition-colors">
                <td className="py-4 px-5 font-bold text-[#082046]">{item.nombre}</td>
                <td className="py-4 px-5 font-medium">{item.valesEmitidos}</td>
                <td className="py-4 px-5 font-medium">${item.limiteCredito.toLocaleString('es-MX')}</td>
                <td className="py-4 px-5">
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${
                    item.estado === 'Activa' 
                      ? 'bg-emerald-100 text-emerald-800' 
                      : 'bg-slate-100 text-slate-600'
                  }`}>
                    {item.estado}
                  </span>
                </td>
                <td className="py-4 px-5 text-right">
                  <button className="text-xs font-bold text-[#082046] hover:text-cyan-600 underline underline-offset-2 transition-colors">
                    Ver detalle
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}