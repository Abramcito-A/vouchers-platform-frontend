import EmptyState from "@/components/ui/EmptyState";

export default function GerenteGeneralSucursalesPage() {
  return (
    <EmptyState
      title="Sucursales"
      description="Sucursales de la empresa y su desempeño."
      breadcrumbs={[{ label: "Inicio", href: "/gerente-general/dashboard" }, { label: "Sucursales" }]}
    />
  );
}
