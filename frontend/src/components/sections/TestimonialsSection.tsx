const fallbackTestimonials = [
  {
    quote: "L’accompagnement carrière et les projets concrets m’ont permis d’être opérationnelle dès mon alternance.",
    author: "Lina R.",
    role: "Développeuse Front",
  },
  {
    quote: "Des mentors disponibles et une pédagogie par la pratique. Les mises en situation pro sont ultra formatrices.",
    author: "Yassine B.",
    role: "Data Analyst",
  },
  {
    quote: "Le studio design et les critiques collectives ont boosté mon portfolio et ma confiance en entretien.",
    author: "Camille D.",
    role: "UX Designer",
  },
];

interface Testimonial {
  quote: string;
  author: string;
  role: string;
}

interface TestimonialsSectionProps {
  id?: string;
  testimonials?: Testimonial[];
}

export function TestimonialsSection({ id = "temoignages", testimonials = fallbackTestimonials }: TestimonialsSectionProps) {
  return (
    <section id={id} className="rounded-3xl bg-gradient-to-b from-white to-emerald-50/50 px-6 py-16 shadow-sm sm:px-10">
      <div className="mx-auto max-w-4xl text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-600">Témoignages</p>
        <h2 className="mt-3 text-3xl font-semibold text-slate-900">Ils nous recommandent</h2>
        <p className="mt-2 text-base text-slate-600">Étudiants et alumni partagent leur expérience au Tech Campus.</p>
      </div>
      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {testimonials.map((testimonial) => (
          <figure key={testimonial.author} className="rounded-2xl border border-emerald-100 bg-white p-6 text-left shadow-sm">
            <blockquote className="text-base text-slate-700">{`“${testimonial.quote}”`}</blockquote>
            <figcaption className="mt-4 text-sm text-slate-600">
              <span className="font-semibold text-slate-900">{testimonial.author}</span> — {testimonial.role}
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}

