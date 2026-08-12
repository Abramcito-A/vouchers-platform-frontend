import AppShell from "@/components/layout/AppShell";
import { gerenteGeneralNav } from "@/components/layout/nav-config";

export default function GerenteGeneralLayout({ children }: { children: React.ReactNode }) {
  return (
    <AppShell navGroups={gerenteGeneralNav} roleLabel="Gerente General">
      {children}
    </AppShell>
  );
}
