import Link from "next/link";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.top}>
          <div className={styles.brand}>
            <Link href="/" className={styles.name}>
              LEANDRO LAYERLE
            </Link>

            <p className={styles.role}>
              Consultor · Mentor · Tecnología
            </p>

            <p className={styles.description}>
              Tecnología para resolver problemas reales,
              mejorar procesos y acompañar el crecimiento
              de negocios y profesionales.
            </p>

            <Link
              href="/contact"
              className={styles.contactButton}
            >
              Hablemos
              <span>→</span>
            </Link>
          </div>

          <div className={styles.links}>
            <div className={styles.column}>
              <p className={styles.columnTitle}>
                Navegación
              </p>

              <Link href="/">Inicio</Link>
              <Link href="/#servicios">Servicios</Link>
              <Link href="/#proyectos">Proyectos</Link>
              <Link href="/articulos">Artículos</Link>
              <Link href="/mentorias">Mentorías</Link>
              <Link href="/sobre-mi">Sobre mí</Link>
            </div>

            <div className={styles.column}>
              <p className={styles.columnTitle}>
                Servicios
              </p>

              <Link href="/#servicios">
                Consultoría tecnológica
              </Link>

              <Link href="/#servicios">
                Automatización e integraciones
              </Link>

              <Link href="/#servicios">
                Sistemas a medida
              </Link>

              <Link href="/#servicios">
                IA aplicada
              </Link>
            </div>

            <div className={styles.column}>
              <p className={styles.columnTitle}>
                Contacto
              </p>

              <Link href="/contact">
                Enviar una consulta
              </Link>

              <Link href="/articulos">
                Leer artículos
              </Link>

              <Link href="/mentorias">
                Conocer mentorías
              </Link>
            </div>
          </div>
        </div>

        <div className={styles.divider} />

        <div className={styles.bottom}>
          <p>
            © {new Date().getFullYear()} Leandro Layerle
          </p>

          <p>
            Tecnología · Negocio · Personas
          </p>

          <Link href="/contact">
            Contacto
          </Link>
        </div>
      </div>
    </footer>
  );
}