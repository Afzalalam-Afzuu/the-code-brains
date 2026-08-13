"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { CheckCircle2, Circle, ChevronRight, BookOpen, Menu, X, Sparkles } from "lucide-react";
import { Course } from "../../lib/learning-data";

interface LearningSidebarProps {
  course: Course;
  currentLessonId: string;
}

export default function LearningSidebar({ course, currentLessonId }: LearningSidebarProps) {
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(`completed_${course.id}`);
      if (saved) {
        setCompletedLessons(JSON.parse(saved));
      }
    } catch {
      // Fallback
    }
  }, [course.id]);

  const toggleComplete = (lessonId: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    let updated: string[];
    if (completedLessons.includes(lessonId)) {
      updated = completedLessons.filter((id) => id !== lessonId);
    } else {
      updated = [...completedLessons, lessonId];
    }
    setCompletedLessons(updated);
    try {
      localStorage.setItem(`completed_${course.id}`, JSON.stringify(updated));
    } catch {
      // Fallback
    }
  };

  const progressPercent = Math.round((completedLessons.length / course.lessons.length) * 100);

  return (
    <>
      {/* Mobile Sidebar Drawer Toggle Button */}
      <div className="lg:hidden sticky top-16 z-30 bg-slate-900 border-b border-slate-800 px-4 py-2.5 flex items-center justify-between text-white">
        <button
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className="flex items-center gap-2 text-xs font-bold bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-700"
        >
          {isMobileOpen ? <X size={16} /> : <Menu size={16} />}
          <span>Course Navigation</span>
        </button>
        <div className="flex items-center gap-2 text-xs font-mono">
          <span className="text-slate-400">Progress:</span>
          <span className="text-emerald-400 font-bold">{progressPercent}%</span>
        </div>
      </div>

      {/* Sidebar Overlay for Mobile */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-slate-950/80 backdrop-blur-xs z-40 lg:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Main Sidebar Panel */}
      <aside
        className={`fixed lg:sticky top-16 left-0 z-40 h-[calc(100vh-4rem)] w-72 bg-slate-950 border-r border-slate-800 text-slate-200 flex flex-col transition-transform duration-300 ${
          isMobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        {/* Course Header & Progress Bar */}
        <div className="p-4 border-b border-slate-800 bg-slate-900/60 shrink-0">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-2xl">{course.icon}</span>
            <div>
              <h2 className="font-extrabold text-sm text-white tracking-tight leading-snug">{course.title}</h2>
              <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-widest flex items-center gap-1">
                <Sparkles size={10} /> W3-Style Interactive
              </span>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mt-3 space-y-1">
            <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
              <span>Course Completion</span>
              <span className="text-emerald-400 font-bold">{progressPercent}%</span>
            </div>
            <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        </div>

        {/* Chapter Lessons Menu */}
        <div className="flex-1 overflow-y-auto p-3 space-y-1 scrollbar-thin">
          <div className="px-2 py-1.5 text-[10px] font-mono font-bold text-slate-500 uppercase tracking-widest flex items-center gap-1">
            <BookOpen size={12} /> Course Chapters
          </div>

          {course.lessons.map((lesson, idx) => {
            const isActive = lesson.id === currentLessonId;
            const isDone = completedLessons.includes(lesson.id);

            return (
              <Link
                key={lesson.id}
                href={`/learning/${course.id}/${lesson.id}`}
                onClick={() => setIsMobileOpen(false)}
                className={`group flex items-center justify-between p-2.5 rounded-xl text-xs font-semibold transition-all ${
                  isActive
                    ? "bg-indigo-600 text-white font-extrabold shadow-md shadow-indigo-600/20"
                    : "text-slate-300 hover:bg-slate-900 hover:text-white"
                }`}
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <span className={`font-mono text-[10px] w-4 text-center shrink-0 ${isActive ? "text-indigo-200" : "text-slate-500"}`}>
                    {idx + 1}.
                  </span>
                  <span className="truncate">{lesson.title}</span>
                </div>

                <div className="flex items-center gap-1 shrink-0">
                  <button
                    onClick={(e) => toggleComplete(lesson.id, e)}
                    className="p-0.5 hover:scale-110 transition text-slate-500 hover:text-emerald-400"
                    title={isDone ? "Mark as Incomplete" : "Mark as Completed"}
                  >
                    {isDone ? (
                      <CheckCircle2 size={16} className={isActive ? "text-emerald-300" : "text-emerald-400"} />
                    ) : (
                      <Circle size={16} className={isActive ? "text-indigo-300" : "text-slate-700"} />
                    )}
                  </button>
                  <ChevronRight size={14} className={`opacity-40 group-hover:opacity-100 ${isActive ? "opacity-100" : ""}`} />
                </div>
              </Link>
            );
          })}
        </div>

        {/* Footer Back Link */}
        <div className="p-3 border-t border-slate-800 bg-slate-900/40 shrink-0">
          <Link
            href="/learning"
            className="w-full py-2 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs font-bold transition flex items-center justify-center gap-1.5 border border-slate-800"
          >
            ← Back to All Courses
          </Link>
        </div>
      </aside>
    </>
  );
}
