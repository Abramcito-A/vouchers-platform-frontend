import EmptyState from "@/components/ui/EmptyState";

export default function GerenteGeneralConciliacionesPage() {
  return (
    <EmptyState
      title="Conciliaciones"
      description="Conciliación de movimientos y saldos."
      breadcrumbs={[{ label: "Inicio", href: "/gerente-general/dashboard" }, { label: "Conciliaciones" }]}
    />
  );
}
