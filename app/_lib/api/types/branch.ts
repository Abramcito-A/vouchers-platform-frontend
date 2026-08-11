// ============================================================
// Types — Sucursales (branches) y configuración
// ============================================================

/**
 * Sucursal de la empresa.
 */
export interface Branch {
  id: number;
  code: string;
  name: string;
  address: string | null;
  phone: string | null;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;

  // Relaciones incluídas
  settings?: BranchSettings;

  // Datos calculados (si el backend los incluye en summary endpoints)
  distributors_count?: number;
  customers_count?: number;
  active_vouchers_count?: number;
  credit_utilized?: number;
  credit_total?: number;
  recovery_percentage?: number;
}

/**
 * Configuración financiera de una sucursal (branch_settings).
 * Editable por el branch_manager.
 */
export interface BranchSettings {
  id: number;
  branch_id: number;

  // Configuración de cortes
  cutoff_day: number; // día del mes
  payment_frequency: string; // "QUINCENAL" etc.

  // Configuración financiera
  opening_commission_percentage: number;
  biweekly_interest_percentage: number;
  late_penalty_percentage: number;
  auto_increment_threshold: number | null;

  created_at: string;
  updated_at: string;
}

/**
 * Log de cambios en configuración de sucursal.
 */
export interface BranchSettingsLog {
  id: number;
  branch_settings_id: number;
  changed_by_user_id: number;
  field_changed: string;
  old_value: string | null;
  new_value: string | null;
  created_at: string;

  changed_by?: { id: number; username: string };
}

/**
 * Payload para actualizar configuración de sucursal.
 */
export interface UpdateBranchSettingsPayload {
  cutoff_day?: number;
  payment_frequency?: string;
  opening_commission_percentage?: number;
  biweekly_interest_percentage?: number;
  late_penalty_percentage?: number;
  auto_increment_threshold?: number | null;
}
