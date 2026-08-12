import EmptyState from "@/components/ui/EmptyState";

export default function AdminPlanesPage() {
  return (
    <EmptyState
      title="Planes"
      description="Configuración de planes de crédito."
      breadcrumbs={[{ label: "Inicio", href: "/admin/dashboard" }, { label: "Planes" }]}
    />
  );
}
