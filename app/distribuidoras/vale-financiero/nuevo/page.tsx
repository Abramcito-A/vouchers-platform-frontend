'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function NuevoContactoPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    nombre: '',
    apPaterno: '',
    apMaterno: '',
    nomina: '',
    curp: '',
    rfc: '',
    domicilio: '',
    estado: '',
    ciudad: '',
    telefono: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí puedes guardar en base de datos o localStorage. Por ahora simulamos el registro con éxito:
    alert('¡Contacto registrado correctamente!');
    router.push('/distribuidoras/vale-financiero');
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-12">
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
        <h1 className="text-lg font-bold tracking-wide">Datos del Cliente</h1>
        <div className="w-10" />
      </header>

      <form onSubmit={handleSubmit} className="px-5 pt-6 space-y-4">
        <div>
          <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Nombre(s)</label>
          <input 
            type="text" 
            name="nombre"
            required
            placeholder="Ej. María Fernanda"
            value={formData.nombre}
            onChange={handleChange}
            className="w-full p-3 bg-white border border-slate-300 rounded-xl text-sm font-medium text-slate-800 focus:outline-none focus:border-indigo-600 shadow-sm"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Ap. Paterno</label>
            <input 
              type="text" 
              name="apPaterno"
              required
              placeholder="Apellido Paterno"
              value={formData.apPaterno}
              onChange={handleChange}
              className="w-full p-3 bg-white border border-slate-300 rounded-xl text-sm font-medium text-slate-800 focus:outline-none focus:border-indigo-600 shadow-sm"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Ap. Materno</label>
            <input 
              type="text" 
              name="apMaterno"
              required
              placeholder="Apellido Materno"
              value={formData.apMaterno}
              onChange={handleChange}
              className="w-full p-3 bg-white border border-slate-300 rounded-xl text-sm font-medium text-slate-800 focus:outline-none focus:border-indigo-600 shadow-sm"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Nómina</label>
            <input 
              type="text" 
              name="nomina"
              required
              placeholder="Número de nómina"
              value={formData.nomina}
              onChange={handleChange}
              className="w-full p-3 bg-white border border-slate-300 rounded-xl text-sm font-medium text-slate-800 focus:outline-none focus:border-indigo-600 shadow-sm"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Teléfono</label>
            <input 
              type="tel" 
              name="telefono"
              required
              placeholder="871..."
              value={formData.telefono}
              onChange={handleChange}
              className="w-full p-3 bg-white border border-slate-300 rounded-xl text-sm font-medium text-slate-800 focus:outline-none focus:border-indigo-600 shadow-sm"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-600 uppercase mb-1">CURP</label>
          <input 
            type="text" 
            name="curp"
            required
            placeholder="18 caracteres"
            maxLength={18}
            value={formData.curp}
            onChange={handleChange}
            className="w-full p-3 bg-white border border-slate-300 rounded-xl text-sm font-medium uppercase text-slate-800 focus:outline-none focus:border-indigo-600 shadow-sm"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-600 uppercase mb-1">RFC</label>
          <input 
            type="text" 
            name="rfc"
            required
            placeholder="13 caracteres con homoclave"
            maxLength={13}
            value={formData.rfc}
            onChange={handleChange}
            className="w-full p-3 bg-white border border-slate-300 rounded-xl text-sm font-medium uppercase text-slate-800 focus:outline-none focus:border-indigo-600 shadow-sm"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Domicilio</label>
          <input 
            type="text" 
            name="domicilio"
            required
            placeholder="Calle, número, colonia"
            value={formData.domicilio}
            onChange={handleChange}
            className="w-full p-3 bg-white border border-slate-300 rounded-xl text-sm font-medium text-slate-800 focus:outline-none focus:border-indigo-600 shadow-sm"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Estado</label>
            <input 
              type="text" 
              name="estado"
              required
              placeholder="Ej. Coahuila"
              value={formData.estado}
              onChange={handleChange}
              className="w-full p-3 bg-white border border-slate-300 rounded-xl text-sm font-medium text-slate-800 focus:outline-none focus:border-indigo-600 shadow-sm"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Ciudad</label>
            <input 
              type="text" 
              name="ciudad"
              required
              placeholder="Ej. Torreón"
              value={formData.ciudad}
              onChange={handleChange}
              className="w-full p-3 bg-white border border-slate-300 rounded-xl text-sm font-medium text-slate-800 focus:outline-none focus:border-indigo-600 shadow-sm"
            />
          </div>
        </div>

        <div className="pt-4">
          <button 
            type="submit"
            className="w-full py-4 bg-[#082046] hover:bg-[#061734] text-white font-extrabold rounded-2xl shadow-lg transition-all active:scale-[0.99] cursor-pointer text-base"
          >
            Guardar y Continuar
          </button>
        </div>
      </form>
    </div>
  );
}