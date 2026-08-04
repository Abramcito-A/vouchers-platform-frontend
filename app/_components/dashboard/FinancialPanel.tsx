"use client";
import { panelFinanciero } from "@/app/_lib/mock-data";

function formatMoney(n: number) {
  return new Intl.NumberFormat("es-MX", { style: "currency", currency: "MXN", maximumFractionDigits: 0 }).format(n);
}

const metrics = [
  { label: "Crédito Total Otorgado",  value: panelFinanciero.creditoTotalOtorgado,  color: "#1e40af", bg: "#eff6ff", icon: "💰" },
  { label: "Crédito Disponible",      value: panelFinanciero.creditoDisponible,      color: "#0f766e", bg: "#f0fdfa", icon: "🏦" },
  { label: "Capital Recuperado",      value: panelFinanciero.capitalRecuperado,      color: "#15803d", bg: "#f0fdf4", icon: "📈" },
  { label: "Capital Pendiente",       value: panelFinanciero.capitalPendiente,       color: "#d97706", bg: "#fffbeb", icon: "⏳" },
  { label: "Ganancias del Mes",       value: panelFinanciero.gananciasMes,           color: "#15803d", bg: "#f0fdf4", icon: "📅" },
  { label: "Ganancias del Año",       value: panelFinanciero.gananciasAnio,          color: "#6d28d9", bg: "#f5f3ff", icon: "🗓️" },
  { label: "Monto en Mora",           value: panelFinanciero.montoEnMora,            color: "#b91c1c", bg: "#fef2f2", icon: "⚠️" },
  { label: "Recuperado Hoy",          value: panelFinanciero.montoRecuperadoHoy,     color: "#15803d", bg: "#f0fdf4", icon: "✅" },
];

export default function FinancialPanel() {
  const usoPct = (panelFinanciero.creditoTotalOtorgado - panelFinanciero.creditoDisponible) / panelFinanciero.creditoTotalOtorgado * 100;
  const recPct = panelFinanciero.capitalRecuperado / panelFinanciero.creditoTotalOtorgado * 100;

  return (
    <div className="card">
      <div className="card-header">
        <div>
          <h3 className="font-bold text-slate-800 text-sm">Panel Financiero</h3>
          <p className="text-xs text-slate-400 mt-0.5">Indicadores financieros generales del sistema</p>
        </div>
        <span
          className="badge"
          style={{ background: "#f0fdf4", color: "#15803d", border: "1px solid #bbf7d0", fontSize: "0.7rem" }}
        >
          Actualizado hoy
        </span>
      </div>

      {/* Barras de resumen */}
      <div className="px-6 py-4 grid grid-cols-1 md:grid-cols-2 gap-4 border-b border-slate-100">
        <div>
          <div className="flex justify-between text-xs mb-1">
            <span className="font-medium text-slate-600">Uso de crédito global</span>
            <span className="font-bold text-slate-800">{usoPct.toFixed(1)}%</span>
          </div>
          <div className="progress-bar-track">
            <div className="progress-bar-fill" style={{ width: `${usoPct}%`, background: usoPct > 90 ? "#ef4444" : "#0D47A1" }} />
          </div>
          <div className="flex justify-between text-[10px] mt-1 text-slate-400">
            <span>Usado: {formatMoney(panelFinanciero.creditoTotalOtorgado - panelFinanciero.creditoDisponible)}</span>
            <span>Total: {formatMoney(panelFinanciero.creditoTotalOtorgado)}</span>
          </div>
        </div>
        <div>
          <div className="flex justify-between text-xs mb-1">
            <span className="font-medium text-slate-600">Tasa de recuperación</span>
            <span className="font-bold text-slate-800">{recPct.toFixed(1)}%</span>
          </div>
          <div className="progress-bar-track">
            <div className="progress-bar-fill" style={{ width: `${recPct}%`, background: "#16a34a" }} />
          </div>
          <div className="flex justify-between text-[10px] mt-1 text-slate-400">
            <span>Recuperado: {formatMoney(panelFinanciero.capitalRecuperado)}</span>
            <span>Colocado: {formatMoney(panelFinanciero.creditoTotalOtorgado)}</span>
          </div>
        </div>
      </div>

      {/* Métricas en grid */}
      <div className="card-body grid grid-cols-2 md:grid-cols-4 gap-3">
        {metrics.map((m) => (
          <div
            key={m.label}
            className="rounded-xl p-3 flex flex-col gap-1"
            style={{ background: m.bg }}
          >
            <div className="flex items-center gap-1.5">
              <span className="text-base leading-none">{m.icon}</span>
              <span className="text-[10px] font-semibold text-slate-500 leading-tight">{m.label}</span>
            </div>
            <p className="text-lg font-black leading-none" style={{ color: m.color }}>
              {formatMoney(m.value)}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
