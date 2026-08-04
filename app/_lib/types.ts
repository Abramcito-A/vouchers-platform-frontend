// ============================================================
// MIS VALES — TypeScript Interfaces & Types
// ============================================================

export interface KpiCardData {
  id: string;
  title: string;
  value: string | number;
  change: number; // porcentaje de variación (+/-)
  icon: string; // nombre del icono
  color: "blue" | "green" | "red" | "amber" | "purple" | "indigo" | "teal";
  prefix?: string; // "$" para montos
  suffix?: string; // "%" para porcentajes
}

export interface Sucursal {
  id: string;
  nombre: string;
  gerente: string;
  distribuidoras: number;
  clientes: number;
  valesActivos: number;
  creditoUtilizado: number;
  creditoTotal: number;
  porcentajeRecuperacion: number;
  semaforo: "verde" | "amarillo" | "rojo";
  ciudad: string;
}

export interface Solicitud {
  id: string;
  fecha: string;
  tipo:
    | "Nueva distribuidora"
    | "Incremento de crédito"
    | "Cambio de sucursal"
    | "Cambio de distribuidora"
    | "Edición de información"
    | "Conciliación manual";
  solicitante: string;
  sucursal: string;
  estado: "Pendiente" | "En revisión" | "Aprobada" | "Rechazada";
  prioridad: "Alta" | "Media" | "Baja";
}

export interface AlertItem {
  id: string;
  tipo: "error" | "warning" | "info";
  mensaje: string;
  cantidad?: number;
  modulo: string;
  fecha: string;
}

export interface Distribuidor {
  id: string;
  nombre: string;
  sucursal: string;
  colocacion: number;
  recuperacion: number;
  ganancia: number;
  puntos: number;
  relaciones: number;
  morosas: number;
  porcentajeMora: number;
}

export interface ActivityItem {
  id: string;
  tipo:
    | "registro"
    | "autorizacion"
    | "conciliacion"
    | "liquidacion"
    | "visita"
    | "suspension"
    | "incremento";
  actor: string;
  rolActor: string;
  accion: string;
  fecha: string;
  hora: string;
  icono: string;
  color: string;
}

export interface LoanChartData {
  mes: string;
  prestamos: number;
  recuperado: number;
  pendiente: number;
}

export interface RelacionDonutData {
  name: string;
  value: number;
  color: string;
}

export interface NavNotification {
  id: string;
  mensaje: string;
  tiempo: string;
  leida: boolean;
  tipo: "alerta" | "solicitud" | "info";
}
