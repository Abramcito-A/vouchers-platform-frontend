"use client";
import { useState } from "react";
import { notificacionesData } from "@/app/_lib/mock-data";

function BellIcon() {
  return (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0" />
    </svg>
  );
}
function MessageIcon() {
  return (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
    </svg>
  );
}
function SearchIcon() {
  return (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" />
    </svg>
  );
}
function ChevronIcon() {
  return (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path d="M6 9l6 6 6-6" />
    </svg>
  );
}

export default function Navbar() {
  const [showNotifs, setShowNotifs] = useState(false);
  const unreadCount = notificacionesData.filter((n) => !n.leida).length;

  return (
    <header className="dashboard-navbar">
      <div className="flex items-center justify-between h-full px-6 gap-4">
        {/* Left: Breadcrumb / System name */}
        <div className="flex items-center gap-3">
          <div className="hidden md:block">
            <p className="text-xs text-slate-400 font-medium">Panel de Control</p>
            <p className="text-sm font-bold text-slate-800 leading-none">Dashboard Principal</p>
          </div>
        </div>

        {/* Center: Buscador global */}
        <div className="flex-1 max-w-md">
          <div
            className="flex items-center gap-2 rounded-lg px-3 py-2"
            style={{ background: "#f1f5f9", border: "1px solid #e2e8f0" }}
          >
            <span className="text-slate-400">
              <SearchIcon />
            </span>
            <input
              id="global-search"
              type="text"
              placeholder="Buscar distribuidoras, clientes, vales..."
              className="flex-1 bg-transparent text-sm outline-none text-slate-700 placeholder-slate-400"
            />
            <kbd className="hidden sm:inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-mono text-slate-400 border border-slate-300">
              ⌘K
            </kbd>
          </div>
        </div>

        {/* Right: Actions + Avatar */}
        <div className="flex items-center gap-1.5">
          {/* Mensajes */}
          <button
            id="nav-messages-btn"
            className="relative p-2 rounded-lg text-slate-500 transition-colors"
            style={{ transition: "background 0.15s" }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#f1f5f9")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
            title="Mensajes"
          >
            <MessageIcon />
            <span
              className="absolute top-1 right-1 text-[9px] font-bold text-white flex items-center justify-center"
              style={{ background: "#3b82f6", width: 14, height: 14, borderRadius: "50%" }}
            >
              5
            </span>
          </button>

          {/* Notificaciones */}
          <div className="relative">
            <button
              id="nav-notifications-btn"
              className="relative p-2 rounded-lg text-slate-500 transition-colors"
              style={{ transition: "background 0.15s" }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "#f1f5f9")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
              onClick={() => setShowNotifs(!showNotifs)}
              title="Notificaciones"
            >
              <BellIcon />
              {unreadCount > 0 && (
                <span
                  className="absolute top-1 right-1 text-[9px] font-bold text-white flex items-center justify-center"
                  style={{ background: "#ef4444", width: 14, height: 14, borderRadius: "50%" }}
                >
                  {unreadCount}
                </span>
              )}
            </button>

            {/* Dropdown notificaciones */}
            {showNotifs && (
              <div
                className="absolute right-0 mt-2 rounded-xl shadow-2xl border border-slate-200 z-50 overflow-hidden"
                style={{ width: 340, background: "#fff", top: "100%" }}
              >
                <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100">
                  <p className="font-semibold text-sm text-slate-800">Notificaciones</p>
                  <span className="text-xs text-blue-600 font-medium cursor-pointer hover:underline">
                    Marcar todas como leídas
                  </span>
                </div>
                <div className="max-h-72 overflow-y-auto">
                  {notificacionesData.map((n) => (
                    <div
                      key={n.id}
                      className="flex items-start gap-3 px-4 py-3 border-b border-slate-50 hover:bg-slate-50 cursor-pointer transition-colors"
                    >
                      <div
                        className="w-2 h-2 rounded-full mt-1.5 flex-shrink-0"
                        style={{ background: n.leida ? "#cbd5e1" : "#3b82f6" }}
                      />
                      <div className="flex-1 min-w-0">
                        <p className={`text-xs leading-snug ${n.leida ? "text-slate-500" : "text-slate-800 font-medium"}`}>
                          {n.mensaje}
                        </p>
                        <p className="text-[10px] text-slate-400 mt-0.5">{n.tiempo}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="px-4 py-2.5 text-center border-t border-slate-100">
                  <span className="text-xs text-blue-600 font-medium cursor-pointer hover:underline">
                    Ver todas las notificaciones
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Divider */}
          <div className="w-px h-6 bg-slate-200 mx-1" />

          {/* Avatar + nombre */}
          <button
            id="nav-profile-btn"
            className="flex items-center gap-2.5 px-2 py-1.5 rounded-lg transition-colors"
            onMouseEnter={(e) => (e.currentTarget.style.background = "#f1f5f9")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
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
              GG
            </div>
            <div className="hidden sm:block text-left">
              <p className="text-xs font-semibold text-slate-800 leading-none">Gerente General</p>
              <p className="text-[10px] text-slate-400 mt-0.5 leading-none">Administrador</p>
            </div>
            <span className="text-slate-400 hidden sm:block">
              <ChevronIcon />
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}
