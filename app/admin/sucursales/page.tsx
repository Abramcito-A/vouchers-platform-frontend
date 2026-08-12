import EmptyState from "@/components/ui/EmptyState";

export default function AdminSucursalesPage() {
  return (
    <EmptyState
      title="Sucursales"
      description="Gestión de sucursales de la empresa."
      breadcrumbs={[{ label: "Inicio", href: "/admin/dashboard" }, { label: "Sucursales" }]}
    />
  );
}
