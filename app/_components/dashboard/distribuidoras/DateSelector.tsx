'use client';

import { useState } from 'react';

interface Props {
  label?: string;
  initialDate?: string;
}

export function DateSelector({ label = 'CORTE', initialDate = '21/jul/2026' }: Props) {
  const [currentDate, setCurrentDate] = useState(initialDate);

  return (
    <div className="text-center my-5">
      <span className="text-xs font-black tracking-wider text-slate-500 uppercase block mb-3">{label}</span>
      <div className="flex items-center justify-center gap-6">
        <button className="w-10 h-10 rounded-full bg-indigo-500 text-white flex items-center justify-center shadow-md active:scale-95 transition-transform">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        
        <span className="text-lg font-bold text-[#082046]">{currentDate}</span>

        <button className="w-10 h-10 rounded-full bg-slate-300 text-slate-500 flex items-center justify-center shadow-sm">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
}