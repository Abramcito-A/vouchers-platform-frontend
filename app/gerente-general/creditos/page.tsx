import EmptyState from "@/components/ui/EmptyState";

export default function GerenteGeneralCreditosPage() {
  return (
    <EmptyState
      title="Créditos"
      description="Créditos activos y su seguimiento."
      breadcrumbs={[{ label: "Inicio", href: "/gerente-general/dashboard" }, { label: "Créditos" }]}
    />
  );
}
