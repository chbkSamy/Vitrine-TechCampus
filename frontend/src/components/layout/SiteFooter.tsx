export function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 py-10 text-sm text-slate-500 sm:flex-row md:px-6">
        <div className="flex items-center gap-3 text-slate-700">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-2xl bg-sky-600 text-xs font-semibold text-white">TC</span>
          <p>© {year} Tech Campus — Tous droits réservés.</p>
        </div>
        <div className="flex items-center gap-6">
          <a href="#" className="hover:text-slate-700">
            Mentions légales
          </a>
          <a href="#" className="hover:text-slate-700">
            Politique de confidentialité
          </a>
        </div>
      </div>
    </footer>
  );
}

