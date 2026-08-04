import type { Metadata } from "next";
import KpiCard from "@/app/_components/dashboard/KpiCard";
import QuickActions from "@/app/_components/dashboard/QuickActions";
import LoansBehaviorChart from "@/app/_components/dashboard/LoansBehaviorChart";
import RelationsDonutChart from "@/app/_components/dashboard/RelationsDonutChart";
import SucursalesPanel from "@/app/_components/dashboard/SucursalesPanel";
import SolicitudesTable from "@/app/_components/dashboard/SolicitudesTable";
import AlertsPanel from "@/app/_components/dashboard/AlertsPanel";
import RankingPanel from "@/app/_components/dashboard/RankingPanel";
import ActivityTimeline from "@/app/_components/dashboard/ActivityTimeline";
import FinancialPanel from "@/app/_components/dashboard/FinancialPanel";
import { kpiData, panelFinanciero, alertasData } from "@/app/_lib/mock-data";

export const metadata: Metadata = {
  title: "Dashboard — MIS VALES",
  description: "Panel principal del Gerente General. Visión completa del negocio.",
};

// ── Fecha de hoy formateada ────────────────────────────────
function getTodayString() {
  return new Intl.DateTimeFormat("es-MX", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date());
}

function formatMoney(n: number) {
  return new Intl.NumberFormat("es-MX", {
    style: "currency",
    currency: "MXN",
    maximumFractionDigits: 0,
  }).format(n);
}

export default function DashboardPage() {
  const today = getTodayString();
  const errores = alertasData.filter((a) => a.tipo === "error").length;

  return (
    <div className="flex flex-col gap-6 max-w-[1600px] mx-auto">
      {/* ── Welcome Header ──────────────────────────────────── */}
      <div
        className="rounded-2xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-4"
        style={{
          background: "linear-gradient(135deg, #0D47A1 0%, #1565C0 50%, #1976D2 100%)",
          boxShadow: "0 8px 32px rgba(13,71,161,0.25)",
        }}
      >
        <div>
          <p className="text-blue-200 text-sm font-medium capitalize">{today}</p>
          <h1 className="text-white text-2xl font-black mt-1 leading-tight">
            Bienvenido, Gerente General 👋
          </h1>
          <p className="text-blue-100 text-sm mt-1.5 max-w-lg">
            Resumen ejecutivo del sistema MIS VALES. Tienes{" "}
            <strong className="text-white">{errores} alertas críticas</strong> y{" "}
            <strong className="text-white">34 solicitudes pendientes</strong> de revisión.
          </p>
        </div>

        {/* Stats rápidas */}
        <div className="flex gap-4 flex-wrap">
          {[
            { label: "Recuperado hoy",  value: formatMoney(panelFinanciero.montoRecuperadoHoy), icon: "💵" },
            { label: "Ganancia del mes", value: formatMoney(panelFinanciero.gananciasMes), icon: "📈" },
            { label: "Crédito disponible", value: formatMoney(panelFinanciero.creditoDisponible), icon: "🏦" },
          ].map((s) => (
            <div
              key={s.label}
              className="rounded-xl px-4 py-3 min-w-[140px]"
              style={{ background: "rgba(255,255,255,0.12)", backdropFilter: "blur(8px)" }}
            >
              <div className="flex items-center gap-1.5 mb-1">
                <span className="text-base leading-none">{s.icon}</span>
                <p className="text-blue-200 text-[10px] font-medium">{s.label}</p>
              </div>
              <p className="text-white font-black text-lg leading-none">{s.value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Acciones rápidas ───────────────────────────────── */}
      <QuickActions />

      {/* ── Fila 1: KPIs ──────────────────────────────────── */}
      <section>
        <h2 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-3">
          Indicadores Clave (KPIs)
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3">
          {kpiData.map((kpi, i) => (
            <KpiCard key={kpi.id} data={kpi} index={i} />
          ))}
        </div>
      </section>

      {/* ── Fila 2: Gráficas ──────────────────────────────── */}
      <section>
        <h2 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-3">
          Análisis Gráfico
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2">
            <LoansBehaviorChart />
          </div>
          <div>
            <RelationsDonutChart />
          </div>
        </div>
      </section>

      {/* ── Fila 3: Panel Financiero ──────────────────────── */}
      <section>
        <h2 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-3">
          Panel Financiero
        </h2>
        <FinancialPanel />
      </section>

      {/* ── Fila 4: Sucursales ────────────────────────────── */}
      <section>
        <h2 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-3">
          Rendimiento por Sucursal
        </h2>
        <SucursalesPanel />
      </section>

      {/* ── Fila 5: Solicitudes ───────────────────────────── */}
      <section>
        <h2 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-3">
          Solicitudes Pendientes
        </h2>
        <SolicitudesTable />
      </section>

      {/* ── Fila 6: Alertas ───────────────────────────────── */}
      <section>
        <h2 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-3">
          Alertas Importantes
        </h2>
        <AlertsPanel />
      </section>

      {/* ── Fila 7: Ranking + Timeline ────────────────────── */}
      <section>
        <h2 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-3">
          Ranking y Actividad
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <RankingPanel />
          <ActivityTimeline />
        </div>
      </section>

      {/* Footer */}
      <div className="pb-4 text-center">
        <p className="text-xs text-slate-400">
          MIS VALES v1.0 · Sistema de Administración de Distribuidoras · Datos actualizados en tiempo real
        </p>
      </div>
    </div>
  );
}
