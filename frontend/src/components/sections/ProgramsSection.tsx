import Link from "next/link";

import { Program } from "@/types/content";
import { SectionHeading } from "@/components/common/SectionHeading";
import { ProgramCard } from "@/components/programs/ProgramCard";

interface ProgramsSectionProps {
  programs: Program[];
  id?: string;
}

const fallbackPrograms: Program[] = [
  {
    id: 1,
    title: "Bachelor Développement Web",
    slug: "bachelor-developpement-web",
    level: "Bac+3",
    type: "Initial",
    shortDescription: "TypeScript, PHP/Laravel, React, CI/CD et projets agiles pour accélérer sur le web.",
  },
  {
    id: 2,
    title: "Master Data & IA",
    slug: "master-data-ia",
    level: "Bac+5",
    type: "Alternance",
    shortDescription: "Python, MLOps, NLP et gouvernance de la donnée avec des cas concrets d’entreprise.",
  },
  {
    id: 3,
    title: "Cybersecurity Essentials",
    slug: "cybersecurity-essentials",
    level: "Bac+4",
    type: "Initial",
    shortDescription: "Pentest, SecOps et normes ISO pour sécuriser SI et infrastructures cloud.",
  },
  {
    id: 4,
    title: "Product Design UX/UI",
    slug: "product-design-ux-ui",
    level: "Bac+5",
    type: "Continu",
    shortDescription: "Design systems, prototypage Figma, accessibilité et tests utilisateurs.",
  },
];

export function ProgramsSection({ programs, id = "formations" }: ProgramsSectionProps) {
  const displayed = (programs.length ? programs : fallbackPrograms).slice(0, 4);

  return (
    <section id={id} className="rounded-3xl border border-slate-100 bg-white px-6 py-16 shadow-sm sm:px-10">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <SectionHeading
          eyebrow="Formations"
          title="Des parcours du Bac+3 au Bac+5"
          description="Initial, alternance ou formation continue — choisissez le format qui correspond à vos objectifs."
        />
        <Link href="/programs" className="inline-flex items-center rounded-xl bg-emerald-500 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-600">
          Tous les programmes
        </Link>
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        {displayed.map((program) => (
          <ProgramCard key={program.slug} program={program} />
        ))}
      </div>
    </section>
  );
}

