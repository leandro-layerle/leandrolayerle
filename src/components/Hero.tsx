import Image from "next/image";
import Link from "next/link";

import styles from "./Hero.module.css";

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.imageLayer}>
        <Image
          src="/images/hero/hero-workspace.png"
          alt="Tecnología, automatización e inteligencia artificial aplicada a negocios"
          fill
          priority
          className={styles.image}
          sizes="(max-width: 900px) 100vw, 64vw"
        />
      </div>

      <div className={styles.imageBlend} />

      <div className={styles.container}>
        <div className={styles.copy}>
          <p className={styles.eyebrow}>
            Automatización · Integraciones · Sistemas · IA
          </p>

          <h1 className={styles.title}>
            Tu empresa creció.
            <br />
            ¿Tus procesos
            <br />
            <span className={styles.titleAccent}>
              crecieron con ella?
            </span>
          </h1>

          <p className={styles.description}>
            Te ayudo a ordenar, conectar y automatizar tu operación
            cuando las planillas, las tareas manuales y los sistemas
            aislados empiezan a frenar el crecimiento.
          </p>

          <div className={styles.actions}>
            <Link
              href="/contact"
              className={styles.primaryButton}
            >
              Hablemos de tu proyecto
              <span>→</span>
            </Link>

            <Link
              href="/#servicios"
              className={styles.secondaryButton}
            >
              Conocer mis servicios
            </Link>
          </div>

          <div className={styles.facts}>
            <div className={styles.fact}>
              <strong>20+</strong>

              <span>
                años desarrollando
                <br />
                e integrando sistemas
              </span>
            </div>

            <div className={styles.fact}>
              <strong>Primero el problema</strong>

              <span>
                después la tecnología
              </span>
            </div>

            <div className={styles.fact}>
              <strong>Mejoras graduales</strong>

              <span>
                sin cambiar todo
                <br />
                de golpe
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}