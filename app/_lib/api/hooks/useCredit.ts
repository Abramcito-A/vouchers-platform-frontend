// ============================================================
// Hook — useCredit: incrementos de crédito del gerente
// ============================================================
"use client";

import { useState, useEffect, useCallback } from "react";
import * as apiClient from "../client";
import { CREDIT_INCREASES, DISTRIBUTORS } from "../endpoints";
import { ApiClientError } from "../client";
import type {
  CreditIncreaseSuggestion,
  CreditIncreaseDecisionPayload,
  CreditScoreHistory,
  PaginatedResponse,
  ActionResponse,
  QueryParams,
} from "../types";
import { CreditIncreaseSuggestionStatus } from "../types";

interface UseCreditSuggestionsReturn {
  suggestions: CreditIncreaseSuggestion[];
  totalCount: number;
  currentPage: number;
  lastPage: number;
  isLoading: boolean;
  error: string | null;
  setPage: (page: number) => void;
  setFilters: (filters: Partial<QueryParams>) => void;
  refresh: () => void;
}

interface UseCreditDecisionReturn {
  decide: (
    id: number | string,
    payload: CreditIncreaseDecisionPayload,
  ) => Promise<boolean>;
  isSubmitting: boolean;
  error: string | null;
  validationErrors: Record<string, string[]> | null;
}

interface UseCreditHistoryReturn {
  history: CreditScoreHistory[];
  isLoading: boolean;
  error: string | null;
}

/**
 * Hook para listar sugerencias de incremento de crédito pendientes.
 *
 * @example
 * const { suggestions, isLoading, setPage } = useCreditSuggestions();
 */
export function useCreditSuggestions(
  initialFilters?: Partial<QueryParams>,
): UseCreditSuggestionsReturn {
  const [suggestions, setSuggestions] = useState<CreditIncreaseSuggestion[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFiltersState] = useState<Partial<QueryParams>>(
    initialFilters ?? {
      "filter[status]": CreditIncreaseSuggestionStatus.PENDING,
    },
  );

  const fetchSuggestions = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const params: QueryParams = {
        page: currentPage,
        per_page: 15,
        sort: "-created_at",
        include: "distributor.person,distributor.branch,credit_score",
        ...filters,
      };

      const response = await apiClient.get<PaginatedResponse<CreditIncreaseSuggestion>>(
        CREDIT_INCREASES.LIST,
        params,
      );

      setSuggestions(response.data);
      setTotalCount(response.meta.total);
      setLastPage(response.meta.last_page);
    } catch (err) {
      setError(
        err instanceof ApiClientError
          ? err.message
          : "Error al cargar sugerencias",
      );
      setSuggestions([]);
    } finally {
      setIsLoading(false);
    }
  }, [currentPage, filters]);

  useEffect(() => {
    fetchSuggestions();
  }, [fetchSuggestions]);

  return {
    suggestions,
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
    refresh: fetchSuggestions,
  };
}

/**
 * Hook para aprobar/rechazar un incremento de crédito.
 *
 * @example
 * const { decide, isSubmitting } = useCreditDecision();
 * const ok = await decide(7, { decision: "APPROVED", approved_amount: 15000 });
 */
export function useCreditDecision(): UseCreditDecisionReturn {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [validationErrors, setValidationErrors] = useState<Record<string, string[]> | null>(null);

  const decide = useCallback(
    async (
      id: number | string,
      payload: CreditIncreaseDecisionPayload,
    ): Promise<boolean> => {
      setIsSubmitting(true);
      setError(null);
      setValidationErrors(null);

      try {
        await apiClient.post<ActionResponse>(CREDIT_INCREASES.DECIDE(id), payload);
        return true;
      } catch (err) {
        if (err instanceof ApiClientError) {
          setError(err.message);
          setValidationErrors(err.errors ?? null);
        } else {
          setError("Error al procesar decisión de crédito");
        }
        return false;
      } finally {
        setIsSubmitting(false);
      }
    },
    [],
  );

  return { decide, isSubmitting, error, validationErrors };
}

/**
 * Hook para obtener el historial de scores de crédito de una distribuidora.
 *
 * @example
 * const { history, isLoading } = useCreditHistory(42);
 */
export function useCreditHistory(
  distributorId: number | string | null,
): UseCreditHistoryReturn {
  const [history, setHistory] = useState<CreditScoreHistory[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!distributorId) return;

    let cancelled = false;
    setIsLoading(true);
    setError(null);

    (async () => {
      try {
        const response = await apiClient.get<{ data: CreditScoreHistory[] }>(
          DISTRIBUTORS.CREDIT_HISTORY(distributorId),
          { sort: "-evaluation_month" },
        );
        if (!cancelled) setHistory(response.data);
      } catch (err) {
        if (!cancelled) {
          setError(
            err instanceof ApiClientError
              ? err.message
              : "Error al cargar historial",
          );
        }
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [distributorId]);

  return { history, isLoading, error };
}
