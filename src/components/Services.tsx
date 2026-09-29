import Image from "next/image";
import Link from "next/link";
import styles from "./Services.module.css";

const services = [
  {
    icon: "▥",
    title: "Consultoría tecnológica",
    description:
      "Analizo tu negocio, procesos y herramientas para definir la mejor estrategia tecnológica.",
    bullets: [
      "Diagnóstico y oportunidades",
      "Plan de acción",
      "Acompañamiento en la implementación",
    ],
    image: "/images/services/consultoria.png",
    alt: "Consultoría tecnológica",
  },
  {
    icon: "⌘",
    title: "Automatización e integraciones",
    description:
      "Conecto tus herramientas y elimino tareas manuales para que tu operación fluya de forma simple y confiable.",
    bullets: [
      "Integraciones y APIs",
      "Automatizaciones",
      "Workflows y procesos",
    ],
    image: "/images/services/automatizacion.png",
    alt: "Automatización e integraciones",
  },
  {
    icon: "</>",
    title: "Sistemas a medida",
    description:
      "Diseño y desarrollo soluciones pensadas para necesidades reales, escalables y fáciles de mantener.",
    bullets: [
      "Aplicaciones web",
      "APIs y microservicios",
      "Modernización de sistemas",
    ],
    image: "/images/services/sistemas.png",
    alt: "Sistemas a medida",
  },
  {
    icon: "✦",
    title: "IA aplicada",
    description:
      "Incorporo inteligencia artificial donde realmente genera valor en tus procesos y decisiones.",
    bullets: [
      "Asistentes y automatización",
      "Análisis de información",
      "Mejora de procesos",
    ],
    image: "/images/services/ia.png",
    alt: "Inteligencia artificial aplicada",
  },
];

export default function Services() {
  return (
    <section id="servicios" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.layout}>
          {/* COLUMNA IZQUIERDA */}
          <div className={styles.intro}>
            <p className={styles.eyebrow}>Servicios</p>

            <h2 className={styles.title}>
              Soluciones tecnológicas
              <span> para hacer crecer tu negocio.</span>
            </h2>

            <p className={styles.introText}>
              Te acompaño desde la estrategia hasta la implementación, con
              soluciones tecnológicas prácticas y enfocadas en resultados.
            </p>

            <Link href="/contact" className={styles.mainButton}>
              Hablemos de tu proyecto
              <span>→</span>
            </Link>
          </div>

          {/* GRID 2x2 */}
          <div className={styles.grid}>
            {services.map((service) => (
              <article key={service.title} className={styles.card}>
                {/* CONTENIDO */}
                <div className={styles.cardContent}>
                  <div className={styles.cardIcon}>
                    {service.icon}
                  </div>

                  <h3>{service.title}</h3>

                  <p className={styles.cardDescription}>
                    {service.description}
                  </p>

                  <ul className={styles.bullets}>
                    {service.bullets.map((bullet) => (
                      <li key={bullet}>
                        <span className={styles.check}>✓</span>
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* IMAGEN */}
                <div className={styles.imageArea}>
                  <Image
                    src={service.image}
                    alt={service.alt}
                    fill
                    className={styles.image}
                    sizes="(max-width: 1100px) 100vw, 300px"
                  />

                  <div className={styles.imageGradient} />
                </div>

                {/* CTA CIRCULAR */}
                <Link
                  href="/contact"
                  className={styles.cardButton}
                  aria-label={`Conocer más sobre ${service.title}`}
                >
                  →
                </Link>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}