"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const navLinks = [
  { label: "Accueil", href: "/#accueil" },
  { label: "À propos", href: "/#apropos" },
  { label: "Actualité", href: "/#actualites" },
  { label: "Formations", href: "/#formations" },
  { label: "Contact", href: "/#contact" },
];

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);

  useEffect(() => {
    document.body.classList.toggle("overflow-hidden", menuOpen || loginOpen);
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [menuOpen, loginOpen]);

  const closeAll = () => {
    setMenuOpen(false);
    setLoginOpen(false);
  };

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-white/40 bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 md:px-6">
          <Link href="/#accueil" className="group flex items-center gap-2">
            <span className="relative inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-sky-600 text-base font-semibold text-white shadow-inner">
              TC
              <span className="pointer-events-none absolute -inset-1 -z-10 rounded-3xl bg-sky-600/30 blur-xl" />
            </span>
            <span className="hidden select-none text-base font-semibold text-slate-900 sm:inline">Tech Campus</span>
          </Link>

          <nav className="hidden items-center gap-6 md:flex">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} className="text-sm font-medium text-slate-700 transition hover:text-sky-600">
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Link
              href="/#contact"
              className="hidden rounded-md bg-emerald-500 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-emerald-600 md:inline-flex"
            >
              Candidater
            </Link>
            <button
              type="button"
              onClick={() => setLoginOpen(true)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 transition hover:bg-slate-50"
              aria-haspopup="dialog"
              aria-expanded={loginOpen}
            >
              <span className="sr-only">Se connecter</span>
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 21a8 8 0 0 0-16 0" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </button>
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 transition hover:bg-slate-50 md:hidden"
              aria-label="Ouvrir le menu"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {menuOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          <div className="absolute inset-0 bg-black/30" role="button" aria-label="Fermer le menu" onClick={() => setMenuOpen(false)} />
          <aside className="ml-auto h-full w-72 bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b px-4 py-3">
              <p className="text-sm font-semibold">Menu</p>
              <button type="button" className="rounded-md p-2 hover:bg-slate-100" aria-label="Fermer le menu" onClick={() => setMenuOpen(false)}>
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>
            <nav className="grid gap-1 p-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="rounded-md px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100"
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/#contact"
                className="mt-2 inline-flex items-center justify-center rounded-md bg-emerald-500 px-3 py-2 text-sm font-semibold text-white hover:bg-emerald-600"
                onClick={() => setMenuOpen(false)}
              >
                Candidater
              </Link>
            </nav>
          </aside>
        </div>
      )}

      {loginOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40" onClick={closeAll} />
          <div role="dialog" aria-modal="true" className="relative z-10 w-full max-w-md rounded-2xl border border-slate-100 bg-white p-6 shadow-2xl">
            <div className="mb-4 flex items-start justify-between gap-6">
              <div>
                <p className="text-lg font-semibold text-slate-900">Connexion</p>
                <p className="text-sm text-slate-500">Espace admissions réservé à l’équipe.</p>
              </div>
              <button type="button" className="rounded-md p-2 hover:bg-slate-100" onClick={closeAll} aria-label="Fermer la fenêtre">
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>
            <form className="grid gap-4">
              <label className="grid gap-1 text-sm">
                Email
                <input type="email" className="rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-sky-500/60" placeholder="vous@techcampus.fr" />
              </label>
              <label className="grid gap-1 text-sm">
                Mot de passe
                <input type="password" className="rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-sky-500/60" placeholder="••••••••" />
              </label>
              <button type="button" className="rounded-lg bg-sky-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-sky-700" onClick={closeAll}>
                Se connecter
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

