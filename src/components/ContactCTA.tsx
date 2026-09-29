import Link from "next/link";
import styles from "./ContactCTA.module.css";

export default function ContactCTA() {
  return (
    <section id="contacto" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.content}>
          <p className={styles.eyebrow}>Hablemos</p>

          <h2 className={styles.title}>
            ¿Hay algo en tu negocio
            <span> que podría funcionar mejor?</span>
          </h2>

          <p className={styles.description}>
            Contame qué estás intentando resolver. Primero entendemos el
            problema y después vemos si la tecnología puede ayudarte.
          </p>
        </div>

        <div className={styles.action}>
          <div className={styles.actionTop}>
            <span className={styles.number}>01</span>

            <span className={styles.label}>
              Primera conversación
            </span>
          </div>

          <p>
            Sin propuestas prefabricadas. Analizamos tu situación, tus
            procesos y qué tendría sentido mejorar.
          </p>

          <Link href="/contact" className={styles.button}>
            Contame qué necesitás resolver
            <span>→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}