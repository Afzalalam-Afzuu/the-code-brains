// app/admin/login/page.tsx
import { checkAdminAuth, loginAdmin } from "../../../lib/admin-auth";
import { redirect } from "next/navigation";
import { ShieldCheck, Lock, AlertCircle, ArrowRight } from "lucide-react";

export const metadata = {
  title: "Admin Login - TheCodeBrains",
  description: "Secure gateway for TheCodeBrains admin dashboard.",
};

interface SearchParamsProps {
  searchParams: Promise<{ error?: string }>;
}

export default async function AdminLoginPage({ searchParams }: SearchParamsProps) {
  const isLoggedIn = await checkAdminAuth();
  if (isLoggedIn) {
    redirect("/admin");
  }

  const { error } = await searchParams;

  // Server action to handle form submission
  async function handleLoginAction(formData: FormData) {
    "use server";
    const pin = formData.get("pin") as string;
    const res = await loginAdmin(pin);

    if (res.success) {
      redirect("/admin");
    } else {
      redirect(`/admin/login?error=${encodeURIComponent(res.error || "Login failed")}`);
    }
  }

  return (
    <div className="bg-slate-950 min-h-screen flex items-center justify-center px-4 relative overflow-hidden">
      {/* Background Neon Gradients */}
      <div className="absolute top-1/4 left-1/4 w-80 h-80 rounded-full bg-indigo-500/10 blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-violet-500/10 blur-3xl" />

      <div className="max-w-md w-full bg-slate-900/40 border border-slate-800 rounded-3xl p-8 backdrop-blur-xl shadow-2xl relative">
        {/* Shield Icon Header */}
        <div className="flex flex-col items-center text-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-indigo-600/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 mb-4 shadow-lg">
            <ShieldCheck size={32} />
          </div>
          <h1 className="text-2xl font-black text-white tracking-tight">Admin Gateway</h1>
          <p className="text-slate-400 text-xs mt-1.5 font-medium max-w-xs">
            Enter your security credentials to manage articles and system integrations.
          </p>
        </div>

        {/* Error Notification */}
        {error && (
          <div className="mb-6 p-4 bg-red-950/40 border border-red-900/30 rounded-2xl flex items-start gap-3 text-red-400 text-xs font-semibold animate-shake">
            <AlertCircle className="shrink-0 mt-0.5" size={16} />
            <p>{error}</p>
          </div>
        )}

        {/* Login Form */}
        <form action={handleLoginAction} className="space-y-6">
          <div className="flex flex-col gap-2">
            <label className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
              <Lock size={12} />
              <span>Security PIN</span>
            </label>
            <input
              type="password"
              name="pin"
              placeholder="••••••••"
              className="w-full bg-slate-950 border border-slate-800 text-white text-center text-lg tracking-widest rounded-xl py-3.5 outline-none focus:border-indigo-500 transition duration-300 font-mono"
              required
              autoFocus
            />
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-750 text-white font-extrabold text-xs uppercase tracking-widest py-4 rounded-xl transition duration-300 shadow-lg hover:shadow-indigo-500/10 flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Authenticate Session</span>
            <ArrowRight size={14} />
          </button>
        </form>
      </div>
    </div>
  );
}
