"use client";
import React, { useState } from "react";

export default function LoginPage() {
  const [credenciales, setCredenciales] = useState({ usuario: "", password: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Se cableará a AUTH.LOGIN (lib/api/endpoints.ts) cuando exista el backend.
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-black text-slate-800 tracking-tight">MIS VALES</h1>
          <p className="text-sm text-slate-500 mt-1">Panel de administración</p>
        </div>

        <form onSubmit={handleSubmit} className="card p-6 space-y-4">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Usuario</label>
            <input
              required
              type="text"
              autoComplete="username"
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent"
              value={credenciales.usuario}
              onChange={(e) => setCredenciales({ ...credenciales, usuario: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Contraseña</label>
            <input
              required
              type="password"
              autoComplete="current-password"
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent"
              value={credenciales.password}
              onChange={(e) => setCredenciales({ ...credenciales, password: e.target.value })}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-primary hover:bg-primary-600 text-white px-4 py-2.5 rounded-lg font-semibold text-sm transition-colors shadow-sm"
          >
            Iniciar sesión
          </button>
        </form>
      </div>
    </div>
  );
}
