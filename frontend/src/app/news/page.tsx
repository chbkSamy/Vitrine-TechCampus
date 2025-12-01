import { Metadata } from "next";
import { getNews } from "@/lib/content";
import { SectionHeading } from "@/components/common/SectionHeading";
import { NewsCard } from "@/components/news/NewsCard";

export const metadata: Metadata = {
  title: "Actualités",
  description: "Retrouvez les dernières actualités, projets et événements du Tech Campus.",
};

export default async function NewsPage() {
  const news = await getNews();

  return (
    <div className="space-y-10">
      <SectionHeading
        eyebrow="Actualités"
        title="Toute la vie du campus"
        description="Événements, retours d’expérience, interviews d’étudiants et annonces importantes."
      />
      {news.length === 0 ? (
        <p className="rounded-2xl border border-dashed border-slate-300 bg-white p-6 text-sm text-slate-500">
          Aucune actualité publiée pour le moment. Publiez un article dans Strapi pour le voir apparaître ici.
        </p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {news.map((item) => (
            <NewsCard key={item.slug} item={item} />
          ))}
        </div>
      )}
    </div>
  );
}

