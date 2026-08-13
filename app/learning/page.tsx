import React from "react";
import Link from "next/link";
import { BookOpen, Sparkles, Code, Play, CheckCircle, GraduationCap, ArrowRight } from "lucide-react";
import { COURSES } from "../../lib/learning-data";

export const metadata = {
  title: "Interactive Web Developer Tutorials & Code Sandbox — TheCodeBrains",
  description: "Learn HTML5, CSS3, JavaScript, React, and Python with W3-style interactive lessons, live code playground, and exercises.",
};

export default function LearningHubPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Top Banner Header */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950/60 to-slate-900 border-b border-slate-800 py-12 px-4 sm:px-8">
        <div className="max-w-6xl mx-auto space-y-4 text-center md:text-left">
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
            <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-mono font-bold px-3 py-1 rounded-full uppercase flex items-center gap-1.5 shadow-xs">
              <Sparkles size={13} /> W3-Schools Learning Pattern
            </span>
            <span className="bg-slate-800 text-slate-300 border border-slate-700 text-xs font-mono font-bold px-3 py-1 rounded-full uppercase">
              100% Free Interactive Tutorials
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight">
            Master Web Development <br />
            <span className="bg-gradient-to-r from-indigo-400 via-sky-400 to-emerald-400 bg-clip-text text-transparent">
              With Interactive Live Code Sandboxes
            </span>
          </h1>

          <p className="text-slate-300 text-sm sm:text-base font-medium max-w-2xl leading-relaxed">
            Step-by-step programming tutorials with live browser code runners, instant exercises, and progress tracking — built for engineers and students.
          </p>

          {/* Key Feature Badges */}
          <div className="pt-2 flex flex-wrap items-center justify-center md:justify-start gap-3 text-xs font-mono text-slate-300">
            <span className="flex items-center gap-1.5 bg-slate-900/90 border border-slate-800 px-3 py-1.5 rounded-lg">
              <Play size={13} className="text-emerald-400" /> "Try It Yourself" Sandbox
            </span>
            <span className="flex items-center gap-1.5 bg-slate-900/90 border border-slate-800 px-3 py-1.5 rounded-lg">
              <CheckCircle size={13} className="text-indigo-400" /> Chapter Quizzes
            </span>
            <span className="flex items-center gap-1.5 bg-slate-900/90 border border-slate-800 px-3 py-1.5 rounded-lg">
              <GraduationCap size={13} className="text-amber-400" /> Self-Paced Progress
            </span>
          </div>
        </div>
      </div>

      {/* Courses Grid */}
      <main className="max-w-6xl mx-auto px-4 py-12 space-y-12">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-black text-white tracking-tight flex items-center gap-2">
              <BookOpen size={22} className="text-indigo-400" /> Available Courses
            </h2>
            <p className="text-xs text-slate-400 font-medium">Select a language to begin interactive lessons</p>
          </div>
          <Link
            href="/learning/udemy"
            className="text-xs font-bold text-indigo-400 hover:text-indigo-300 flex items-center gap-1 hover:underline"
          >
            Browse Udemy Courses →
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {COURSES.map((course) => {
            const firstLesson = course.lessons[0];
            return (
              <div
                key={course.id}
                className="bg-slate-900/90 border border-slate-800 hover:border-slate-700 rounded-2xl p-6 shadow-xl flex flex-col justify-between hover:-translate-y-1 transition duration-300 group"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-4xl p-3 bg-slate-950 rounded-2xl border border-slate-800 group-hover:scale-110 transition">
                      {course.icon}
                    </span>
                    <span className="text-[10px] font-mono font-bold bg-slate-800 text-slate-300 px-2.5 py-1 rounded-full uppercase">
                      {course.lessons.length} Lessons
                    </span>
                  </div>

                  <div>
                    <h3 className="text-xl font-black text-white group-hover:text-indigo-400 transition">
                      {course.title}
                    </h3>
                    <p className="text-xs text-slate-400 font-medium leading-relaxed mt-1">
                      {course.description}
                    </p>
                  </div>

                  {/* Sample Chapter Pills */}
                  <div className="space-y-1.5 pt-2">
                    <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">Core Topics:</span>
                    <div className="flex flex-wrap gap-1.5">
                      {course.lessons.slice(0, 3).map((l) => (
                        <span key={l.id} className="text-[11px] bg-slate-950 text-slate-300 border border-slate-800 px-2 py-0.5 rounded-md font-mono">
                          {l.title}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-slate-800/80 mt-6">
                  {firstLesson && (
                    <Link
                      href={`/learning/${course.id}/${firstLesson.id}`}
                      className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-3 px-4 rounded-xl text-xs transition flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/20"
                    >
                      <span>Start Learning {course.title.split(" ")[0]}</span>
                      <ArrowRight size={14} />
                    </Link>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Feature Highlights Section */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 text-center space-y-6">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400">
            <Code size={24} />
          </div>
          <div className="max-w-2xl mx-auto space-y-2">
            <h3 className="text-xl sm:text-2xl font-black text-white">Why Learn With TheCodeBrains?</h3>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-medium">
              Modeled after W3Schools & modern interactive coding bootcamps. Practice code directly inside your browser without installing compilers or local servers.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-4xl mx-auto text-left pt-4">
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
              <h4 className="font-bold text-xs text-white mb-1">⚡ Live "Try It Yourself" Sandbox</h4>
              <p className="text-[11px] text-slate-400">Write HTML, CSS, and JS in a split-screen browser editor with real-time output preview.</p>
            </div>
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
              <h4 className="font-bold text-xs text-white mb-1">🎯 Interactive Quizzes</h4>
              <p className="text-[11px] text-slate-400">Test your mastery at the end of every chapter with instant grading & explanations.</p>
            </div>
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
              <h4 className="font-bold text-xs text-white mb-1">📊 Saved Progress Tracker</h4>
              <p className="text-[11px] text-slate-400">Mark chapters as completed and resume your learning session anytime on your device.</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
