import React from "react";
import PageHeader from "./PageHeader";

interface EmptyStateProps {
  /** Título de la página (encabezado) */
  title: string;
  /** Descripción breve del módulo bajo el título */
  description?: string;
  /** Migas de pan opcionales */
  breadcrumbs?: { label: string; href?: string }[];
  /** Mensaje mostrado en el recuadro vacío */
  message?: string;
}

/**
 * Vista de módulo sin datos. Se usa para pantallas cuyo diseño aún no
 * existe: muestra el encabezado y un recuadro indicando que se conectará
 * al backend. Sin datos ficticios.
 */
export default function EmptyState({
  title,
  description,
  breadcrumbs,
  message = "Este módulo se conectará al backend próximamente.",
}: EmptyStateProps) {
  return (
    <div className="max-w-6xl mx-auto">
      <PageHeader title={title} description={description} breadcrumbs={breadcrumbs} />
      <div className="card p-12 flex flex-col items-center justify-center text-center border border-dashed border-slate-300">
        <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mb-4">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-slate-400">
            <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
          </svg>
        </div>
        <p className="text-slate-500 text-sm max-w-sm">{message}</p>
      </div>
    </div>
  );
}
