import type { Metadata } from "next";

import ContactForm from "@/components/ContactForm";

import styles from "./contact.module.css";

export const metadata: Metadata = {
  title: "Contacto",

  description:
    "Conversemos sobre tu proyecto, una necesidad tecnológica o una mentoría.",

  alternates: {
    canonical: "/contact",
  },

  openGraph: {
    title: "Contacto | Leandro Layerle",

    description:
      "Conversemos sobre tu proyecto, una necesidad tecnológica o una mentoría.",

    url: "/contact",
  },
};

export default function ContactPage() {
  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <section className={styles.intro}>
          <div>
            <p className={styles.eyebrow}>
              Contacto
            </p>

            <h1 className={styles.title}>
              Hablemos de lo que
              <span> necesitás resolver.</span>
            </h1>

            <p className={styles.description}>
              No necesitás llegar con una solución definida.
              Contame qué está pasando en tu negocio y vemos qué
              tiene sentido mejorar, automatizar, integrar o
              construir.
            </p>
          </div>

          <div className={styles.introBottom}>
            <div className={styles.principle}>
              <span>01</span>

              <div>
                <strong>
                  Primero entendemos el problema.
                </strong>

                <p>
                  Después definimos si realmente necesitás
                  tecnología y cuál.
                </p>
              </div>
            </div>

            <div className={styles.principle}>
              <span>02</span>

              <div>
                <strong>
                  Sin propuestas prefabricadas.
                </strong>

                <p>
                  Cada negocio tiene procesos, contexto y
                  necesidades diferentes.
                </p>
              </div>
            </div>
          </div>
        </section>

        <ContactForm />
      </div>
    </main>
  );
}