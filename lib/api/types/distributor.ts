// ============================================================
// Types — Distribuidoras (distributors)
// ============================================================
import type { DistributorStatus } from "./enums";

/**
 * Distribuidora — entidad operativa del negocio.
 */
export interface Distributor {
  id: number;
  person_id: number;
  application_id: number | null;
  branch_id: number;
  status: DistributorStatus;

  // Línea de crédito
  credit_limit: number;
  available_credit: number;
  unlimited_credit: boolean;

  // Puntos e incentivos
  current_points: number;

  // Banderas operativas
  can_issue_vouchers: boolean;

  // Categoría
  category_code: string | null;

  created_at: string;
  updated_at: string;
  deleted_at: string | null;

  // Relaciones incluídas
  person?: {
    id: number;
    first_name: string;
    last_name: string;
    maiden_name: string | null;
    full_name?: string;
    phone: string | null;
    mobile: string | null;
  };
  branch?: { id: number; name: string; code: string };
  category?: DistributorCategory;

  // Datos calculados (en endpoints de resumen)
  active_vouchers_count?: number;
  total_customers?: number;
  delinquent_customers?: number;
  delinquency_rate?: number;
  total_placed?: number;
  total_recovered?: number;
  earnings?: number;
}

/**
 * Categoría de distribuidora (distributor_categories).
 */
export interface DistributorCategory {
  id: number;
  code: string;
  name: string;
  commission_percentage: number;
  points_per_1200: number;
  late_penalty_percentage: number;
  created_at: string;
  updated_at: string;
}
