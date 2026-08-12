// ============================================================
// Types — Solicitudes (applications) y verificaciones
// ============================================================
import type { ApplicationStatus, ManagerDecisionType } from "./enums";

/**
 * Persona (base de datos `people`).
 * Es la entidad genérica de la que cuelgan users, distributors y applicants.
 */
export interface Person {
  id: number;
  first_name: string;
  last_name: string;
  maiden_name: string | null;
  curp: string | null;
  rfc: string | null;
  phone: string | null;
  mobile: string | null;
  email: string | null;
  street: string | null;
  exterior_number: string | null;
  interior_number: string | null;
  neighborhood: string | null;
  city: string | null;
  state: string | null;
  zip_code: string | null;
  birth_date: string | null;
  created_at: string;
  updated_at: string;

  // Nombre completo calculado (si el backend lo incluye)
  full_name?: string;
}

/**
 * Solicitud de alta de distribuidora.
 * Flujo: PRE → MODIFICADA → EN_REVISION → VERIFICADA → POSIBLE_DISTRIBUIDORA → APROBADA/RECHAZADA
 */
export interface Application {
  id: number;
  applicant_person_id: number;
  branch_id: number;
  status: ApplicationStatus;

  // Datos capturados (JSON flexibles)
  family_data: Record<string, unknown> | null;
  external_affiliations: Record<string, unknown> | null;
  vehicles: Record<string, unknown> | null;

  // Documentos (URLs o paths)
  ine_front_url: string | null;
  ine_back_url: string | null;
  proof_of_address_url: string | null;
  credit_bureau_url: string | null;

  // Categoría asignada al aprobar
  initial_category_code: string | null;

  // Actores del flujo
  captured_by_user_id: number | null;
  coordinator_user_id: number | null;
  assigned_verifier_user_id: number | null;

  created_at: string;
  updated_at: string;
  deleted_at: string | null;

  // Relaciones incluídas (si se usa ?include=)
  applicant?: Person;
  branch?: { id: number; name: string; code: string };
  verification?: ApplicationVerification;
  captured_by?: { id: number; username: string };
  coordinator?: { id: number; username: string };
  verifier?: { id: number; username: string };
}

/**
 * Verificación domiciliaria/física de una solicitud.
 */
export interface ApplicationVerification {
  id: number;
  application_id: number;
  verifier_user_id: number;

  // Resultado de la visita
  checklist: Record<string, boolean> | null;
  observations: string | null;

  // Evidencia fotográfica (URLs)
  photo_urls: string[] | null;

  // Geolocalización
  latitude: number | null;
  longitude: number | null;
  declared_latitude: number | null;
  declared_longitude: number | null;
  distance_meters: number | null;

  verification_date: string;
  created_at: string;
  updated_at: string;

  verifier?: { id: number; username: string };
}

/**
 * Log de decisión del gerente (manager_decision_logs).
 */
export interface ManagerDecisionLog {
  id: number;
  manager_user_id: number;
  decision_type: ManagerDecisionType;
  related_type: string; // "Application" | "Distributor" | etc.
  related_id: number;
  decision: "APROBADA" | "RECHAZADA";
  reason: string | null;
  amount_before: number | null;
  amount_after: number | null;
  created_at: string;

  manager?: { id: number; username: string };
}

/**
 * Payload para aprobar/rechazar solicitud.
 */
export interface ApplicationDecisionPayload {
  decision: "APROBADA" | "RECHAZADA";
  reason?: string;
  initial_category_code?: string;
}
