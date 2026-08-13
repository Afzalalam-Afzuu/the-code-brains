import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getCourseById, COURSES } from "../../../lib/learning-data";
import LearningSidebar from "../../../components/learning/LearningSidebar";

export default async function CourseLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ course: string; lesson?: string }>;
}) {
  const resolvedParams = await params;
  const course = getCourseById(resolvedParams.course);

  if (!course) {
    notFound();
  }

  // Extract lesson ID if present from current route path
  const currentLessonId = resolvedParams.lesson || course.lessons[0]?.id || "";

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      {/* Top W3-Style Course Switcher Bar */}
      <header className="sticky top-0 z-30 bg-slate-900 border-b border-slate-800 px-4 py-2 flex items-center justify-between overflow-x-auto scrollbar-none shrink-0">
        <div className="flex items-center gap-1 sm:gap-2">
          <Link
            href="/learning"
            className="text-xs font-black text-white hover:text-indigo-400 px-2 py-1 rounded-md transition uppercase tracking-wider shrink-0 flex items-center gap-1"
          >
            <span>📚 W3-TUTORIALS</span>
          </Link>
          <span className="text-slate-700 font-bold">|</span>
          <div className="flex items-center gap-1">
            {COURSES.map((c) => {
              const isActive = c.id === course.id;
              const firstL = c.lessons[0];
              return (
                <Link
                  key={c.id}
                  href={`/learning/${c.id}/${firstL?.id || ""}`}
                  className={`text-xs font-bold px-3 py-1.5 rounded-lg transition shrink-0 flex items-center gap-1 ${
                    isActive
                      ? "bg-indigo-600 text-white shadow-sm"
                      : "text-slate-400 hover:text-white hover:bg-slate-800"
                  }`}
                >
                  <span>{c.icon}</span>
                  <span className="hidden sm:inline">{c.title.split(" ")[0]}</span>
                </Link>
              );
            })}
          </div>
        </div>

        <div className="hidden lg:flex items-center gap-3 text-xs font-mono shrink-0">
          <Link
            href="/tools"
            className="text-slate-400 hover:text-amber-400 font-semibold transition"
          >
            Web Tools Hub 🛠️
          </Link>
        </div>
      </header>

      {/* Main Workspace Layout */}
      <div className="flex-1 flex w-full">
        {/* Left Chapter Sidebar */}
        <LearningSidebar course={course} currentLessonId={currentLessonId} />

        {/* Lesson Content Area */}
        <main className="flex-1 min-w-0 max-w-5xl mx-auto px-4 sm:px-8 py-8">
          {children}
        </main>
      </div>
    </div>
  );
}
