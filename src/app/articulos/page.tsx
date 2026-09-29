import type { Metadata } from "next";

import ArticlesExplorer from "@/components/articles/ArticlesExplorer";

import { getAllArticles } from "@/content/articles/articles";

import styles from "./articulos.module.css";

export const metadata: Metadata = {
  title:
    "Artículos | Leandro Layerle",

  description:
    "Artículos sobre .NET, arquitectura, inteligencia artificial, Azure, desarrollo de software y tecnología aplicada.",
};

export default function ArticlesPage() {
  const articles = getAllArticles();

  return (
    <>
      <main className={styles.page}>
        <section className={styles.hero}>
          <div className={styles.heroInner}>
            <p className={styles.eyebrow}>
              Artículos
            </p>

            <h1>
              Ideas, experiencias
              <span>
                {" "}
                y aprendizajes.
              </span>
            </h1>

            <p className={styles.description}>
              Desarrollo, arquitectura,
              inteligencia artificial y
              tecnología aplicada desde la
              experiencia de construir sistemas
              reales.
            </p>
          </div>
        </section>

        <section className={styles.catalog}>
          <ArticlesExplorer
            articles={articles}
          />
        </section>
      </main>
    </>
  );
}