// ============================================================
// Enums de estatus — Alineados al backend Laravel
// ============================================================

// ── Solicitudes (applications) ────────────────────────────
export enum ApplicationStatus {
  PRE = "PRE",
  MODIFICADA = "MODIFICADA",
  EN_REVISION = "EN_REVISION",
  VERIFICADA = "VERIFICADA",
  POSIBLE_DISTRIBUIDORA = "POSIBLE_DISTRIBUIDORA",
  APROBADA = "APROBADA",
  RECHAZADA = "RECHAZADA",
}

export const APPLICATION_STATUS_LABELS: Record<ApplicationStatus, string> = {
  [ApplicationStatus.PRE]: "Pre-registro",
  [ApplicationStatus.MODIFICADA]: "Modificada",
  [ApplicationStatus.EN_REVISION]: "En revisión",
  [ApplicationStatus.VERIFICADA]: "Verificada",
  [ApplicationStatus.POSIBLE_DISTRIBUIDORA]: "Posible distribuidora",
  [ApplicationStatus.APROBADA]: "Aprobada",
  [ApplicationStatus.RECHAZADA]: "Rechazada",
};

// ── Distribuidoras ────────────────────────────────────────
export enum DistributorStatus {
  CANDIDATA = "CANDIDATA",
  POSIBLE = "POSIBLE",
  ACTIVA = "ACTIVA",
  INACTIVA = "INACTIVA",
  MOROSA = "MOROSA",
  BLOQUEADA = "BLOQUEADA",
  CERRADA = "CERRADA",
}

export const DISTRIBUTOR_STATUS_LABELS: Record<DistributorStatus, string> = {
  [DistributorStatus.CANDIDATA]: "Candidata",
  [DistributorStatus.POSIBLE]: "Posible",
  [DistributorStatus.ACTIVA]: "Activa",
  [DistributorStatus.INACTIVA]: "Inactiva",
  [DistributorStatus.MOROSA]: "Morosa",
  [DistributorStatus.BLOQUEADA]: "Bloqueada",
  [DistributorStatus.CERRADA]: "Cerrada",
};

// ── Clientes ──────────────────────────────────────────────
export enum CustomerStatus {
  EN_VERIFICACION = "EN_VERIFICACION",
  ACTIVO = "ACTIVO",
  BLOQUEADO = "BLOQUEADO",
  MOROSO = "MOROSO",
  INACTIVO = "INACTIVO",
}

// ── Vales (vouchers) ──────────────────────────────────────
export enum VoucherStatus {
  BORRADOR = "BORRADOR",
  APROBADO = "APROBADO",
  TRANSFERIDO = "TRANSFERIDO",
  ACTIVO = "ACTIVO",
  PAGO_PARCIAL = "PAGO_PARCIAL",
  PAGADO = "PAGADO",
  LIQUIDADO = "LIQUIDADO",
  MOROSO = "MOROSO",
  RECLAMADO = "RECLAMADO",
  CANCELADO = "CANCELADO",
  REVERSADO = "REVERSADO",
}

// ── Cortes (cutoffs) ──────────────────────────────────────
export enum CutoffStatus {
  PROGRAMADO = "PROGRAMADO",
  EJECUTADO = "EJECUTADO",
  CERRADO = "CERRADO",
  REPROCESADO = "REPROCESADO",
}

export enum CutoffType {
  PAGOS = "PAGOS",
  PUNTOS = "PUNTOS",
  MIXTO = "MIXTO",
}

// ── Pagos de distribuidora ────────────────────────────────
export enum DistributorPaymentStatus {
  REPORTED = "REPORTED",
  DETECTED = "DETECTED",
  RECONCILED = "RECONCILED",
  REJECTED = "REJECTED",
}

// ── Transferencia de clientes ─────────────────────────────
export enum CustomerTransferStatus {
  PENDIENTE_COORDINADOR = "PENDIENTE_COORDINADOR",
  APROBADA_CODIGO_EMITIDO = "APROBADA_CODIGO_EMITIDO",
  EJECUTADA = "EJECUTADA",
  RECHAZADA = "RECHAZADA",
  CANCELADA = "CANCELADA",
  EXPIRADA = "EXPIRADA",
}

// ── Solicitudes de contraseña ─────────────────────────────
export enum PasswordRequestStatus {
  PENDIENTE = "PENDIENTE",
  APROBADA = "APROBADA",
  RECHAZADA = "RECHAZADA",
  EXPIRADA = "EXPIRADA",
}

// ── Roles del sistema ─────────────────────────────────────
export enum UserRole {
  ADMINISTRATOR = "administrator",
  GENERAL_MANAGER = "general_manager",
  BRANCH_MANAGER = "branch_manager",
  COORDINATOR = "coordinator",
  VERIFIER = "verifier",
  CASHIER = "cashier",
  DISTRIBUTOR = "distributor",
}

export const USER_ROLE_LABELS: Record<UserRole, string> = {
  [UserRole.ADMINISTRATOR]: "Administrador",
  [UserRole.GENERAL_MANAGER]: "Gerente General",
  [UserRole.BRANCH_MANAGER]: "Gerente de Sucursal",
  [UserRole.COORDINATOR]: "Coordinador",
  [UserRole.VERIFIER]: "Verificador",
  [UserRole.CASHIER]: "Cajera",
  [UserRole.DISTRIBUTOR]: "Distribuidora",
};

// ── Canales de login ──────────────────────────────────────
export enum LoginChannel {
  WEB = "WEB",
  VPN_WEB = "VPN_WEB",
  MOVIL = "MOVIL",
}

// ── Cuentas bancarias (polimórfico) ───────────────────────
export enum BankAccountOwnerType {
  PERSONA = "PERSONA",
  DISTRIBUIDORA = "DISTRIBUIDORA",
  EMPRESA = "EMPRESA",
}

// ── Movimientos de puntos ─────────────────────────────────
export enum PointMovementType {
  GANADO_ANTICIPADO = "GANADO_ANTICIPADO",
  GANADO_PUNTUAL = "GANADO_PUNTUAL",
  PENALIZACION_ATRASO = "PENALIZACION_ATRASO",
  AJUSTE_MANUAL = "AJUSTE_MANUAL",
  REVERSO = "REVERSO",
  CANJE = "CANJE",
}

// ── Decisiones del gerente ────────────────────────────────
export enum ManagerDecisionType {
  ALTA_DISTRIBUIDORA = "ALTA_DISTRIBUIDORA",
  INCREMENTO_CREDITO = "INCREMENTO_CREDITO",
  APROBACION = "APROBACION",
  RECHAZO = "RECHAZO",
}

// ── Sugerencias de incremento ─────────────────────────────
export enum CreditIncreaseSuggestionStatus {
  PENDING = "PENDING",
  APPROVED = "APPROVED",
  REJECTED = "REJECTED",
}
