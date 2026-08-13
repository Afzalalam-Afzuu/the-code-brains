"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";
import { Course, Lesson } from "../../lib/learning-data";

interface LearningFooterNavProps {
  course: Course;
  currentIndex: number;
}

export default function LearningFooterNav({ course, currentIndex }: LearningFooterNavProps) {
  const prevLesson: Lesson | undefined = course.lessons[currentIndex - 1];
  const nextLesson: Lesson | undefined = course.lessons[currentIndex + 1];

  return (
    <div className="my-10 pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 font-sans">
      {/* Previous Lesson Button */}
      {prevLesson ? (
        <Link
          href={`/learning/${course.id}/${prevLesson.id}`}
          className="w-full sm:w-auto bg-slate-900 hover:bg-indigo-600 text-white px-5 py-3 rounded-xl font-bold text-xs transition flex items-center justify-center gap-2 shadow-md group"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          <span>❮ Previous: {prevLesson.title}</span>
        </Link>
      ) : (
        <div className="w-full sm:w-auto bg-slate-100 text-slate-400 px-5 py-3 rounded-xl font-bold text-xs border border-slate-200 text-center">
          First Lesson of Course
        </div>
      )}

      {/* Next Lesson Button */}
      {nextLesson ? (
        <Link
          href={`/learning/${course.id}/${nextLesson.id}`}
          className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-500 text-white px-6 py-3 rounded-xl font-bold text-xs transition flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/20 group"
        >
          <span>Next: {nextLesson.title} ❯</span>
          <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
        </Link>
      ) : (
        <div className="w-full sm:w-auto bg-emerald-100 border border-emerald-300 text-emerald-800 px-5 py-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2">
          <CheckCircle2 size={16} className="text-emerald-600" />
          <span>Course Completed! 🎉</span>
        </div>
      )}
    </div>
  );
}
