// ============================================================
// Types — Cortes (cutoffs), relaciones y conciliaciones
// ============================================================
import type { CutoffStatus, CutoffType, DistributorPaymentStatus } from "./enums";

/**
 * Corte programado por sucursal.
 */
export interface Cutoff {
  id: number;
  branch_id: number;
  type: CutoffType;
  status: CutoffStatus;
  scheduled_date: string;
  executed_date: string | null;
  closed_date: string | null;
  created_at: string;
  updated_at: string;

  // Relaciones incluídas
  branch?: { id: number; name: string; code: string };

  // Datos calculados
  relations_count?: number;
  total_commission?: number;
  total_to_pay?: number;
  total_surcharges?: number;
}

/**
 * Relación de corte por distribuidora dentro de un corte.
 */
export interface CutoffRelation {
  id: number;
  cutoff_id: number;
  distributor_id: number;
  previous_relation_id: number | null;

  // Snapshot al momento del corte
  credit_limit_snapshot: number;
  points_snapshot: number;

  // Totales
  total_commission: number;
  total_to_pay: number;
  total_surcharges: number;

  // Referencia de pago
  payment_reference: string | null;
  payment_deadline: string | null;
  early_payment_deadline: string | null;

  // Arrastre
  total_carryover_received: number;

  created_at: string;
  updated_at: string;

  // Relaciones
  distributor?: {
    id: number;
    person?: { full_name?: string; first_name: string; last_name: string };
  };
  items?: CutoffRelationItem[];
}

/**
 * Detalle línea por línea (por vale) dentro de una relación de corte.
 */
export interface CutoffRelationItem {
  id: number;
  cutoff_relation_id: number;
  voucher_id: number;
  commission: number;
  payment: number;
  surcharge: number;
  installment_number: number;
  total_installments: number;
  is_late_payment: boolean;
  accumulated_late_installments: number;
  origin_relation_item_id: number | null;
  created_at: string;
}

/**
 * Pago reportado por la distribuidora contra un corte.
 */
export interface DistributorPayment {
  id: number;
  cutoff_relation_id: number;
  cutoff_relation_item_id: number | null;
  amount: number;
  status: DistributorPaymentStatus;
  payment_date: string;
  vouchers_breakdown: Record<string, number> | null;
  created_at: string;
  updated_at: string;
}

/**
 * Transacción bancaria real (importada).
 */
export interface BankTransaction {
  id: number;
  bank_account_id: number;
  transaction_date: string;
  amount: number;
  reference: string | null;
  description: string | null;
  created_at: string;
}

/**
 * Conciliación entre pago reportado y transacción bancaria.
 */
export interface Reconciliation {
  id: number;
  distributor_payment_id: number;
  bank_transaction_id: number;
  reported_amount: number;
  actual_amount: number;
  difference: number;
  status: "PENDING" | "RECONCILED" | "DISCREPANCY" | "RESOLVED";
  resolved_by_user_id: number | null;
  resolution_notes: string | null;
  created_at: string;
  updated_at: string;

  // Relaciones
  distributor_payment?: DistributorPayment;
  bank_transaction?: BankTransaction;
  resolved_by?: { id: number; username: string };
}
