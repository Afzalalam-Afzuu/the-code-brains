// app/admin/layout.tsx
import { checkAdminAuth } from "../../lib/admin-auth";
import AdminSidebar from "../../components/AdminSidebar";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const isLoggedIn = await checkAdminAuth();

  if (!isLoggedIn) {
    // If not logged in, render only the child (the login gateway)
    return <>{children}</>;
  }

  // If logged in, render the dashboard panel with sidebar
  return (
    <div className="bg-slate-950 text-slate-150 min-h-screen flex flex-col lg:flex-row">
      <AdminSidebar />
      <main className="flex-1 bg-slate-900/20 p-6 lg:p-10 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
