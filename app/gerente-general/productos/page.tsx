import ProductosView from "@/components/modules/ProductosView";

export default function GerenteGeneralProductosPage() {
  return (
    <ProductosView
      breadcrumbs={[{ label: "Inicio", href: "/gerente-general/dashboard" }, { label: "Productos" }]}
    />
  );
}
