import Link from "next/link";

import { ContactSettings } from "@/types/content";
import { SectionHeading } from "@/components/common/SectionHeading";

interface ContactSectionProps {
  contact: ContactSettings | null;
  id?: string;
}

const fallbackContact: ContactSettings = {
  title: "Contact",
  description: "Une question sur nos cursus ou l’admission ? Écrivez-nous, l’équipe répond sous 48h.",
  email: "contact@techcampus.fr",
  phone: "+33 1 23 45 67 89",
};

export function ContactSection({ contact, id = "contact" }: ContactSectionProps) {
  const content = contact ?? fallbackContact;

  return (
    <section id={id} className="rounded-3xl border border-slate-100 bg-white px-6 py-16 shadow-sm sm:px-10">
      <SectionHeading eyebrow="Contact" title={content.title} description={content.description} />
      <div className="mt-10 grid gap-8 lg:grid-cols-2">
        <form className="grid gap-4 rounded-3xl border border-slate-100 bg-white p-6 shadow-sm">
          <label className="grid gap-1 text-sm font-medium text-slate-700">
            Nom complet
            <input
              type="text"
              placeholder="Votre nom"
              className="rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-700 outline-none focus:ring-2 focus:ring-sky-500/50"
            />
          </label>
          <label className="grid gap-1 text-sm font-medium text-slate-700">
            Email
            <input
              type="email"
              placeholder="vous@example.com"
              className="rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-700 outline-none focus:ring-2 focus:ring-sky-500/50"
            />
          </label>
          <label className="grid gap-1 text-sm font-medium text-slate-700">
            Message
            <textarea
              rows={4}
              placeholder="Votre message..."
              className="rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-700 outline-none focus:ring-2 focus:ring-sky-500/50"
            />
          </label>
          <button type="button" className="inline-flex items-center justify-center rounded-xl bg-sky-600 px-4 py-2 text-sm font-semibold text-white hover:bg-sky-700">
            Envoyer
          </button>
          {content.formEnabled === false && (
            <p className="text-xs text-slate-500">Activez le formulaire côté Strapi pour recevoir les messages.</p>
          )}
        </form>
        <div className="rounded-3xl border border-emerald-100 bg-gradient-to-br from-sky-50 to-emerald-50 p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-slate-900">Nous écrire</h3>
          <div className="mt-4 space-y-4 text-sm text-slate-700">
            <p className="flex items-center gap-2">
              <svg className="h-4 w-4 text-sky-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 12h-4l-3 9L9 3 6 12H2" />
              </svg>
              <Link href={`mailto:${content.email}`} className="font-semibold text-slate-900 hover:text-slate-600">
                {content.email}
              </Link>
            </p>
            {content.phone && (
              <p className="flex items-center gap-2">
                <svg className="h-4 w-4 text-sky-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92V19a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4 2h2.09a2 2 0 0 1 2 1.72c.12.89.3 1.76.57 2.6a2 2 0 0 1-.45 2.11L7 9a16 16 0 0 0 8 8l.57-1.21a2 2 0 0 1 2.11-.45c.84.27 1.71.45 2.6.57A2 2 0 0 1 22 16.92z" />
                </svg>
                <Link href={`tel:${content.phone}`} className="font-semibold text-slate-900 hover:text-slate-600">
                  {content.phone}
                </Link>
              </p>
            )}
            <p>Campus Paris — 10 rue de l’Innovation, 75000.</p>
            <p className="text-xs text-slate-500">Lundi au vendredi, 9h-18h.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

