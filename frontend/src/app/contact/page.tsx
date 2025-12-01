import { Metadata } from "next";

import { getContactSettings } from "@/lib/content";
import { ContactSection } from "@/components/sections/ContactSection";
import { SectionHeading } from "@/components/common/SectionHeading";

export const metadata: Metadata = {
  title: "Contact",
  description: "Prendre contact avec Tech Campus : email, téléphone et formulaire.",
};

export default async function ContactPage() {
  const contact = await getContactSettings();

  return (
    <div className="space-y-10">
      <SectionHeading
        eyebrow="Contact"
        title="Besoin d’un renseignement ?"
        description="Le service admissions est disponible pour répondre à vos questions sur les programmes, l’alternance ou les candidatures."
      />
      <ContactSection contact={contact} />
    </div>
  );
}

