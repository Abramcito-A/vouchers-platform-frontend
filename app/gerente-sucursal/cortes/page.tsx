import EmptyState from "@/components/ui/EmptyState";

export default function GerenteSucursalCortesPage() {
  return (
    <EmptyState
      title="Cortes"
      description="Cortes de caja de la sucursal."
      breadcrumbs={[{ label: "Inicio", href: "/gerente-sucursal/dashboard" }, { label: "Cortes" }]}
    />
  );
}
