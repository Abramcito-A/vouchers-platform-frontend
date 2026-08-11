// ============================================================
// Hook — useApplications: solicitudes del gerente
// ============================================================
"use client";

import { useState, useEffect, useCallback } from "react";
import * as apiClient from "../client";
import { APPLICATIONS, MANAGER_DECISIONS } from "../endpoints";
import { ApiClientError } from "../client";
import type {
  Application,
  ApplicationVerification,
  ApplicationDecisionPayload,
  ManagerDecisionLog,
  PaginatedResponse,
  ActionResponse,
  QueryParams,
} from "../types";
import { ApplicationStatus } from "../types";

// ── Importar mock data como fallback ──────────────────────
import { solicitudesData } from "../../mock-data";

interface UseApplicationsReturn {
  applications: Application[];
  totalCount: number;
  currentPage: number;
  lastPage: number;
  isLoading: boolean;
  error: string | null;
  isMock: boolean;
  setPage: (page: number) => void;
  setFilters: (filters: Partial<QueryParams>) => void;
  refresh: () => void;
}

interface UseApplicationDetailReturn {
  application: Application | null;
  verification: ApplicationVerification | null;
  isLoading: boolean;
  error: string | null;
}

interface UseApplicationDecisionReturn {
  decide: (id: number | string, payload: ApplicationDecisionPayload) => Promise<boolean>;
  isSubmitting: boolean;
  error: string | null;
  validationErrors: Record<string, string[]> | null;
}

interface UseDecisionLogsReturn {
  logs: ManagerDecisionLog[];
  isLoading: boolean;
  error: string | null;
  isMock: boolean;
  refresh: () => void;
}

/**
 * Hook para listar solicitudes pendientes de decisión del gerente.
 *
 * Por defecto filtra por status=POSIBLE_DISTRIBUIDORA (listas para decisión).
 *
 * @example
 * const { applications, isLoading, setPage, setFilters } = useApplications();
 * // Filtrar solo aprobadas:
 * setFilters({ "filter[status]": "APROBADA" });
 */
export function useApplications(
  initialFilters?: Partial<QueryParams>,
): UseApplicationsReturn {
  const [applications, setApplications] = useState<Application[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isMock, setIsMock] = useState(false);
  const [filters, setFiltersState] = useState<Partial<QueryParams>>(
    initialFilters ?? {
      "filter[status]": ApplicationStatus.POSIBLE_DISTRIBUIDORA,
    },
  );

  const fetchApplications = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const params: QueryParams = {
        page: currentPage,
        per_page: 15,
        sort: "-created_at",
        include: "applicant,branch,coordinator,verifier",
        ...filters,
      };

      const response = await apiClient.get<PaginatedResponse<Application>>(
        APPLICATIONS.LIST,
        params,
      );

      setApplications(response.data);
      setTotalCount(response.meta.total);
      setLastPage(response.meta.last_page);
      setIsMock(false);
    } catch {
      // Fallback a mock data
      console.warn("[useApplications] API no disponible, usando mock data.");
      const mockApps: Application[] = solicitudesData.map((s, i) => ({
        id: i + 1,
        applicant_person_id: i + 100,
        branch_id: i + 1,
        status: ApplicationStatus.POSIBLE_DISTRIBUIDORA,
        family_data: null,
        external_affiliations: null,
        vehicles: null,
        ine_front_url: null,
        ine_back_url: null,
        proof_of_address_url: null,
        credit_bureau_url: null,
        initial_category_code: null,
        captured_by_user_id: null,
        coordinator_user_id: null,
        assigned_verifier_user_id: null,
        created_at: s.fecha,
        updated_at: s.fecha,
        deleted_at: null,
        applicant: {
          id: i + 100,
          first_name: s.solicitante.split(" ")[1] ?? s.solicitante,
          last_name: s.solicitante.split(" ")[0] ?? "",
          maiden_name: null,
          curp: null,
          rfc: null,
          phone: null,
          mobile: null,
          email: null,
          street: null,
          exterior_number: null,
          interior_number: null,
          neighborhood: null,
          city: null,
          state: null,
          zip_code: null,
          birth_date: null,
          created_at: s.fecha,
          updated_at: s.fecha,
          full_name: s.solicitante,
        },
        branch: { id: i + 1, name: s.sucursal, code: `S0${i + 1}` },
      }));

      setApplications(mockApps);
      setTotalCount(mockApps.length);
      setLastPage(1);
      setIsMock(true);
    } finally {
      setIsLoading(false);
    }
  }, [currentPage, filters]);

  useEffect(() => {
    fetchApplications();
  }, [fetchApplications]);

  const setPage = useCallback((page: number) => {
    setCurrentPage(page);
  }, []);

  const setFilters = useCallback((newFilters: Partial<QueryParams>) => {
    setFiltersState((prev) => ({ ...prev, ...newFilters }));
    setCurrentPage(1); // Reset a primera página al cambiar filtros
  }, []);

  return {
    applications,
    totalCount,
    currentPage,
    lastPage,
    isLoading,
    error,
    isMock,
    setPage,
    setFilters,
    refresh: fetchApplications,
  };
}

/**
 * Hook para obtener el detalle de una solicitud + su verificación.
 *
 * @example
 * const { application, verification, isLoading } = useApplicationDetail(42);
 */
export function useApplicationDetail(
  id: number | string | null,
): UseApplicationDetailReturn {
  const [application, setApplication] = useState<Application | null>(null);
  const [verification, setVerification] = useState<ApplicationVerification | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    let cancelled = false;
    setIsLoading(true);
    setError(null);

    (async () => {
      try {
        const [app, verif] = await Promise.all([
          apiClient.get<{ data: Application }>(APPLICATIONS.DETAIL(id), {
            include: "applicant,branch,coordinator,verifier,verification",
          }),
          apiClient
            .get<{ data: ApplicationVerification }>(APPLICATIONS.VERIFICATION(id))
            .catch(() => null),
        ]);

        if (!cancelled) {
          setApplication(app.data);
          setVerification(verif?.data ?? app.data.verification ?? null);
        }
      } catch (err) {
        if (!cancelled) {
          setError(
            err instanceof ApiClientError
              ? err.message
              : "Error al cargar solicitud",
          );
        }
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [id]);

  return { application, verification, isLoading, error };
}

/**
 * Hook para aprobar/rechazar una solicitud.
 *
 * @example
 * const { decide, isSubmitting } = useApplicationDecision();
 * const ok = await decide(42, { decision: "APROBADA", initial_category_code: "COPPER" });
 */
export function useApplicationDecision(): UseApplicationDecisionReturn {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [validationErrors, setValidationErrors] = useState<Record<string, string[]> | null>(null);

  const decide = useCallback(
    async (
      id: number | string,
      payload: ApplicationDecisionPayload,
    ): Promise<boolean> => {
      setIsSubmitting(true);
      setError(null);
      setValidationErrors(null);

      try {
        await apiClient.post<ActionResponse>(APPLICATIONS.DECIDE(id), payload);
        return true;
      } catch (err) {
        if (err instanceof ApiClientError) {
          setError(err.message);
          setValidationErrors(err.errors ?? null);
        } else {
          setError("Error al procesar decisión");
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
 * Hook para obtener la bitácora de decisiones del gerente.
 *
 * @example
 * const { logs, isLoading } = useDecisionLogs();
 */
export function useDecisionLogs(): UseDecisionLogsReturn {
  const [logs, setLogs] = useState<ManagerDecisionLog[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isMock, setIsMock] = useState(false);

  const fetchLogs = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await apiClient.get<PaginatedResponse<ManagerDecisionLog>>(
        MANAGER_DECISIONS.LIST,
        { sort: "-created_at", per_page: 50, include: "manager" },
      );
      setLogs(response.data);
      setIsMock(false);
    } catch {
      console.warn("[useDecisionLogs] API no disponible.");
      setLogs([]);
      setIsMock(true);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchLogs();
  }, [fetchLogs]);

  return { logs, isLoading, error, isMock, refresh: fetchLogs };
}
