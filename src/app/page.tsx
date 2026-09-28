import type { Metadata } from "next";

import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Projects from "@/components/Projects";
import Articles from "@/components/Articles";
import Mentorias from "@/components/Mentorias";
import ContactCTA from "@/components/ContactCTA";

export const metadata: Metadata = {
  title:
    "Leandro Layerle | Consultoría Tecnológica y Automatización",

  description:
    "Consultoría tecnológica, automatización, integraciones, software a medida, inteligencia artificial aplicada y mentoría.",

  alternates: {
    canonical: "/",
  },

  openGraph: {
    title:
      "Leandro Layerle | Consultoría Tecnológica y Automatización",

    description:
      "Tecnología para resolver problemas reales, mejorar procesos y acompañar el crecimiento de negocios y profesionales.",

    url: "/",
  },
};

export default function Home() {
  return (
    <main>
      <Hero />
      <Services />
      <Projects />
      <Articles />
      <Mentorias />
      <ContactCTA />
    </main>
  );
}