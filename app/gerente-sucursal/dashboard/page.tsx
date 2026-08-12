"use client";
import React from "react";
import PageHeader from "@/components/ui/PageHeader";
import StatCard from "@/components/ui/StatCard";

export default function GerenteSucursalDashboardPage() {
  return (
    <div className="max-w-7xl mx-auto pb-10">
      <PageHeader
        title="Dashboard de Sucursal"
        description="Resumen operativo de tu sucursal."
      />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard title="Distribuidoras" subtext="Activas en la sucursal" />
        <StatCard title="Solicitudes Pendientes" subtext="Por revisar" />
        <StatCard title="Vales Emitidos" subtext="Hoy" />
        <StatCard title="Pagos Recibidos" subtext="Hoy" />
      </div>
    </div>
  );
}
