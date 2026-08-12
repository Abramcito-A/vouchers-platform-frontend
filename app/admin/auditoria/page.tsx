import EmptyState from "@/components/ui/EmptyState";

export default function AdminAuditoriaPage() {
  return (
    <EmptyState
      title="Auditoría"
      description="Registro de actividad y cambios en el sistema."
      breadcrumbs={[{ label: "Inicio", href: "/admin/dashboard" }, { label: "Auditoría" }]}
    />
  );
}
