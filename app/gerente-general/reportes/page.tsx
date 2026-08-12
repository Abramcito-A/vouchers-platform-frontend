import EmptyState from "@/components/ui/EmptyState";

export default function GerenteGeneralReportesPage() {
  return (
    <EmptyState
      title="Reportes"
      description="Reportes operativos y financieros."
      breadcrumbs={[{ label: "Inicio", href: "/gerente-general/dashboard" }, { label: "Reportes" }]}
    />
  );
}
