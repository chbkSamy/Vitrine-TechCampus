import { notFound } from "next/navigation";
import { Metadata } from "next";

import { getNewsBySlug, getNewsSlugs } from "@/lib/content";
import { resolveMediaUrl } from "@/lib/strapi-utils";
import { formatFrenchDate } from "@/lib/date";

interface NewsDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = await getNewsSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: NewsDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const news = await getNewsBySlug(slug);
  if (!news) {
    return {
      title: "Actualité introuvable",
    };
  }
  return {
    title: news.title,
    description: news.excerpt,
  };
}

export default async function NewsDetailPage({ params }: NewsDetailPageProps) {
  const { slug } = await params;
  const news = await getNewsBySlug(slug);

  if (!news) {
    notFound();
  }

  const imageUrl = resolveMediaUrl(news.image?.url);

  return (
    <article className="space-y-8">
      <div className="space-y-4">
        <p className="text-sm uppercase tracking-[0.3em] text-slate-500">{formatFrenchDate(news.date)}</p>
        <h1 className="text-4xl font-semibold text-slate-900">{news.title}</h1>
        <p className="text-lg text-slate-600">{news.excerpt}</p>
      </div>
      {imageUrl && (
        <div className="overflow-hidden rounded-3xl">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={imageUrl} alt={news.image?.alternativeText || news.title} className="h-[480px] w-full object-cover" />
        </div>
      )}
      <div className="space-y-4 text-base leading-relaxed text-slate-700">
        {news.content.split("\n").map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>
    </article>
  );
}

