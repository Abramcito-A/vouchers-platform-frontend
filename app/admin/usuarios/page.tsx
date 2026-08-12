import UsuariosView from "@/components/modules/UsuariosView";

export default function AdminUsuariosPage() {
  return (
    <UsuariosView
      breadcrumbs={[{ label: "Inicio", href: "/admin/dashboard" }, { label: "Usuarios" }]}
    />
  );
}
