"use client";

import React, { useState, useMemo } from "react";
import ToolsNavbar from "@/components/tools/ToolsNavbar";
import ToolsFooter from "@/components/tools/ToolsFooter";
import { Landmark, Calculator, Percent, Calendar, PieChart, Coins } from "lucide-react";

export default function EmiCalculatorPage() {
  const [loanAmount, setLoanAmount] = useState<number>(500000);
  const [interestRate, setInterestRate] = useState<number>(9.5);
  const [tenureYears, setTenureYears] = useState<number>(5);

  const emiData = useMemo(() => {
    const principal = loanAmount;
    const ratePerMonth = interestRate / 12 / 100;
    const totalMonths = tenureYears * 12;

    if (principal <= 0 || ratePerMonth <= 0 || totalMonths <= 0) {
      return { monthlyEmi: 0, totalInterest: 0, totalPayment: 0, interestRatio: 0 };
    }

    const emi = (principal * ratePerMonth * Math.pow(1 + ratePerMonth, totalMonths)) / (Math.pow(1 + ratePerMonth, totalMonths) - 1);
    const totalPayment = emi * totalMonths;
    const totalInterest = totalPayment - principal;
    const interestRatio = Math.round((totalInterest / totalPayment) * 100);

    return {
      monthlyEmi: Math.round(emi),
      totalInterest: Math.round(totalInterest),
      totalPayment: Math.round(totalPayment),
      interestRatio,
    };
  }, [loanAmount, interestRate, tenureYears]);

  return (
    <div className="min-h-screen bg-slate-100/90 text-slate-950 flex flex-col font-sans">
      <ToolsNavbar />

      <main className="max-w-4xl mx-auto px-4 py-8 sm:py-12 flex-1 w-full space-y-8">
        {/* Header */}
        <div className="text-center space-y-2">
          <span className="bg-blue-100 text-[#2874f0] border-2 border-blue-300 text-xs font-black px-3.5 py-1 rounded-full uppercase tracking-wider inline-flex items-center gap-1.5 shadow-2xs">
            <Landmark size={13} /> Loan EMI Studio
          </span>
          <h1 className="text-2xl sm:text-4xl font-black text-slate-950 tracking-tight">
            Loan EMI & Interest Calculator
          </h1>
          <p className="text-xs sm:text-sm text-slate-800 font-extrabold max-w-xl mx-auto">
            Calculate your monthly home, car, or personal loan EMIs with total interest and payment breakdowns.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Inputs Card */}
          <div className="bg-white border-2 border-slate-200 rounded-2xl p-6 shadow-sm space-y-6">
            {/* Loan Amount */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-black">
                <span className="text-slate-950 uppercase tracking-wider">Loan Amount</span>
                <span className="text-[#2874f0] font-black text-base">₹{loanAmount.toLocaleString("en-IN")}</span>
              </div>
              <input
                type="range"
                min={10000}
                max={10000000}
                step={10000}
                value={loanAmount}
                onChange={(e) => setLoanAmount(Number(e.target.value))}
                className="w-full h-3 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#2874f0]"
              />
            </div>

            {/* Interest Rate */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-black">
                <span className="text-slate-950 uppercase tracking-wider">Interest Rate (% P.A.)</span>
                <span className="text-[#2874f0] font-black text-base">{interestRate}%</span>
              </div>
              <input
                type="range"
                min={1}
                max={25}
                step={0.1}
                value={interestRate}
                onChange={(e) => setInterestRate(Number(e.target.value))}
                className="w-full h-3 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#2874f0]"
              />
            </div>

            {/* Tenure */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-black">
                <span className="text-slate-950 uppercase tracking-wider">Loan Tenure</span>
                <span className="text-[#2874f0] font-black text-base">{tenureYears} Years ({tenureYears * 12} Months)</span>
              </div>
              <input
                type="range"
                min={1}
                max={30}
                value={tenureYears}
                onChange={(e) => setTenureYears(Number(e.target.value))}
                className="w-full h-3 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#2874f0]"
              />
            </div>
          </div>

          {/* Results Showcase Card */}
          <div className="bg-white border-2 border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col justify-between space-y-6">
            <div className="bg-[#2874f0] text-white rounded-2xl p-6 text-center space-y-2 border-2 border-blue-600 shadow-md">
              <span className="text-xs font-black text-blue-100 uppercase tracking-widest block">
                Your Monthly EMI
              </span>
              <div className="text-3xl sm:text-4xl font-black tracking-tight">
                ₹{emiData.monthlyEmi.toLocaleString("en-IN")}
              </div>
              <p className="text-xs text-blue-100 font-extrabold">Payable every month for {tenureYears} years.</p>
            </div>

            {/* Breakdown Cards */}
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3.5 bg-slate-50 border-2 border-slate-200 rounded-xl">
                <span className="text-xs font-black text-slate-800 uppercase tracking-wider">Principal Amount</span>
                <span className="text-sm font-black text-slate-950">₹{loanAmount.toLocaleString("en-IN")}</span>
              </div>

              <div className="flex items-center justify-between p-3.5 bg-slate-50 border-2 border-slate-200 rounded-xl">
                <span className="text-xs font-black text-slate-800 uppercase tracking-wider">Total Interest Payable</span>
                <span className="text-sm font-black text-rose-600">₹{emiData.totalInterest.toLocaleString("en-IN")}</span>
              </div>

              <div className="flex items-center justify-between p-3.5 bg-blue-50 border-2 border-blue-200 rounded-xl">
                <span className="text-xs font-black text-slate-950 uppercase tracking-wider">Total Payment (Principal + Interest)</span>
                <span className="text-sm font-black text-[#2874f0]">₹{emiData.totalPayment.toLocaleString("en-IN")}</span>
              </div>
            </div>
          </div>
        </div>
      </main>

      <ToolsFooter />
    </div>
  );
}
