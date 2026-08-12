"use client";
import React from "react";
import PageHeader from "@/components/ui/PageHeader";
import StatCard from "@/components/ui/StatCard";

export default function GerenteGeneralDashboardPage() {
  return (
    <div className="max-w-7xl mx-auto pb-10">
      <PageHeader
        title="Dashboard General"
        description="Centro de control operativo y financiero de la empresa."
      />

      {/* Resumen Financiero */}
      <section className="mb-8">
        <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-4 border-b border-slate-200 pb-2">
          Resumen Financiero
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatCard title="Total Colocado" subtext="En créditos activos" />
          <StatCard title="Total Recuperado" subtext="Capital recuperado" />
          <StatCard title="Cartera Vencida" subtext="Mora actual" />
          <StatCard title="Utilidad Estimada" subtext="Intereses y comisiones" />
        </div>
      </section>

      {/* Distribuidoras & Operación */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <section>
          <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-4 border-b border-slate-200 pb-2">
            Distribuidoras &amp; Clientes
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <StatCard title="Distribuidoras Activas" subtext="Nuevas esta semana" />
            <StatCard title="Suspendidas" subtext="Por morosidad o inactividad" />
            <StatCard title="Total Clientes" subtext="En todas las sucursales" />
            <StatCard title="En Alta/Proceso" subtext="Esperando verificación" />
          </div>
        </section>

        <section>
          <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-4 border-b border-slate-200 pb-2">
            Operación del Día
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <StatCard title="Vales Emitidos" subtext="Hoy" />
            <StatCard title="Pagos Recibidos" subtext="Hoy" />
            <StatCard title="Solicitudes Pendientes" subtext="Requieren autorización" />
            <StatCard title="Aumentos Pendientes" subtext="Requieren autorización" />
          </div>
        </section>
      </div>

      {/* Desempeño */}
      <section>
        <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-4 border-b border-slate-200 pb-2">
          Desempeño Destacado
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="card p-5">
            <h4 className="font-bold text-slate-700 mb-4">Top Sucursales (Colocación)</h4>
            <p className="text-sm text-slate-400">Sin datos disponibles.</p>
          </div>
          <div className="card p-5">
            <h4 className="font-bold text-slate-700 mb-4">Top Distribuidoras</h4>
            <p className="text-sm text-slate-400">Sin datos disponibles.</p>
          </div>
          <div className="card p-5">
            <h4 className="font-bold text-slate-700 mb-4">Alerta de Morosidad</h4>
            <p className="text-sm text-slate-400">Sin datos disponibles.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
