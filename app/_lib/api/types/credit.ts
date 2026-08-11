// ============================================================
// Types — Crédito, score e incrementos
// ============================================================
import type { CreditIncreaseSuggestionStatus } from "./enums";

/**
 * Historial de score de crédito mensual por distribuidora.
 */
export interface CreditScoreHistory {
  id: number;
  distributor_id: number;
  evaluation_month: string; // "2026-08" formato YYYY-MM
  base_score: number;
  final_score: number;
  factors: CreditScoreFactors;
  suggested_increase: number | null;
  auto_applied: boolean;
  created_at: string;
}

/**
 * Factores que componen el score (almacenados como JSON en el backend).
 */
export interface CreditScoreFactors {
  on_time_payments_ratio: number;
  early_payments_ratio: number;
  late_payments_ratio: number;
  total_vouchers_issued: number;
  months_active: number;
  current_delinquency_rate: number;
  points_accumulated: number;
  [key: string]: number; // factores adicionales dinámicos
}

/**
 * Sugerencia concreta de incremento de línea de crédito.
 * Requiere aprobación del gerente.
 */
export interface CreditIncreaseSuggestion {
  id: number;
  distributor_id: number;
  credit_score_history_id: number;
  status: CreditIncreaseSuggestionStatus;
  current_credit_limit: number;
  suggested_increase_amount: number;
  suggested_new_limit: number;
  reason: string | null;

  // Datos de decisión (populados al aprobar/rechazar)
  decided_by_user_id: number | null;
  decided_at: string | null;
  decision_reason: string | null;
  approved_amount: number | null;

  created_at: string;
  updated_at: string;

  // Relaciones incluídas
  distributor?: {
    id: number;
    person?: { full_name?: string; first_name: string; last_name: string };
    branch?: { id: number; name: string };
    current_points: number;
    credit_limit: number;
    available_credit: number;
    status: string;
  };
  credit_score?: CreditScoreHistory;
  decided_by?: { id: number; username: string };
}

/**
 * Payload para decidir sobre sugerencia de incremento.
 */
export interface CreditIncreaseDecisionPayload {
  decision: "APPROVED" | "REJECTED";
  approved_amount?: number; // puede diferir del sugerido
  reason?: string;
}

/**
 * Movimiento de puntos (point_movements).
 */
export interface PointMovement {
  id: number;
  distributor_id: number;
  movement_type: string;
  points: number;
  balance_after: number;
  voucher_id: number | null;
  cutoff_id: number | null;
  customer_payment_id: number | null;
  description: string | null;
  created_at: string;
}
