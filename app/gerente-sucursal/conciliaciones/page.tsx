import EmptyState from "@/components/ui/EmptyState";

export default function GerenteSucursalConciliacionesPage() {
  return (
    <EmptyState
      title="Conciliaciones"
      description="Conciliación de movimientos de la sucursal."
      breadcrumbs={[{ label: "Inicio", href: "/gerente-sucursal/dashboard" }, { label: "Conciliaciones" }]}
    />
  );
}
