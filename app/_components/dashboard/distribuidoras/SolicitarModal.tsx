'use client';

import { useRouter } from 'next/navigation';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export function SolicitarModal({ isOpen, onClose }: Props) {
  const router = useRouter();

  if (!isOpen) return null;

  const handleValeFinanciero = () => {
    onClose();
    router.push('/distribuidoras/vale-financiero');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 backdrop-blur-sm transition-opacity">
      <div className="w-full max-w-md bg-white rounded-t-[2.5rem] p-6 pb-8 shadow-2xl animate-in slide-in-from-bottom duration-300">
        
        {/* Barra superior de arrastre */}
        <div className="w-16 h-1.5 bg-slate-300 rounded-full mx-auto mb-6" />

        <h3 className="text-center font-bold text-slate-800 text-lg mb-6">
          ¿Qué producto deseas solicitar?
        </h3>

        <div className="space-y-3.5">
          {/* Opción 1: Vale Financiero (Conectado a la navegación) */}
          <button 
            onClick={handleValeFinanciero}
            className="w-full p-4 bg-[#00A884] hover:bg-[#009273] text-white font-bold rounded-2xl flex items-center justify-between shadow-md active:scale-[0.99] transition-all cursor-pointer"
          >
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-white font-extrabold text-xl">
                $
              </div>
              <span className="text-base">Vale Financiero</span>
            </div>
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Opción 2: Vale Producto */}
          <button 
            onClick={onClose}
            className="w-full p-4 bg-[#546EE5] hover:bg-[#465EC8] text-white font-bold rounded-2xl flex items-center justify-between shadow-md active:scale-[0.99] transition-all cursor-pointer"
          >
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-white">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <span className="text-base">Vale Producto</span>
            </div>
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        <button 
          onClick={onClose}
          className="w-full mt-4 py-3 text-slate-500 font-semibold text-sm hover:text-slate-800 cursor-pointer"
        >
          Cancelar
        </button>
      </div>
    </div>
  );
}