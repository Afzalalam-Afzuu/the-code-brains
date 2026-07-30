// components/AdminSidebar.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { LayoutDashboard, ShoppingBag, PlusCircle, BookOpen, PenTool, ExternalLink, LogOut, Code, Menu, X, MessageSquare } from "lucide-react";
import { logoutAdmin } from "../lib/admin-auth";

export default function AdminSidebar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = async () => {
    await logoutAdmin();
    window.location.href = "/admin/login";
  };

  const navGroups = [
    {
      title: "Overview",
      items: [
        {
          label: "Control Center",
          href: "/admin",
          icon: LayoutDashboard,
        },
        {
          label: "User Inquiries / Leads",
          href: "/admin/inquiries",
          icon: MessageSquare,
        },
      ],
    },
    {
      title: "Products Manage",
      items: [
        {
          label: "View Affiliate Products",
          href: "/admin/products",
          icon: ShoppingBag,
        },
        {
          label: "Add Affiliate Products",
          href: "/admin/add-product",
          icon: PlusCircle,
        },
      ],
    },
    {
      title: "Publisher Articles Manage",
      items: [
        {
          label: "View Articles",
          href: "/admin/blogs",
          icon: BookOpen,
        },
        {
          label: "Write New Articles",
          href: "/admin/create-blog",
          icon: PenTool,
        },
      ],
    },
  ];

  return (
    <>
      {/* Mobile Top Header Toggle Bar */}
      <div className="lg:hidden bg-white border-b border-slate-200 px-4 py-3 flex items-center justify-between sticky top-0 z-40 shadow-xs">
        <div className="flex items-center gap-2">
          <Code className="text-[#2874f0]" size={22} />
          <span className="text-sm font-black text-slate-900 uppercase tracking-wider">Brains Panel</span>
        </div>
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="text-slate-600 hover:text-slate-900 p-2 rounded-lg bg-slate-100"
          aria-label="Toggle Navigation"
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Sidebar Container */}
      <aside
        className={`${
          mobileOpen ? "block" : "hidden"
        } lg:block w-full lg:w-64 bg-white border-r border-slate-200 text-slate-700 shrink-0 flex flex-col justify-between p-5 lg:sticky lg:top-0 lg:h-screen overflow-y-auto z-30 shadow-xs`}
      >
        <div className="space-y-6">
          {/* Brand Header */}
          <div className="hidden lg:flex items-center gap-2.5 pb-4 border-b border-slate-100">
            <div className="w-9 h-9 rounded-xl bg-[#2874f0] flex items-center justify-center text-white font-black text-sm shadow-md shadow-blue-500/20">
              ⚡
            </div>
            <div>
              <h2 className="text-xs font-black text-slate-900 uppercase tracking-wider">TheCodeBrains</h2>
              <p className="text-[9px] text-[#2874f0] font-bold uppercase tracking-widest">Admin Control v2.0</p>
            </div>
          </div>

          {/* Navigation Groups */}
          <nav className="space-y-5">
            {navGroups.map((group) => (
              <div key={group.title} className="space-y-1">
                <span className="text-[9px] font-black uppercase text-slate-400 tracking-widest block mb-1.5 px-3">
                  {group.title}
                </span>
                {group.items.map((item) => {
                  const Icon = item.icon;
                  const isActive = pathname === item.href;

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs transition-all ${
                        isActive
                          ? "bg-[#2874f0] text-white shadow-md shadow-blue-500/20 font-black"
                          : "hover:bg-slate-100 hover:text-[#2874f0] text-slate-700 font-bold"
                      }`}
                    >
                      <Icon size={16} className={isActive ? "text-white" : "text-slate-500"} />
                      <span>{item.label}</span>
                    </Link>
                  );
                })}
              </div>
            ))}
          </nav>
        </div>

        {/* Bottom Profile & Actions */}
        <div className="mt-8 pt-4 border-t border-slate-100 space-y-2">
          <Link
            href="/"
            target="_blank"
            className="flex items-center justify-between px-3 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 hover:text-[#2874f0] transition"
          >
            <span className="flex items-center gap-2">
              <ExternalLink size={15} />
              <span>Live Website</span>
            </span>
          </Link>

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 px-3 py-2.5 rounded-xl text-xs font-extrabold text-rose-600 hover:bg-rose-50 hover:text-rose-700 transition cursor-pointer"
          >
            <LogOut size={15} />
            <span>Logout Session</span>
          </button>
        </div>
      </aside>
    </>
  );
}
