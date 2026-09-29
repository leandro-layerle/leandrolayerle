import type { Metadata } from "next";

import Image from "next/image";
import Link from "next/link";

import styles from "./mentorias.module.css";

export const metadata: Metadata = {
  title: "Mentorías",

  description:
    "Mentoría personalizada para profesionales de tecnología que quieren ordenar su carrera, tomar mejores decisiones, desarrollar liderazgo y aplicar inteligencia artificial en su trabajo.",

  alternates: {
    canonical: "/mentorias",
  },

  openGraph: {
    title: "Mentorías | Leandro Layerle",

    description:
      "Mentoría práctica para profesionales que quieren crecer con foco.",

    url: "/mentorias",
  },
};

const areas = [
  {
    title: "Claridad",
    description:
      "Ordenamos ideas, prioridades y próximos pasos para que tengas un plan concreto.",
    icon: <TargetIcon />,
  },
  {
    title: "Crecimiento",
    description:
      "Trabajamos habilidades técnicas, liderazgo, comunicación y toma de decisiones.",
    icon: <PeopleIcon />,
  },
  {
    title: "Oportunidades",
    description:
      "Analizamos tu perfil y cómo prepararte mejor para los desafíos profesionales que buscás.",
    icon: <GrowthIcon />,
  },
  {
    title: "IA en acción",
    description:
      "Incorporamos inteligencia artificial a tu trabajo cotidiano con casos concretos y aplicables.",
    icon: <BrainIcon />,
  },
];

const process = [
  {
    number: "01",
    title: "Entender dónde estás",
    description:
      "Partimos de tu situación actual, tus objetivos y aquello que hoy te está frenando.",
  },
  {
    number: "02",
    title: "Definir el foco",
    description:
      "Elegimos qué trabajar primero y convertimos un problema amplio en acciones concretas.",
  },
  {
    number: "03",
    title: "Avanzar con un plan",
    description:
      "Te llevás decisiones, próximos pasos y herramientas para seguir avanzando después de la sesión.",
  },
];

export default function MentoriasPage() {
  return (
    <main className={styles.page}>
      {/* ======================================================
          HERO
      ====================================================== */}

      <section className={styles.hero}>
        <div className={styles.heroVisual}>
          <Image
            src="/images/mentorias/mentorias-office.png"
            alt="Sesión de mentoría profesional"
            fill
            priority
            className={styles.heroImage}
            sizes="(max-width: 900px) 100vw, 48vw"
          />

          <div className={styles.quote}>
            <span className={styles.quoteMark}>
              “
            </span>

            <p>
              Mi objetivo es ayudarte a transformar tu
              experiencia en las oportunidades que querés.
            </p>

            <strong>
              Leandro Layerle
            </strong>
          </div>
        </div>

        <div className={styles.heroContent}>
          <div className={styles.heroContentInner}>
            <div className={styles.eyebrow}>
              <span>Mentorías</span>
              <i />
            </div>

            <h1>
              Mentoría práctica
              <br />
              para profesionales
              <br />
              que quieren{" "}
              <em>crecer con foco.</em>
            </h1>

            <p className={styles.heroDescription}>
              Un espacio personalizado para trabajar desafíos
              reales, tomar mejores decisiones y transformar
              incertidumbre en un plan concreto.
            </p>

            <div className={styles.heroActions}>
              <Link
                href="/contact"
                className={styles.primaryButton}
              >
                Quiero una mentoría
                <span>→</span>
              </Link>

              <a
                href="#como-funciona"
                className={styles.secondaryButton}
              >
                Cómo funciona
              </a>
            </div>

            <div className={styles.heroStatement}>
              <span />

              <p>
                Ideas. Personas.
                <br />
                Soluciones que impactan.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================
          INTRO
      ====================================================== */}

      <section className={styles.intro}>
        <div className={styles.container}>
          <div className={styles.introLabel}>
            <span>
              Una conversación
              <br />
              con propósito.
            </span>
          </div>

          <div className={styles.introContent}>
            <h2>
              No se trata de decirte
              <br />
              qué hacer.
            </h2>

            <p className={styles.introLead}>
              Se trata de ayudarte a pensar mejor qué querés
              hacer y cómo avanzar.
            </p>

            <div className={styles.introText}>
              <p>
                Durante más de 20 años trabajando en tecnología
                atravesé cambios de rol, decisiones técnicas,
                liderazgo de equipos, arquitectura de software,
                entrevistas, aprendizaje y transformación
                profesional.
              </p>

              <p>
                La mentoría toma esa experiencia y la pone al
                servicio de una situación concreta: la tuya.
                No hay una receta estándar ni un programa
                genérico.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================
          PARA QUIÉN
      ====================================================== */}

      <section className={styles.forWho}>
        <div className={styles.container}>
          <div className={styles.sectionHeading}>
            <div className={styles.darkEyebrow}>
              <span>Para quién</span>
              <i />
            </div>

            <h2>
              Hay momentos en los que
              <br />
              necesitás otra mirada.
            </h2>

            <p>
              La mentoría puede ayudarte cuando tenés experiencia,
              pero necesitás ordenar el próximo movimiento.
            </p>
          </div>

          <div className={styles.forWhoGrid}>
            <article>
              <span>01</span>

              <h3>
                Quiero crecer profesionalmente
              </h3>

              <p>
                Sentís que podés dar un paso más, pero todavía
                no está claro cuál debería ser.
              </p>
            </article>

            <article>
              <span>02</span>

              <h3>
                Estoy tomando decisiones importantes
              </h3>

              <p>
                Cambio de rol, nuevas responsabilidades,
                oportunidades o decisiones técnicas con impacto.
              </p>
            </article>

            <article>
              <span>03</span>

              <h3>
                Necesito ordenar mi perfil
              </h3>

              <p>
                Querés entender mejor cómo contar tu experiencia,
                qué potenciar y dónde poner el foco.
              </p>
            </article>

            <article>
              <span>04</span>

              <h3>
                Quiero incorporar IA de verdad
              </h3>

              <p>
                No solamente usar herramientas, sino entender
                cómo aplicarlas a tu trabajo y mejorar tu forma
                de resolver problemas.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* ======================================================
          ÁREAS
      ====================================================== */}

      <section className={styles.areas}>
        <div className={styles.container}>
          <div className={styles.areasHeader}>
            <div>
              <div className={styles.eyebrow}>
                <span>Qué podemos trabajar</span>
                <i />
              </div>

              <h2>
                La mentoría se adapta
                <br />
                a tu desafío.
              </h2>
            </div>

            <p>
              No necesitás encajar en un programa cerrado.
              Partimos del problema real y trabajamos sobre
              aquello que hoy puede generar mayor impacto.
            </p>
          </div>

          <div className={styles.areasGrid}>
            {areas.map((area) => (
              <article
                key={area.title}
                className={styles.areaCard}
              >
                <div className={styles.areaIcon}>
                  {area.icon}
                </div>

                <div>
                  <h3>{area.title}</h3>

                  <p>
                    {area.description}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ======================================================
          PROCESO
      ====================================================== */}

      <section
        id="como-funciona"
        className={styles.process}
      >
        <div className={styles.container}>
          <div className={styles.processHeader}>
            <div className={styles.darkEyebrow}>
              <span>Cómo funciona</span>
              <i />
            </div>

            <h2>
              Una sesión.
              <br />
              Un problema real.
              <br />
              <em>Un próximo paso claro.</em>
            </h2>
          </div>

          <div className={styles.processGrid}>
            {process.map((step) => (
              <article
                key={step.number}
                className={styles.processCard}
              >
                <span className={styles.processNumber}>
                  {step.number}
                </span>

                <div>
                  <h3>
                    {step.title}
                  </h3>

                  <p>
                    {step.description}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ======================================================
          CTA
      ====================================================== */}

      <section className={styles.cta}>
        <div className={styles.ctaInner}>
          <div>
            <div className={styles.eyebrow}>
              <span>Conversemos</span>
              <i />
            </div>

            <h2>
              ¿Hay algo de tu carrera
              <br />
              que necesitás destrabar?
            </h2>
          </div>

          <div className={styles.ctaRight}>
            <p>
              Contame brevemente en qué situación estás.
              Podemos ver si una mentoría es el espacio
              adecuado para trabajarla.
            </p>

            <Link
              href="/contact"
              className={styles.primaryButton}
            >
              Hablemos
              <span>→</span>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

/* ============================================================
   ICONOS
============================================================ */

function TargetIcon() {
  return (
    <svg viewBox="0 0 48 48" aria-hidden="true">
      <circle cx="24" cy="24" r="14" />
      <circle cx="24" cy="24" r="7" />
      <circle cx="24" cy="24" r="2" />

      <path d="M28 20 40 8" />
      <path d="M34 8h6v6" />
    </svg>
  );
}

function PeopleIcon() {
  return (
    <svg viewBox="0 0 48 48" aria-hidden="true">
      <circle cx="24" cy="17" r="6" />
      <circle cx="11" cy="20" r="4" />
      <circle cx="37" cy="20" r="4" />

      <path d="M14 38v-5c0-6 4-10 10-10s10 4 10 10v5" />
      <path d="M3 37v-4c0-5 3-8 8-8" />
      <path d="M45 37v-4c0-5-3-8-8-8" />
    </svg>
  );
}

function GrowthIcon() {
  return (
    <svg viewBox="0 0 48 48" aria-hidden="true">
      <path d="M7 40h34" />

      <rect
        x="10"
        y="29"
        width="6"
        height="11"
      />

      <rect
        x="21"
        y="21"
        width="6"
        height="19"
      />

      <rect
        x="32"
        y="13"
        width="6"
        height="27"
      />

      <path d="M9 24 19 16l8 3L40 7" />
      <path d="M33 7h7v7" />
    </svg>
  );
}

function BrainIcon() {
  return (
    <svg viewBox="0 0 48 48" aria-hidden="true">
      <path d="M24 11v26" />

      <path d="M24 14c-3-6-11-5-12 1-5 1-6 8-2 11-4 5 0 12 6 11 2 4 7 3 8 0" />

      <path d="M24 14c3-6 11-5 12 1 5 1 6 8 2 11 4 5 0 12-6 11-2 4-7 3-8 0" />

      <path d="M15 19c4 0 6 2 6 5" />

      <path d="M33 19c-4 0-6 2-6 5" />

      <path d="M14 30c3-2 6-1 8 2" />

      <path d="M34 30c-3-2-6-1-8 2" />
    </svg>
  );
}