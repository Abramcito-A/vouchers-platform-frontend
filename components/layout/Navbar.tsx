"use client";
import { useState } from "react";

function ChevronIcon() {
  return (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path d="M6 9l6 6 6-6" />
    </svg>
  );
}
function LogOutIcon() {
  return (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9" />
    </svg>
  );
}

interface NavbarProps {
  /** Nombre del rol activo, mostrado a la derecha (placeholder hasta cablear /auth/me) */
  roleLabel?: string;
}

export default function Navbar({ roleLabel = "Usuario" }: NavbarProps) {
  const [showMenu, setShowMenu] = useState(false);

  // Iniciales del rol para el avatar (placeholder neutro; sin datos ficticios)
  const initials = roleLabel
    .split(" ")
    .map((w) => w.charAt(0))
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <header className="dashboard-navbar">
      <div className="flex items-center justify-between h-full px-6 gap-4">
        {/* Left: nombre del sistema */}
        <div className="hidden md:block">
          <p className="text-xs text-slate-400 font-medium">Panel de Control</p>
          <p className="text-sm font-bold text-slate-800 leading-none">MIS VALES</p>
        </div>

        {/* Right: menú de usuario */}
        <div className="relative ml-auto">
          <button
            className="flex items-center gap-2.5 px-2 py-1.5 rounded-lg transition-colors hover:bg-slate-100"
            onClick={() => setShowMenu(!showMenu)}
          >
            <div
              className="flex items-center justify-center rounded-full text-white font-bold text-sm"
              style={{
                width: 36,
                height: 36,
                background: "linear-gradient(135deg, #0D47A1, #1976D2)",
                flexShrink: 0,
              }}
            >
              {initials}
            </div>
            <div className="hidden sm:block text-left">
              <p className="text-xs font-semibold text-slate-800 leading-none">{roleLabel}</p>
            </div>
            <span className="text-slate-400 hidden sm:block">
              <ChevronIcon />
            </span>
          </button>

          {showMenu && (
            <div
              className="absolute right-0 mt-2 rounded-xl shadow-2xl border border-slate-200 z-50 overflow-hidden bg-white"
              style={{ width: 200, top: "100%" }}
            >
              <button className="w-full flex items-center gap-2 px-4 py-3 text-sm font-medium text-red-600 hover:bg-red-50 transition-colors">
                <LogOutIcon />
                Cerrar sesión
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
