"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

// ── Icono SVG inline helper ────────────────────────────────
function Icon({ name, className = "w-[18px] h-[18px]" }: { name: string; className?: string }): React.ReactElement {
  const icons: Record<string, React.ReactElement> = {
    dashboard: (
      <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" />
        <rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" />
      </svg>
    ),
    building: (
      <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path d="M3 21h18M5 21V7l7-4 7 4v14M9 21V13h6v8" />
      </svg>
    ),
    "building-office": (
      <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path d="M2 21h20M4 21V5a1 1 0 011-1h14a1 1 0 011 1v16M9 21v-6h6v6M9 7h1m4 0h1M9 11h1m4 0h1" />
      </svg>
    ),
    users: (
      <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path d="M17 20h5v-1a4 4 0 00-5.92-3.52M17 20H7M17 20v-1a6 6 0 00-10-4.47M7 20H2v-1a4 4 0 015.92-3.52M7 20v-1a6 6 0 0110-4.47M12 12a4 4 0 100-8 4 4 0 000 8z" />
      </svg>
    ),
    "user-check": (
      <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05C18.19 13.82 19 14.48 19 15.5V19h4v-2.5c0-2.33-4.67-3.5-7-3.5z" />
      </svg>
    ),
    badge: (
      <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    "credit-card": (
      <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <rect x="1" y="4" width="22" height="16" rx="2" ry="2" /><line x1="1" y1="10" x2="23" y2="10" />
      </svg>
    ),
    "file-text": (
      <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" /><polyline points="14,2 14,8 20,8" />
        <line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /><line x1="10" y1="9" x2="8" y2="9" />
      </svg>
    ),
    "refresh-cw": (
      <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <polyline points="23,4 23,10 17,10" /><polyline points="1,20 1,14 7,14" />
        <path d="M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15" />
      </svg>
    ),
    inbox: (
      <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <polyline points="22,12 16,12 14,15 10,15 8,12 2,12" />
        <path d="M5.45 5.11L2 12v6a2 2 0 002 2h16a2 2 0 002-2v-6l-3.45-6.89A2 2 0 0016.76 4H7.24a2 2 0 00-1.79 1.11z" />
      </svg>
    ),
    box: (
      <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" />
        <polyline points="3.27,6.96 12,12.01 20.73,6.96" /><line x1="12" y1="22.08" x2="12" y2="12" />
      </svg>
    ),
    settings: (
      <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <circle cx="12" cy="12" r="3" />
        <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V21a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z" />
      </svg>
    ),
    "user-cog": (
      <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" /><circle cx="12" cy="7" r="4" />
        <circle cx="19" cy="19" r="2" /><path d="M19 15v2m0 4v2m-2.83-2H17m4 0h.83M16.76 16.76l1.41 1.41m1.42 1.42l1.41 1.41M16.76 21.24l1.41-1.41m1.42-1.42l1.41-1.41" />
      </svg>
    ),
    shield: (
      <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    "clipboard-list": (
      <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2" />
        <rect x="9" y="3" width="6" height="4" rx="1" ry="1" />
        <line x1="9" y1="12" x2="15" y2="12" /><line x1="9" y1="16" x2="11" y2="16" />
      </svg>
    ),
    "bar-chart": (
      <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" />
        <line x1="6" y1="20" x2="6" y2="14" /><line x1="2" y1="20" x2="22" y2="20" />
      </svg>
    ),
    "log-out": (
      <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9" />
      </svg>
    ),
    eye: (
      <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" />
      </svg>
    ),
  };
  return icons[name] ?? (<span className={className} />);

}

// ── Menú de navegación ─────────────────────────────────────
const navGroups = [
  {
    label: "Principal",
    items: [
      { href: "/dashboard", icon: "dashboard", label: "Dashboard General" },
      { href: "/sucursales", icon: "building", label: "Sucursales" },
    ],
  },
  {
    label: "Directorio",
    items: [
      { href: "/coordinadores", icon: "users", label: "Coordinadores" },
      { href: "/verificadores", icon: "badge", label: "Verificadores" },
      { href: "/cajeras", icon: "user-check", label: "Cajeras" },
      { href: "/distribuidoras", icon: "building-office", label: "Distribuidoras" },
    ],
  },
  {
    label: "Operaciones",
    items: [
      { href: "/solicitudes", icon: "inbox", label: "Solicitudes Pendientes" },
      { href: "/creditos", icon: "credit-card", label: "Líneas de Crédito" },
      { href: "/planes", icon: "box", label: "Planes de Vales" },
      { href: "/productos", icon: "file-text", label: "Productos" },
      { href: "/relaciones", icon: "refresh-cw", label: "Relaciones" },
    ],
  },
  {
    label: "Administración",
    items: [
      { href: "/usuarios", icon: "user-cog", label: "Admin Usuarios" },
      { href: "/configuracion", icon: "settings", label: "Configuración General" },
      { href: "/reportes", icon: "bar-chart", label: "Reportes" },
      { href: "/kpis", icon: "bar-chart", label: "KPIs" },
      { href: "/auditoria", icon: "clipboard-list", label: "Auditoría (Logs)" },
    ],
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="dashboard-sidebar">
      {/* Logo */}
      <div className="flex items-center gap-3 px-5 py-5 border-b border-white/10">
        <div
          className="flex items-center justify-center rounded-xl text-white font-black text-lg"
          style={{ width: 40, height: 40, background: "rgba(255,255,255,0.2)" }}
        >
          MV
        </div>
        <div>
          <p className="text-white font-bold text-sm leading-none">MIS VALES</p>
          <p className="text-blue-200 text-[10px] mt-0.5 leading-none">Sistema de Administración</p>
        </div>
      </div>

      {/* Nav */}
      <nav className="py-3 flex flex-col gap-0.5">
        {navGroups.map((group) => (
          <div key={group.label} className="mb-2">
            <p className="px-5 py-1.5 text-[10px] font-semibold uppercase tracking-widest text-blue-300/60">
              {group.label}
            </p>
            {group.items.map((item) => {
              const active = pathname === item.href || pathname.startsWith(item.href + "/");
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`sidebar-nav-item ${active ? "active" : ""}`}
                >
                  <Icon name={item.icon} />
                  <span>{item.label}</span>
                  {item.href === "/solicitudes" && (
                    <span
                      className="ml-auto text-[10px] font-bold rounded-full px-1.5 py-0.5"
                      style={{ background: "#ef4444", color: "white" }}
                    >
                      34
                    </span>
                  )}
                </Link>
              );
            })}
          </div>
        ))}

        {/* Cerrar sesión */}
        <div className="mt-2 px-2 border-t border-white/10 pt-3">
          <button className="sidebar-nav-item w-full text-red-300 hover:text-red-100 hover:bg-red-500/20">
            <Icon name="log-out" />
            <span>Cerrar sesión</span>
          </button>
        </div>
      </nav>
    </aside>
  );
}
