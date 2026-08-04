"use client";
import React from "react";
import { actividadData } from "@/app/_lib/mock-data";


function ActivityIcon({ tipo }: { tipo: string }): React.ReactElement {
  const icons: Record<string, React.ReactElement> = {
    registro: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5z" />
        <line x1="20" y1="8" x2="20" y2="14" /><line x1="23" y1="11" x2="17" y2="11" />
      </svg>
    ),
    autorizacion: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path d="M22 11.08V12a10 10 0 11-5.93-9.14" /><polyline points="22,4 12,14.01 9,11.01" />
      </svg>
    ),
    conciliacion: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <polyline points="23,4 23,10 17,10" /><polyline points="1,20 1,14 7,14" />
        <path d="M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15" />
      </svg>
    ),
    liquidacion: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <line x1="12" y1="1" x2="12" y2="23" />
        <path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" />
      </svg>
    ),
    visita: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" /><circle cx="12" cy="10" r="3" />
      </svg>
    ),
    suspension: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
        <line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" />
      </svg>
    ),
    incremento: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <polyline points="23,6 13.5,15.5 8.5,10.5 1,18" /><polyline points="17,6 23,6 23,12" />
      </svg>
    ),
  };
  return icons[tipo] ?? <span className="w-4 h-4" />;
}

export default function ActivityTimeline() {
  return (
    <div className="card">
      <div className="card-header">
        <div>
          <h3 className="font-bold text-slate-800 text-sm">Actividad Reciente</h3>
          <p className="text-xs text-slate-400 mt-0.5">Últimos movimientos del sistema</p>
        </div>
        <button
          id="activity-ver-bitacora-btn"
          className="text-xs font-semibold px-3 py-1.5 rounded-lg"
          style={{ background: "#EFF6FF", color: "#1e40af" }}
        >
          Ver bitácora →
        </button>
      </div>
      <div className="card-body">
        <div>
          {actividadData.map((item, i) => (
            <div key={item.id} className="timeline-item">
              {/* Línea vertical */}
              {i < actividadData.length - 1 && (
                <div
                  style={{
                    position: "absolute",
                    left: 19,
                    top: 40,
                    bottom: 0,
                    width: 2,
                    background: "#e2e8f0",
                  }}
                />
              )}

              {/* Icono */}
              <div
                className={`timeline-icon ${item.color} flex-shrink-0`}
              >
                <ActivityIcon tipo={item.tipo} />
              </div>

              {/* Contenido */}
              <div className="flex-1 min-w-0 pt-1">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <p className="text-sm text-slate-800 leading-snug font-medium">{item.accion}</p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-[11px] font-semibold text-blue-700">{item.actor}</span>
                      <span
                        className="text-[9px] font-semibold px-1.5 py-0.5 rounded"
                        style={{ background: "#f1f5f9", color: "#64748b" }}
                      >
                        {item.rolActor}
                      </span>
                    </div>
                  </div>
                  <div className="flex-shrink-0 text-right">
                    <p className="text-[10px] text-slate-400 whitespace-nowrap">{item.fecha}</p>
                    <p className="text-[10px] font-semibold text-slate-500 whitespace-nowrap">{item.hora}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
