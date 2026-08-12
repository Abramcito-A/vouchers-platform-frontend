import UsuariosView from "@/components/modules/UsuariosView";

export default function GerenteGeneralUsuariosPage() {
  return (
    <UsuariosView
      breadcrumbs={[{ label: "Inicio", href: "/gerente-general/dashboard" }, { label: "Usuarios" }]}
    />
  );
}
