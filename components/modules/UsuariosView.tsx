"use client";
import React, { useState } from "react";
import PageHeader from "@/components/ui/PageHeader";
import DataTable, { Column } from "@/components/ui/DataTable";
import Modal from "@/components/ui/Modal";

// Tipos de usuario administrables desde el panel.
export type TipoUsuario =
  | "Gerente de Sucursal"
  | "Coordinador"
  | "Verificador"
  | "Cajera"
  | "Administrador";

const TIPOS_USUARIO: TipoUsuario[] = [
  "Gerente de Sucursal",
  "Coordinador",
  "Verificador",
  "Cajera",
  "Administrador",
];

export interface Usuario {
  id: string;
  nombre: string;
  correo: string;
  tipo: TipoUsuario;
  sucursal: string;
  estado: "Activo" | "Inactivo";
}

interface UsuariosViewProps {
  /** Migas de pan según el rol que aloja la vista */
  breadcrumbs?: { label: string; href?: string }[];
  /** Restringir los tipos administrables (por defecto todos) */
  tiposDisponibles?: TipoUsuario[];
}

export default function UsuariosView({
  breadcrumbs,
  tiposDisponibles = TIPOS_USUARIO,
}: UsuariosViewProps) {
  // Sin datos ficticios: la lista llega vacía hasta conectar el backend.
  const [data] = useState<Usuario[]>([]);
  const [filtro, setFiltro] = useState<TipoUsuario | "Todos">("Todos");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    nombre: "",
    correo: "",
    tipo: tiposDisponibles[0],
    sucursal: "",
    estado: "Activo",
  });

  const filtered = filtro === "Todos" ? data : data.filter((u) => u.tipo === filtro);

  const columns: Column<Usuario>[] = [
    {
      key: "nombre",
      header: "Nombre",
      render: (row) => (
        <div>
          <p className="font-semibold text-slate-800">{row.nombre}</p>
          <p className="text-xs text-slate-500">{row.correo}</p>
        </div>
      ),
    },
    { key: "tipo", header: "Tipo" },
    { key: "sucursal", header: "Sucursal" },
    {
      key: "estado",
      header: "Estado",
      align: "center",
      render: (row) => (
        <span
          className={`badge ${
            row.estado === "Activo"
              ? "bg-green-100 text-green-700 border border-green-200"
              : "bg-slate-100 text-slate-600 border border-slate-200"
          }`}
        >
          {row.estado}
        </span>
      ),
    },
    {
      key: "acciones",
      header: "Acciones",
      align: "right",
      render: () => (
        <button className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-100 transition-colors">
          Editar
        </button>
      ),
    },
  ];

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    // Se cableará al backend (POST /users). Por ahora solo cierra el modal.
    setIsModalOpen(false);
  };

  return (
    <div className="max-w-6xl mx-auto">
      <PageHeader
        title="Usuarios"
        description="Administra a los usuarios del sistema: gerentes, coordinadores, verificadores, cajeras y administradores."
        breadcrumbs={breadcrumbs}
        actions={
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 bg-primary hover:bg-primary-600 text-white px-4 py-2 rounded-lg font-semibold text-sm transition-colors shadow-sm"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            Nuevo Usuario
          </button>
        }
      />

      {/* Filtro por tipo */}
      <div className="flex flex-wrap gap-2 mb-4">
        {(["Todos", ...tiposDisponibles] as const).map((t) => (
          <button
            key={t}
            onClick={() => setFiltro(t as TipoUsuario | "Todos")}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
              filtro === t
                ? "bg-primary text-white"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      <DataTable
        data={filtered}
        columns={columns}
        keyExtractor={(row) => row.id}
        emptyMessage="No hay usuarios registrados."
      />

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Nuevo Usuario">
        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Nombre Completo</label>
            <input
              required
              type="text"
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent"
              value={formData.nombre}
              onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">Correo Electrónico</label>
              <input
                required
                type="email"
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent"
                value={formData.correo}
                onChange={(e) => setFormData({ ...formData, correo: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">Tipo de Usuario</label>
              <select
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent bg-white"
                value={formData.tipo}
                onChange={(e) => setFormData({ ...formData, tipo: e.target.value as TipoUsuario })}
              >
                {tiposDisponibles.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">Sucursal</label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent"
                value={formData.sucursal}
                onChange={(e) => setFormData({ ...formData, sucursal: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">Estado</label>
              <select
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent bg-white"
                value={formData.estado}
                onChange={(e) => setFormData({ ...formData, estado: e.target.value })}
              >
                <option value="Activo">Activo</option>
                <option value="Inactivo">Inactivo</option>
              </select>
            </div>
          </div>

          <div className="mt-6 flex justify-end gap-3 pt-4 border-t border-slate-100">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-semibold text-white bg-primary hover:bg-primary-600 rounded-lg transition-colors shadow-sm"
            >
              Crear Usuario
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
