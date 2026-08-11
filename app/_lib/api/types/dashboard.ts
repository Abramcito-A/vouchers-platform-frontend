// ============================================================
// Types — Dashboard KPIs y resúmenes
// ============================================================

/**
 * KPIs globales del dashboard del gerente.
 */
export interface DashboardKpis {
  total_branches: number;
  active_distributors: number;
  suspended_distributors: number;
  registered_customers: number;
  new_customers_month: number;
  active_vouchers: number;
  settled_vouchers: number;
  credit_placed: number;
  credit_available: number;
  total_recovered: number;
  delinquent_relations: number;
  pending_requests: number;

  // Variaciones porcentuales (vs período anterior)
  changes: {
    active_distributors: number;
    suspended_distributors: number;
    registered_customers: number;
    new_customers_month: number;
    active_vouchers: number;
    settled_vouchers: number;
    credit_placed: number;
    credit_available: number;
    total_recovered: number;
    delinquent_relations: number;
    pending_requests: number;
  };
}

/**
 * Resumen de sucursal para la vista consolidada.
 */
export interface BranchSummary {
  id: number;
  code: string;
  name: string;
  manager_name: string;
  city: string;
  distributors_count: number;
  customers_count: number;
  active_vouchers_count: number;
  credit_utilized: number;
  credit_total: number;
  recovery_percentage: number;
  traffic_light: "verde" | "amarillo" | "rojo";
}

/**
 * Distribuidora rankeada (top performers o top morosas).
 */
export interface RankedDistributor {
  id: number;
  name: string;
  branch_name: string;
  total_placed: number;
  total_recovered: number;
  earnings: number;
  points: number;
  total_relations: number;
  delinquent_relations: number;
  delinquency_rate: number;
}

/**
 * Datos de comportamiento de préstamos (para gráfica).
 */
export interface LoanBehavior {
  month: string;
  loans_issued: number;
  recovered: number;
  pending: number;
}

/**
 * Alerta del sistema.
 */
export interface SystemAlert {
  id: string;
  severity: "error" | "warning" | "info";
  message: string;
  count: number | null;
  module: string;
  date: string;
}

/**
 * Panel financiero consolidado.
 */
export interface FinancialSummary {
  total_credit_granted: number;
  credit_available: number;
  capital_recovered: number;
  capital_pending: number;
  earnings_month: number;
  earnings_year: number;
  delinquent_amount: number;
  recovered_today: number;
}

/**
 * Actividad reciente para timeline.
 */
export interface RecentActivity {
  id: string;
  type: string;
  actor: string;
  actor_role: string;
  action: string;
  date: string;
  time: string;
}
