"use client";

import React, { useState } from "react";
import { CheckCircle2, XCircle, HelpCircle, RotateCcw, Award } from "lucide-react";
import { LessonQuiz as QuizType } from "../../lib/learning-data";

export default function LessonQuizCard({ quiz }: { quiz: QuizType }) {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const isCorrect = selectedOption === quiz.correctIndex;

  const handleReset = () => {
    setSelectedOption(null);
    setSubmitted(false);
  };

  return (
    <div className="my-10 bg-slate-900 border-2 border-indigo-500/40 rounded-2xl p-6 text-white shadow-xl">
      {/* Quiz Header */}
      <div className="flex items-center justify-between gap-3 pb-4 border-b border-slate-800 mb-6">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-indigo-500/20 border border-indigo-500/40 text-indigo-400 flex items-center justify-center">
            <HelpCircle size={18} />
          </div>
          <div>
            <h3 className="font-extrabold text-base text-white tracking-tight">Test Yourself With Exercises</h3>
            <p className="text-xs text-slate-400 font-medium">Verify your understanding before moving to the next topic</p>
          </div>
        </div>
        <span className="bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 text-[10px] font-mono font-bold px-3 py-1 rounded-full uppercase">
          Chapter Quiz
        </span>
      </div>

      {/* Question */}
      <div className="mb-6">
        <h4 className="text-lg font-bold text-slate-100 leading-snug">{quiz.question}</h4>
      </div>

      {/* Options List */}
      <div className="space-y-3 mb-6">
        {quiz.options.map((option, idx) => {
          let style = "bg-slate-800/80 border-slate-700 text-slate-200 hover:border-slate-500";
          if (submitted) {
            if (idx === quiz.correctIndex) {
              style = "bg-emerald-950/80 border-emerald-500 text-emerald-200 font-bold";
            } else if (selectedOption === idx) {
              style = "bg-rose-950/80 border-rose-500 text-rose-200";
            }
          } else if (selectedOption === idx) {
            style = "bg-indigo-950/90 border-indigo-500 text-indigo-200 font-bold ring-2 ring-indigo-500/30";
          }

          return (
            <button
              key={idx}
              disabled={submitted}
              onClick={() => setSelectedOption(idx)}
              className={`w-full text-left p-4 rounded-xl border text-sm transition-all flex items-center justify-between gap-3 ${style}`}
            >
              <div className="flex items-center gap-3">
                <span className="w-6 h-6 rounded-lg bg-slate-900 border border-slate-700 flex items-center justify-center font-mono text-xs text-slate-400 font-bold shrink-0">
                  {String.fromCharCode(65 + idx)}
                </span>
                <span>{option}</span>
              </div>
              {submitted && idx === quiz.correctIndex && <CheckCircle2 size={18} className="text-emerald-400 shrink-0" />}
              {submitted && selectedOption === idx && idx !== quiz.correctIndex && <XCircle size={18} className="text-rose-400 shrink-0" />}
            </button>
          );
        })}
      </div>

      {/* Submit / Feedback Controls */}
      {!submitted ? (
        <button
          disabled={selectedOption === null}
          onClick={() => setSubmitted(true)}
          className={`w-full py-3.5 rounded-xl font-bold text-sm transition shadow-lg flex items-center justify-center gap-2 ${
            selectedOption !== null
              ? "bg-indigo-600 hover:bg-indigo-500 text-white cursor-pointer"
              : "bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700"
          }`}
        >
          <Award size={16} /> Submit Answer
        </button>
      ) : (
        <div className="space-y-4 pt-2">
          <div
            className={`p-4 rounded-xl border flex items-start gap-3 ${
              isCorrect ? "bg-emerald-950/60 border-emerald-500/60 text-emerald-200" : "bg-rose-950/60 border-rose-500/60 text-rose-200"
            }`}
          >
            {isCorrect ? <CheckCircle2 size={20} className="text-emerald-400 shrink-0 mt-0.5" /> : <XCircle size={20} className="text-rose-400 shrink-0 mt-0.5" />}
            <div className="space-y-1">
              <h5 className="font-extrabold text-sm">{isCorrect ? "Correct Answer! 🎉" : "Incorrect Answer"}</h5>
              <p className="text-xs leading-relaxed opacity-90">{quiz.explanation}</p>
            </div>
          </div>

          <button
            onClick={handleReset}
            className="w-full py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs transition border border-slate-700 flex items-center justify-center gap-2"
          >
            <RotateCcw size={14} /> Try Exercise Again
          </button>
        </div>
      )}
    </div>
  );
}
