// ============================================================
// Barrel export — Todos los types de API
// ============================================================

// Enums
export * from "./enums";

// Respuestas genéricas
export type {
  PaginatedResponse,
  PaginationMeta,
  PaginationLinks,
  PaginationLink,
  SingleResponse,
  ActionResponse,
  ValidationError,
  ApiError,
  QueryParams,
} from "./api-responses";

// Solicitudes (applications)
export type {
  Person,
  Application,
  ApplicationVerification,
  ManagerDecisionLog,
  ApplicationDecisionPayload,
} from "./application";

// Sucursales
export type {
  Branch,
  BranchSettings,
  BranchSettingsLog,
  UpdateBranchSettingsPayload,
} from "./branch";

// Distribuidoras
export type {
  Distributor,
  DistributorCategory,
} from "./distributor";

// Crédito e incentivos
export type {
  CreditScoreHistory,
  CreditScoreFactors,
  CreditIncreaseSuggestion,
  CreditIncreaseDecisionPayload,
  PointMovement,
} from "./credit";

// Cortes y conciliaciones
export type {
  Cutoff,
  CutoffRelation,
  CutoffRelationItem,
  DistributorPayment,
  BankTransaction,
  Reconciliation,
} from "./cutoff";

// Dashboard
export type {
  DashboardKpis,
  BranchSummary,
  RankedDistributor,
  LoanBehavior,
  SystemAlert,
  FinancialSummary,
  RecentActivity,
} from "./dashboard";
