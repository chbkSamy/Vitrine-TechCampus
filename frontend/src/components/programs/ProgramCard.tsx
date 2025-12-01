import Link from "next/link";

import { Program } from "@/types/content";

interface ProgramCardProps {
  program: Program;
}

export function ProgramCard({ program }: ProgramCardProps) {
  return (
    <article className="flex h-full flex-col rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.3em] text-sky-600">
        <span>{program.level}</span>
        <span className="rounded-full bg-slate-100 px-3 py-1 text-[10px] tracking-[0.2em] text-slate-600">{program.type}</span>
      </div>
      <h3 className="mt-4 text-xl font-semibold text-slate-900">{program.title}</h3>
      <p className="mt-3 text-sm text-slate-600">{program.shortDescription}</p>
      <Link href={`/programs/${program.slug}`} className="mt-auto inline-flex items-center text-sm font-semibold text-sky-600 hover:text-sky-700">
        En savoir plus
        <svg className="ml-1 h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
          <line x1="5" y1="12" x2="19" y2="12" />
          <polyline points="12 5 19 12 12 19" />
        </svg>
      </Link>
    </article>
  );
}

