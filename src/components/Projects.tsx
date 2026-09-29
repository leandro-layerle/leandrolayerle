import Image from "next/image";
import Link from "next/link";
import styles from "./Projects.module.css";

const projects = [
  {
    number: "01",
    name: "Harmony",
    type: "Sistema de gestión integral",
    description:
      "Una solución para centralizar la operación de una PyME: ventas, compras, stock, clientes y análisis de rentabilidad dentro de un mismo sistema.",
    tags: ["Ventas", "Compras", "Stock", "Clientes", "Rentabilidad"],
    image: "/images/projects/harmony-16x9.png",
    alt: "Harmony, sistema de gestión integral para PyMEs",
  },
  {
    number: "02",
    name: "Seguros",
    type: "Automatización e integraciones",
    description:
      "Procesos, integraciones y automatizaciones para reducir trabajo manual, conectar información y simplificar la operación.",
    tags: ["Automatización", "Integraciones", "Workflows", "Procesos"],
    image: "/images/projects/seguros-16x9.png",
    alt: "Proyecto de automatización e integraciones para seguros",
  },
  {
    number: "03",
    name: "Trama",
    type: "Plataforma para academias y espacios culturales",
    description:
      "Una plataforma pensada para gestionar clases, alumnos, profesores, eventos, reservas y boletería desde un solo lugar.",
    tags: ["Clases", "Eventos", "Reservas", "Ticketing", "Cultura"],
    image: "/images/projects/trama-16x9.png",
    alt: "Trama, plataforma para academias y espacios culturales",
  },
];

export default function Projects() {
  return (
    <section id="proyectos" className={styles.section}>
      <div className={styles.container}>
        {/* CABECERA */}
        <header className={styles.header}>
          <p className={styles.eyebrow}>Proyectos</p>

          <div className={styles.headerGrid}>
            <h2 className={styles.title}>
              Soluciones construidas
              <span> para problemas concretos.</span>
            </h2>

            <p className={styles.intro}>
              Una selección de proyectos donde tecnología, procesos y negocio
              tuvieron que trabajar juntos.
            </p>
          </div>
        </header>

        {/* LISTA */}
        <div className={styles.list}>
          {projects.map((project, index) => {
            const isReverse = index % 2 !== 0;

            return (
              <article
                key={project.name}
                className={`${styles.project} ${isReverse ? styles.reverse : ""}`}
              >
                <div className={styles.imageColumn}>
                  <div className={styles.imageFrame}>
                    <Image
                      src={project.image}
                      alt={project.alt}
                      width={1600}
                      height={900}
                      className={styles.image}
                    />
                  </div>
                </div>

                <div className={styles.contentColumn}>
                  <span className={styles.number}>{project.number}</span>

                  <p className={styles.type}>{project.type}</p>

                  <h3 className={styles.projectName}>{project.name}</h3>

                  <p className={styles.description}>{project.description}</p>

                  <div className={styles.tags}>
                    {project.tags.map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>

                  <Link href="/contact" className={styles.link}>
                    Conocer el proyecto
                    <span>→</span>
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}