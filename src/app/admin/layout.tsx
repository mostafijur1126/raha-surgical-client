import AdminFooter from "@/components/admin/AdminFooter";
import AdminNavbar from "@/components/admin/AdminNavbar";
import DashboardSidebar from "@/components/admin/DashboardSidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex min-h-screen">
      <DashboardSidebar></DashboardSidebar>
      <div className="flex-1 flex flex-col min-h-screen min-w-0">
        <AdminNavbar></AdminNavbar>
        <main className="flex-1  overflow-y-auto">{children}</main>
        <AdminFooter></AdminFooter>
      </div>
    </section>
  );
}
