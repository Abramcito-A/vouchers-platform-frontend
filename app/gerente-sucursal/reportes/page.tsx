import EmptyState from "@/components/ui/EmptyState";

export default function GerenteSucursalReportesPage() {
  return (
    <EmptyState
      title="Reportes"
      description="Reportes de la sucursal."
      breadcrumbs={[{ label: "Inicio", href: "/gerente-sucursal/dashboard" }, { label: "Reportes" }]}
    />
  );
}
