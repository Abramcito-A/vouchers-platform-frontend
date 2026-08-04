'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

// Datos iniciales de ejemplo (pueden venir de localStorage si deseas persistencia)
const initialContacts = [
  { id: 1, name: 'Adriana Gonzalez Ramirez', phone: '8713 43 69 47' },
  { id: 2, name: 'Alan Magdiel Molina Ramirez', phone: '8713 72 05 80' },
  { id: 3, name: 'Alan Yared Jimenez Grijalva', phone: '8714 83 52 81' },
  { id: 4, name: 'Aldo Luciano Garcia Silva', phone: '8718 74 72 25' },
];

export default function SeleccionarContactoPage() {
  const router = useRouter();
  const [search, setSearch] = useState('');
  
  // Simulamos recuperar o tener una lista interactiva
  const [contacts] = useState(initialContacts);

  // Filtrado por buscador
  const filteredContacts = contacts.filter(c => 
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-white pb-10">
      {/* Header Estándar */}
      <header className="bg-[#082046] text-white px-4 py-4 flex items-center justify-between shadow-md">
        <button 
          onClick={() => router.back()}
          className="p-2 hover:bg-white/10 rounded-full transition-colors cursor-pointer"
        >
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <h1 className="text-lg font-bold tracking-wide">Seleccionar contacto</h1>
        <div className="w-10" />
      </header>

      <div className="px-4 pt-5 space-y-4">
        {/* Buscador */}
        <div className="relative">
          <input 
            type="text"
            placeholder="Buscar contacto"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full py-3.5 pl-5 pr-12 rounded-full border border-slate-300 bg-slate-50 focus:bg-white focus:outline-none focus:border-indigo-600 text-sm font-medium text-slate-800 shadow-sm"
          />
          <svg className="w-5 h-5 text-slate-400 absolute right-4 top-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>

        {/* Botón Nuevo Contacto */}
        <Link 
          href="/distribuidoras/vale-financiero/nuevo"
          className="flex items-center gap-4 py-3 px-1 group cursor-pointer"
        >
          <div className="w-12 h-12 rounded-full bg-[#84CC16] hover:bg-[#72b012] text-white flex items-center justify-center shadow-md transition-transform active:scale-95">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M12 4v16m8-8H4" />
            </svg>
          </div>
          <span className="font-bold text-slate-800 text-base group-hover:text-indigo-600 transition-colors">
            Nuevo contacto
          </span>
        </Link>

        <hr className="border-slate-100 my-2" />

        {/* Lista de Contactos */}
        <div className="divide-y divide-slate-100">
          {filteredContacts.map((contact) => (
            <div key={contact.id} className="py-3.5 flex items-center gap-4 hover:bg-slate-50 rounded-xl px-2 transition-colors cursor-pointer">
              <div className="w-12 h-12 rounded-full bg-[#082046] text-white flex items-center justify-center shadow-sm">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <div>
                <p className="font-bold text-slate-900 text-sm">{contact.name}</p>
                <div className="flex items-center gap-1.5 text-slate-500 text-xs mt-0.5">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span>{contact.phone}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}