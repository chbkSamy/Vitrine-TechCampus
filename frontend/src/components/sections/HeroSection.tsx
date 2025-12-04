import Image from "next/image";
import Link from "next/link";

import { Hero } from "@/types/content";
import { resolveMediaUrl } from "@/lib/strapi";

interface HeroSectionProps {
  hero: Hero | null;
  id?: string;
}

export function HeroSection({ hero, id = "accueil" }: HeroSectionProps) {
  console.log("Hero reçu :", hero);
  const content = {
    title: "Tech Campus, l’école des bâtisseurs du numérique",
    subtitle: "Formations métiers du digital, projets concrets, accompagnement personnalisé.",
    ctaLabel: "Découvrir nos programmes",
    ctaUrl: "/programs",

    image: hero?.image ?? null,
  };

  const imageUrl = resolveMediaUrl(content.image?.url);

  return (
    <section id={id} className="relative overflow-hidden rounded-3xl bg-white px-6 py-16 shadow-sm sm:px-10 lg:px-14">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-32 left-1/2 h-[40rem] w-[50rem] -translate-x-1/2 rounded-full bg-sky-200/40 blur-3xl" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-white" />
      </div>
      <div className="grid max-w-6xl items-center gap-10 lg:grid-cols-[1.1fr,0.9fr]">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/70 px-3 py-1 text-xs font-semibold text-slate-600 backdrop-blur">
            <svg className="h-4 w-4 text-sky-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 12h-4l-3 9L9 3 6 12H2" />
            </svg>
            L’école des métiers du numérique
          </span>
          <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">{content.title}</h1>
          <p className="mt-5 max-w-2xl text-lg text-slate-600">{content.subtitle}</p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link
              href={content.ctaUrl}
              className="inline-flex items-center rounded-xl bg-sky-600 px-5 py-3 text-sm font-semibold text-white shadow hover:bg-sky-700"
            >
              {content.ctaLabel}
              <svg className="ml-2 h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </Link>
            <Link
              href="#contact"
              className="inline-flex items-center rounded-xl border border-emerald-600 px-5 py-3 text-sm font-semibold text-emerald-600 hover:bg-emerald-50"
            >
              Candidater
            </Link>
          </div>
        </div>
        <div className="relative">
          <div className="aspect-[4/3] w-full overflow-hidden rounded-[32px] border border-white bg-white shadow-xl">
            {imageUrl ? (
               <img src={imageUrl} alt={content.image?.alternativeText || content.title} className="h-[480px] w-full object-cover" />
            ) : (
              <div className="flex h-full items-center justify-center bg-slate-100 text-sm text-slate-500">Image à venir</div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
