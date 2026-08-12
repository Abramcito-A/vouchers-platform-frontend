import EmptyState from "@/components/ui/EmptyState";

export default function GerenteGeneralConfiguracionPage() {
  return (
    <EmptyState
      title="Configuración"
      description="Parámetros del sistema."
      breadcrumbs={[{ label: "Inicio", href: "/gerente-general/dashboard" }, { label: "Configuración" }]}
    />
  );
}
