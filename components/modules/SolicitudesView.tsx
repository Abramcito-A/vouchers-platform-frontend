"use client";
import React, { useState } from "react";
import PageHeader from "@/components/ui/PageHeader";

type TabName = "aperturas" | "aumentos" | "transferencias" | "operativas";

const TABS: { key: TabName; label: string; emptyMessage: string }[] = [
  { key: "aperturas", label: "Aperturas (Distribuidoras)", emptyMessage: "No hay aperturas pendientes de autorización." },
  { key: "aumentos", label: "Aumentos de Crédito", emptyMessage: "No hay aumentos de crédito pendientes." },
  { key: "transferencias", label: "Transferencias de Clientes", emptyMessage: "No hay transferencias pendientes de autorización." },
  { key: "operativas", label: "Operativas (Cajeras)", emptyMessage: "No hay solicitudes operativas pendientes." },
];

interface SolicitudesViewProps {
  breadcrumbs?: { label: string; href?: string }[];
}

export default function SolicitudesView({ breadcrumbs }: SolicitudesViewProps) {
  const [activeTab, setActiveTab] = useState<TabName>("aperturas");
  const current = TABS.find((t) => t.key === activeTab)!;

  return (
    <div className="max-w-5xl mx-auto">
      <PageHeader
        title="Bandeja de Autorizaciones"
        description="Evalúa y autoriza los procesos críticos solicitados por las sucursales."
        breadcrumbs={breadcrumbs}
      />

      {/* Tabs */}
      <div className="flex space-x-1 border-b border-slate-200 mb-6 overflow-x-auto">
        {TABS.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`px-4 py-3 text-sm font-semibold border-b-2 whitespace-nowrap transition-colors ${
              activeTab === tab.key
                ? "border-primary text-primary"
                : "border-transparent text-slate-500 hover:text-slate-700"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Contenido: sin datos ficticios hasta conectar el backend */}
      <div className="text-center py-12 bg-white rounded-xl border border-dashed border-slate-300">
        <p className="text-slate-500">{current.emptyMessage}</p>
      </div>
    </div>
  );
}
