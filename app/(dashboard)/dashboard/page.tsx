"use client";
import React from "react";
import PageHeader from "@/app/_components/ui/PageHeader";

// Componente para Kpis rápidos
function StatCard({ title, value, type = "default", subtext }: { title: string, value: string, type?: "default" | "success" | "warning" | "danger", subtext?: string }) {
  const colors = {
    default: "text-slate-800",
    success: "text-green-600",
    warning: "text-amber-600",
    danger: "text-red-600"
  };
  
  return (
    <div className="card p-5 hover:shadow-md transition-shadow">
      <h4 className="text-sm font-semibold text-slate-500 mb-2">{title}</h4>
      <div className={`text-2xl font-black ${colors[type]}`}>{value}</div>
      {subtext && <p className="text-xs text-slate-400 mt-2 font-medium">{subtext}</p>}
    </div>
  );
}

export default function DashboardPage() {
  return (
    <div className="max-w-7xl mx-auto pb-10">
      <PageHeader 
        title="Dashboard General" 
        description="Centro de control operativo y financiero de la empresa."
      />

      {/* 1. Bloque Financiero */}
      <section className="mb-8">
        <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-4 border-b border-slate-200 pb-2">Resumen Financiero</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatCard title="Total Colocado" value="$8,250,000" type="default" subtext="En créditos activos" />
          <StatCard title="Total Recuperado" value="$5,120,400" type="success" subtext="Esta semana: $450k" />
          <StatCard title="Cartera Vencida" value="$340,500" type="danger" subtext="Mora actual: 4.1%" />
          <StatCard title="Utilidad Estimada" value="$1,180,000" type="success" subtext="Basada en intereses y comisiones" />
        </div>
      </section>

      {/* 2. Bloque Operativo & Distribuidoras */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <section>
          <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-4 border-b border-slate-200 pb-2">Distribuidoras & Clientes</h3>
          <div className="grid grid-cols-2 gap-4">
            <StatCard title="Distribuidoras Activas" value="1,245" subtext="Nuevas esta semana: 12" />
            <StatCard title="Suspendidas" value="38" type="warning" subtext="Por morosidad o inactividad" />
            <StatCard title="Total Clientes" value="14,890" subtext="En todas las sucursales" />
            <StatCard title="En Alta/Proceso" value="15" type="default" subtext="Esperando verificación" />
          </div>
        </section>

        <section>
          <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-4 border-b border-slate-200 pb-2">Operación del Día (Hoy)</h3>
          <div className="grid grid-cols-2 gap-4">
            <StatCard title="Vales Emitidos" value="342" subtext="Monto: $452,000" />
            <StatCard title="Pagos Recibidos" value="89" type="success" subtext="Monto: $112,000" />
            <div className="col-span-2 bg-blue-50 rounded-xl p-4 border border-blue-100 flex items-center justify-between">
              <div>
                <h4 className="font-bold text-blue-900">Autorizaciones Pendientes</h4>
                <p className="text-xs text-blue-700 mt-1">Aumentos, transferencias y altas que requieren tu firma.</p>
              </div>
              <div className="text-3xl font-black text-blue-600">
                14
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* 3. Indicadores (Top 10 rápidos) */}
      <section>
        <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-4 border-b border-slate-200 pb-2">Desempeño Destacado</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="card p-5">
            <h4 className="font-bold text-slate-700 mb-4">Top 3 Sucursales (Colocación)</h4>
            <ul className="space-y-3">
              <li className="flex justify-between items-center text-sm"><span className="text-slate-600 font-medium">1. Sucursal Norte</span><span className="font-bold text-slate-800">$2.1M</span></li>
              <li className="flex justify-between items-center text-sm"><span className="text-slate-600 font-medium">2. Sucursal Centro</span><span className="font-bold text-slate-800">$1.8M</span></li>
              <li className="flex justify-between items-center text-sm"><span className="text-slate-600 font-medium">3. Sucursal Sur</span><span className="font-bold text-slate-800">$1.4M</span></li>
            </ul>
          </div>
          <div className="card p-5">
            <h4 className="font-bold text-slate-700 mb-4">Top 3 Distribuidoras</h4>
            <ul className="space-y-3">
              <li className="flex justify-between items-center text-sm"><span className="text-slate-600 font-medium">Carmen García</span><span className="font-bold text-green-600">Score: 99</span></li>
              <li className="flex justify-between items-center text-sm"><span className="text-slate-600 font-medium">María López</span><span className="font-bold text-green-600">Score: 98</span></li>
              <li className="flex justify-between items-center text-sm"><span className="text-slate-600 font-medium">Laura Torres</span><span className="font-bold text-green-600">Score: 95</span></li>
            </ul>
          </div>
          <div className="card p-5 border-l-4 border-l-red-500">
            <h4 className="font-bold text-slate-700 mb-4">Alerta de Morosidad</h4>
            <ul className="space-y-3">
              <li className="flex justify-between items-center text-sm"><span className="text-slate-600 font-medium">Sucursal Este</span><span className="font-bold text-red-600">8.2% Mora</span></li>
              <li className="flex justify-between items-center text-sm"><span className="text-slate-600 font-medium">Dist: Ana Ruiz</span><span className="font-bold text-red-600">Vencido: 22d</span></li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
