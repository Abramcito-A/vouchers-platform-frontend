import EmptyState from "@/components/ui/EmptyState";

export default function GerenteSucursalDistribuidorasPage() {
  return (
    <EmptyState
      title="Distribuidoras"
      description="Distribuidoras de tu sucursal."
      breadcrumbs={[{ label: "Inicio", href: "/gerente-sucursal/dashboard" }, { label: "Distribuidoras" }]}
    />
  );
}
