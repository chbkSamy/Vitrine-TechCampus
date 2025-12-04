import Link from "next/link";
import Image from "next/image";

import { NewsItem } from "@/types/content";
import { resolveMediaUrl } from "@/lib/strapi-utils";
import { formatFrenchDate } from "@/lib/date";

interface NewsCardProps {
  item: NewsItem;
}

export function NewsCard({ item }: NewsCardProps) {
  const imageUrl = resolveMediaUrl(item.image?.url);
  return (
    <article className="flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      {imageUrl && (
        <div className="relative h-52 w-full">
          <Image src={imageUrl} alt={item.image?.alternativeText || item.title} fill className="object-cover" />
        </div>
      )}
      <div className="flex flex-1 flex-col p-6">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-sky-500">{formatFrenchDate(item.date)}</p>
        <h3 className="mt-3 text-xl font-semibold text-slate-900">{item.title}</h3>
        <p className="mt-3 flex-1 text-sm text-slate-600">{item.excerpt}</p>
        <Link href={`/news/${item.slug}`} className="mt-6 text-sm font-semibold text-sky-600">
          Lire l’article →
        </Link>
      </div>
    </article>
  );
}

