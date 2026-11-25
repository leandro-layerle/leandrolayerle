import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import styles from "../servicios.module.css";
import { getService, industries, services } from "./services";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return [...services, ...industries].map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();
  const url = `/servicios/${service.slug}`;
  return {
    title: service.title,
    description: service.description,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      locale: "es_AR",
      siteName: "Leandro Layerle",
      title: `${service.title} | Leandro Layerle`,
      description: service.description,
      url,
      images: [{ url: service.image, alt: service.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: service.title,
      description: service.description,
      images: [service.image],
    },
  };
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();
  const isIndustry = industries.some(item => item.slug === slug);
  const contactHref = isIndustry
    ? `/contact?sector=${encodeURIComponent(slug)}`
    : `/contact?servicio=${encodeURIComponent(slug)}`;
  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.heroVisual}>
          <Image src={service.image} alt="" fill priority className={styles.heroImage} sizes="(max-width: 850px) 100vw, 56vw" />
        </div>
        <div className={styles.heroBlend} />
        <div className={`${styles.container} ${styles.heroContainer}`}>
          <div className={styles.heroCopy}>
            <Link href="/servicios" className={styles.secondary}>← Todos los servicios</Link>
            <p className={styles.eyebrow}>{service.title}</p>
            <h1>{service.headline}<span>{service.emphasis}</span></h1>
            <p className={styles.lead}>{service.description}</p>
            <div className={styles.actions}>
              <Link href={contactHref} className={styles.primary}>Hablemos de tu proyecto <span aria-hidden="true">→</span></Link>
              <a href="#soluciones" className={styles.secondary}>Conocé las soluciones ↓</a>
            </div>
            <p className={styles.location}>Argentina · Uruguay · Consultoría remota y presencial a coordinar</p>
          </div>
        </div>
      </section>
      <section className={styles.section}>
        <div className={`${styles.container} ${styles.split}`}>
          <div className={styles.featureCopy}>
            <p className={styles.eyebrow}>01 / Tu situación</p>
            <h2>¿Te resulta familiar?<span>Podemos trabajar sobre eso.</span></h2>
            <p>Estas son situaciones posibles. Primero necesitamos entender cómo funciona tu negocio o equipo.</p>
          </div>
          <div className={styles.deliverable}>
            <ul className={styles.featureList}>{service.situations.map(text => <li key={text}>{text}</li>)}</ul>
          </div>
        </div>
      </section>
      <section id="soluciones" className={styles.alternateSection}>
        <div className={styles.container}>
          <div className={styles.heading}>
            <p className={styles.eyebrow}>02 / Soluciones</p>
            <h2>¿En qué podemos trabajar?</h2>
            <p>Definimos el alcance según tus necesidades y las herramientas que ya utilizás.</p>
          </div>
          <div className={styles.processGrid}>
            {service.solutions.map((item, index) => <article key={item.title}><span className={styles.index}>0{index + 1}</span><h3>{item.title}</h3><p>{item.text}</p></article>)}
          </div>
        </div>
      </section>
      <section className={styles.diagnostic}>
        <div className={`${styles.container} ${styles.split}`}>
          <div className={styles.featureCopy}>
            <p className={styles.eyebrow}>03 / Entregables</p>
            <h2>Un alcance claro.<span>Resultados que podamos evaluar.</span></h2>
            <p>Acordamos entregables, tiempos y presupuesto antes de comenzar. Las licencias, infraestructura y otros costos se evalúan por separado.</p>
            <Link href={contactHref} className={styles.primary}>{isIndustry ? "Hablemos de tu negocio" : "Consultar por este servicio"} <span aria-hidden="true">→</span></Link>
          </div>
          <div className={styles.deliverable}>
            <ul className={styles.featureList}>{service.deliverables.map(text => <li key={text}>{text}</li>)}</ul>
          </div>
        </div>
      </section>
      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.heading}><p className={styles.eyebrow}>Más posibilidades</p><h2>Otros servicios</h2></div>
          <div className={styles.processGrid}>
            {services.filter(item => item.slug !== service.slug).map(item => <article key={item.slug}><h3>{item.title}</h3><p>{item.description}</p><Link className={styles.secondary} href={`/servicios/${item.slug}`}>Conocer más →</Link></article>)}
          </div>
        </div>
      </section>
    </main>
  );
}
