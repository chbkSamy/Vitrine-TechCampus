import { Metadata } from "next";

import { getPrograms } from "@/lib/content";
import { SectionHeading } from "@/components/common/SectionHeading";
import { ProgramCard } from "@/components/programs/ProgramCard";

export const metadata: Metadata = {
  title: "Programmes",
  description: "Programmes Tech Campus : web, data, produit, design… en initial ou en alternance.",
};

export default async function ProgramsPage() {
  const programs = await getPrograms();

  return (
    <div className="space-y-10">
      <SectionHeading
        eyebrow="Programmes"
        title="Choisissez votre parcours"
        description="Chaque programme est conçu avec des professionnels pour garantir une employabilité immédiate."
      />
      {programs.length === 0 ? (
        <p className="rounded-2xl border border-dashed border-slate-300 bg-white p-6 text-sm text-slate-500">
          Ajoutez vos programmes dans Strapi pour les voir apparaître ici.
        </p>
      ) : (
        <div className="grid gap-6 lg:grid-cols-2">
          {programs.map((program) => (
            <ProgramCard key={program.slug} program={program} />
          ))}
        </div>
      )}
    </div>
  );
}

