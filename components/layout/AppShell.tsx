import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import type { NavGroup } from "./nav-config";

interface AppShellProps {
  children: React.ReactNode;
  navGroups: NavGroup[];
  /** Nombre del rol activo (sidebar + navbar) */
  roleLabel: string;
}

export default function AppShell({ children, navGroups, roleLabel }: AppShellProps) {
  return (
    <div className="dashboard-root">
      <Sidebar navGroups={navGroups} subtitle={roleLabel} />
      <div className="dashboard-main">
        <Navbar roleLabel={roleLabel} />
        <main className="dashboard-content">{children}</main>
      </div>
    </div>
  );
}
