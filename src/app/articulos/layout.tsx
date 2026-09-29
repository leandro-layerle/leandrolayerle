import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Artículos",

  description:
    "Artículos sobre desarrollo de software, arquitectura, .NET, inteligencia artificial y tecnología aplicada.",

  alternates: {
    canonical: "/articulos",
  },

  openGraph: {
    title:
      "Artículos | Leandro Layerle",

    description:
      "Desarrollo, arquitectura, inteligencia artificial y tecnología aplicada desde la experiencia.",

    url: "/articulos",
  },
};

export default function ArticulosLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}