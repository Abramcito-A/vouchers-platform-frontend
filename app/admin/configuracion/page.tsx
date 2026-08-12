import EmptyState from "@/components/ui/EmptyState";

export default function AdminConfiguracionPage() {
  return (
    <EmptyState
      title="Configuración"
      description="Parámetros generales del sistema."
      breadcrumbs={[{ label: "Inicio", href: "/admin/dashboard" }, { label: "Configuración" }]}
    />
  );
}
