// ============================================================
// Tipos genéricos de respuestas API — Laravel pagination format
// ============================================================

/**
 * Respuesta paginada estándar de Laravel (LengthAwarePaginator).
 * Todas las listas del backend usan este formato.
 */
export interface PaginatedResponse<T> {
  data: T[];
  meta: PaginationMeta;
  links: PaginationLinks;
}

export interface PaginationMeta {
  current_page: number;
  from: number | null;
  last_page: number;
  per_page: number;
  to: number | null;
  total: number;
  path: string;
  links: PaginationLink[];
}

export interface PaginationLink {
  url: string | null;
  label: string;
  active: boolean;
}

export interface PaginationLinks {
  first: string;
  last: string;
  prev: string | null;
  next: string | null;
}

/**
 * Respuesta simple (sin paginación) — wrapping estándar de Laravel.
 */
export interface SingleResponse<T> {
  data: T;
}

/**
 * Respuesta de acción exitosa (approve, reject, etc.)
 */
export interface ActionResponse {
  success: boolean;
  message: string;
}

/**
 * Error de validación de Laravel (422).
 */
export interface ValidationError {
  message: string;
  errors: Record<string, string[]>;
}

/**
 * Error genérico de API.
 */
export interface ApiError {
  message: string;
  status: number;
  errors?: Record<string, string[]>;
}

/**
 * Parámetros de query para listados con spatie/laravel-query-builder.
 * Soporta filtros dinámicos, ordenamiento, includes y paginación.
 */
export interface QueryParams {
  page?: number;
  per_page?: number;
  sort?: string;
  include?: string;
  "filter[status]"?: string;
  "filter[branch_id]"?: string | number;
  "filter[search]"?: string;
  [key: string]: string | number | boolean | undefined;
}
