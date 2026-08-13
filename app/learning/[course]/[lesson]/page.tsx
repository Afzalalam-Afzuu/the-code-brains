import React from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getCourseById, getLessonById } from "../../../../lib/learning-data";
import LiveCodeRunner from "../../../../components/learning/LiveCodeRunner";
import LessonQuizCard from "../../../../components/learning/LessonQuiz";
import LearningFooterNav from "../../../../components/learning/LearningFooterNav";
import { Clock, BookOpen, Sparkles, Code } from "lucide-react";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ course: string; lesson: string }>;
}) {
  const resolvedParams = await params;
  const result = getLessonById(resolvedParams.course, resolvedParams.lesson);
  if (!result) return { title: "Lesson Not Found" };

  return {
    title: `${result.lesson.title} - ${result.lesson.category} | TheCodeBrains Tutorials`,
    description: result.lesson.summary,
  };
}

export default async function DynamicLessonPage({
  params,
}: {
  params: Promise<{ course: string; lesson: string }>;
}) {
  const resolvedParams = await params;
  const course = getCourseById(resolvedParams.course);
  const result = getLessonById(resolvedParams.course, resolvedParams.lesson);

  if (!course || !result) {
    notFound();
  }

  const { lesson, index } = result;

  return (
    <article className="space-y-8 font-sans">
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center gap-2 text-xs font-mono text-slate-400">
        <Link href="/learning" className="hover:text-indigo-400 transition">Tutorials</Link>
        <span>/</span>
        <span className="text-slate-300 font-bold">{course.title}</span>
        <span>/</span>
        <span className="text-indigo-400 font-bold">{lesson.category}</span>
      </nav>

      {/* Lesson Header Title Card */}
      <div className="space-y-3 pb-6 border-b border-slate-800">
        <div className="flex flex-wrap items-center gap-2">
          <span className="bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 text-[10px] font-mono font-bold px-3 py-0.5 rounded-full uppercase">
            {lesson.category}
          </span>
          <span className="bg-slate-800 text-slate-300 text-[10px] font-mono font-bold px-3 py-0.5 rounded-full flex items-center gap-1">
            <Clock size={11} className="text-slate-400" /> {lesson.readTime}
          </span>
          <span className="bg-slate-800 text-slate-400 text-[10px] font-mono font-bold px-3 py-0.5 rounded-full">
            Lesson {index + 1} of {course.lessons.length}
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight leading-tight">
          {lesson.title}
        </h1>

        <p className="text-slate-300 text-sm sm:text-base font-medium leading-relaxed max-w-3xl">
          {lesson.summary}
        </p>
      </div>

      {/* Main Lesson Content */}
      <div className="prose prose-invert prose-indigo max-w-none space-y-6 text-slate-300 text-sm sm:text-base leading-relaxed">
        {lesson.content.split("\n\n").map((paragraph, pIdx) => {
          if (paragraph.startsWith("### ")) {
            return (
              <h3 key={pIdx} className="text-xl font-extrabold text-white pt-4 pb-1 border-b border-slate-800 flex items-center gap-2">
                <BookOpen size={18} className="text-indigo-400" />
                {paragraph.replace("### ", "")}
              </h3>
            );
          }

          if (paragraph.startsWith("```")) {
            const lines = paragraph.split("\n");
            const lang = lines[0].replace("```", "").trim();
            const codeContent = lines.slice(1, -1).join("\n");
            return (
              <div key={pIdx} className="my-4 rounded-xl overflow-hidden bg-slate-900 border border-slate-800 p-4 font-mono text-xs text-sky-300">
                <div className="flex items-center justify-between mb-2 text-[10px] font-bold text-slate-500 uppercase">
                  <span className="flex items-center gap-1"><Code size={12} /> {lang || "code"}</span>
                </div>
                <pre className="overflow-x-auto whitespace-pre-wrap">{codeContent}</pre>
              </div>
            );
          }

          if (paragraph.startsWith("- ")) {
            const items = paragraph.split("\n- ");
            return (
              <ul key={pIdx} className="space-y-1.5 list-disc list-inside bg-slate-900/60 p-4 rounded-xl border border-slate-800 text-sm">
                {items.map((item, iIdx) => (
                  <li key={iIdx} className="text-slate-300">
                    <span dangerouslySetInnerHTML={{ __html: item.replace("- ", "").replace(/\*\*(.*?)\*\*/g, "<strong class='text-white'>$1</strong>").replace(/`(.*?)`/g, "<code class='bg-slate-800 text-emerald-300 px-1.5 py-0.5 rounded font-mono text-xs'>$1</code>") }} />
                  </li>
                ))}
              </ul>
            );
          }

          return (
            <p key={pIdx} dangerouslySetInnerHTML={{ __html: paragraph.replace(/\*\*(.*?)\*\*/g, "<strong class='text-white font-bold'>$1</strong>").replace(/`(.*?)`/g, "<code class='bg-slate-800 text-emerald-300 px-1.5 py-0.5 rounded font-mono text-xs'>$1</code>") }} />
          );
        })}
      </div>

      {/* Live "Try It Yourself" Editor Component */}
      {lesson.codeExample?.html && (
        <div className="pt-4">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles size={16} className="text-emerald-400" />
            <h2 className="text-lg font-black text-white">Interactive Sandbox</h2>
          </div>
          <LiveCodeRunner
            initialCode={lesson.codeExample.html}
            title={lesson.codeExample.title || "Try It Yourself Editor"}
          />
        </div>
      )}

      {/* Interactive Quiz / Practice Exercise */}
      {lesson.quiz && (
        <LessonQuizCard quiz={lesson.quiz} />
      )}

      {/* Previous & Next Chapter Controller */}
      <LearningFooterNav course={course} currentIndex={index} />
    </article>
  );
}
