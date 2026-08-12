import EmptyState from "@/components/ui/EmptyState";

export default function GerenteGeneralKpisPage() {
  return (
    <EmptyState
      title="KPIs"
      description="Indicadores clave de desempeño."
      breadcrumbs={[{ label: "Inicio", href: "/gerente-general/dashboard" }, { label: "KPIs" }]}
    />
  );
}
