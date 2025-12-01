import { getHomeContent } from "@/lib/content";
import { HeroSection } from "@/components/sections/HeroSection";
import { HighlightsSection } from "@/components/sections/HighlightsSection";
import { LatestNewsSection } from "@/components/sections/LatestNewsSection";
import { ProgramsSection } from "@/components/sections/ProgramsSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";

export default async function HomePage() {
  const { hero, highlights, latestNews, programs, contact } = await getHomeContent();

  return (
    <div className="space-y-16">
      <HeroSection hero={hero} id="accueil" />
      <LatestNewsSection news={latestNews} id="actualites" />
      <HighlightsSection highlights={highlights} id="apropos" />
      <ProgramsSection programs={programs} id="formations" />
      <TestimonialsSection id="temoignages" />
      <ContactSection contact={contact} id="contact" />
    </div>
  );
}
