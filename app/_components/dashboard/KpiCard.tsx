"use client";
import React from "react";
import type { KpiCardData } from "@/app/_lib/types";

// ── Iconos por nombre ──────────────────────────────────────
function KpiIcon({ name, className }: { name: string; className?: string }): React.ReactElement {
  const c = className ?? "w-6 h-6";
  const map: Record<string, React.ReactElement> = {
    building: <svg className={c} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path d="M3 21h18M5 21V7l7-4 7 4v14M9 21V13h6v8" /></svg>,
    users: <svg className={c} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path d="M17 20h5v-1a4 4 0 00-5.92-3.52M17 20H7M17 20v-1a6 6 0 00-10-4.47M7 20H2v-1a4 4 0 015.92-3.52M7 20v-1a6 6 0 0110-4.47M12 12a4 4 0 100-8 4 4 0 000 8z" /></svg>,
    "user-x": <svg className={c} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h6.5" /><line x1="17" y1="17" x2="23" y2="23" /><line x1="23" y1="17" x2="17" y2="23" /></svg>,
    "user-check": <svg className={c} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5z" /><polyline points="16,18 18,20 22,16" /></svg>,
    "user-plus": <svg className={c} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5z" /><line x1="20" y1="8" x2="20" y2="14" /><line x1="23" y1="11" x2="17" y2="11" /></svg>,
    "credit-card": <svg className={c} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><rect x="1" y="4" width="22" height="16" rx="2" ry="2" /><line x1="1" y1="10" x2="23" y2="10" /></svg>,
    "check-circle": <svg className={c} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path d="M22 11.08V12a10 10 0 11-5.93-9.14" /><polyline points="22,4 12,14.01 9,11.01" /></svg>,
    "trending-up": <svg className={c} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><polyline points="23,6 13.5,15.5 8.5,10.5 1,18" /><polyline points="17,6 23,6 23,12" /></svg>,
    wallet: <svg className={c} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path d="M21 12V7H5a2 2 0 010-4h14v4" /><path d="M3 5v14a2 2 0 002 2h16v-5" /><path d="M18 12a2 2 0 000 4h4v-4z" /></svg>,
    "arrow-down-circle": <svg className={c} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><circle cx="12" cy="12" r="10" /><polyline points="8,12 12,16 16,12" /><line x1="12" y1="8" x2="12" y2="16" /></svg>,
    "alert-triangle": <svg className={c} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" /><line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" /></svg>,
    inbox: <svg className={c} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><polyline points="22,12 16,12 14,15 10,15 8,12 2,12" /><path d="M5.45 5.11L2 12v6a2 2 0 002 2h16a2 2 0 002-2v-6l-3.45-6.89A2 2 0 0016.76 4H7.24a2 2 0 00-1.79 1.11z" /></svg>,
  };
  return map[name] ?? (<span className={c} />);
}

const colorMap: Record<string, { bg: string; text: string; border: string; icon: string; bar: string }> = {
  blue:   { bg: "#EFF6FF", text: "#1e40af", border: "#BFDBFE", icon: "#2563EB", bar: "#2563EB" },
  green:  { bg: "#F0FDF4", text: "#15803d", border: "#BBF7D0", icon: "#16A34A", bar: "#16A34A" },
  red:    { bg: "#FEF2F2", text: "#b91c1c", border: "#FECACA", icon: "#DC2626", bar: "#DC2626" },
  amber:  { bg: "#FFFBEB", text: "#92400e", border: "#FDE68A", icon: "#D97706", bar: "#D97706" },
  purple: { bg: "#F5F3FF", text: "#6d28d9", border: "#DDD6FE", icon: "#7C3AED", bar: "#7C3AED" },
  indigo: { bg: "#EEF2FF", text: "#3730a3", border: "#C7D2FE", icon: "#4338CA", bar: "#4338CA" },
  teal:   { bg: "#F0FDFA", text: "#0f766e", border: "#99F6E4", icon: "#0D9488", bar: "#0D9488" },
};

interface Props {
  data: KpiCardData;
  index?: number;
}

export default function KpiCard({ data, index = 0 }: Props) {
  const c = colorMap[data.color] ?? colorMap.blue;
  const isPositive = data.change > 0;
  const isNeutral = data.change === 0;
  const changeColor = isNeutral ? "#64748b" : isPositive ? "#16a34a" : "#dc2626";
  const changePrefix = isPositive ? "▲" : isNeutral ? "—" : "▼";

  return (
    <div
      className="kpi-card animate-fadeInUp"
      style={{ animationDelay: `${index * 40}ms` }}
    >
      {/* Top bar accent */}
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: c.bar, borderRadius: "12px 12px 0 0" }} />

      <div className="flex items-start justify-between gap-2 pt-1">
        <div className="flex-1 min-w-0">
          <p className="text-xs font-medium text-slate-500 leading-none mb-2 truncate">{data.title}</p>
          <p className="text-2xl font-black text-slate-900 leading-none">
            {data.prefix && <span className="text-base font-bold">{data.prefix}</span>}
            {data.value}
            {data.suffix && <span className="text-base font-bold">{data.suffix}</span>}
          </p>
        </div>
        <div
          className="flex items-center justify-center rounded-xl flex-shrink-0"
          style={{ width: 44, height: 44, background: c.bg, border: `1px solid ${c.border}`, color: c.icon }}
        >
          <KpiIcon name={data.icon} className="w-5 h-5" />
        </div>
      </div>

      {/* Change */}
      <div className="flex items-center gap-1.5 mt-3 pt-3" style={{ borderTop: "1px solid #f1f5f9" }}>
        <span className="text-xs font-bold" style={{ color: changeColor }}>
          {changePrefix} {Math.abs(data.change)}%
        </span>
        <span className="text-[11px] text-slate-400">vs mes anterior</span>
      </div>
    </div>
  );
}
