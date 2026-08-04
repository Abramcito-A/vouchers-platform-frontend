"use client";
import { sucursalesData } from "@/app/_lib/mock-data";
import type { Sucursal } from "@/app/_lib/types";

function Semaforo({ estado }: { estado: Sucursal["semaforo"] }) {
  const map = {
    verde:    { color: "#22c55e", label: "Saludable", bg: "#f0fdf4" },
    amarillo: { color: "#f59e0b", label: "En riesgo",  bg: "#fffbeb" },
    rojo:     { color: "#ef4444", label: "Crítico",    bg: "#fef2f2" },
  };
  const { color, label, bg } = map[estado];
  return (
    <span
      className="semaforo px-2 py-1 rounded-full text-[11px] font-semibold"
      style={{ background: bg, color }}
    >
      <span
        className="semaforo-dot"
        style={{ background: color, width: 7, height: 7, borderRadius: "50%", display: "inline-block", marginRight: 5 }}
      />
      {label}
    </span>
  );
}

function formatMoney(n: number) {
  return new Intl.NumberFormat("es-MX", { style: "currency", currency: "MXN", maximumFractionDigits: 0 }).format(n);
}

export default function SucursalesPanel() {
  return (
    <div className="card">
      <div className="card-header">
        <div>
          <h3 className="font-bold text-slate-800 text-sm">Sucursales</h3>
          <p className="text-xs text-slate-400 mt-0.5">Resumen de rendimiento por sucursal</p>
        </div>
        <button
          id="sucursales-ver-todas-btn"
          className="text-xs font-semibold px-3 py-1.5 rounded-lg"
          style={{ background: "#EFF6FF", color: "#1e40af" }}
        >
          Ver todas →
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="data-table">
          <thead>
            <tr>
              <th>Sucursal</th>
              <th>Gerente</th>
              <th className="text-center">Distrib.</th>
              <th className="text-center">Clientes</th>
              <th className="text-center">Vales Act.</th>
              <th>Crédito utilizado</th>
              <th className="text-center">Recuperación</th>
              <th className="text-center">Estado</th>
            </tr>
          </thead>
          <tbody>
            {sucursalesData.map((s) => {
              const pct = (s.creditoUtilizado / s.creditoTotal) * 100;
              const recColor =
                s.porcentajeRecuperacion >= 85
                  ? "#16a34a"
                  : s.porcentajeRecuperacion >= 70
                  ? "#d97706"
                  : "#dc2626";
              return (
                <tr key={s.id}>
                  <td>
                    <div>
                      <p className="font-semibold text-slate-800">{s.nombre}</p>
                      <p className="text-[11px] text-slate-400">{s.ciudad}</p>
                    </div>
                  </td>
                  <td className="text-slate-600 text-xs">{s.gerente}</td>
                  <td className="text-center font-semibold text-slate-700">{s.distribuidoras}</td>
                  <td className="text-center font-semibold text-slate-700">{s.clientes.toLocaleString()}</td>
                  <td className="text-center font-semibold text-slate-700">{s.valesActivos.toLocaleString()}</td>
                  <td>
                    <div className="min-w-[120px]">
                      <div className="flex justify-between text-[11px] mb-1">
                        <span className="text-slate-500">{formatMoney(s.creditoUtilizado)}</span>
                        <span className="text-slate-400">{pct.toFixed(0)}%</span>
                      </div>
                      <div className="progress-bar-track">
                        <div
                          className="progress-bar-fill"
                          style={{
                            width: `${pct}%`,
                            background: pct >= 90 ? "#ef4444" : pct >= 75 ? "#f59e0b" : "#0D47A1",
                          }}
                        />
                      </div>
                    </div>
                  </td>
                  <td className="text-center">
                    <span className="text-sm font-bold" style={{ color: recColor }}>
                      {s.porcentajeRecuperacion}%
                    </span>
                  </td>
                  <td className="text-center">
                    <Semaforo estado={s.semaforo} />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
