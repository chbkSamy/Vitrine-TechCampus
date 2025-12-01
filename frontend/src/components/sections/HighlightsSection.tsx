import { Highlight } from "@/types/content";

interface HighlightsSectionProps {
  highlights: Highlight[];
  id?: string;
}

const fallbackHighlights: Highlight[] = [
  {
    title: "Pédagogie par projets",
    description: "Apprenez en réalisant des cas concrets encadrés par des pros du numérique.",
    icon: "🚀",
  },
  {
    title: "Rythme adapté",
    description: "Initial, alternance ou formation continue : choisissez le format qui vous ressemble.",
    icon: "📅",
  },
  {
    title: "Réseau d’entreprises",
    description: "Profitez d’un réseau de partenaires pour vos stages et votre alternance.",
    icon: "🤝",
  },
];

export function HighlightsSection({ highlights, id = "apropos" }: HighlightsSectionProps) {
  const cards = highlights.length ? highlights.slice(0, 3) : fallbackHighlights;

  return (
    <section id={id} className="rounded-3xl bg-gradient-to-b from-white to-sky-50/40 px-6 py-16 shadow-sm sm:px-10">
      <div className="mx-auto max-w-4xl">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-sky-600">À propos</p>
        <h2 className="mt-3 text-3xl font-semibold text-slate-900">L’école ancrée dans le réel</h2>
        <p className="mt-2 text-base text-slate-600">Tech Campus forme aux métiers du numérique avec une approche pratique et un suivi personnalisé.</p>
      </div>
      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {cards.map((highlight) => (
          <article key={highlight.id || highlight.title} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-sky-100 text-xl">{highlight.icon || "★"}</div>
            <h3 className="mt-4 text-lg font-semibold text-slate-900">{highlight.title}</h3>
            <p className="mt-2 text-sm text-slate-600">{highlight.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

