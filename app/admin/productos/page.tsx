import ProductosView from "@/components/modules/ProductosView";

export default function AdminProductosPage() {
  return (
    <ProductosView
      breadcrumbs={[{ label: "Inicio", href: "/admin/dashboard" }, { label: "Productos" }]}
    />
  );
}
