import { Metadata } from "next";
import { notFound } from "next/navigation";

import { getProgramBySlug, getProgramSlugs } from "@/lib/content";

interface ProgramDetailPageProps {
  params: { slug: string };
}

export async function generateStaticParams() {
  const slugs = await getProgramSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: ProgramDetailPageProps): Promise<Metadata> {
  const { slug } = params;
  const program = await getProgramBySlug(slug);
  if (!program) {
    return {
      title: "Programme introuvable",
    };
  }
  return {
    title: program.title,
    description: program.shortDescription,
  };
}

export default async function ProgramDetailPage({ params }: ProgramDetailPageProps) {
  const { slug } = params;
  const program = await getProgramBySlug(slug);

  if (!program) {
    notFound();
  }

  return (
    <article className="space-y-10">
      <div className="space-y-3">
        <p className="text-sm uppercase tracking-[0.3em] text-slate-500">{program.level}</p>
        <h1 className="text-4xl font-semibold text-slate-900">{program.title}</h1>
        <p className="text-lg text-slate-600">{program.shortDescription}</p>
        <div className="flex flex-wrap gap-4 text-sm text-slate-500">
          <span className="rounded-full bg-slate-100 px-4 py-2">{program.type}</span>
          {program.duration && <span className="rounded-full bg-slate-100 px-4 py-2">{program.duration}</span>}
          {program.campus && <span className="rounded-full bg-slate-100 px-4 py-2">{program.campus}</span>}
        </div>
      </div>
      <div className="space-y-6 text-base leading-relaxed text-slate-700">
        <p>{program.longDescription ?? "Le détail du programme sera bientôt disponible."}</p>
        {program.prerequisites && (
          <div className="space-y-3">
            <h2 className="text-2xl font-semibold text-slate-900">Prérequis</h2>
            <p>{program.prerequisites}</p>
          </div>
        )}
      </div>
    </article>
  );
}

