// components/AdminSidebar.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, PenTool, ExternalLink, LogOut, Code } from "lucide-react";
import { logoutAdmin } from "../lib/admin-auth";

export default function AdminSidebar() {
  const pathname = usePathname();

  const handleLogout = async () => {
    await logoutAdmin();
    window.location.href = "/admin/login";
  };

  const navItems = [
    {
      label: "Dashboard",
      href: "/admin",
      icon: LayoutDashboard,
    },
    {
      label: "Write Blog",
      href: "/admin/create-blog",
      icon: PenTool,
    },
  ];

  return (
    <aside className="w-full lg:w-64 bg-slate-900 border-r border-slate-800 text-slate-300 shrink-0 flex flex-col justify-between p-6">
      {/* Top Header & Menu */}
      <div className="space-y-8">
        {/* Brand Header */}
        <div className="flex items-center gap-2 pb-5 border-b border-slate-800">
          <Code className="text-indigo-400" size={24} />
          <div>
            <h2 className="text-sm font-black text-white uppercase tracking-wider">Brains Panel</h2>
            <p className="text-[10px] text-slate-500 font-medium">Control Center v1.0</p>
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="space-y-1">
          <span className="text-[10px] font-extrabold uppercase text-slate-500 tracking-widest block mb-2 px-3">
            Menu
          </span>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold transition-all ${
                  isActive
                    ? "bg-indigo-600 text-white shadow-md shadow-indigo-500/10"
                    : "hover:bg-slate-800 hover:text-white"
                }`}
              >
                <Icon size={16} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Bottom Profile & Actions */}
      <div className="mt-8 pt-5 border-t border-slate-800 space-y-3">
        {/* View Main Website */}
        <Link
          href="/blog"
          className="flex items-center justify-between px-3 py-2 rounded-xl text-xs font-bold text-slate-400 hover:bg-slate-850 hover:text-white transition"
        >
          <span className="flex items-center gap-3">
            <ExternalLink size={16} />
            <span>View Blog</span>
          </span>
        </Link>

        {/* Logout Trigger */}
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-extrabold text-red-400 hover:bg-red-950/20 hover:text-red-300 transition cursor-pointer"
        >
          <LogOut size={16} />
          <span>Logout Session</span>
        </button>
      </div>
    </aside>
  );
}
