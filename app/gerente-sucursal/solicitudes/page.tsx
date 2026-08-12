import SolicitudesView from "@/components/modules/SolicitudesView";

export default function GerenteSucursalSolicitudesPage() {
  return (
    <SolicitudesView
      breadcrumbs={[{ label: "Inicio", href: "/gerente-sucursal/dashboard" }, { label: "Solicitudes" }]}
    />
  );
}
