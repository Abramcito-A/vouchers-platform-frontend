import AppShell from "@/components/layout/AppShell";
import { gerenteSucursalNav } from "@/components/layout/nav-config";

export default function GerenteSucursalLayout({ children }: { children: React.ReactNode }) {
  return (
    <AppShell navGroups={gerenteSucursalNav} roleLabel="Gerente de Sucursal">
      {children}
    </AppShell>
  );
}
