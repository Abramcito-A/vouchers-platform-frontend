'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [userId, setUserId] = useState('');
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simula autenticación y redirige a la vista del dashboard
    setTimeout(() => {
      setIsLoading(false);
      router.push('/distribuidoras/dashboard');
    }, 1000);
  };

  return (
    <div className="min-h-screen w-full bg-slate-100 flex items-center justify-center p-4 font-sans antialiased">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-100">
        
        {/* Encabezado Azul Marino */}
        <div className="relative bg-[#082046] px-8 pt-10 pb-12 text-center overflow-hidden">
          <div className="relative inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 mb-4 shadow-lg">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-lime-400 to-cyan-400 flex items-center justify-center text-[#082046] font-extrabold text-xl">
              $
            </div>
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Mis Vales</h1>
          <p className="text-xs font-bold tracking-widest text-lime-400 uppercase mt-1">Vales Digitales</p>
        </div>

        {/* Formulario */}
        <div className="p-8 -mt-4 bg-white rounded-t-3xl relative z-10">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="userId" className="block text-xs font-semibold text-slate-700 mb-1.5">
                Número de usuario
              </label>
              <input
                id="userId"
                type="text"
                required
                placeholder="00123456"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-sm focus:bg-white focus:border-cyan-500 focus:outline-none"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-xs font-semibold text-slate-700 mb-1.5">
                Correo electrónico
              </label>
              <input
                id="email"
                type="email"
                required
                placeholder="nombre@correo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-sm focus:bg-white focus:border-cyan-500 focus:outline-none"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 px-6 bg-[#76C900] hover:bg-[#68B300] active:scale-[0.98] text-[#082046] font-bold text-sm rounded-full shadow-md transition-all flex items-center justify-center cursor-pointer"
            >
              {isLoading ? (
                <span className="w-5 h-5 border-2 border-[#082046] border-t-transparent rounded-full animate-spin" />
              ) : (
                'Continuar'
              )}
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}