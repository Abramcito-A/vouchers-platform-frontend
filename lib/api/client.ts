// ============================================================
// API Client — Fetch wrapper con auth, error handling
// ============================================================
import { API_BASE_URL } from "./endpoints";
import type { ApiError, QueryParams } from "./types";

/**
 * Clave para almacenar el token de Sanctum en localStorage.
 */
const TOKEN_KEY = "vouchers_auth_token";

/**
 * Obtiene el token de autenticación almacenado.
 */
export function getAuthToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(TOKEN_KEY);
}

/**
 * Guarda el token de autenticación.
 */
export function setAuthToken(token: string): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(TOKEN_KEY, token);
}

/**
 * Elimina el token de autenticación.
 */
export function removeAuthToken(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(TOKEN_KEY);
}

/**
 * Construye la URL completa con query params compatibles con
 * spatie/laravel-query-builder (filter[field], sort, include, etc.)
 */
function buildUrl(path: string, params?: QueryParams): string {
  const url = new URL(`${API_BASE_URL}${path}`);

  if (params) {
    for (const [key, value] of Object.entries(params)) {
      if (value !== undefined && value !== null && value !== "") {
        url.searchParams.append(key, String(value));
      }
    }
  }

  return url.toString();
}

/**
 * Error personalizado de API con status y body parseado.
 */
export class ApiClientError extends Error {
  status: number;
  errors?: Record<string, string[]>;
  body: unknown;

  constructor(message: string, status: number, body?: unknown) {
    super(message);
    this.name = "ApiClientError";
    this.status = status;
    this.body = body;

    // Extraer errores de validación de Laravel (422)
    if (body && typeof body === "object" && "errors" in body) {
      this.errors = (body as ApiError).errors;
    }
  }
}

/**
 * Headers por defecto para todas las peticiones.
 */
function getHeaders(customHeaders?: HeadersInit): HeadersInit {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    Accept: "application/json",
  };

  const token = getAuthToken();
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  if (customHeaders) {
    const custom =
      customHeaders instanceof Headers
        ? Object.fromEntries(customHeaders.entries())
        : Array.isArray(customHeaders)
          ? Object.fromEntries(customHeaders)
          : customHeaders;
    Object.assign(headers, custom);
  }

  return headers;
}

/**
 * Procesa la respuesta y lanza error si no es exitosa.
 */
async function handleResponse<T>(response: Response): Promise<T> {
  // 204 No Content
  if (response.status === 204) {
    return undefined as T;
  }

  let body: unknown;
  try {
    body = await response.json();
  } catch {
    // Response sin body JSON válido
    if (!response.ok) {
      throw new ApiClientError(
        response.statusText || "Error de red",
        response.status,
      );
    }
    return undefined as T;
  }

  if (!response.ok) {
    const message =
      body && typeof body === "object" && "message" in body
        ? (body as { message: string }).message
        : `Error ${response.status}`;

    // Si es 401, limpiar token (sesión expirada)
    if (response.status === 401) {
      removeAuthToken();
      // Redirigir al login si estamos en el cliente
      if (typeof window !== "undefined") {
        window.location.href = "/login";
      }
    }

    throw new ApiClientError(message, response.status, body);
  }

  return body as T;
}

// ── Métodos HTTP públicos ─────────────────────────────────

/**
 * GET request.
 *
 * @example
 * const data = await apiClient.get<PaginatedResponse<Application>>(
 *   APPLICATIONS.LIST,
 *   { "filter[status]": "POSIBLE_DISTRIBUIDORA", page: 1, per_page: 15 }
 * );
 */
export async function get<T>(
  path: string,
  params?: QueryParams,
  customHeaders?: HeadersInit,
): Promise<T> {
  const url = buildUrl(path, params);
  const response = await fetch(url, {
    method: "GET",
    headers: getHeaders(customHeaders),
  });
  return handleResponse<T>(response);
}

/**
 * POST request.
 *
 * @example
 * const result = await apiClient.post<ActionResponse>(
 *   APPLICATIONS.DECIDE(42),
 *   { decision: "APROBADA", initial_category_code: "COPPER" }
 * );
 */
export async function post<T>(
  path: string,
  body?: unknown,
  customHeaders?: HeadersInit,
): Promise<T> {
  const url = buildUrl(path);
  const response = await fetch(url, {
    method: "POST",
    headers: getHeaders(customHeaders),
    body: body ? JSON.stringify(body) : undefined,
  });
  return handleResponse<T>(response);
}

/**
 * PUT request.
 *
 * @example
 * const result = await apiClient.put<SingleResponse<BranchSettings>>(
 *   BRANCHES.SETTINGS(3),
 *   { cutoff_day: 15, biweekly_interest_percentage: 2.5 }
 * );
 */
export async function put<T>(
  path: string,
  body?: unknown,
  customHeaders?: HeadersInit,
): Promise<T> {
  const url = buildUrl(path);
  const response = await fetch(url, {
    method: "PUT",
    headers: getHeaders(customHeaders),
    body: body ? JSON.stringify(body) : undefined,
  });
  return handleResponse<T>(response);
}

/**
 * PATCH request.
 */
export async function patch<T>(
  path: string,
  body?: unknown,
  customHeaders?: HeadersInit,
): Promise<T> {
  const url = buildUrl(path);
  const response = await fetch(url, {
    method: "PATCH",
    headers: getHeaders(customHeaders),
    body: body ? JSON.stringify(body) : undefined,
  });
  return handleResponse<T>(response);
}

/**
 * DELETE request.
 */
export async function del<T>(
  path: string,
  customHeaders?: HeadersInit,
): Promise<T> {
  const url = buildUrl(path);
  const response = await fetch(url, {
    method: "DELETE",
    headers: getHeaders(customHeaders),
  });
  return handleResponse<T>(response);
}

/**
 * Namespace export para uso limpio:
 *
 * import * as apiClient from "@/lib/api/client";
 * const data = await apiClient.get<...>(...);
 */
const apiClient = { get, post, put, patch, del };
export default apiClient;
