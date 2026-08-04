"use client";
import { useState } from "react";
import { top10Distribuidoras, top10Morosas } from "@/app/_lib/mock-data";
import type { Distribuidor } from "@/app/_lib/types";

type RankingTab = "colocacion" | "recuperacion" | "ganancia" | "puntos" | "morosas";

const tabs: { key: RankingTab; label: string }[] = [
  { key: "colocacion",   label: "Mayor Colocación" },
  { key: "recuperacion", label: "Mayor Recuperación" },
  { key: "ganancia",     label: "Mayor Ganancia" },
  { key: "puntos",       label: "Más Puntos" },
  { key: "morosas",      label: "Top Morosas" },
];

const fieldMap: Record<RankingTab, keyof Distribuidor> = {
  colocacion:   "colocacion",
  recuperacion: "recuperacion",
  ganancia:     "ganancia",
  puntos:       "puntos",
  morosas:      "morosas",
};

function formatMoney(n: number) {
  return new Intl.NumberFormat("es-MX", { style: "currency", currency: "MXN", maximumFractionDigits: 0 }).format(n);
}

const medals = ["🥇", "🥈", "🥉"];

export default function RankingPanel() {
  const [tab, setTab] = useState<RankingTab>("colocacion");
  const isMorosas = tab === "morosas";
  const data = isMorosas ? top10Morosas : top10Distribuidoras;
  const field = fieldMap[tab];
  const sorted = [...data].sort((a, b) => (b[field] as number) - (a[field] as number));

  return (
    <div className="card">
      <div className="card-header flex-wrap gap-2">
        <div>
          <h3 className="font-bold text-slate-800 text-sm">Ranking de Distribuidoras</h3>
          <p className="text-xs text-slate-400 mt-0.5">Top {sorted.length} — período actual</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 px-4 pt-3 overflow-x-auto pb-0">
        {tabs.map((t) => (
          <button
            key={t.key}
            id={`ranking-tab-${t.key}`}
            onClick={() => setTab(t.key)}
            className="flex-shrink-0 text-xs font-semibold px-3 py-1.5 rounded-t-lg transition-colors border-b-2"
            style={{
              background: tab === t.key ? (t.key === "morosas" ? "#fef2f2" : "#EFF6FF") : "transparent",
              color: tab === t.key ? (t.key === "morosas" ? "#b91c1c" : "#1e40af") : "#64748b",
              borderColor: tab === t.key ? (t.key === "morosas" ? "#b91c1c" : "#1e40af") : "transparent",
            }}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="card-body pt-0 mt-3">
        <div className="flex flex-col gap-2">
          {sorted.map((d, i) => {
            const val = d[field] as number;
            const displayVal = field === "puntos"
              ? `${val.toLocaleString("es-MX")} pts`
              : field === "morosas" || field === "relaciones"
              ? `${val} relaciones`
              : formatMoney(val);

            const maxVal = sorted[0][field] as number;
            const pct = maxVal > 0 ? (val / maxVal) * 100 : 0;
            const barColor = isMorosas ? "#ef4444" : "#0D47A1";

            return (
              <div
                key={d.id}
                className="flex items-center gap-3 p-2.5 rounded-xl transition-colors"
                style={{ background: i < 3 && !isMorosas ? "#f8fafc" : "transparent" }}
              >
                <div className="w-8 text-center flex-shrink-0">
                  {i < 3 && !isMorosas ? (
                    <span className="text-lg">{medals[i]}</span>
                  ) : (
                    <span className="text-xs font-bold text-slate-400">#{i + 1}</span>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-sm font-semibold text-slate-800 truncate">{d.nombre}</p>
                    <span className="text-sm font-bold flex-shrink-0 ml-2" style={{ color: barColor }}>
                      {displayVal}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="progress-bar-track flex-1">
                      <div
                        className="progress-bar-fill"
                        style={{ width: `${pct}%`, background: barColor, opacity: 0.8 }}
                      />
                    </div>
                    <span className="text-[10px] text-slate-400 flex-shrink-0">{d.sucursal}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
