import EmptyState from "@/components/ui/EmptyState";

export default function GerenteGeneralPlanesPage() {
  return (
    <EmptyState
      title="Planes"
      description="Planes de crédito disponibles."
      breadcrumbs={[{ label: "Inicio", href: "/gerente-general/dashboard" }, { label: "Planes" }]}
    />
  );
}
