"use client";

import { useActionState } from "react";
import { submitJoinPlusInquiryAction } from "../../lib/db-actions";
import { Sparkles, ShieldCheck, CheckCircle2, User, Mail, Phone, Building, MessageSquare, Send, AlertCircle } from "lucide-react";

export default function JoinPlusPage() {
  const [state, formAction, isPending] = useActionState(submitJoinPlusInquiryAction, null);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 sm:py-12">
      {/* Top Banner Header */}
      <div className="bg-gradient-to-r from-[#2874f0] via-indigo-600 to-[#1259cb] text-white rounded-3xl p-6 sm:p-10 mb-8 shadow-xl relative overflow-hidden text-center sm:text-left">
        <div className="absolute top-0 right-0 w-80 h-80 bg-yellow-400/20 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 bg-[#ffe500] text-slate-950 text-xs font-black px-3.5 py-1 rounded-full uppercase tracking-wider shadow-xs">
              <Sparkles size={14} className="fill-slate-950" />
              TheCodeBrains Plus Membership
            </div>
            <h1 className="text-2xl sm:text-4xl font-black tracking-tight leading-tight">
              Connect With Us — Join Plus Today
            </h1>
            <p className="text-blue-100 text-xs sm:text-sm font-medium max-w-xl leading-relaxed">
              Complete this simple form to connect with our team for exclusive deal drop alerts, priority support, and brand partnerships.
            </p>
          </div>

          <div className="shrink-0 bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-2xl text-center min-w-[160px]">
            <span className="block text-2xl font-black text-[#ffe500]">FREE</span>
            <span className="text-[10px] font-bold text-blue-100 uppercase tracking-widest">Lifetime Access</span>
          </div>
        </div>
      </div>

      {/* Main Form Area */}
      <div className="bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-10 shadow-xs">
        {state?.success ? (
          /* Success State Card */
          <div className="py-12 text-center space-y-4">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-sm">
              <CheckCircle2 size={36} />
            </div>
            <h2 className="text-2xl font-black text-slate-900">Thank You For Joining!</h2>
            <p className="text-xs sm:text-sm text-slate-600 font-semibold max-w-md mx-auto leading-relaxed">
              Your request has been successfully submitted and saved. TheCodeBrains team will get in touch with you shortly.
            </p>
            <a
              href="/join"
              className="mt-4 inline-flex items-center gap-2 bg-[#2874f0] hover:bg-blue-700 text-white font-extrabold text-xs uppercase px-6 py-3 rounded-xl transition shadow-md cursor-pointer"
            >
              Submit Another Inquiry
            </a>
          </div>
        ) : (
          /* Registration Form */
          <form action={formAction} className="space-y-6">
            <div className="border-b border-slate-100 pb-4">
              <h2 className="text-lg font-black text-slate-900 flex items-center gap-2">
                <ShieldCheck className="text-[#2874f0]" size={20} />
                Join Plus Registration Form
              </h2>
              <p className="text-xs text-slate-500 font-medium mt-1">
                Please enter your details below. Required fields are marked with an asterisk (*).
              </p>
            </div>

            {/* Error Alert */}
            {state?.error && (
              <div className="p-4 bg-rose-50 border border-rose-200 rounded-2xl flex items-center gap-3 text-rose-700 text-xs font-bold">
                <AlertCircle size={18} className="shrink-0 text-rose-600" />
                <span>{state.error}</span>
              </div>
            )}

            {/* Grid of Input Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Full Name */}
              <div>
                <label className="block text-xs font-extrabold text-slate-700 uppercase tracking-wider mb-2">
                  Full Name <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <User className="absolute left-3.5 top-3.5 text-slate-400" size={16} />
                  <input
                    type="text"
                    name="name"
                    required
                    placeholder="e.g. Alex Morgan"
                    className="w-full bg-slate-50 border border-slate-200 text-slate-900 text-xs font-semibold rounded-xl pl-10 pr-4 py-3 outline-none focus:border-[#2874f0] focus:bg-white transition placeholder-slate-400"
                  />
                </div>
              </div>

              {/* Email Address */}
              <div>
                <label className="block text-xs font-extrabold text-slate-700 uppercase tracking-wider mb-2">
                  Email Address <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-3.5 text-slate-400" size={16} />
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="e.g. alex.morgan@example.com"
                    className="w-full bg-slate-50 border border-slate-200 text-slate-900 text-xs font-semibold rounded-xl pl-10 pr-4 py-3 outline-none focus:border-[#2874f0] focus:bg-white transition placeholder-slate-400"
                  />
                </div>
              </div>

              {/* Mobile Number */}
              <div>
                <label className="block text-xs font-extrabold text-slate-700 uppercase tracking-wider mb-2">
                  Mobile Number <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <Phone className="absolute left-3.5 top-3.5 text-slate-400" size={16} />
                  <input
                    type="tel"
                    name="mobile"
                    required
                    placeholder="e.g. +91 9876543210"
                    className="w-full bg-slate-50 border border-slate-200 text-slate-900 text-xs font-semibold rounded-xl pl-10 pr-4 py-3 outline-none focus:border-[#2874f0] focus:bg-white transition placeholder-slate-400"
                  />
                </div>
              </div>

              {/* Company / Organization (Optional) */}
              <div>
                <label className="block text-xs font-extrabold text-slate-700 uppercase tracking-wider mb-2 flex items-center justify-between">
                  <span>Company / Organization</span>
                  <span className="text-[10px] text-slate-400 font-normal lowercase">(optional)</span>
                </label>
                <div className="relative">
                  <Building className="absolute left-3.5 top-3.5 text-slate-400" size={16} />
                  <input
                    type="text"
                    name="company"
                    placeholder="e.g. TechCorp Solutions (Optional)"
                    className="w-full bg-slate-50 border border-slate-200 text-slate-900 text-xs font-semibold rounded-xl pl-10 pr-4 py-3 outline-none focus:border-[#2874f0] focus:bg-white transition placeholder-slate-400"
                  />
                </div>
              </div>

            </div>

            {/* Message / Inquiry (Optional) */}
            <div>
              <label className="block text-xs font-extrabold text-slate-700 uppercase tracking-wider mb-2 flex items-center justify-between">
                <span>Message / Inquiry</span>
                <span className="text-[10px] text-slate-400 font-normal lowercase">(optional)</span>
              </label>
              <div className="relative">
                <MessageSquare className="absolute left-3.5 top-3.5 text-slate-400" size={16} />
                <textarea
                  name="message"
                  rows={3}
                  placeholder="e.g. Let us know how we can assist you or what specific tech deals you are interested in..."
                  className="w-full bg-slate-50 border border-slate-200 text-slate-900 text-xs font-semibold rounded-xl pl-10 pr-4 py-3 outline-none focus:border-[#2874f0] focus:bg-white transition placeholder-slate-400 resize-y"
                />
              </div>
            </div>

            {/* Submit Action Button */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={isPending}
                className="w-full bg-[#2874f0] hover:bg-blue-700 disabled:opacity-50 text-white font-black text-xs uppercase tracking-widest py-4 rounded-2xl transition duration-300 shadow-md shadow-blue-500/20 flex items-center justify-center gap-2 cursor-pointer"
              >
                {isPending ? (
                  <span>Submitting Request...</span>
                ) : (
                  <>
                    <Send size={16} />
                    <span>Join Plus</span>
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
