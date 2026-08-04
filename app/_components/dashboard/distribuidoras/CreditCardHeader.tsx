'use client';

import { useState } from 'react';
import { SolicitarModal } from './SolicitarModal';

export function CreditCardHeader() {
  const [showDetails, setShowDetails] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const creditLimit = 457000;
  const usedCredit = 397199;
  const availableCredit = creditLimit - usedCredit;
  const usagePercentage = Math.round((usedCredit / creditLimit) * 100);

  return (
    <section className="bg-[#082046] text-white pt-6 pb-8 px-5 rounded-b-[2.5rem] shadow-xl relative overflow-hidden">
      <div className="relative z-10 flex items-center justify-between mb-6">
        <button className="w-11 h-11 rounded-full bg-white/10 flex items-center justify-center border border-white/20">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        </button>

        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-lime-400 to-cyan-400 flex items-center justify-center text-[#082046] font-black text-sm">
            $
          </div>
          <div className="text-left leading-none">
            <span className="text-lg font-extrabold text-white block">Mis Vales</span>
            <span className="text-[9px] font-bold tracking-widest text-lime-400 uppercase">lo vale.</span>
          </div>
        </div>

        <button className="relative w-11 h-11 rounded-full bg-white/10 flex items-center justify-center border border-white/20">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
            5
          </span>
        </button>
      </div>

      <div className="relative z-10 space-y-3">
        <div className="flex justify-between items-baseline">
          <h2 className="text-xl font-bold text-white">Mi Línea de crédito</h2>
          <p className="text-sm font-semibold text-slate-200">
            Utilizado: <span className="text-white font-bold">${usedCredit.toLocaleString('es-MX')}</span>
          </p>
        </div>

        <div className="relative w-full h-3.5 bg-slate-800/80 rounded-full overflow-hidden p-0.5 border border-white/10">
          <div
            className="h-full bg-gradient-to-r from-sky-400 via-cyan-300 to-sky-200 rounded-full transition-all duration-1000 ease-out"
            style={{ width: `${usagePercentage}%` }}
          />
        </div>

        <div className="flex justify-between items-center text-sm pt-1">
          <div>
            <p className="text-xs text-slate-300">Límite de crédito: <span className="text-white font-semibold">${creditLimit.toLocaleString('es-MX')}</span></p>
            <p className="text-base font-bold text-white">
              Disponible: <span className="text-emerald-300">${availableCredit.toLocaleString('es-MX')}</span>
            </p>
          </div>

          <button
            onClick={() => setShowDetails(!showDetails)}
            className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white"
          >
            <svg
              className={`w-5 h-5 transition-transform duration-300 ${showDetails ? 'rotate-180' : ''}`}
              fill="none" stroke="currentColor" viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>
      </div>

     {/* Botón Solicitar */}
      <div className="relative z-10 mt-6 flex justify-center">
        <button 
          onClick={() => setIsModalOpen(true)}
          className="w-full max-w-xs py-3.5 bg-[#76C900] hover:bg-[#68B300] text-[#082046] font-extrabold text-lg rounded-full shadow-lg transition-all cursor-pointer"
        >
          Solicitar
        </button>
      </div>
      {/* Modal Deslizable */}
      <SolicitarModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </section>
  );
}