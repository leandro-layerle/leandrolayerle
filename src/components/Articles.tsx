import Link from "next/link";

import {
  getAllArticles,
} from "@/content/articles/articles";

import ArticlesCarousel from "./ArticlesCarousel";

import styles from "./Articles.module.css";

export default function Articles() {
  const articles = getAllArticles();

  /*
   * En la Home mostramos solamente los últimos 6.
   * /articulos sigue siendo el catálogo completo.
   */
  const latestArticles = articles.slice(0, 6);

  if (latestArticles.length === 0) {
    return null;
  }

  return (
    <section
      id="articulos"
      className={styles.section}
    >
      <div className={styles.container}>
        <header className={styles.header}>
          <div>
            <p className={styles.eyebrow}>
              Artículos
            </p>

            <h2 className={styles.title}>
              Historias, ideas
              <span>
                {" "}
                y lecciones aprendidas.
              </span>
            </h2>

            <p className={styles.description}>
              Desarrollo, arquitectura,
              inteligencia artificial y
              tecnología aplicada desde la
              experiencia de construir
              soluciones reales.
            </p>
          </div>

          <Link
            href="/articulos"
            className={styles.allArticles}
          >
            Ver todos los artículos
            <span>→</span>
          </Link>
        </header>

        <ArticlesCarousel
          articles={latestArticles}
        />
      </div>
    </section>
  );
}