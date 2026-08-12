import React from "react";

interface StatCardProps {
  title: string;
  /** Valor a mostrar. Usa "—" cuando aún no hay dato del backend. */
  value?: string | number;
  type?: "default" | "success" | "warning" | "danger";
  subtext?: string;
}

export default function StatCard({ title, value = "—", type = "default", subtext }: StatCardProps) {
  const colors = {
    default: "text-slate-800",
    success: "text-green-600",
    warning: "text-amber-600",
    danger: "text-red-600",
  };

  return (
    <div className="card p-5">
      <h4 className="text-sm font-semibold text-slate-500 mb-2">{title}</h4>
      <div className={`text-2xl font-black ${colors[type]}`}>{value}</div>
      {subtext && <p className="text-xs text-slate-400 mt-2 font-medium">{subtext}</p>}
    </div>
  );
}
