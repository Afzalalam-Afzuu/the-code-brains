// app/admin/layout.tsx
import { checkAdminAuth } from "../../lib/admin-auth";
import AdminSidebar from "../../components/AdminSidebar";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const isLoggedIn = await checkAdminAuth();

  if (!isLoggedIn) {
    // If not logged in, render only the child (the login gateway)
    return <>{children}</>;
  }

  // If logged in, render the dashboard panel with clean light theme matching user site
  return (
    <div className="bg-[#f1f3f6] text-slate-900 min-h-screen flex flex-col lg:flex-row font-sans">
      <AdminSidebar />
      <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
