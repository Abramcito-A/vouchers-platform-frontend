import SolicitudesView from "@/components/modules/SolicitudesView";

export default function GerenteGeneralSolicitudesPage() {
  return (
    <SolicitudesView
      breadcrumbs={[{ label: "Inicio", href: "/gerente-general/dashboard" }, { label: "Solicitudes" }]}
    />
  );
}
