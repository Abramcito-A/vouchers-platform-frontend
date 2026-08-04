"use client";
import React from "react";
import { alertasData } from "@/app/_lib/mock-data";
import type { AlertItem } from "@/app/_lib/types";

function ErrorIcon() {
  return (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <circle cx="12" cy="12" r="10" />
      <line x1="15" y1="9" x2="9" y2="15" />
      <line x1="9" y1="9" x2="15" y2="15" />
    </svg>
  );
}
function WarnIcon() {
  return (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
      <line x1="12" y1="9" x2="12" y2="13" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  );
}
function InfoIcon() {
  return (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="8" x2="12" y2="12" />
      <line x1="12" y1="16" x2="12.01" y2="16" />
    </svg>
  );
}

const typeConfig: Record<AlertItem["tipo"], { icon: React.ReactElement; color: string; border: string }> = {
  error:   { icon: <ErrorIcon />, color: "#b91c1c", border: "#fecaca" },
  warning: { icon: <WarnIcon />,  color: "#d97706", border: "#fde68a" },
  info:    { icon: <InfoIcon />,  color: "#1d4ed8", border: "#bfdbfe" },
};

export default function AlertsPanel() {
  const errors  = alertasData.filter((a) => a.tipo === "error");
  const warnings = alertasData.filter((a) => a.tipo === "warning");
  const infos   = alertasData.filter((a) => a.tipo === "info");

  const grouped = [
    { label: "Errores críticos", items: errors, headerColor: "#b91c1c", headerBg: "#fef2f2" },
    { label: "Advertencias",     items: warnings, headerColor: "#d97706", headerBg: "#fffbeb" },
    { label: "Información",      items: infos, headerColor: "#1d4ed8", headerBg: "#eff6ff" },
  ];

  return (
    <div className="card">
      <div className="card-header">
        <div>
          <h3 className="font-bold text-slate-800 text-sm">Panel de Alertas</h3>
          <p className="text-xs text-slate-400 mt-0.5">
            {alertasData.length} alertas activas — {errors.length} críticas
          </p>
        </div>
        <button
          id="alerts-dismiss-all-btn"
          className="text-xs font-semibold px-3 py-1.5 rounded-lg"
          style={{ background: "#f1f5f9", color: "#475569" }}
        >
          Ver detalle
        </button>
      </div>
      <div className="card-body grid md:grid-cols-3 gap-4">
        {grouped.map((group) => (
          <div key={group.label}>
            <div
              className="flex items-center gap-2 px-3 py-2 rounded-t-lg mb-1"
              style={{ background: group.headerBg }}
            >
              <span className="font-bold text-xs" style={{ color: group.headerColor }}>
                {group.label}
              </span>
              <span
                className="ml-auto text-[10px] font-bold px-1.5 py-0.5 rounded-full text-white"
                style={{ background: group.headerColor }}
              >
                {group.items.length}
              </span>
            </div>
            <div className="flex flex-col gap-2">
              {group.items.map((alert) => {
                const cfg = typeConfig[alert.tipo];
                return (
                  <div
                    key={alert.id}
                    className="alert-item"
                    style={{
                      background: alert.tipo === "error" ? "#fef2f2" : alert.tipo === "warning" ? "#fffbeb" : "#eff6ff",
                      borderColor: cfg.border,
                    }}
                  >
                    <span style={{ color: cfg.color, flexShrink: 0 }}>{cfg.icon}</span>
                    <div className="min-w-0">
                      <p className="text-xs text-slate-700 leading-snug font-medium">{alert.mensaje}</p>
                      <div className="flex items-center gap-1.5 mt-1">
                        <span
                          className="text-[9px] font-semibold px-1.5 py-0.5 rounded"
                          style={{ background: "#f1f5f9", color: "#64748b" }}
                        >
                          {alert.modulo}
                        </span>
                        <span className="text-[10px] text-slate-400">{alert.fecha}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
