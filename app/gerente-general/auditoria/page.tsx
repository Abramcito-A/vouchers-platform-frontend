import EmptyState from "@/components/ui/EmptyState";

export default function GerenteGeneralAuditoriaPage() {
  return (
    <EmptyState
      title="Auditoría"
      description="Registro de actividad del sistema."
      breadcrumbs={[{ label: "Inicio", href: "/gerente-general/dashboard" }, { label: "Auditoría" }]}
    />
  );
}
