// ============================================================
// Hook — useCutoffs: cortes y conciliaciones
// ============================================================
"use client";

import { useState, useEffect, useCallback } from "react";
import * as apiClient from "../client";
import { CUTOFFS, CUTOFF_RELATIONS, RECONCILIATIONS } from "../endpoints";
import { ApiClientError } from "../client";
import type {
  Cutoff,
  CutoffRelation,
  CutoffRelationItem,
  Reconciliation,
  PaginatedResponse,
  ActionResponse,
  QueryParams,
} from "../types";

interface UseCutoffsReturn {
  cutoffs: Cutoff[];
  totalCount: number;
  currentPage: number;
  lastPage: number;
  isLoading: boolean;
  error: string | null;
  setPage: (page: number) => void;
  setFilters: (filters: Partial<QueryParams>) => void;
  refresh: () => void;
}

interface UseCutoffRelationsReturn {
  relations: CutoffRelation[];
  isLoading: boolean;
  error: string | null;
}

interface UseCutoffRelationItemsReturn {
  items: CutoffRelationItem[];
  isLoading: boolean;
  error: string | null;
}

interface UseReconciliationsReturn {
  reconciliations: Reconciliation[];
  totalCount: number;
  isLoading: boolean;
  error: string | null;
  resolve: (id: number | string, notes: string) => Promise<boolean>;
  isResolving: boolean;
  refresh: () => void;
}

/**
 * Hook para listar cortes (filtrable por sucursal y estatus).
 *
 * @example
 * const { cutoffs, isLoading, setFilters } = useCutoffs();
 * setFilters({ "filter[branch_id]": 3, "filter[status]": "EJECUTADO" });
 */
export function useCutoffs(
  initialFilters?: Partial<QueryParams>,
): UseCutoffsReturn {
  const [cutoffs, setCutoffs] = useState<Cutoff[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFiltersState] = useState<Partial<QueryParams>>(
    initialFilters ?? {},
  );

  const fetchCutoffs = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const params: QueryParams = {
        page: currentPage,
        per_page: 15,
        sort: "-scheduled_date",
        include: "branch",
        ...filters,
      };

      const response = await apiClient.get<PaginatedResponse<Cutoff>>(
        CUTOFFS.LIST,
        params,
      );

      setCutoffs(response.data);
      setTotalCount(response.meta.total);
      setLastPage(response.meta.last_page);
    } catch (err) {
      setError(
        err instanceof ApiClientError
          ? err.message
          : "Error al cargar cortes",
      );
    } finally {
      setIsLoading(false);
    }
  }, [currentPage, filters]);

  useEffect(() => {
    fetchCutoffs();
  }, [fetchCutoffs]);

  return {
    cutoffs,
    totalCount,
    currentPage,
    lastPage,
    isLoading,
    error,
    setPage: useCallback((page: number) => setCurrentPage(page), []),
    setFilters: useCallback((newFilters: Partial<QueryParams>) => {
      setFiltersState((prev) => ({ ...prev, ...newFilters }));
      setCurrentPage(1);
    }, []),
    refresh: fetchCutoffs,
  };
}

/**
 * Hook para obtener las relaciones (por distribuidora) de un corte.
 *
 * @example
 * const { relations, isLoading } = useCutoffRelations(5);
 */
export function useCutoffRelations(
  cutoffId: number | string | null,
): UseCutoffRelationsReturn {
  const [relations, setRelations] = useState<CutoffRelation[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!cutoffId) return;

    let cancelled = false;
    setIsLoading(true);
    setError(null);

    (async () => {
      try {
        const response = await apiClient.get<PaginatedResponse<CutoffRelation>>(
          CUTOFFS.RELATIONS(cutoffId),
          { per_page: 100, include: "distributor.person" },
        );
        if (!cancelled) setRelations(response.data);
      } catch (err) {
        if (!cancelled) {
          setError(
            err instanceof ApiClientError
              ? err.message
              : "Error al cargar relaciones",
          );
        }
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [cutoffId]);

  return { relations, isLoading, error };
}

/**
 * Hook para obtener los items (línea por vale) de una relación de corte.
 *
 * @example
 * const { items, isLoading } = useCutoffRelationItems(12);
 */
export function useCutoffRelationItems(
  relationId: number | string | null,
): UseCutoffRelationItemsReturn {
  const [items, setItems] = useState<CutoffRelationItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!relationId) return;

    let cancelled = false;
    setIsLoading(true);
    setError(null);

    (async () => {
      try {
        const response = await apiClient.get<PaginatedResponse<CutoffRelationItem>>(
          CUTOFF_RELATIONS.ITEMS(relationId),
          { per_page: 200 },
        );
        if (!cancelled) setItems(response.data);
      } catch (err) {
        if (!cancelled) {
          setError(
            err instanceof ApiClientError
              ? err.message
              : "Error al cargar items",
          );
        }
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [relationId]);

  return { items, isLoading, error };
}

/**
 * Hook para gestionar conciliaciones (listar + resolver discrepancias).
 *
 * @example
 * const { reconciliations, resolve, isResolving } = useReconciliations();
 * const ok = await resolve(8, "Diferencia por comisión bancaria");
 */
export function useReconciliations(
  initialFilters?: Partial<QueryParams>,
): UseReconciliationsReturn {
  const [reconciliations, setReconciliations] = useState<Reconciliation[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isResolving, setIsResolving] = useState(false);

  const fetchReconciliations = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const params: QueryParams = {
        per_page: 50,
        sort: "-created_at",
        include: "distributor_payment,bank_transaction",
        ...initialFilters,
      };

      const response = await apiClient.get<PaginatedResponse<Reconciliation>>(
        RECONCILIATIONS.LIST,
        params,
      );

      setReconciliations(response.data);
      setTotalCount(response.meta.total);
    } catch (err) {
      setError(
        err instanceof ApiClientError
          ? err.message
          : "Error al cargar conciliaciones",
      );
    } finally {
      setIsLoading(false);
    }
  }, [initialFilters]);

  useEffect(() => {
    fetchReconciliations();
  }, [fetchReconciliations]);

  const resolve = useCallback(
    async (id: number | string, notes: string): Promise<boolean> => {
      setIsResolving(true);

      try {
        await apiClient.post<ActionResponse>(RECONCILIATIONS.RESOLVE(id), {
          resolution_notes: notes,
        });
        await fetchReconciliations(); // Refrescar lista
        return true;
      } catch {
        return false;
      } finally {
        setIsResolving(false);
      }
    },
    [fetchReconciliations],
  );

  return {
    reconciliations,
    totalCount,
    isLoading,
    error,
    resolve,
    isResolving,
    refresh: fetchReconciliations,
  };
}
