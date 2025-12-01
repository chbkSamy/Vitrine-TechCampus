interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
}

export function SectionHeading({ eyebrow, title, description, align = "left" }: SectionHeadingProps) {
  return (
    <div className={`space-y-2 ${align === "center" ? "text-center" : "text-left"}`}>
      {eyebrow && <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-600">{eyebrow}</p>}
      <h2 className="text-3xl font-semibold text-slate-900">{title}</h2>
      {description && <p className="text-base text-slate-600">{description}</p>}
    </div>
  );
}

