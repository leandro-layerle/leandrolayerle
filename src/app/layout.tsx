import type {
  Metadata,
} from "next";

import {
  Inter,
  Cormorant_Garamond,
} from "next/font/google";

import Header from "@/components/Header";
import Footer from "@/components/Footer";

import "./globals.css";

const sans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const serif =
  Cormorant_Garamond({
    subsets: ["latin"],
    variable: "--font-serif",
    display: "swap",

    weight: [
      "400",
      "500",
      "600",
      "700",
    ],
  });

export const metadata: Metadata = {
  metadataBase: new URL(
    "https://www.leandrolayerle.com.ar",
  ),

  title: {
    default:
      "Leandro Layerle | Consultoría tecnológica",

    template:
      "%s | Leandro Layerle",
  },

  description:
    "Consultoría tecnológica, automatización, integraciones, software a medida, inteligencia artificial aplicada y mentoría para profesionales.",

  applicationName:
    "Leandro Layerle",

  authors: [
    {
      name:
        "Leandro Layerle",
    },
  ],

  creator:
    "Leandro Layerle",

  publisher:
    "Leandro Layerle",

  category:
    "Tecnología",

  keywords: [
    "consultoría tecnológica",
    "automatización",
    "integraciones",
    "software a medida",
    "inteligencia artificial",
    "arquitectura de software",
    ".NET",
    "desarrollo de software",
    "mentor tecnología",
  ],


  openGraph: {
    type: "website",

    locale: "es_AR",

    url:
      "https://www.leandrolayerle.com.ar",

    siteName:
      "Leandro Layerle",

    title:
      "Leandro Layerle | Consultoría tecnológica",

    description:
      "Tecnología para resolver problemas reales, mejorar procesos y acompañar el crecimiento de negocios y profesionales.",
  },

  twitter: {
    card:
      "summary_large_image",

    title:
      "Leandro Layerle | Consultoría tecnológica",

    description:
      "Tecnología para resolver problemas reales, mejorar procesos y acompañar el crecimiento de negocios y profesionales.",
  },

  robots: {
    index: true,
    follow: true,

    googleBot: {
      index: true,
      follow: true,

      "max-image-preview":
        "large",

      "max-snippet":
        -1,

      "max-video-preview":
        -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children:
    React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${sans.variable} ${serif.variable}`}
      >
        <Header />

        {children}

        <Footer />
      </body>
    </html>
  );
}