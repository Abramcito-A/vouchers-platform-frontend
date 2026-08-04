'use client';
import Link from 'next/link';
export function QuickActions() {
  return (
    <section className="px-5 my-6">
      <div className="flex items-center gap-6 overflow-x-auto pb-2 scrollbar-none">
        <Link href="/distribuidoras/movimientos" className="flex flex-col items-center gap-2 min-w-[72px]">
          <div className="w-16 h-16 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 shadow-sm">
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
            </svg>
          </div>
          <span className="text-xs font-bold text-[#082046]">Movimientos</span>
        </Link>

        <button className="flex flex-col items-center gap-2 min-w-[72px]">
          <div className="w-16 h-16 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 shadow-sm">
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <span className="text-xs font-bold text-[#082046]">Mis préstamos</span>
        </button>
      </div>
    </section>
  );
}