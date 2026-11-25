import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import ContactCTA from "@/components/ContactCTA";
import cards from "@/components/Services.module.css";
import styles from "./servicios.module.css";

const seoTitle = "Consultoría tecnológica e IA para empresas";
const seoDescription =
  "Consultoría tecnológica, automatización, software a medida y capacitación en IA para empresas y equipos de Argentina y Uruguay.";
const seoImage = "/images/services/consultoria.png";

export const metadata: Metadata = {
  title: seoTitle,
  description: seoDescription,
  alternates: { canonical: "/servicios" },
  openGraph: {
    type: "website",
    locale: "es_AR",
    siteName: "Leandro Layerle",
    title: `${seoTitle} | Leandro Layerle`,
    description: seoDescription,
    url: "/servicios",
    images: [{ url: seoImage, alt: "Consultoría tecnológica para empresas" }],
  },
  twitter: {
    card: "summary_large_image",
    title: seoTitle,
    description: seoDescription,
    images: [seoImage],
  },
};

const services = [
  {
    icon: "▥", title: "Consultoría tecnológica", slug: "consultoria",
    description: "Entendemos qué está pasando en tu negocio y definimos qué tiene sentido mejorar antes de invertir en tecnología.",
    bullets: ["Diagnóstico de procesos y herramientas", "Plan de mejoras priorizado", "Acompañamiento tecnológico"],
    image: "/images/services/consultoria.png",
  },
  {
    icon: "⌘", title: "Automatización e integraciones", slug: "automatizacion",
    description: "Simplificamos tareas repetitivas y conectamos las herramientas que ya utilizás para recuperar tiempo de trabajo.",
    bullets: ["Automatización de tareas administrativas", "Gestión y seguimiento de consultas", "Integración de sistemas y datos"],
    image: "/images/services/automatizacion.png",
  },
  {
    icon: "</>", title: "Sistemas a medida", slug: "desarrollo",
    description: "Construimos soluciones cuando las herramientas existentes no alcanzan para resolver una necesidad concreta.",
    bullets: ["Aplicaciones web y sistemas internos", "APIs e integraciones", "Modernización de aplicaciones"],
    image: "/images/services/sistemas.png",
  },
  {
    icon: "✦", title: "Inteligencia artificial aplicada", slug: "inteligencia-artificial",
    description: "Incorporamos IA allí donde pueda facilitar decisiones, mejorar la atención o simplificar el trabajo cotidiano.",
    bullets: ["Asistentes y análisis de información", "Automatización asistida por IA", "Validación y revisión humana"],
    image: "/images/services/ia.png",
  },
];

const industries = [
  { title: "Hoteles y posadas", slug: "hoteleria", text: "Consultas frecuentes, información para huéspedes y seguimiento de reservas." },
  { title: "Inmobiliarias", slug: "inmobiliarias", text: "Organización de interesados, búsqueda de propiedades y seguimiento comercial." },
  { title: "Turismo", slug: "turismo", text: "Preparación de cotizaciones, itinerarios y coordinación de operaciones." },
  { title: "Comercios y servicios", slug: "comercios", text: "Presupuestos, atención al cliente y tareas administrativas repetitivas." },
];

const process = [
  { title: "Entender el problema", text: "Conversamos sobre tu situación, las herramientas que utilizás y los desafíos de tu equipo." },
  { title: "Definir qué conviene hacer", text: "Priorizamos oportunidades según su impacto, esfuerzo y viabilidad." },
  { title: "Avanzar con una solución", text: "Acordamos un alcance, entregables y próximos pasos antes de implementar." },
];

export default function ServiciosPage() {
  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.heroVisual}>
          <Image src="/images/services/consultoria.png" alt="" fill priority className={styles.heroImage} sizes="(max-width: 850px) 100vw, 50vw" />
        </div>
        <div className={styles.heroBlend} />
        <div className={`${styles.container} ${styles.heroContainer}`}>
          <div className={styles.heroCopy}>
            <p className={styles.eyebrow}>Consultoría · Tecnología · Inteligencia artificial</p>
            <h1>Cada negocio tiene desafíos diferentes.<span>La tecnología debería adaptarse a ellos.</span></h1>
            <p className={styles.lead}>Te ayudo a identificar oportunidades, mejorar procesos y construir soluciones que tengan sentido para tu negocio y tu equipo.</p>
            <div className={styles.actions}>
              <Link href="/contact" className={styles.primary}>Hablemos de tu proyecto <span aria-hidden="true">→</span></Link>
              <a href="#soluciones" className={styles.secondary}>Conocé los servicios <span aria-hidden="true">↓</span></a>
              <a href="/documentos/catalogo-servicios.pdf" download="Catalogo_Leandro_Layerle.pdf" className={styles.secondary}>Descargar catálogo (PDF) <span aria-hidden="true">↓</span></a>
            </div>
            <p className={styles.location}>Argentina · Uruguay · Consultoría remota y presencial a coordinar</p>
          </div>
        </div>
      </section>

      <section id="soluciones" className={styles.section}>
        <div className={styles.container}>
          <div className={styles.heading}>
            <p className={styles.eyebrow}>01 / Soluciones para empresas</p>
            <h2>Menos tareas repetitivas.<span>Más tiempo para tu negocio.</span></h2>
            <p>Desde una mejora puntual hasta una solución a medida. El punto de partida es siempre tu necesidad, no una herramienta.</p>
          </div>
          <div className={cards.grid}>
            {services.map((service) => (
              <article id={service.slug} key={service.slug} className={`${cards.card} ${styles.serviceCard}`}>
                <div className={cards.cardContent}>
                  <div className={cards.cardIcon} aria-hidden="true">{service.icon}</div>
                  <h3>{service.title}</h3>
                  <p className={cards.cardDescription}>{service.description}</p>
                  <ul className={cards.bullets}>
                    {service.bullets.map((bullet) => <li key={bullet}><span className={cards.check} aria-hidden="true">✓</span><span>{bullet}</span></li>)}
                  </ul>
                </div>
                <div className={cards.imageArea}>
                  <Image src={service.image} alt="" fill className={cards.image} sizes="(max-width: 600px) 100vw, (max-width: 850px) 40vw, 22vw" />
                  <div className={cards.imageGradient} />
                </div>
                <Link href={`/servicios/${service.slug}`} className={cards.cardButton} aria-label={`Conocer más sobre ${service.title}`}>→</Link>
              </article>
            ))}
          </div>
          <div className={styles.industrySection}>
            <p className={styles.eyebrow}>Situaciones por sector</p>
            <h3>¿En qué podemos trabajar juntos?</h3>
            <p>Algunos ejemplos de procesos que podemos evaluar. La solución dependerá de la realidad de tu empresa.</p>
            <div className={styles.industryGrid}>
              {industries.map((industry, index) => <article key={industry.title}><span className={styles.index}>0{index + 1}</span><h4>{industry.title}</h4><p>{industry.text}</p><Link href={`/servicios/${industry.slug}`} className={styles.secondary} aria-label={`Conocer soluciones para ${industry.title}`}>Conocer soluciones →</Link></article>)}
            </div>
          </div>
        </div>
      </section>

      <section className={styles.alternateSection}>
        <div className={`${styles.container} ${styles.split}`}>
          <div className={styles.featureVisual}>
            <Image src="/images/mentorias/mentorias-office.png" alt="" fill className={styles.featureImage} sizes="(max-width: 850px) 100vw, 45vw" />
          </div>
          <div className={styles.featureCopy}>
            <p className={styles.eyebrow}>02 / Capacitación empresarial</p>
            <h2>Aprender para aplicar.<span>No solamente para conocer.</span></h2>
            <p>Talleres prácticos para empresas, cámaras y asociaciones que quieren incorporar inteligencia artificial al trabajo diario.</p>
            <ul className={styles.featureList}>
              <li>IA aplicada a ventas, atención al cliente y administración.</li>
              <li>Capacitaciones adaptadas a hotelería, turismo e inmobiliarias.</li>
              <li>Ejercicios sobre situaciones del negocio y uso responsable de herramientas.</li>
            </ul>
            <Link href="/servicios/capacitacion" className={styles.primary}>Conocer las capacitaciones <span aria-hidden="true">→</span></Link>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={`${styles.container} ${styles.split} ${styles.techSplit}`}>
          <div className={styles.featureCopy}>
            <p className={styles.eyebrow}>03 / Consultoría especializada IT</p>
            <h2>Experiencia técnica.<span>Al servicio de tu equipo.</span></h2>
            <p>Colaboro con empresas tecnológicas y equipos de desarrollo que necesitan resolver desafíos técnicos, modernizar aplicaciones o sumar capacidades especializadas.</p>
            <ul className={styles.featureList}>
              <li>Arquitectura de software, desarrollo .NET e integraciones.</li>
              <li>Auditoría técnica y modernización de sistemas legacy.</li>
              <li>Inteligencia artificial, GitHub Copilot y automatización de pruebas.</li>
              <li>Mentoría técnica y acompañamiento de equipos.</li>
            </ul>
            <Link href="/servicios/consultoria-it" className={styles.primary}>Conocer la consultoría IT <span aria-hidden="true">→</span></Link>
          </div>
          <div className={styles.featureVisual}>
            <Image src="/images/services/sistemas.png" alt="" fill className={styles.featureImage} sizes="(max-width: 850px) 100vw, 45vw" />
          </div>
        </div>
      </section>

      <section className={styles.diagnostic}>
        <div className={`${styles.container} ${styles.split}`}>
          <div className={styles.featureCopy}>
            <p className={styles.eyebrow}>Una forma de empezar</p>
            <h2>Diagnóstico de digitalización e IA.</h2>
            <p>Si todavía no sabés qué tecnología necesitás, podemos comenzar por analizar tus procesos y definir un plan concreto.</p>
            <Link href="/contact?servicio=diagnostico" className={styles.primary}>Consultar por un diagnóstico <span aria-hidden="true">→</span></Link>
          </div>
          <div className={styles.deliverable}>
            <p className={styles.eyebrow}>Qué incluye</p>
            <ul className={styles.featureList}>
              <li>Reunión de relevamiento de hasta 90 minutos.</li>
              <li>Análisis de hasta tres procesos y herramientas actuales.</li>
              <li>Oportunidades de mejora, esfuerzo e impacto estimados.</li>
              <li>Documento de recomendaciones y reunión de devolución.</li>
            </ul>
            <p className={styles.note}>Servicio de alcance acordado. No incluye implementación ni licencias. El precio y el plazo se confirman antes de comenzar.</p>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.heading}>
            <p className={styles.eyebrow}>Cómo trabajamos</p>
            <h2>Primero el problema.<span>Después, la tecnología.</span></h2>
          </div>
          <div className={styles.processGrid}>
            {process.map((step, index) => <article key={step.title}><span className={styles.index}>0{index + 1}</span><h3>{step.title}</h3><p>{step.text}</p></article>)}
          </div>
        </div>
      </section>
      <ContactCTA />
    </main>
  );
}
