import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import styles from "./sobre-mi.module.css";

export const metadata: Metadata = {
  title: "Sobre mí | Leandro Layerle",
  description:
    "Consultor, arquitecto, mentor y profesional de tecnología con más de 20 años de experiencia.",
};

const areas = [
  {
    title: "Consultoría estratégica",
    description:
      "Traduzco desafíos de negocio en soluciones tecnológicas viables y sostenibles.",
    icon: <TargetIcon />,
  },
  {
    title: "Mentoría",
    description:
      "Acompaño a profesionales y líderes en su desarrollo y crecimiento técnico.",
    icon: <PeopleIcon />,
  },
  {
    title: "Arquitectura de soluciones",
    description:
      "Diseño arquitecturas escalables, seguras y alineadas al negocio.",
    icon: <LayersIcon />,
  },
  {
    title: "Visión de negocio",
    description:
      "Conecto la tecnología con objetivos concretos para generar valor real.",
    icon: <ChartIcon />,
  },
];

export default function AboutPage() {
  return (
    <>
      <main className={styles.page}>
        <section className={styles.hero}>
          {/* FOTO */}
          <div className={styles.visual}>
            <Image
              src="/images/about/leandro-about.jpg"
              alt="Leandro Layerle"
              fill
              priority
              className={styles.photo}
              sizes="(max-width: 900px) 100vw, 46vw"
            />

            <div className={styles.photoOverlay} />

            <div className={styles.quote}>
              <span className={styles.quoteMark}>“</span>

              <p>
                Creo en la tecnología
                <br />
                cuando potencia lo más
                <br />
                humano:
                <em> las personas.</em>
              </p>

              <div className={styles.quoteLine} />

              <span className={styles.quoteAuthor}>
                Leandro Layerle
              </span>
            </div>
          </div>

          {/* CONTENIDO */}
          <div className={styles.content}>
            <div className={styles.contentInner}>
              <div className={styles.eyebrow}>
                <span>Sobre mí</span>
                <i />
              </div>

              <h1 className={styles.title}>
                Más de 20 años
                <br />
                conectando tecnología
                <br />
                con{" "}
                <em>
                  necesidades reales.
                </em>
              </h1>

              <p className={styles.intro}>
                Soy Leandro Layerle, consultor y mentor. Acompaño
                a organizaciones y profesionales a diseñar
                soluciones tecnológicas con sentido de negocio,
                combinando experiencia técnica, arquitectura y
                una mirada centrada en las personas.
              </p>

              <div className={styles.grid}>
                {areas.map((area) => (
                  <article
                    key={area.title}
                    className={styles.card}
                  >
                    <div className={styles.icon}>
                      {area.icon}
                    </div>

                    <div>
                      <h2>{area.title}</h2>
                      <p>{area.description}</p>
                    </div>
                  </article>
                ))}
              </div>

              <div className={styles.actions}>
                <Link
                  href="/contact"
                  className={styles.primaryButton}
                >
                  Conversemos
                  <span>→</span>
                </Link>

                <div className={styles.statement}>
                  <span className={styles.statementLine} />

                  <p>
                    Ideas. Personas. Soluciones que impactan.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

/* ============================================================
   ICONS
============================================================ */

function TargetIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="7" />
      <circle cx="12" cy="12" r="3" />
      <path d="m14 10 6-6" />
      <path d="M16 4h4v4" />
    </svg>
  );
}

function PeopleIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="9" cy="8" r="3" />
      <circle cx="17" cy="9" r="2.5" />

      <path d="M3 19c0-3.2 2.5-5 6-5s6 1.8 6 5" />
      <path d="M15 14c3.3 0 6 1.5 6 4.5" />
    </svg>
  );
}

function LayersIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="m12 3-9 5 9 5 9-5-9-5Z" />
      <path d="m3 12 9 5 9-5" />
      <path d="m3 16 9 5 9-5" />
    </svg>
  );
}

function ChartIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4 20V11" />
      <path d="M9 20V7" />
      <path d="M14 20V13" />
      <path d="M19 20V4" />
    </svg>
  );
}