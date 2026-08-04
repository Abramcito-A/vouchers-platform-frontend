"use client";

const actions = [
  { id: "qa-nueva-distribuidora", label: "Nueva Distribuidora", bg: "#0D47A1", color: "#fff", icon: "👤" },
  { id: "qa-nueva-sucursal",      label: "Nueva Sucursal",      bg: "#1565C0", color: "#fff", icon: "🏢" },
  { id: "qa-nuevo-producto",      label: "Nuevo Producto",      bg: "#1976D2", color: "#fff", icon: "📦" },
  { id: "qa-autorizar",           label: "Autorizar Solicitudes", bg: "#16a34a", color: "#fff", icon: "✅" },
  { id: "qa-reportes",            label: "Generar Reportes",    bg: "#7c3aed", color: "#fff", icon: "📊" },
  { id: "qa-excel",               label: "Exportar Excel",      bg: "#065f46", color: "#fff", icon: "📗" },
  { id: "qa-pdf",                 label: "Exportar PDF",        bg: "#b91c1c", color: "#fff", icon: "📄" },
];

export default function QuickActions() {
  return (
    <div
      className="rounded-xl px-4 py-3 flex items-center gap-2 flex-wrap"
      style={{ background: "#f8fafc", border: "1px solid #e2e8f0" }}
    >
      <span className="text-xs font-bold text-slate-500 mr-1 flex-shrink-0">Acciones rápidas:</span>
      {actions.map((a) => (
        <button
          key={a.id}
          id={a.id}
          className="quick-action-btn"
          style={{ background: a.bg, color: a.color }}
          onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.85")}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
        >
          <span>{a.icon}</span>
          {a.label}
        </button>
      ))}
    </div>
  );
}
