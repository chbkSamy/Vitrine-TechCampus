import Link from "next/link";

import { Program } from "@/types/content";
import { SectionHeading } from "@/components/common/SectionHeading";
import { ProgramCard } from "@/components/programs/ProgramCard";

interface ProgramsSectionProps {
  programs?: Program[];
  id?: string;
  title?: string;
  subtitle?: string;
}

// ... (rest of the file)

export function ProgramsSection({ programs, id = "formations", title, subtitle }: ProgramsSectionProps) {
  const displayed = (programs || []).slice(0, 4);

  return (
    <section id={id} className="rounded-3xl border border-slate-100 bg-white px-6 py-16 shadow-sm sm:px-10">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <SectionHeading
          eyebrow="Formations"
          title={title || "Des parcours du Bac+3 au Bac+5"}
          description={subtitle || "Initial, alternance ou formation continue — choisissez le format qui correspond à vos objectifs."}
        />
        <Link href="/programs" className="inline-flex items-center rounded-xl bg-emerald-500 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-600">
          Tous les programmes
        </Link>
      </div>
      {displayed.length === 0 ? (
        <p className="rounded-2xl border border-dashed border-slate-200 bg-slate-50/50 p-6 text-sm text-slate-500">
          Aucun programme disponible pour le moment.
        </p>
      ) : (
        <div className="grid gap-6 lg:grid-cols-2">
          {displayed.map((program) => (
            <ProgramCard key={program.slug} program={program} />
          ))}
        </div>
      )}
    </section>
  );
}

