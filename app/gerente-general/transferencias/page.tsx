import EmptyState from "@/components/ui/EmptyState";

export default function GerenteGeneralTransferenciasPage() {
  return (
    <EmptyState
      title="Transferencias"
      description="Transferencias entre distribuidoras y sucursales."
      breadcrumbs={[{ label: "Inicio", href: "/gerente-general/dashboard" }, { label: "Transferencias" }]}
    />
  );
}
