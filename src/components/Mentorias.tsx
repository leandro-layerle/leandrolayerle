import Image from "next/image";
import Link from "next/link";

import styles from "./Mentorias.module.css";

const benefits = [
  {
    title: "Claridad",
    description:
      "Ordená tus ideas y definí un plan concreto.",
    icon: <TargetIcon />,
  },
  {
    title: "Crecimiento",
    description:
      "Desarrollá tus habilidades técnicas y de liderazgo.",
    icon: <PeopleIcon />,
  },
  {
    title: "Oportunidades",
    description:
      "Mejorá tu perfil y preparate para nuevas oportunidades.",
    icon: <GrowthIcon />,
  },
  {
    title: "IA en acción",
    description:
      "Aprendé a aplicar IA en tu trabajo diario.",
    icon: <BrainIcon />,
  },
];

export default function Mentorias() {
  return (
    <section
      id="mentorias"
      className={styles.section}
    >
      <div className={styles.visual}>
        <Image
          src="/images/mentorias/mentorias-office.png"
          alt="Sesión de mentoría profesional"
          fill
          className={styles.photo}
          sizes="(max-width: 900px) 100vw, 50vw"
        />
      </div>

      <div className={styles.content}>
        <div className={styles.contentInner}>
          <div className={styles.top}>
            <div className={styles.eyebrow}>
              <span>Mentorías</span>
              <i />
            </div>

            <Link
              href="/mentorias"
              className={styles.secondaryButton}
            >
              Ver más sobre las mentorías
              <span>→</span>
            </Link>
          </div>

          <h2 className={styles.title}>
            Mentoría práctica
            <br />
            para profesionales
            <br />
            que quieren{" "}
            <em>crecer con foco.</em>
          </h2>

          <p className={styles.description}>
            Sesiones personalizadas para resolver desafíos
            reales, tomar mejores decisiones y avanzar en tu
            carrera con un plan claro.
          </p>

          <div className={styles.grid}>
            {benefits.map((benefit) => (
              <article
                key={benefit.title}
                className={styles.card}
              >
                <div className={styles.icon}>
                  {benefit.icon}
                </div>

                <div>
                  <h3>
                    {benefit.title}
                  </h3>

                  <p>
                    {benefit.description}
                  </p>
                </div>
              </article>
            ))}
          </div>

          <div className={styles.bottom}>
            <Link
              href="/mentorias"
              className={styles.primaryButton}
            >
              Conocer las mentorías
              <span>→</span>
            </Link>

            <div className={styles.statement}>
              <span />

              <p>
                Ideas. Personas.
                <br />
                Soluciones que impactan.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

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