import Link from "next/link";

import { NewsItem } from "@/types/content";
import { SectionHeading } from "@/components/common/SectionHeading";
import { NewsCard } from "@/components/news/NewsCard";

interface LatestNewsSectionProps {
  articles?: NewsItem[];
  id?: string;
  title?: string;
  subtitle?: string;
}

export function LatestNewsSection({ articles, id = "actualites", title, subtitle }: LatestNewsSectionProps) {
  return (
    <section id={id} className="rounded-3xl border border-slate-100 bg-white px-6 py-16 shadow-sm sm:px-10">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <SectionHeading
          eyebrow="Actualité"
          title={title || "Toute la vie du campus"}
          description={subtitle || "Événements, projets étudiants et annonces importantes."}
        />
        <Link href="/news" className="text-sm font-semibold text-sky-600 hover:text-sky-700">
          Voir toutes →
        </Link>
      </div>
      {(articles?.length ?? 0) === 0 ? (
        <p className="rounded-2xl border border-dashed border-slate-200 bg-slate-50/50 p-6 text-sm text-slate-500">
          Publiez votre première actualité dans Strapi pour l’afficher automatiquement ici.
        </p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {articles?.map((item) => (
            <NewsCard key={item.id || item.slug} item={item} />
          ))}
        </div>
      )}
    </section>
  );
}

