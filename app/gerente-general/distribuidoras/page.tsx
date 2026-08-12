import EmptyState from "@/components/ui/EmptyState";

export default function GerenteGeneralDistribuidorasPage() {
  return (
    <EmptyState
      title="Distribuidoras"
      description="Distribuidoras registradas en el sistema."
      breadcrumbs={[{ label: "Inicio", href: "/gerente-general/dashboard" }, { label: "Distribuidoras" }]}
    />
  );
}
