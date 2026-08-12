// ============================================================
// Configuración de navegación por rol
// Cada rol tiene su propio prefijo de URL y sus módulos.
// El Sidebar recibe uno de estos arreglos por props.
// ============================================================

export interface NavItem {
  href: string;
  icon: string;
  label: string;
}

export interface NavGroup {
  label: string;
  items: NavItem[];
}

// ── Administrador ─────────────────────────────────────────
export const adminNav: NavGroup[] = [
  {
    label: "Principal",
    items: [
      { href: "/admin/dashboard", icon: "dashboard", label: "Dashboard" },
      { href: "/admin/sucursales", icon: "building", label: "Sucursales" },
      { href: "/admin/usuarios", icon: "user-cog", label: "Usuarios" },
    ],
  },
  {
    label: "Catálogos",
    items: [
      { href: "/admin/productos", icon: "file-text", label: "Productos" },
      { href: "/admin/planes", icon: "box", label: "Planes de Vales" },
    ],
  },
  {
    label: "Sistema",
    items: [
      { href: "/admin/configuracion", icon: "settings", label: "Configuración" },
      { href: "/admin/auditoria", icon: "clipboard-list", label: "Auditoría" },
    ],
  },
];

// ── Gerente General ───────────────────────────────────────
export const gerenteGeneralNav: NavGroup[] = [
  {
    label: "Principal",
    items: [
      { href: "/gerente-general/dashboard", icon: "dashboard", label: "Dashboard" },
      { href: "/gerente-general/sucursales", icon: "building", label: "Sucursales" },
      { href: "/gerente-general/usuarios", icon: "user-cog", label: "Usuarios" },
    ],
  },
  {
    label: "Operaciones",
    items: [
      { href: "/gerente-general/distribuidoras", icon: "building-office", label: "Distribuidoras" },
      { href: "/gerente-general/solicitudes", icon: "inbox", label: "Solicitudes" },
      { href: "/gerente-general/creditos", icon: "credit-card", label: "Líneas de Crédito" },
      { href: "/gerente-general/transferencias", icon: "refresh-cw", label: "Transferencias" },
    ],
  },
  {
    label: "Catálogos",
    items: [
      { href: "/gerente-general/productos", icon: "file-text", label: "Productos" },
      { href: "/gerente-general/planes", icon: "box", label: "Planes de Vales" },
    ],
  },
  {
    label: "Finanzas",
    items: [
      { href: "/gerente-general/conciliaciones", icon: "shield", label: "Conciliaciones" },
      { href: "/gerente-general/reportes", icon: "bar-chart", label: "Reportes" },
      { href: "/gerente-general/kpis", icon: "bar-chart", label: "KPIs" },
    ],
  },
  {
    label: "Sistema",
    items: [
      { href: "/gerente-general/configuracion", icon: "settings", label: "Configuración" },
      { href: "/gerente-general/auditoria", icon: "clipboard-list", label: "Auditoría" },
    ],
  },
];

// ── Gerente de Sucursal ───────────────────────────────────
export const gerenteSucursalNav: NavGroup[] = [
  {
    label: "Principal",
    items: [
      { href: "/gerente-sucursal/dashboard", icon: "dashboard", label: "Dashboard" },
      { href: "/gerente-sucursal/usuarios", icon: "user-cog", label: "Usuarios" },
    ],
  },
  {
    label: "Operaciones",
    items: [
      { href: "/gerente-sucursal/distribuidoras", icon: "building-office", label: "Distribuidoras" },
      { href: "/gerente-sucursal/solicitudes", icon: "inbox", label: "Solicitudes" },
    ],
  },
  {
    label: "Finanzas",
    items: [
      { href: "/gerente-sucursal/cortes", icon: "credit-card", label: "Cortes" },
      { href: "/gerente-sucursal/conciliaciones", icon: "shield", label: "Conciliaciones" },
      { href: "/gerente-sucursal/reportes", icon: "bar-chart", label: "Reportes" },
    ],
  },
];
