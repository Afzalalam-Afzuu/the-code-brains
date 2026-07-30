// app/admin/inquiries/page.tsx
import { checkAdminAuth } from "../../../lib/admin-auth";
import { redirect } from "next/navigation";
import { getJoinPlusInquiriesFromDB } from "../../../lib/db-actions";
import Link from "next/link";
import { MessageSquare, Mail, Phone, Building, Calendar, ArrowLeft, RefreshCw, UserCheck } from "lucide-react";

export const metadata = {
  title: "User Inquiries & Leads - TheCodeBrains Admin",
  description: "View and manage Join Plus membership form submissions.",
};

export const dynamic = "force-dynamic";

export default async function AdminInquiriesPage() {
  const isLoggedIn = await checkAdminAuth();
  if (!isLoggedIn) {
    redirect("/admin/login");
  }

  const inquiries = await getJoinPlusInquiriesFromDB();

  return (
    <div className="w-full space-y-6">
      {/* Top Banner Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white border border-slate-200/80 rounded-2xl p-6 sm:p-8 shadow-xs">
        <div>
          <Link
            href="/admin"
            className="inline-flex items-center gap-1 text-xs text-[#2874f0] hover:underline font-bold uppercase tracking-wider mb-2 transition"
          >
            <ArrowLeft size={14} /> Back to Overview
          </Link>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            <MessageSquare className="text-[#2874f0]" />
            User Inquiries & Plus Leads ({inquiries.length})
          </h1>
          <p className="text-xs text-slate-500 mt-1 font-medium">
            Live submission logs from the Join Plus registration form (<code className="text-[#2874f0] font-bold">join_plus_inquiries</code>).
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <span className="text-xs text-emerald-700 font-extrabold bg-emerald-50 px-3.5 py-2 rounded-xl border border-emerald-200 flex items-center gap-1.5">
            <UserCheck size={15} />
            <span>{inquiries.length} Total Received</span>
          </span>
        </div>
      </div>

      {/* INQUIRIES LIST TABLE */}
      <div className="bg-white border border-slate-200/80 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xs">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
            <MessageSquare size={18} className="text-[#2874f0]" />
            Received Messages & Contact Requests
          </h3>
          <span className="text-xs text-slate-500 font-semibold bg-slate-50 px-3 py-1 rounded-lg border border-slate-200">
            Realtime DB Sync
          </span>
        </div>

        {inquiries.length === 0 ? (
          <div className="py-16 text-center space-y-3">
            <MessageSquare size={36} className="mx-auto text-slate-300" />
            <h4 className="text-sm font-black text-slate-700">No Inquiries Found Yet</h4>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              Submissions from the <code className="text-[#2874f0]">/join</code> page form will automatically appear here once users submit requests.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-200 text-slate-500 uppercase font-extrabold tracking-widest text-[9px] bg-slate-50/50">
                  <th className="py-3 pl-3">User Name</th>
                  <th className="py-3">Contact Info</th>
                  <th className="py-3">Company</th>
                  <th className="py-3">Message / Inquiry</th>
                  <th className="py-3 text-right pr-3">Submitted At</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {inquiries.map((item) => (
                  <tr key={item.id} className="group hover:bg-slate-50/80 transition-colors">
                    {/* User Name */}
                    <td className="py-4 pl-3 font-extrabold text-slate-900 text-sm">
                      {item.name}
                    </td>

                    {/* Contact Info */}
                    <td className="py-4 space-y-1">
                      <div className="flex items-center gap-1.5 text-slate-800 font-bold">
                        <Mail size={13} className="text-[#2874f0] shrink-0" />
                        <a href={`mailto:${item.email}`} className="hover:underline">
                          {item.email}
                        </a>
                      </div>
                      <div className="flex items-center gap-1.5 text-slate-600 font-medium text-[11px]">
                        <Phone size={13} className="text-emerald-600 shrink-0" />
                        <a href={`tel:${item.mobile}`} className="hover:underline">
                          {item.mobile}
                        </a>
                      </div>
                    </td>

                    {/* Company */}
                    <td className="py-4">
                      {item.company ? (
                        <span className="bg-blue-50 border border-blue-100 text-[#2874f0] text-[10px] font-extrabold px-2.5 py-1 rounded-md">
                          {item.company}
                        </span>
                      ) : (
                        <span className="text-slate-400 text-[10px] italic">N/A</span>
                      )}
                    </td>

                    {/* Message */}
                    <td className="py-4 max-w-md">
                      {item.message ? (
                        <p className="text-slate-700 font-medium leading-relaxed bg-slate-50 p-2.5 rounded-xl border border-slate-100 text-[11px]">
                          {item.message}
                        </p>
                      ) : (
                        <span className="text-slate-400 text-[10px] italic">No extra message provided</span>
                      )}
                    </td>

                    {/* Date */}
                    <td className="py-4 text-right pr-3 text-slate-500 font-bold text-[11px]">
                      {new Date(item.created_at).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
