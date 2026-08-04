'use client';

export function BottomNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 py-2.5 px-6 flex justify-between items-center z-50 max-w-md mx-auto shadow-lg">
      <button className="flex flex-col items-center gap-1 text-blue-600 font-bold text-[11px]">
        <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" /></svg>
        Inicio
      </button>
      <button className="flex flex-col items-center gap-1 text-slate-400 font-semibold text-[11px]">
        <svg className="w-6 h-6 stroke-current fill-none" viewBox="0 0 24 24" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
        Vales
      </button>
      <button className="flex flex-col items-center gap-1 text-slate-400 font-semibold text-[11px]">
        <svg className="w-6 h-6 stroke-current fill-none" viewBox="0 0 24 24" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
        Contactos
      </button>
      <button className="flex flex-col items-center gap-1 text-slate-400 font-semibold text-[11px]">
        <svg className="w-6 h-6 stroke-current fill-none" viewBox="0 0 24 24" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
        Mi Control
      </button>
    </nav>
  );
}