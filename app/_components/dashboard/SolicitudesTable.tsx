"use client";
import { solicitudesData } from "@/app/_lib/mock-data";

import type { Solicitud } from "@/app/_lib/types";

function PrioridadBadge({ p }: { p: Solicitud["prioridad"] }) {
  const map = {
    Alta:  { bg: "#fef2f2", color: "#b91c1c", border: "#fecaca" },
    Media: { bg: "#fffbeb", color: "#92400e", border: "#fde68a" },
    Baja:  { bg: "#f0fdf4", color: "#15803d", border: "#bbf7d0" },
  };
  const { bg, color, border } = map[p];
  return (
    <span
      className="badge"
      style={{ background: bg, color, border: `1px solid ${border}` }}
    >
      {p}
    </span>
  );
}

function EstadoBadge({ e }: { e: Solicitud["estado"] }) {
  const map = {
    Pendiente:    { bg: "#fef9c3", color: "#713f12", border: "#fde047" },
    "En revisión":{ bg: "#eff6ff", color: "#1d4ed8", border: "#bfdbfe" },
    Aprobada:     { bg: "#f0fdf4", color: "#15803d", border: "#bbf7d0" },
    Rechazada:    { bg: "#fef2f2", color: "#b91c1c", border: "#fecaca" },
  };
  const { bg, color, border } = map[e];
  return (
    <span className="badge" style={{ background: bg, color, border: `1px solid ${border}` }}>
      {e}
    </span>
  );
}

export default function SolicitudesTable() {
  return (
    <div className="card">
      <div className="card-header">
        <div>
          <h3 className="font-bold text-slate-800 text-sm">Solicitudes Pendientes</h3>
          <p className="text-xs text-slate-400 mt-0.5">Requieren revisión y acción del gerente</p>
        </div>
        <div className="flex items-center gap-2">
          <span
            className="badge"
            style={{ background: "#fef2f2", color: "#b91c1c", border: "1px solid #fecaca", fontSize: "0.75rem" }}
          >
            {solicitudesData.filter((s) => s.prioridad === "Alta").length} Urgentes
          </span>
          <button
            id="solicitudes-ver-todas-btn"
            className="text-xs font-semibold px-3 py-1.5 rounded-lg"
            style={{ background: "#EFF6FF", color: "#1e40af" }}
          >
            Ver todas →
          </button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="data-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Fecha</th>
              <th>Tipo</th>
              <th>Solicitante</th>
              <th>Sucursal</th>
              <th className="text-center">Estado</th>
              <th className="text-center">Prioridad</th>
              <th className="text-center">Acción</th>
            </tr>
          </thead>
          <tbody>
            {solicitudesData.map((s) => (
              <tr key={s.id}>
                <td>
                  <span className="font-mono text-xs font-bold text-blue-700">{s.id}</span>
                </td>
                <td className="text-xs text-slate-500 whitespace-nowrap">{s.fecha}</td>
                <td>
                  <span className="text-sm text-slate-700 font-medium">{s.tipo}</span>
                </td>
                <td className="text-sm text-slate-600">{s.solicitante}</td>
                <td className="text-xs text-slate-500">{s.sucursal}</td>
                <td className="text-center">
                  <EstadoBadge e={s.estado} />
                </td>
                <td className="text-center">
                  <PrioridadBadge p={s.prioridad} />
                </td>
                <td className="text-center">
                  <button
                    id={`solicitud-revisar-${s.id}`}
                    className="text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors"
                    style={{ background: "#0D47A1", color: "#fff" }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = "#1565C0")}
                    onMouseLeave={(e) => (e.currentTarget.style.background = "#0D47A1")}
                  >
                    Revisar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
