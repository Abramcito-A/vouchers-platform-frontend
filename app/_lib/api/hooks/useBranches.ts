// ============================================================
// Hook — useBranches: sucursales y configuración
// ============================================================
"use client";

import { useState, useEffect, useCallback } from "react";
import * as apiClient from "../client";
import { BRANCHES } from "../endpoints";
import { ApiClientError } from "../client";
import type {
  Branch,
  BranchSettings,
  BranchSettingsLog,
  UpdateBranchSettingsPayload,
  PaginatedResponse,
  SingleResponse,
  QueryParams,
} from "../types";

interface UseBranchesReturn {
  branches: Branch[];
  isLoading: boolean;
  error: string | null;
  refresh: () => void;
}

interface UseBranchDetailReturn {
  branch: Branch | null;
  isLoading: boolean;
  error: string | null;
  refresh: () => void;
}

interface UseBranchSettingsReturn {
  settings: BranchSettings | null;
  logs: BranchSettingsLog[];
  isLoading: boolean;
  error: string | null;
  updateSettings: (payload: UpdateBranchSettingsPayload) => Promise<boolean>;
  isUpdating: boolean;
  updateError: string | null;
  validationErrors: Record<string, string[]> | null;
  refresh: () => void;
}

/**
 * Hook para listar sucursales.
 *
 * @example
 * const { branches, isLoading } = useBranches();
 */
export function useBranches(): UseBranchesReturn {
  const [branches, setBranches] = useState<Branch[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchBranches = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await apiClient.get<PaginatedResponse<Branch>>(
        BRANCHES.LIST,
        { per_page: 100, include: "settings" },
      );
      setBranches(response.data);
    } catch (err) {
      setError(
        err instanceof ApiClientError
          ? err.message
          : "Error al cargar sucursales",
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBranches();
  }, [fetchBranches]);

  return { branches, isLoading, error, refresh: fetchBranches };
}

/**
 * Hook para obtener detalle de una sucursal.
 *
 * @example
 * const { branch, isLoading } = useBranchDetail(3);
 */
export function useBranchDetail(
  id: number | string | null,
): UseBranchDetailReturn {
  const [branch, setBranch] = useState<Branch | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchBranch = useCallback(async () => {
    if (!id) return;

    setIsLoading(true);
    setError(null);

    try {
      const response = await apiClient.get<SingleResponse<Branch>>(
        BRANCHES.DETAIL(id),
        { include: "settings" },
      );
      setBranch(response.data);
    } catch (err) {
      setError(
        err instanceof ApiClientError
          ? err.message
          : "Error al cargar sucursal",
      );
    } finally {
      setIsLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchBranch();
  }, [fetchBranch]);

  return { branch, isLoading, error, refresh: fetchBranch };
}

/**
 * Hook para gestionar la configuración financiera de una sucursal.
 * Incluye lectura de settings + logs de cambios + actualización.
 *
 * Este hook es exclusivo del branch_manager.
 *
 * @example
 * const { settings, logs, updateSettings, isUpdating } = useBranchSettings(3);
 * const ok = await updateSettings({ cutoff_day: 15 });
 */
export function useBranchSettings(
  branchId: number | string | null,
): UseBranchSettingsReturn {
  const [settings, setSettings] = useState<BranchSettings | null>(null);
  const [logs, setLogs] = useState<BranchSettingsLog[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [isUpdating, setIsUpdating] = useState(false);
  const [updateError, setUpdateError] = useState<string | null>(null);
  const [validationErrors, setValidationErrors] = useState<Record<string, string[]> | null>(null);

  const fetchSettings = useCallback(async () => {
    if (!branchId) return;

    setIsLoading(true);
    setError(null);

    try {
      const [settingsRes, logsRes] = await Promise.all([
        apiClient.get<SingleResponse<BranchSettings>>(BRANCHES.SETTINGS(branchId)),
        apiClient
          .get<PaginatedResponse<BranchSettingsLog>>(
            BRANCHES.SETTINGS_LOGS(branchId),
            { sort: "-created_at", per_page: 50, include: "changed_by" } as QueryParams,
          )
          .catch(() => ({ data: [] as BranchSettingsLog[] })),
      ]);

      setSettings(settingsRes.data);
      setLogs(logsRes.data);
    } catch (err) {
      setError(
        err instanceof ApiClientError
          ? err.message
          : "Error al cargar configuración",
      );
    } finally {
      setIsLoading(false);
    }
  }, [branchId]);

  useEffect(() => {
    fetchSettings();
  }, [fetchSettings]);

  const updateSettings = useCallback(
    async (payload: UpdateBranchSettingsPayload): Promise<boolean> => {
      if (!branchId) return false;

      setIsUpdating(true);
      setUpdateError(null);
      setValidationErrors(null);

      try {
        const response = await apiClient.put<SingleResponse<BranchSettings>>(
          BRANCHES.SETTINGS(branchId),
          payload,
        );
        setSettings(response.data);
        // Refrescar logs para incluir el cambio recién hecho
        await fetchSettings();
        return true;
      } catch (err) {
        if (err instanceof ApiClientError) {
          setUpdateError(err.message);
          setValidationErrors(err.errors ?? null);
        } else {
          setUpdateError("Error al actualizar configuración");
        }
        return false;
      } finally {
        setIsUpdating(false);
      }
    },
    [branchId, fetchSettings],
  );

  return {
    settings,
    logs,
    isLoading,
    error,
    updateSettings,
    isUpdating,
    updateError,
    validationErrors,
    refresh: fetchSettings,
  };
}
