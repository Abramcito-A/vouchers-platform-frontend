"use client";
import React, { useState } from "react";
import PageHeader from "@/components/ui/PageHeader";
import DataTable, { Column } from "@/components/ui/DataTable";
import Modal from "@/components/ui/Modal";

export interface Producto {
  id: string;
  nombre: string;
  montoBase: number;
  porcentajeComision: number;
  porcentajeInteres: number;
  moraDiaria: number;
  estado: "Activo" | "Inactivo";
}

interface ProductosViewProps {
  breadcrumbs?: { label: string; href?: string }[];
}

export default function ProductosView({ breadcrumbs }: ProductosViewProps) {
  // Sin datos ficticios: la lista llega vacía hasta conectar el backend.
  const [data] = useState<Producto[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    nombre: "",
    montoBase: 0,
    porcentajeComision: 0,
    porcentajeInteres: 0,
    moraDiaria: 0,
    estado: "Activo",
  });

  const columns: Column<Producto>[] = [
    { key: "id", header: "ID", render: (row) => <span className="font-mono text-xs text-primary font-bold">{row.id}</span> },
    { key: "nombre", header: "Nombre del Plan", render: (row) => <span className="font-bold text-slate-700">{row.nombre}</span> },
    { key: "montoBase", header: "Monto Base", align: "right", render: (row) => `$${row.montoBase.toLocaleString()}` },
    { key: "comision", header: "Comisión", align: "center", render: (row) => <span className="badge bg-blue-100 text-blue-700">{row.porcentajeComision}%</span> },
    { key: "interes", header: "Interés", align: "center", render: (row) => <span className="badge bg-slate-100 text-slate-700">{row.porcentajeInteres}%</span> },
    {
      key: "estado",
      header: "Estado",
      align: "center",
      render: (row) => (
        <span className={`badge ${row.estado === "Activo" ? "bg-green-100 text-green-700" : "bg-slate-100 text-slate-600"}`}>
          {row.estado}
        </span>
      ),
    },
  ];

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    // Se cableará al backend (POST /financial-products). Por ahora solo cierra el modal.
    setIsModalOpen(false);
  };

  return (
    <div className="max-w-6xl mx-auto">
      <PageHeader
        title="Catálogo de Productos"
        description="Habilita y configura los planes de vales base para las distribuidoras."
        breadcrumbs={breadcrumbs}
        actions={
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-primary hover:bg-primary-600 text-white px-4 py-2 rounded-lg font-semibold text-sm transition-colors shadow-sm"
          >
            Nuevo Producto
          </button>
        }
      />

      {/* Explicación de la regla de negocio */}
      <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 mb-6 text-sm text-blue-800 flex gap-3">
        <svg className="shrink-0 mt-0.5" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10" />
          <path d="M12 16v-4" />
          <path d="M12 8h.01" />
        </svg>
        <div>
          <strong className="block mb-1">Regla de negocio: matemáticas por porcentaje</strong>
          La responsabilidad del pago es de la distribuidora. Al levantar un producto se define el
          porcentaje base de comisión e interés; al subir de categoría, estos porcentajes se ajustan
          dinámicamente.
        </div>
      </div>

      <DataTable
        data={data}
        columns={columns}
        keyExtractor={(row) => row.id}
        emptyMessage="No hay productos registrados."
      />

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Levantar Producto">
        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Nombre del Plan</label>
            <input
              required
              type="text"
              placeholder="Ej. Vale $3,000"
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-400"
              value={formData.nombre}
              onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">Monto ($)</label>
              <input
                required
                type="number"
                min="0"
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-400"
                value={formData.montoBase || ""}
                onChange={(e) => setFormData({ ...formData, montoBase: Number(e.target.value) })}
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">Mora Diaria ($)</label>
              <input
                required
                type="number"
                min="0"
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-400"
                value={formData.moraDiaria || ""}
                onChange={(e) => setFormData({ ...formData, moraDiaria: Number(e.target.value) })}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 bg-slate-50 p-4 rounded-lg">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">Comisión (%)</label>
              <input
                required
                type="number"
                min="0"
                max="100"
                step="0.1"
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-400"
                value={formData.porcentajeComision || ""}
                onChange={(e) => setFormData({ ...formData, porcentajeComision: Number(e.target.value) })}
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">Interés (%)</label>
              <input
                required
                type="number"
                min="0"
                max="100"
                step="0.1"
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-400"
                value={formData.porcentajeInteres || ""}
                onChange={(e) => setFormData({ ...formData, porcentajeInteres: Number(e.target.value) })}
              />
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
              Crear Producto
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
