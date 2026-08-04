'use client';
import Link from 'next/link';
export function BillingSummary() {
  return (
    <section className="px-5 space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-extrabold text-[#082046]">Mi último corte</h3>
        <Link href="/distribuidoras/cortes" className="text-xs font-bold text-[#082046] flex items-center gap-1">
          Cortes anteriores
          <div className="w-5 h-5 rounded-full bg-[#082046] text-white flex items-center justify-center text-[10px]">
            →
          </div>
        </Link>
      </div>

      <p className="text-xs font-medium text-slate-600">
        Fecha de pago <span className="font-bold text-[#082046]">03/ago/2026</span>{' '}
        <span className="font-bold text-lime-600">(Faltan 0 días)</span>
      </p>

      <div className="bg-sky-50/70 border border-sky-100 rounded-2xl p-4 flex justify-between items-center shadow-sm">
        <span className="text-sm font-bold text-[#082046]">Total a pagar</span>
        <span className="text-2xl font-black text-[#082046]">$72,705</span>
      </div>

      <div className="bg-sky-50/70 border border-sky-100 rounded-2xl p-4 flex justify-between items-center shadow-sm">
        <span className="text-sm font-bold text-[#082046]">Descuento</span>
        <span className="text-2xl font-black text-[#082046]">$15,927</span>
      </div>

      <button className="w-full py-3.5 bg-[#082046] text-white font-bold text-sm rounded-full shadow-md flex items-center justify-center gap-2 cursor-pointer">
        Ver relación de cobro
      </button>
    </section>
  );
}