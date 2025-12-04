import { getHomePageContent } from "@/lib/content";
import { ContactSection } from "@/components/sections/ContactSection";
import { HeroSection } from "@/components/sections/HeroSection";
import { HighlightsSection } from "@/components/sections/HighlightsSection";
import { LatestNewsSection } from "@/components/sections/LatestNewsSection";
import { ProgramsSection } from "@/components/sections/ProgramsSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";

export default async function Home() {
  const {
    hero,
    highlights,
    articles,
    programs,
    contact,
    programsTitle = "",
    programsSubtitle = "",
    articlesTitle = "",
    articlesSubtitle = "",
    testimonials = [],
  } = await getHomePageContent();

  return (
    <main className="flex min-h-screen flex-col">
      <HeroSection hero={hero} />
      <div className="flex flex-col gap-20 sm:gap-24 md:gap-28">
        <ProgramsSection
          programs={programs}
          title={programsTitle}
          subtitle={programsSubtitle}
        />
        <HighlightsSection highlights={highlights ?? []} />
        <LatestNewsSection
          articles={articles}
          title={articlesTitle}
          subtitle={articlesSubtitle}
        />
        <TestimonialsSection testimonials={testimonials ?? []} />
        <ContactSection contact={contact} />
      </div>
    </main>
  );
}
