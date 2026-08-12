import UsuariosView from "@/components/modules/UsuariosView";

export default function GerenteSucursalUsuariosPage() {
  return (
    <UsuariosView
      breadcrumbs={[{ label: "Inicio", href: "/gerente-sucursal/dashboard" }, { label: "Usuarios" }]}
      tiposDisponibles={["Coordinador", "Verificador", "Cajera"]}
    />
  );
}
