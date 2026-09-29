import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sobre mí",

  description:
    "Más de 20 años conectando tecnología, personas y necesidades reales de negocio.",

  alternates: {
    canonical: "/sobre-mi",
  },

  openGraph: {
    title:
      "Sobre mí | Leandro Layerle",

    description:
      "Más de 20 años conectando tecnología, personas y necesidades reales de negocio.",

    url: "/sobre-mi",
  },
};

export default function SobreMiLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}