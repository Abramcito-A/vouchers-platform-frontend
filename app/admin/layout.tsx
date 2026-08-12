import AppShell from "@/components/layout/AppShell";
import { adminNav } from "@/components/layout/nav-config";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AppShell navGroups={adminNav} roleLabel="Administrador">
      {children}
    </AppShell>
  );
}
