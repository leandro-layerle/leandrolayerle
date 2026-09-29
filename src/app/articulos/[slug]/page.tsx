import type { Metadata } from "next";

import Link from "next/link";
import { notFound } from "next/navigation";

import ArticleCover from "@/components/ArticleCover";

import {
  getAllArticleSlugs,
  getArticleBySlug,
} from "@/content/articles/articles";

import styles from "./article.module.css";

type ArticlePageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export const dynamicParams = false;

/* ============================================================
   STATIC PARAMS
============================================================ */

export function generateStaticParams() {
  return getAllArticleSlugs().map((slug) => ({
    slug,
  }));
}

/* ============================================================
   METADATA
============================================================ */

export async function generateMetadata({
  params,
}: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;

  const registeredArticle =
    getArticleBySlug(slug);

  if (!registeredArticle) {
    return {
      title: "Artículo no encontrado",
    };
  }

  const article =
    registeredArticle.metadata;

  return {
    title: article.title,

    description: article.excerpt,

    alternates: {
      canonical:
        `/articulos/${article.slug}`,
    },

    openGraph: {
      type: "article",

      title: article.title,

      description:
        article.excerpt,

      url:
        `/articulos/${article.slug}`,

      publishedTime:
        article.date,

      tags:
        article.tags,

      ...(article.image
        ? {
            images: [
              {
                url: article.image,
                alt: article.title,
              },
            ],
          }
        : {}),
    },
  };
}

/* ============================================================
   PAGE
============================================================ */

export default async function ArticlePage({
  params,
}: ArticlePageProps) {
  const { slug } = await params;

  const registeredArticle =
    getArticleBySlug(slug);

  if (!registeredArticle) {
    notFound();
  }

  const article =
    registeredArticle.metadata;

  const articleModule =
    await registeredArticle.load();

  const ArticleContent =
    articleModule.default;

  const seriesUrl =
    article.series
      ? `/articulos?serie=${encodeURIComponent(
          article.series,
        )}`
      : null;

  return (
    <main className={styles.page}>
      <div className={styles.top}>
        <Link
          href="/articulos"
          className={styles.back}
        >
          <span aria-hidden="true">
            ←
          </span>

          Todos los artículos
        </Link>
      </div>

      <article className={styles.article}>
        {/* ====================================================
            HEADER
        ==================================================== */}

        <header className={styles.header}>
          <div className={styles.metadata}>
            <span className={styles.category}>
              {article.category}
            </span>

            <span
              className={styles.dot}
              aria-hidden="true"
            >
              •
            </span>

            <time dateTime={article.date}>
              {formatDate(article.date)}
            </time>

            <span
              className={styles.dot}
              aria-hidden="true"
            >
              •
            </span>

            <span>
              {article.readingTime}
            </span> 
          </div>

          {/* ==================================================
                SERIE
            ================================================== */}

            {article.series && seriesUrl && (
            <div className={styles.seriesLine}>
              <Link
                href={seriesUrl}
                className={styles.seriesName}
              >
                SERIE · {article.series}
              </Link>

              {article.seriesOrder && (
                <>
                  <span className={styles.seriesSeparator}>•</span>

                  <span className={styles.seriesPart}>
                    PARTE {article.seriesOrder}
                  </span>
                </>
              )}

              <span className={styles.seriesSeparator}>•</span>

              <Link
                href={seriesUrl}
                className={styles.seriesLink}
              >
                VER SERIE →
              </Link>
            </div>
          )}

          {/* ==================================================
                  REPOSITORY
              ================================================== */}

              {article.repository && (
                <a
                  href={article.repository}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.repository}
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M12 2C6.477 2 2 6.477 2 12c0 4.419 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.866-.014-1.7-2.782.604-3.369-1.342-3.369-1.342-.455-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.071 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.091-.646.349-1.087.635-1.337-2.221-.253-4.555-1.111-4.555-4.943 0-1.092.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0 1 12 6.832a9.56 9.56 0 0 1 2.504.337c1.909-1.294 2.748-1.025 2.748-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.591 1.028 2.683 0 3.842-2.337 4.687-4.565 4.935.359.309.679.92.679 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.579.688.481C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10Z" />
                  </svg>

                  Ver repositorio
                </a>
              )}
        </header>

        {/* ====================================================
            COVER
        ==================================================== */}

        <div className={styles.cover}>
          <ArticleCover
            src={article.image}
            alt={article.title}
            category={article.category}
            priority
            sizes="(max-width: 900px) 100vw, 1100px"
            className={styles.coverImage}
          />
        </div>

        {/* ====================================================
            MDX
        ==================================================== */}

        <div className={styles.content}>
          <ArticleContent />
        </div>

        {/* ====================================================
            FOOTER
        ==================================================== */}

        <footer className={styles.footer}>
          <div>
            <span className={styles.footerLabel}>
              Escrito por
            </span>

            <strong>
              Leandro Layerle
            </strong>
          </div>

          <Link href="/articulos">
            Ver más artículos

            <span aria-hidden="true">
              →
            </span>
          </Link>
        </footer>
      </article>
    </main>
  );
}

/* ============================================================
   DATE
============================================================ */

function formatDate(
  date: string,
) {
  return new Intl.DateTimeFormat(
    "es-AR",
    {
      day: "2-digit",
      month: "long",
      year: "numeric",
      timeZone: "UTC",
    },
  ).format(
    new Date(
      `${date}T12:00:00Z`,
    ),
  );
}