// ============================================================
// Constantes de endpoints API — Gerente
// ============================================================

/**
 * Base URL de la API. Se lee de la variable de entorno
 * NEXT_PUBLIC_API_URL, con fallback a localhost.
 */
export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000/api";

// ── Auth ──────────────────────────────────────────────────
export const AUTH = {
  LOGIN: "/auth/login",
  LOGOUT: "/auth/logout",
  ME: "/auth/me",
  REFRESH: "/auth/refresh",
} as const;

// ── Dashboard ─────────────────────────────────────────────
export const DASHBOARD = {
  KPIS: "/dashboard/kpis",
  BRANCHES_SUMMARY: "/dashboard/branches-summary",
  TOP_DISTRIBUTORS: "/dashboard/top-distributors",
  DELINQUENT_DISTRIBUTORS: "/dashboard/delinquent-distributors",
  LOAN_BEHAVIOR: "/dashboard/loan-behavior",
  ALERTS: "/dashboard/alerts",
  FINANCIAL_SUMMARY: "/dashboard/financial-summary",
  RECENT_ACTIVITY: "/dashboard/recent-activity",
} as const;

// ── Solicitudes (Applications) ────────────────────────────
export const APPLICATIONS = {
  LIST: "/applications",
  DETAIL: (id: number | string) => `/applications/${id}`,
  VERIFICATION: (id: number | string) => `/applications/${id}/verification`,
  DECIDE: (id: number | string) => `/applications/${id}/decide`,
} as const;

// ── Decisiones del gerente ────────────────────────────────
export const MANAGER_DECISIONS = {
  LIST: "/manager-decision-logs",
} as const;

// ── Incrementos de crédito ────────────────────────────────
export const CREDIT_INCREASES = {
  LIST: "/credit-increase-suggestions",
  DETAIL: (id: number | string) => `/credit-increase-suggestions/${id}`,
  DECIDE: (id: number | string) => `/credit-increase-suggestions/${id}/decide`,
} as const;

// ── Distribuidoras ────────────────────────────────────────
export const DISTRIBUTORS = {
  LIST: "/distributors",
  DETAIL: (id: number | string) => `/distributors/${id}`,
  CREDIT_HISTORY: (id: number | string) => `/distributors/${id}/credit-history`,
} as const;

// ── Sucursales ────────────────────────────────────────────
export const BRANCHES = {
  LIST: "/branches",
  DETAIL: (id: number | string) => `/branches/${id}`,
  SETTINGS: (id: number | string) => `/branches/${id}/settings`,
  SETTINGS_LOGS: (id: number | string) => `/branches/${id}/settings/logs`,
  USERS: (id: number | string) => `/branches/${id}/users`,
  DISTRIBUTORS: (id: number | string) => `/branches/${id}/distributors`,
} as const;

// ── Cortes ────────────────────────────────────────────────
export const CUTOFFS = {
  LIST: "/cutoffs",
  DETAIL: (id: number | string) => `/cutoffs/${id}`,
  RELATIONS: (id: number | string) => `/cutoffs/${id}/relations`,
} as const;

// ── Relaciones de corte ───────────────────────────────────
export const CUTOFF_RELATIONS = {
  ITEMS: (id: number | string) => `/cutoff-relations/${id}/items`,
} as const;

// ── Conciliaciones ────────────────────────────────────────
export const RECONCILIATIONS = {
  LIST: "/reconciliations",
  RESOLVE: (id: number | string) => `/reconciliations/${id}/resolve`,
} as const;

// ── Reportes ──────────────────────────────────────────────
export const REPORTS = {
  MONTHLY: "/reports/monthly",
} as const;

// ── Auditoría ─────────────────────────────────────────────
export const AUDIT = {
  LOGS: "/audit-logs",
} as const;
