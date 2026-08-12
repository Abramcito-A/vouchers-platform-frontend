// ============================================================
// Hook — useDashboard: datos del dashboard del gerente
// ============================================================
"use client";

import { useState, useEffect, useCallback } from "react";
import * as apiClient from "../client";
import { ApiClientError } from "../client";
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
}

/**
 * Hook principal para datos del dashboard.
 *
 * Carga los datos desde la API. Si falla, expone `error` y deja
 * los datos vacíos (sin datos ficticios).
 *
 * @example
 * const { kpis, branches, isLoading, error } = useDashboard();
 */
export function useDashboard(): UseDashboardReturn {
  const [data, setData] = useState<Omit<UseDashboardReturn, "isLoading" | "error" | "refresh">>({
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
    } catch (err) {
      setError(
        err instanceof ApiClientError ? err.message : "Error al cargar el dashboard",
      );
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
  };
}
