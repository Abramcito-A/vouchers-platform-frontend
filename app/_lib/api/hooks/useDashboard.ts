// ============================================================
// Hook — useDashboard: datos del dashboard del gerente
// ============================================================
"use client";

import { useState, useEffect, useCallback } from "react";
import * as apiClient from "../client";
import { DASHBOARD } from "../endpoints";
import type {
  DashboardKpis,
  BranchSummary,
  RankedDistributor,
  LoanBehavior,
  SystemAlert,
  FinancialSummary,
  RecentActivity,
} from "../types";

// ── Importar mock data como fallback ──────────────────────
import {
  kpiData,
  sucursalesData,
  top10Distribuidoras,
  top10Morosas,
  loanChartData,
  alertasData,
  actividadData,
  panelFinanciero,
} from "../../mock-data";

interface UseDashboardReturn {
  kpis: DashboardKpis | null;
  branches: BranchSummary[];
  topDistributors: RankedDistributor[];
  delinquentDistributors: RankedDistributor[];
  loanBehavior: LoanBehavior[];
  alerts: SystemAlert[];
  financialSummary: FinancialSummary | null;
  recentActivity: RecentActivity[];
  isLoading: boolean;
  error: string | null;
  refresh: () => void;
  /** true si está usando datos mock (API no disponible) */
  isMock: boolean;
}

/**
 * Transforma el mock data existente al formato de tipos API.
 * Se usa como fallback cuando el backend no está disponible.
 */
function getMockFallback() {
  // Transformar KPIs mock → DashboardKpis
  const kpiMap = Object.fromEntries(kpiData.map((k) => [k.id, k]));
  const mockKpis: DashboardKpis = {
    total_branches: Number(kpiMap["sucursales"]?.value ?? 0),
    active_distributors: Number(kpiMap["distrib-activas"]?.value ?? 0),
    suspended_distributors: Number(kpiMap["distrib-suspendidas"]?.value ?? 0),
    registered_customers: Number(String(kpiMap["clientes"]?.value ?? 0).replace(/,/g, "")),
    new_customers_month: Number(kpiMap["clientes-nuevos"]?.value ?? 0),
    active_vouchers: Number(String(kpiMap["vales-activos"]?.value ?? 0).replace(/,/g, "")),
    settled_vouchers: Number(String(kpiMap["vales-liquidados"]?.value ?? 0).replace(/,/g, "")),
    credit_placed: Number(String(kpiMap["credito-colocado"]?.value ?? 0).replace(/,/g, "")),
    credit_available: Number(String(kpiMap["credito-disponible"]?.value ?? 0).replace(/,/g, "")),
    total_recovered: Number(String(kpiMap["recuperado"]?.value ?? 0).replace(/,/g, "")),
    delinquent_relations: Number(kpiMap["morosas"]?.value ?? 0),
    pending_requests: Number(kpiMap["solicitudes"]?.value ?? 0),
    changes: {
      active_distributors: kpiMap["distrib-activas"]?.change ?? 0,
      suspended_distributors: kpiMap["distrib-suspendidas"]?.change ?? 0,
      registered_customers: kpiMap["clientes"]?.change ?? 0,
      new_customers_month: kpiMap["clientes-nuevos"]?.change ?? 0,
      active_vouchers: kpiMap["vales-activos"]?.change ?? 0,
      settled_vouchers: kpiMap["vales-liquidados"]?.change ?? 0,
      credit_placed: kpiMap["credito-colocado"]?.change ?? 0,
      credit_available: kpiMap["credito-disponible"]?.change ?? 0,
      total_recovered: kpiMap["recuperado"]?.change ?? 0,
      delinquent_relations: kpiMap["morosas"]?.change ?? 0,
      pending_requests: kpiMap["solicitudes"]?.change ?? 0,
    },
  };

  // Branches
  const mockBranches: BranchSummary[] = sucursalesData.map((s) => ({
    id: Number(s.id.replace("s", "")),
    code: s.id.toUpperCase(),
    name: s.nombre,
    manager_name: s.gerente,
    city: s.ciudad,
    distributors_count: s.distribuidoras,
    customers_count: s.clientes,
    active_vouchers_count: s.valesActivos,
    credit_utilized: s.creditoUtilizado,
    credit_total: s.creditoTotal,
    recovery_percentage: s.porcentajeRecuperacion,
    traffic_light: s.semaforo,
  }));

  // Top distribuidoras
  const mapDistrib = (d: typeof top10Distribuidoras[0]): RankedDistributor => ({
    id: Number(d.id.replace(/\D/g, "")),
    name: d.nombre,
    branch_name: d.sucursal,
    total_placed: d.colocacion,
    total_recovered: d.recuperacion,
    earnings: d.ganancia,
    points: d.puntos,
    total_relations: d.relaciones,
    delinquent_relations: d.morosas,
    delinquency_rate: d.porcentajeMora,
  });

  // Loan behavior
  const mockLoans: LoanBehavior[] = loanChartData.map((l) => ({
    month: l.mes,
    loans_issued: l.prestamos,
    recovered: l.recuperado,
    pending: l.pendiente,
  }));

  // Alerts
  const mockAlerts: SystemAlert[] = alertasData.map((a) => ({
    id: a.id,
    severity: a.tipo,
    message: a.mensaje,
    count: a.cantidad ?? null,
    module: a.modulo,
    date: a.fecha,
  }));

  // Financial
  const mockFinancial: FinancialSummary = {
    total_credit_granted: panelFinanciero.creditoTotalOtorgado,
    credit_available: panelFinanciero.creditoDisponible,
    capital_recovered: panelFinanciero.capitalRecuperado,
    capital_pending: panelFinanciero.capitalPendiente,
    earnings_month: panelFinanciero.gananciasMes,
    earnings_year: panelFinanciero.gananciasAnio,
    delinquent_amount: panelFinanciero.montoEnMora,
    recovered_today: panelFinanciero.montoRecuperadoHoy,
  };

  // Activity
  const mockActivity: RecentActivity[] = actividadData.map((a) => ({
    id: a.id,
    type: a.tipo,
    actor: a.actor,
    actor_role: a.rolActor,
    action: a.accion,
    date: a.fecha,
    time: a.hora,
  }));

  return {
    kpis: mockKpis,
    branches: mockBranches,
    topDistributors: top10Distribuidoras.map(mapDistrib),
    delinquentDistributors: top10Morosas.map(mapDistrib),
    loanBehavior: mockLoans,
    alerts: mockAlerts,
    financialSummary: mockFinancial,
    recentActivity: mockActivity,
  };
}

/**
 * Hook principal para datos del dashboard.
 *
 * Intenta cargar desde la API. Si falla (backend no disponible),
 * usa los mock data existentes como fallback transparente.
 *
 * @example
 * const { kpis, branches, isLoading, isMock } = useDashboard();
 */
export function useDashboard(): UseDashboardReturn {
  const [data, setData] = useState<Omit<UseDashboardReturn, "isLoading" | "error" | "refresh" | "isMock">>({
    kpis: null,
    branches: [],
    topDistributors: [],
    delinquentDistributors: [],
    loanBehavior: [],
    alerts: [],
    financialSummary: null,
    recentActivity: [],
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isMock, setIsMock] = useState(false);

  const fetchDashboard = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      // Lanzar todas las peticiones en paralelo
      const [
        kpis,
        branches,
        topDistributors,
        delinquentDistributors,
        loanBehavior,
        alerts,
        financialSummary,
        recentActivity,
      ] = await Promise.all([
        apiClient.get<DashboardKpis>(DASHBOARD.KPIS),
        apiClient.get<BranchSummary[]>(DASHBOARD.BRANCHES_SUMMARY),
        apiClient.get<RankedDistributor[]>(DASHBOARD.TOP_DISTRIBUTORS),
        apiClient.get<RankedDistributor[]>(DASHBOARD.DELINQUENT_DISTRIBUTORS),
        apiClient.get<LoanBehavior[]>(DASHBOARD.LOAN_BEHAVIOR, { months: 8 }),
        apiClient.get<SystemAlert[]>(DASHBOARD.ALERTS),
        apiClient.get<FinancialSummary>(DASHBOARD.FINANCIAL_SUMMARY),
        apiClient.get<RecentActivity[]>(DASHBOARD.RECENT_ACTIVITY),
      ]);

      setData({
        kpis,
        branches,
        topDistributors,
        delinquentDistributors,
        loanBehavior,
        alerts,
        financialSummary,
        recentActivity,
      });
      setIsMock(false);
    } catch {
      // Fallback a mock data si la API no está disponible
      console.warn("[useDashboard] API no disponible, usando mock data.");
      const mock = getMockFallback();
      setData(mock);
      setIsMock(true);
      setError(null); // No mostramos error si hay fallback
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDashboard();
  }, [fetchDashboard]);

  return {
    ...data,
    isLoading,
    error,
    refresh: fetchDashboard,
    isMock,
  };
}
