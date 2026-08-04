import Sidebar from "@/app/_components/dashboard/Sidebar";
import Navbar from "@/app/_components/dashboard/Navbar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {

  return (
    <div className="dashboard-root">
      <Sidebar />
      <div className="dashboard-main">
        <Navbar />
        <main className="dashboard-content">{children}</main>
      </div>
    </div>
  );
}
