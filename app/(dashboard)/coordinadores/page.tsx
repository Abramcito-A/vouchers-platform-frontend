"use client";
import React, { useState } from "react";
import PageHeader from "@/app/_components/ui/PageHeader";
import DataTable, { Column } from "@/app/_components/ui/DataTable";
import Modal from "@/app/_components/ui/Modal";

// --- Mock Data y Tipos Iniciales ---
interface Coordinador {
  id: string;
  nombre: string;
  sucursal: string;
  distribuidorasAsignadas: number;
  estado: "Activo" | "Inactivo";
  telefono: string;
  correo: string;
}

const mockCoordinadores: Coordinador[] = [
  { id: "C001", nombre: "Juan Pérez", sucursal: "Sucursal Centro", distribuidorasAsignadas: 12, estado: "Activo", telefono: "555-0101", correo: "juan@example.com" },
  { id: "C002", nombre: "María Gómez", sucursal: "Sucursal Norte", distribuidorasAsignadas: 8, estado: "Activo", telefono: "555-0202", correo: "maria@example.com" },
  { id: "C003", nombre: "Carlos Ruiz", sucursal: "Sucursal Sur", distribuidorasAsignadas: 0, estado: "Inactivo", telefono: "555-0303", correo: "carlos@example.com" },
];

export default function CoordinadoresPage() {
  const [data, setData] = useState<Coordinador[]>(mockCoordinadores);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    nombre: "",
    sucursal: "Sucursal Centro",
    telefono: "",
    correo: "",
    estado: "Activo"
  });

  const columns: Column<Coordinador>[] = [
    { key: "id", header: "ID", render: (row) => <span className="font-mono text-xs font-bold text-primary">{row.id}</span> },
    { key: "nombre", header: "Nombre", render: (row) => (
      <div>
        <p className="font-semibold text-slate-800">{row.nombre}</p>
        <p className="text-xs text-slate-500">{row.correo}</p>
      </div>
    )},
    { key: "sucursal", header: "Sucursal" },
    { key: "distribuidorasAsignadas", header: "Distribuidoras", align: "center" },
    { key: "estado", header: "Estado", align: "center", render: (row) => (
      <span className={`badge ${row.estado === "Activo" ? "bg-green-100 text-green-700 border border-green-200" : "bg-slate-100 text-slate-600 border border-slate-200"}`}>
        {row.estado}
      </span>
    )},
    { key: "acciones", header: "Acciones", align: "right", render: (row) => (
      <div className="flex justify-end gap-2">
        <button 
          onClick={() => handleEdit(row)}
          className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-100 transition-colors"
        >
          Editar
        </button>
      </div>
    )}
  ];

  const handleEdit = (row: Coordinador) => {
    setFormData({
      nombre: row.nombre,
      sucursal: row.sucursal,
      telefono: row.telefono,
      correo: row.correo,
      estado: row.estado
    });
    setEditingId(row.id);
    setIsModalOpen(true);
  };

  const handleNew = () => {
    setFormData({ nombre: "", sucursal: "Sucursal Centro", telefono: "", correo: "", estado: "Activo" });
    setEditingId(null);
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      setData(data.map(item => item.id === editingId ? { ...item, ...formData, estado: formData.estado as "Activo" | "Inactivo", distribuidorasAsignadas: item.distribuidorasAsignadas } : item));
    } else {
      setData([...data, { 
        id: `C00${data.length + 1}`, 
        ...formData, 
        distribuidorasAsignadas: 0,
        estado: formData.estado as "Activo" | "Inactivo"
      }]);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="max-w-6xl mx-auto">
      <PageHeader 
        title="Coordinadores" 
        description="Gestiona a los coordinadores encargados de supervisar a las distribuidoras."
        breadcrumbs={[{ label: "Usuarios" }, { label: "Coordinadores" }]}
        actions={
          <button 
            onClick={handleNew}
            className="flex items-center gap-2 bg-primary hover:bg-primary-600 text-white px-4 py-2 rounded-lg font-semibold text-sm transition-colors shadow-sm"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
            Nuevo Coordinador
          </button>
        }
      />

      <DataTable 
        data={data} 
        columns={columns} 
        keyExtractor={(row) => row.id} 
      />

      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        title={editingId ? "Editar Coordinador" : "Nuevo Coordinador"}
      >
        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Nombre Completo</label>
            <input 
              required
              type="text" 
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent"
              value={formData.nombre}
              onChange={(e) => setFormData({...formData, nombre: e.target.value})}
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
                onChange={(e) => setFormData({...formData, correo: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">Teléfono</label>
              <input 
                required
                type="tel" 
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent"
                value={formData.telefono}
                onChange={(e) => setFormData({...formData, telefono: e.target.value})}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">Sucursal Asignada</label>
              <select 
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent bg-white"
                value={formData.sucursal}
                onChange={(e) => setFormData({...formData, sucursal: e.target.value})}
              >
                <option value="Sucursal Centro">Sucursal Centro</option>
                <option value="Sucursal Norte">Sucursal Norte</option>
                <option value="Sucursal Sur">Sucursal Sur</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">Estado</label>
              <select 
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent bg-white"
                value={formData.estado}
                onChange={(e) => setFormData({...formData, estado: e.target.value})}
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
              {editingId ? "Guardar Cambios" : "Crear Coordinador"}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
