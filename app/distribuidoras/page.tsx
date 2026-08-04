import { TablaDistribuidoras, type Distribuidora } from '@/app/_components/dashboard/distribuidoras/TablaDistribuidoras';
const mockDistribuidoras: Distribuidora[] = [
  { id: '1', nombre: 'Distribuidora del Norte', valesEmitidos: 142, limiteCredito: 500000, estado: 'Activa' },
  { id: '2', nombre: 'Comercializadora Laguna', valesEmitidos: 89, limiteCredito: 300000, estado: 'Activa' },
  { id: '3', nombre: 'Suministros Torreón', valesEmitidos: 12, limiteCredito: 150000, estado: 'Inactiva' },
];

export default function DistribuidorasPage() {
  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto font-sans">
      {/* Encabezado con el Botón CTA Principal */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-[#082046]">Distribuidoras</h1>
          <p className="text-xs text-slate-500 font-medium mt-1">
            Administra las cuentas, emisión de vales y estatus crediticio.
          </p>
        </div>

        <button className="py-3 px-6 bg-[#76C900] hover:bg-[#68B300] active:scale-95 text-[#082046] font-bold text-sm rounded-full shadow-md shadow-lime-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer w-fit">
          <span className="text-lg leading-none font-black">+</span>
          Nueva Distribuidora
        </button>
      </div>

      {/* Renderizado de Componente Modular */}
      <TablaDistribuidoras distribuidoras={mockDistribuidoras} />
    </div>
  );
}