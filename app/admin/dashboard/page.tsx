"use client";
import React from "react";
import PageHeader from "@/components/ui/PageHeader";
import StatCard from "@/components/ui/StatCard";

export default function AdminDashboardPage() {
  return (
    <div className="max-w-7xl mx-auto pb-10">
      <PageHeader
        title="Dashboard"
        description="Resumen general de la administración del sistema."
      />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard title="Sucursales" subtext="Registradas" />
        <StatCard title="Usuarios" subtext="Cuentas activas" />
        <StatCard title="Productos" subtext="Configurados" />
        <StatCard title="Planes" subtext="Disponibles" />
      </div>
    </div>
  );
}
